package com.example.danmuapiapp

import android.app.Activity
import android.os.Handler
import android.os.Looper
import android.widget.Toast
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import org.json.JSONObject
import java.io.BufferedInputStream
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.CountDownLatch
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicBoolean
import java.util.zip.ZipInputStream

object DanmuApiUpdater {

    private const val BRANCH = "main"
    private const val UA = "DanmuApiApp"

    private val executor = Executors.newSingleThreadExecutor()
    private val running = AtomicBoolean(false)
    private val mainHandler = Handler(Looper.getMainLooper())

    private data class RepoSpec(
        val owner: String,
        val repo: String,
        val label: String,
        val targetSubdir: String,
    )

    private val STABLE = RepoSpec(
        owner = "huangxd-",
        repo = "danmu_api",
        label = "稳定版",
        targetSubdir = "danmu_api_stable",
    )

    private val DEV = RepoSpec(
        owner = "lilixu3",
        repo = "danmu_api",
        label = "开发版",
        targetSubdir = "danmu_api_dev",
    )

    private data class RemoteInfo(
        val sha: String,
        val version: String,
    )

    fun checkAndUpdateCurrent(activity: Activity) {
        val v = ApiVariantPrefs.get(activity)
        val specs = if (v == ApiVariantPrefs.Variant.DEV) listOf(DEV) else listOf(STABLE)
        checkAndUpdate(activity, specs, title = "正在检查弹幕API（当前：${v.title}）更新…")
    }

    fun checkAndUpdateAll(activity: Activity) {
        checkAndUpdate(activity, listOf(STABLE, DEV), title = "正在检查弹幕API（稳定+开发）更新…")
    }

    private fun checkAndUpdate(activity: Activity, specs: List<RepoSpec>, title: String) {
        if (NodeService.isRunning()) {
            Toast.makeText(activity, "请先停止 Node，再更新弹幕API", Toast.LENGTH_LONG).show()
            return
        }
        if (!running.compareAndSet(false, true)) {
            Toast.makeText(activity, "正在更新中，请稍候…", Toast.LENGTH_SHORT).show()
            return
        }

        Toast.makeText(activity, title, Toast.LENGTH_SHORT).show()

        executor.execute {
            try {
                val nodeRoot = AssetCopier.ensureNodeProjectExtracted(activity)

                val results = mutableListOf<String>()
                for (spec in specs) {
                    val localVersion = readLocalVersion(nodeRoot, spec) ?: "未知"
                    val remote = fetchRemoteInfo(spec)

                    if (remote == null) {
                        results.add("${spec.label}：检查失败")
                        continue
                    }

                    if (localVersion == remote.version) {
                        val force = askForceUpdate(activity, spec.label, localVersion)
                        if (!force) {
                            results.add("${spec.label}：已是最新（$localVersion）")
                            continue
                        }
                    }

                    val ok = downloadAndInstall(nodeRoot, spec, remote.sha)
                    if (ok) {
                        val nowVer = readLocalVersion(nodeRoot, spec) ?: remote.version
                        results.add("${spec.label}：已更新（$nowVer）")
                    } else {
                        results.add("${spec.label}：更新失败")
                    }
                }

                mainHandler.post {
                    Toast.makeText(activity, results.joinToString("\n"), Toast.LENGTH_LONG).show()
                }
            } catch (_: Throwable) {
                mainHandler.post {
                    Toast.makeText(activity, "更新失败，请稍后重试", Toast.LENGTH_LONG).show()
                }
            } finally {
                running.set(false)
            }
        }
    }

    private fun askForceUpdate(activity: Activity, label: String, version: String): Boolean {
        val latch = CountDownLatch(1)
        val result = AtomicBoolean(false)

        mainHandler.post {
            runCatching {
                MaterialAlertDialogBuilder(activity)
                    .setTitle("$label 已是最新")
                    .setMessage("检测到当前已是最新版本 $version，是否强制更新？")
                    .setPositiveButton("强制更新") { _, _ ->
                        result.set(true)
                        latch.countDown()
                    }
                    .setNegativeButton("退出") { _, _ ->
                        latch.countDown()
                    }
                    .setOnCancelListener {
                        latch.countDown()
                    }
                    .show()
            }.onFailure {
                latch.countDown()
            }
        }

        runCatching { latch.await() }
        return result.get()
    }

    private fun fetchRemoteInfo(spec: RepoSpec): RemoteInfo? {
        val sha = fetchLatestSha(spec) ?: return null
        val version = fetchVersionFromRawGlobals(spec, sha) ?: return null
        return RemoteInfo(sha = sha, version = version)
    }

    private fun fetchLatestSha(spec: RepoSpec): String? {
        val api = URL("https://api.github.com/repos/${spec.owner}/${spec.repo}/commits/$BRANCH")
        val conn = (api.openConnection() as HttpURLConnection).apply {
            connectTimeout = 8000
            readTimeout = 8000
            requestMethod = "GET"
            setRequestProperty("Accept", "application/vnd.github+json")
            setRequestProperty("User-Agent", UA)
        }

        return try {
            val body = conn.inputStream.bufferedReader().use { it.readText() }
            val json = JSONObject(body)
            json.optString("sha").orEmpty().ifBlank { null }
        } catch (_: Throwable) {
            null
        } finally {
            runCatching { conn.disconnect() }
        }
    }

    private fun fetchVersionFromRawGlobals(spec: RepoSpec, sha: String): String? {
        val raw = URL("https://raw.githubusercontent.com/${spec.owner}/${spec.repo}/$sha/danmu_api/globals.js")
        val conn = (raw.openConnection() as HttpURLConnection).apply {
            instanceFollowRedirects = true
            connectTimeout = 12000
            readTimeout = 12000
            requestMethod = "GET"
            setRequestProperty("User-Agent", UA)
        }

        return try {
            val text = conn.inputStream.bufferedReader().use { it.readText() }
            parseVersionFromGlobalsJs(text)
        } catch (_: Throwable) {
            null
        } finally {
            runCatching { conn.disconnect() }
        }
    }

    private fun readLocalVersion(nodeRoot: File, spec: RepoSpec): String? {
        val direct = File(nodeRoot, "${spec.targetSubdir}/globals.js")
        if (direct.exists()) {
            val text = runCatching { direct.readText() }.getOrNull() ?: return null
            return parseVersionFromGlobalsJs(text)
        }

        val alt = File(nodeRoot, "${spec.targetSubdir}/danmu_api/globals.js")
        if (alt.exists()) {
            val text = runCatching { alt.readText() }.getOrNull() ?: return null
            return parseVersionFromGlobalsJs(text)
        }

        val found = runCatching {
            File(nodeRoot, spec.targetSubdir)
                .walkTopDown()
                .maxDepth(6)
                .firstOrNull { it.isFile && it.name == "globals.js" }
        }.getOrNull()

        if (found != null && found.exists()) {
            val text = runCatching { found.readText() }.getOrNull() ?: return null
            return parseVersionFromGlobalsJs(text)
        }

        return null
    }

    private fun parseVersionFromGlobalsJs(text: String): String? {
        val re = Regex("""\bVERSION\s*:\s*['"]([^'"]+)['"]""")
        val m = re.find(text) ?: return null
        return m.groupValues.getOrNull(1)?.trim()?.ifBlank { null }
    }

    private fun downloadAndInstall(nodeRoot: File, spec: RepoSpec, sha: String): Boolean {
        val tmpBase = File(nodeRoot, "_update_tmp")
        if (tmpBase.exists()) runCatching { tmpBase.deleteRecursively() }
        tmpBase.mkdirs()

        val zipFile = File(tmpBase, "${spec.repo}-$sha.zip")
        val url = URL("https://github.com/${spec.owner}/${spec.repo}/archive/$sha.zip")

        if (!downloadToFile(url, zipFile)) {
            runCatching { tmpBase.deleteRecursively() }
            return false
        }

        val staged = File(tmpBase, "staged")
        staged.mkdirs()

        val extracted = extractDanmuFolder(zipFile, staged) ?: run {
            runCatching { tmpBase.deleteRecursively() }
            return false
        }

        runCatching {
            File(extracted, "package.json").writeText("{\n  \"type\": \"module\"\n}\n")
        }

        val worker = File(extracted, "worker.js")
        if (!worker.exists()) {
            runCatching { tmpBase.deleteRecursively() }
            return false
        }

        val target = File(nodeRoot, spec.targetSubdir)

        val backup = File(nodeRoot, "${spec.targetSubdir}__bak")
        runCatching { if (backup.exists()) backup.deleteRecursively() }
        runCatching { if (target.exists()) target.renameTo(backup) }

        val moved = extracted.renameTo(target)
        if (!moved) {
            runCatching { if (target.exists()) target.deleteRecursively() }
            val ok = runCatching {
                extracted.copyRecursively(target, overwrite = true)
            }.getOrNull() == true
            if (!ok) {
                runCatching {
                    if (backup.exists()) {
                        if (target.exists()) target.deleteRecursively()
                        backup.renameTo(target)
                    }
                }
                runCatching { tmpBase.deleteRecursively() }
                return false
            }
        }

        runCatching { if (backup.exists()) backup.deleteRecursively() }
        runCatching { tmpBase.deleteRecursively() }
        return true
    }

    private fun downloadToFile(url: URL, out: File): Boolean {
        val conn = (url.openConnection() as HttpURLConnection).apply {
            instanceFollowRedirects = true
            connectTimeout = 12000
            readTimeout = 12000
            requestMethod = "GET"
            setRequestProperty("User-Agent", UA)
        }

        return try {
            conn.inputStream.use { input ->
                FileOutputStream(out).use { output ->
                    input.copyTo(output)
                }
            }
            true
        } catch (_: Throwable) {
            false
        } finally {
            runCatching { conn.disconnect() }
        }
    }

    private fun extractDanmuFolder(zipFile: File, outDir: File): File? {
        val outRoot = File(outDir, "danmu_api")
        if (outRoot.exists()) runCatching { outRoot.deleteRecursively() }
        outRoot.mkdirs()

        val danmuMarker = "/danmu_api/"
        ZipInputStream(BufferedInputStream(zipFile.inputStream())).use { zis ->
            while (true) {
                val e = zis.nextEntry ?: break
                val name = e.name ?: ""
                val idx = name.indexOf(danmuMarker)
                if (idx < 0) continue

                val rel = name.substring(idx + danmuMarker.length)
                if (rel.isBlank()) continue

                val outFile = File(outRoot, rel)

                val canonRoot = outRoot.canonicalPath
                val canonOut = outFile.canonicalPath
                if (canonOut != canonRoot && !canonOut.startsWith(canonRoot + File.separator)) continue

                if (e.isDirectory) {
                    outFile.mkdirs()
                } else {
                    outFile.parentFile?.mkdirs()
                    FileOutputStream(outFile).use { fos ->
                        zis.copyTo(fos)
                    }
                }
            }
        }

        return outRoot
    }
}
