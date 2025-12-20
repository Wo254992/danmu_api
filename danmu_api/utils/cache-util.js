import { globals } from '../configs/globals.js';
import { log } from './log-util.js'
import { Anime } from "../models/dandan-model.js";
import { simpleHash } from "./codec-util.js";
let fs, path;

// =====================
// cache数据结构处理函数
// =====================

// 检查搜索缓存是否有效（未过期）
export function isSearchCacheValid(keyword) {
    if (!globals.searchCache.has(keyword)) {
        return false;
    }

    const cached = globals.searchCache.get(keyword);
    const now = Date.now();
    const cacheAgeMinutes = (now - cached.timestamp) / (1000 * 60);

    if (cacheAgeMinutes > globals.searchCacheMinutes) {
        // 缓存已过期，删除它
        globals.searchCache.delete(keyword);
        log("info", `Search cache for "${keyword}" expired after ${cacheAgeMinutes.toFixed(2)} minutes`);
        return false;
    }

    return true;
}

// 获取搜索缓存
export function getSearchCache(keyword) {
    if (isSearchCacheValid(keyword)) {
        log("info", `Using search cache for "${keyword}"`);
        return globals.searchCache.get(keyword).results;
    }
    return null;
}

// 设置搜索缓存
export function setSearchCache(keyword, results) {
    globals.searchCache.set(keyword, {
        results: results,
        timestamp: Date.now()
    });

    log("info", `Cached search results for "${keyword}" (${results.length} animes)`);
}

// 检查弹幕缓存是否有效（未过期）
export function isCommentCacheValid(videoUrl) {
    if (!globals.commentCache.has(videoUrl)) {
        return false;
    }

    const cached = globals.commentCache.get(videoUrl);
    const now = Date.now();
    const cacheAgeMinutes = (now - cached.timestamp) / (1000 * 60);

    if (cacheAgeMinutes > globals.commentCacheMinutes) {
        // 缓存已过期，删除它
        globals.commentCache.delete(videoUrl);
        log("info", `Comment cache for "${videoUrl}" expired after ${cacheAgeMinutes.toFixed(2)} minutes`);
        return false;
    }

    return true;
}

// 获取弹幕缓存
export function getCommentCache(videoUrl) {
    if (isCommentCacheValid(videoUrl)) {
        log("info", `Using comment cache for "${videoUrl}"`);
        return globals.commentCache.get(videoUrl).comments;
    }
    return null;
}

// 设置弹幕缓存
export function setCommentCache(videoUrl, comments) {
    globals.commentCache.set(videoUrl, {
        comments: comments,
        timestamp: Date.now()
    });

    log("info", `Cached comments for "${videoUrl}" (${comments.length} comments)`);
}

// 添加元素到 episodeIds：检查 url 是否存在，若不存在则以自增 id 添加
export function addEpisode(url, title) {
    // 说明：episodeIds 作为 “commentId -> {url,title}” 的索引会被多个 anime 复用。
    // 如果简单去重（返回同一个 episode 对象），在 LRU 淘汰 anime 时直接按 URL 删除，
    // 会导致其它仍在使用该 episode 的 anime 变成“悬空引用”，最终出现：
    //   - findUrlById 找不到
    //   - removeEpisodeByUrl 报 "No episode found..."
    // 因此这里为 episode 增加 refCount，并在删除时做引用计数。

    // 检查是否已存在相同的 url 和 title
    const existingEpisode = globals.episodeIds.find(
      (episode) => episode.url === url && episode.title === title
    );
    if (existingEpisode) {
      existingEpisode.refCount = (existingEpisode.refCount ?? 1) + 1;
      log(
        "info",
        `Episode already exists, refCount=${existingEpisode.refCount}, url=${url}`
      );
      return existingEpisode;
    }

    // 自增 episodeNum 并使用作为 id
    globals.episodeNum++;
    const newEpisode = {
      id: globals.episodeNum,
      url: url,
      title: title,
      refCount: 1,
    };

    // 添加新对象
    globals.episodeIds.push(newEpisode);

    log("info", `Added to episodeIds: ${JSON.stringify(newEpisode)}`);
    return newEpisode; // 返回新添加的对象
}

// 通过 ID 删除 episode（引用计数 -1，归零才真正移除）
export function removeEpisodeById(id) {
  const idx = globals.episodeIds.findIndex((episode) => episode.id === id);
  if (idx === -1) {
    // 这类情况通常是历史缓存/去重逻辑造成的，不应作为 error 污染日志
    log("warn", `No episode found in episodeIds with ID: ${id}`);
    return false;
  }

  const ep = globals.episodeIds[idx];
  ep.refCount = (ep.refCount ?? 1) - 1;
  if (ep.refCount <= 0) {
    globals.episodeIds.splice(idx, 1);
    log("info", `Removed episode from episodeIds (refCount reached 0): id=${id}, url=${ep.url}`);
  } else {
    globals.episodeIds[idx] = ep;
    log("info", `Decrement episode refCount: id=${id}, refCount=${ep.refCount}`);
  }
  return true;
}

// 删除指定 URL 的对象从 episodeIds（兼容旧逻辑；同 URL 可能有多个条目）
export function removeEpisodeByUrl(url) {
  const matches = globals.episodeIds.filter((episode) => episode.url === url);
  if (matches.length === 0) {
    log("warn", `No episode found in episodeIds with URL: ${url}`);
    return false;
  }
  // 对所有匹配项做 -1（通常只会有 1 个）
  for (const ep of matches) {
    removeEpisodeById(ep.id);
  }
  return true;
}

// 根据 ID 查找 URL
export function findUrlById(id) {
    const episode = globals.episodeIds.find(episode => episode.id === id);
    if (episode) {
        log("info", `Found URL for ID ${id}: ${episode.url}`);
        return episode.url;
    }
    log("error", `No URL found for ID: ${id}`);
    return null;
}

// 根据 ID 查找 TITLE
export function findTitleById(id) {
    const episode = globals.episodeIds.find(episode => episode.id === id);
    if (episode) {
        log("info", `Found TITLE for ID ${id}: ${episode.title}`);
        return episode.title;
    }
    log("error", `No TITLE found for ID: ${id}`);
    return null;
}

// 添加 anime 对象到 animes，并将其 links 添加到 episodeIds
export function addAnime(anime) {
    anime = Anime.fromJson(anime);
    try {
        // 确保 anime 有 links 属性且是数组
        if (!anime.links || !Array.isArray(anime.links)) {
            log("error", `Invalid or missing links in anime: ${JSON.stringify(anime)}`);
            return false;
        }

        // 遍历 links，调用 addEpisode，并收集返回的对象
        const newLinks = [];
        anime.links.forEach(link => {
            if (link.url) {
                const episode = addEpisode(link.url, link.title);
                if (episode) {
                    newLinks.push(episode); // 仅添加成功添加的 episode
                }
            } else {
                log("error", `Invalid link in anime, missing url: ${JSON.stringify(link)}`);
            }
        });

        // 创建新的 anime 副本
        const animeCopy = Anime.fromJson({ ...anime, links: newLinks });

        // 检查是否已存在相同 animeId 的 anime
        const existingAnimeIndex = globals.animes.findIndex(a => a.animeId === anime.animeId);

        if (existingAnimeIndex !== -1) {
            // 如果存在，先删除旧的
            globals.animes.splice(existingAnimeIndex, 1);
            log("info", `Removed old anime at index: ${existingAnimeIndex}`);
        }

        // 将新的添加到数组末尾（最新位置）
        globals.animes.push(animeCopy);
        log("info", `Added anime to latest position: ${anime.animeId}`);

        // 检查是否超过 MAX_ANIMES，超过则删除最早的
        if (globals.animes.length > globals.MAX_ANIMES) {
            const removeSuccess = removeEarliestAnime();
            if (!removeSuccess) {
                log("error", "Failed to remove earliest anime, but continuing");
            }
        }

        log("info", `animes: ${JSON.stringify(
          globals.animes,
          (key, value) => key === 'links' ? value.length : value
        )}`);

        return true;
    } catch (error) {
        log("error", `addAnime failed: ${error.message}`);
        return false;
    }
}

// 删除最早添加的 anime，并从 episodeIds 删除其 links 中的 url
export function removeEarliestAnime() {
    if (globals.animes.length === 0) {
        log("error", "No animes to remove.");
        return false;
    }

    // 移除最早的 anime（第一个元素）
    const removedAnime = globals.animes.shift();
    log("info", `Removed earliest anime: ${JSON.stringify(removedAnime)}`);

    // 从 episodeIds 删除该 anime 的所有 links 中的 url
    if (removedAnime.links && Array.isArray(removedAnime.links)) {
        removedAnime.links.forEach(link => {
            if (link?.id !== undefined && link?.id !== null) {
              removeEpisodeById(link.id);
              return;
            }
            if (link?.url) {
              // 兼容旧缓存结构
              removeEpisodeByUrl(link.url);
            }
        });
    }

    return true;
}

// 将所有动漫的 animeId 存入 lastSelectMap 的 animeIds 数组中
export function storeAnimeIdsToMap(curAnimes, key) {
    const uniqueAnimeIds = new Set();
    for (const anime of curAnimes) {
        uniqueAnimeIds.add(anime.animeId);
    }

    // 保存旧的prefer值
    const oldValue = globals.lastSelectMap.get(key);
    const oldPrefer = oldValue?.prefer;

    // 如果key已存在，先删除它（为了更新顺序，保证 FIFO）
    if (globals.lastSelectMap.has(key)) {
        globals.lastSelectMap.delete(key);
    }

    // 添加新记录，保留prefer字段
    globals.lastSelectMap.set(key, {
        animeIds: [...uniqueAnimeIds],
        ...(oldPrefer !== undefined && { prefer: oldPrefer })
    });

    // 检查是否超过 MAX_LAST_SELECT_MAP，超过则删除最早的
    if (globals.lastSelectMap.size > globals.MAX_LAST_SELECT_MAP) {
        const firstKey = globals.lastSelectMap.keys().next().value;
        globals.lastSelectMap.delete(firstKey);
        log("info", `Removed earliest entry from lastSelectMap: ${firstKey}`);
    }
}

// 根据给定的 commentId 查找对应的 animeId
export function findAnimeIdByCommentId(commentId) {
  for (const anime of globals.animes) {
    for (const link of anime.links) {
      if (link.id === commentId) {
        return [anime.animeId, anime.source];
      }
    }
  }
  return [null, null];
}

// 通过 animeId 查找 lastSelectMap 中 animeIds 包含该 animeId 的 key，并设置其 prefer 为 animeId
export function setPreferByAnimeId(animeId, source) {
  for (const [key, value] of globals.lastSelectMap.entries()) {
    if (value.animeIds && value.animeIds.includes(animeId)) {
      value.prefer = animeId;
      value.source = source;
      globals.lastSelectMap.set(key, value); // 确保更新被保存
      return key; // 返回被修改的 key
    }
  }
  return null; // 如果没有找到匹配的 key，返回 null
}

// 通过title查询优选animeId
export function getPreferAnimeId(title) {
  const value = globals.lastSelectMap.get(title);
  if (!value || !value.prefer) {
    return [null, null];
  }
  return [value.prefer, value.source];
}

// 清理所有过期的 IP 记录（超过 1 分钟没有请求的 IP）
export function cleanupExpiredIPs(currentTime) {
  const oneMinute = 60 * 1000;
  let cleanedCount = 0;

  for (const [ip, timestamps] of globals.requestHistory.entries()) {
    const validTimestamps = timestamps.filter(ts => currentTime - ts <= oneMinute);
    if (validTimestamps.length === 0) {
      globals.requestHistory.delete(ip);
      cleanedCount++;
      log("info", `[Rate Limit] Cleaned up expired IP record: ${ip}`);
    } else if (validTimestamps.length < timestamps.length) {
      globals.requestHistory.set(ip, validTimestamps);
    }
  }

  if (cleanedCount > 0) {
    log("info", `[Rate Limit] Cleanup completed: removed ${cleanedCount} expired IP records`);
  }
}

// 获取当前文件目录的兼容方式
export function getDirname() {
  if (typeof __dirname !== 'undefined') {
    // CommonJS 环境 (Vercel)
    return __dirname;
  }
  // ES Module 环境 (本地)
  // 假设 cache-util.js 在 danmu_api/utils/ 目录下
  return path.join(process.cwd(), 'danmu_api', 'utils');
}

// 从本地缓存目录读取缓存数据
export function readCacheFromFile(key) {
  const cacheFilePath = path.join(getDirname(), '..', '..', '.cache', `${key}`);
  if (fs.existsSync(cacheFilePath)) {
    const fileContent = fs.readFileSync(cacheFilePath, 'utf8');
    return JSON.parse(fileContent);
  }
  return null;
}

// 将缓存数据写入本地缓存文件
export function writeCacheToFile(key, value) {
  const cacheFilePath = path.join(getDirname(), '..', '..', '.cache', `${key}`);
  fs.writeFileSync(cacheFilePath, JSON.stringify(value), 'utf8');
}

// 从本地获取缓存
export async function getLocalCaches() {
  if (!globals.localCacheInitialized) {
    try {
      log("info", 'getLocalCaches start.');

      // 从本地缓存文件读取数据并恢复到 globals 中
      globals.animes = JSON.parse(readCacheFromFile('animes')) || globals.animes;
      globals.episodeIds = JSON.parse(readCacheFromFile('episodeIds')) || globals.episodeIds;
      globals.episodeNum = JSON.parse(readCacheFromFile('episodeNum')) || globals.episodeNum;

      // 兼容旧缓存结构：为 episodeIds 补全 refCount，并修正 episodeNum（保证新增 id 不冲突）
      if (Array.isArray(globals.episodeIds)) {
        let maxId = 0;
        globals.episodeIds = globals.episodeIds.map((ep) => {
          maxId = Math.max(maxId, Number(ep?.id || 0));
          return {
            ...ep,
            refCount: ep?.refCount ?? 1,
          };
        });
        globals.episodeNum = Math.max(Number(globals.episodeNum || 0), maxId);
      }

      // 恢复 lastSelectMap 并转换为 Map 对象
      const lastSelectMapData = readCacheFromFile('lastSelectMap');
      if (lastSelectMapData) {
        globals.lastSelectMap = new Map(Object.entries(JSON.parse(lastSelectMapData)));
        log("info", `Restored lastSelectMap from local cache with ${globals.lastSelectMap.size} entries`);
      }

      // 更新哈希值
      globals.lastHashes.animes = simpleHash(JSON.stringify(globals.animes));
      globals.lastHashes.episodeIds = simpleHash(JSON.stringify(globals.episodeIds));
      globals.lastHashes.episodeNum = simpleHash(JSON.stringify(globals.episodeNum));
      globals.lastHashes.lastSelectMap = simpleHash(JSON.stringify(Object.fromEntries(globals.lastSelectMap)));

      globals.localCacheInitialized = true;
      log("info", 'getLocalCaches completed successfully.');
    } catch (error) {
      log("error", `getLocalCaches failed: ${error.message}`, error.stack);
      globals.localCacheInitialized = true; // 标记为已初始化，避免重复尝试
    }
  }
}

// 更新本地缓存
export async function updateLocalCaches() {
  try {
    log("info", 'updateLocalCaches start.');
    const updates = [];

    // 检查每个变量的哈希值
    const variables = [
      { key: 'animes', value: globals.animes },
      { key: 'episodeIds', value: globals.episodeIds },
      { key: 'episodeNum', value: globals.episodeNum },
      { key: 'lastSelectMap', value: globals.lastSelectMap }
    ];

    for (const { key, value } of variables) {
      // 对于 lastSelectMap（Map 对象），需要转换为普通对象后再序列化
      const serializedValue = key === 'lastSelectMap' ? JSON.stringify(Object.fromEntries(value)) : JSON.stringify(value);
      const currentHash = simpleHash(serializedValue);
      if (currentHash !== globals.lastHashes[key]) {
        writeCacheToFile(key, serializedValue);
        updates.push({ key, hash: currentHash });
      }
    }

    // 输出更新日志
    if (updates.length > 0) {
      log("info", `Updated local caches for keys: ${updates.map(u => u.key).join(', ')}`);
      updates.forEach(({ key, hash }) => {
        globals.lastHashes[key] = hash; // 更新本地哈希
      });
    } else {
      log("info", 'No changes detected, skipping local cache update.');
    }

  } catch (error) {
    log("error", `updateLocalCaches failed: ${error.message}`, error.stack);
    log("error", `Error details - Name: ${error.name}, Cause: ${error.cause ? error.cause.message : 'N/A'}`);
  }
}

// 判断是否有效的本地缓存目录
export async function judgeLocalCacheValid(urlPath, deployPlatform) {
  if (deployPlatform === 'node') {
    try {
      fs = await import('fs');
      path = await import('path');

      if (!globals.localCacheValid && urlPath !== "/favicon.ico" && urlPath !== "/robots.txt") {
        const cacheDirPath = path.join(getDirname(), '..', '..', '.cache');

        if (fs.existsSync(cacheDirPath)) {
          globals.localCacheValid = true;
        } else {
          globals.localCacheValid = false;
        }
      }
    } catch (error) {
      console.warn('Node.js modules not available:', error.message);
      globals.localCacheValid = false;
    }
  }
}