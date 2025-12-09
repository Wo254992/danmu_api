import { globals } from "../configs/globals.js";
import { baseCssContent } from "./css/base.css.js";
import { componentsCssContent } from "./css/components.css.js";
import { formsCssContent } from "./css/forms.css.js";
import { responsiveCssContent } from "./css/responsive.css.js";
import { mainJsContent } from "./js/main.js";
import { previewJsContent } from "./js/preview.js";
import { logviewJsContent } from "./js/logview.js";
import { apitestJsContent } from "./js/apitest.js";
import { pushDanmuJsContent } from "./js/pushdanmu.js";
import { systemSettingsJsContent } from "./js/systemsettings.js";

// language=HTML
export const HTML_TEMPLATE = /* html */ `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>LogVar弹幕API - 现代化管理平台</title>
    <link rel="icon" type="image/jpg" href="https://i.mji.rip/2025/09/27/eedc7b701c0fa5c1f7c175b22f441ad9.jpeg">
    <style>${baseCssContent}</style>
    <style>${componentsCssContent}</style>
    <style>${formsCssContent}</style>
    <style>${responsiveCssContent}</style>
</head>
<body>
    <!-- 顶部进度条 -->
    <div class="progress-bar-top" id="progress-bar-top"></div>

    <!-- 主容器 -->
    <div class="app-container">
        <!-- 侧边栏 -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="logo-wrapper">
                    <img src="https://i.mji.rip/2025/09/27/eedc7b701c0fa5c1f7c175b22f441ad9.jpeg" alt="Logo" class="logo-image">
                    <h1 class="logo-text">LogVar API</h1>
                </div>
                <button class="sidebar-toggle" id="sidebar-toggle" onclick="toggleSidebar()">
                    <span class="toggle-icon"></span>
                </button>
            </div>

            <div class="version-card">
                <div class="version-item">
                    <span class="version-label">当前版本</span>
                    <span class="version-value" id="current-version">v${globals.version}</span>
                </div>
                <div class="version-item">
                    <span class="version-label">最新版本</span>
                    <span class="version-value version-latest" id="latest-version">检查中...</span>
                </div>
                <div class="api-endpoint-card" onclick="copyApiEndpoint()">
                    <span class="endpoint-label">API端点</span>
                    <span class="endpoint-value" id="api-endpoint">加载中...</span>
                    <span class="copy-hint">点击复制</span>
                </div>
            </div>

            <nav class="nav-menu">
                <a href="#preview" class="nav-item active" data-section="preview" onclick="switchSection('preview')">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <span class="nav-text">配置预览</span>
                </a>
                <a href="#logs" class="nav-item" data-section="logs" onclick="switchSection('logs')">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span class="nav-text">日志查看</span>
                </a>
                <a href="#api" class="nav-item" data-section="api" onclick="switchSection('api')">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span class="nav-text">接口调试</span>
                </a>
                <a href="#push" class="nav-item" data-section="push" onclick="switchSection('push')">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    <span class="nav-text">推送弹幕</span>
                </a>
                <a href="#env" class="nav-item" data-section="env" id="env-nav-btn" onclick="switchSection('env')">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span class="nav-text">系统配置</span>
                </a>
            </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="main-content">
            <!-- 移动端顶栏 -->
            <div class="mobile-header">
                <button class="mobile-menu-btn" onclick="toggleSidebar()">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h2 class="mobile-title" id="mobile-title">配置预览</h2>
            </div>

            <!-- 配置预览 -->
            <section class="content-section active" id="preview-section">
                <div class="section-header">
                    <h2 class="section-title">配置预览</h2>
                    <p class="section-desc">当前生效的环境变量配置</p>
                </div>
                <div class="preview-grid" id="preview-area"></div>
            </section>

            <!-- 日志查看 -->
            <section class="content-section" id="logs-section">
                <div class="section-header">
                    <h2 class="section-title">日志查看</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="refreshLogs()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                            刷新
                        </button>
                        <button class="btn btn-danger" onclick="clearLogs()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            清空
                        </button>
                    </div>
                </div>
                <div class="log-terminal" id="log-container"></div>
            </section>

            <!-- 接口调试 -->
            <section class="content-section" id="api-section">
                <div class="section-header">
                    <h2 class="section-title">接口调试</h2>
                </div>
                <div class="api-test-container">
                    <div class="form-card">
                        <label class="form-label">选择接口</label>
                        <select class="form-select" id="api-select" onchange="loadApiParams()">
                            <option value="">请选择接口</option>
                            <option value="searchAnime">搜索动漫 - /api/v2/search/anime</option>
                            <option value="searchEpisodes">搜索剧集 - /api/v2/search/episodes</option>
                            <option value="matchAnime">匹配动漫 - /api/v2/match</option>
                            <option value="getBangumi">获取番剧详情 - /api/v2/bangumi/:animeId</option>
                            <option value="getComment">获取弹幕 - /api/v2/comment/:commentId</option>
                        </select>
                    </div>

                    <div class="form-card" id="api-params" style="display: none;">
                        <h3 class="card-title">接口参数</h3>
                        <div id="params-form"></div>
                        <button class="btn btn-success btn-lg" onclick="testApi()">发送请求</button>
                    </div>

                    <div class="response-card" id="api-response-container" style="display: none;">
                        <h3 class="card-title">响应结果</h3>
                        <div class="response-content" id="api-response"></div>
                    </div>
                </div>
            </section>

            <!-- 推送弹幕 -->
            <section class="content-section" id="push-section">
                <div class="section-header">
                    <h2 class="section-title">推送弹幕</h2>
                    <p class="section-desc">支持OK影视等播放器，两端需要在同一局域网或使用公网IP</p>
                </div>
                <div class="push-container">
                    <div class="form-card">
                        <label class="form-label">推送地址</label>
                        <input type="text" class="form-input" id="push-url" placeholder="http://127.0.0.1:9978/action?do=refresh&type=danmaku&path=">
                        
                        <label class="form-label" style="margin-top: 20px;">搜索关键字</label>
                        <div class="input-group">
                            <input type="text" class="form-input" id="push-search-keyword" placeholder="请输入搜索关键字">
                            <button class="btn btn-primary" onclick="searchAnimeForPush()">搜索</button>
                        </div>
                    </div>
                    <div id="push-anime-list" class="anime-grid" style="display: none;"></div>
                    <div id="push-episode-list" class="episode-grid" style="display: none;"></div>
                </div>
            </section>

            <!-- 系统配置 -->
            <section class="content-section" id="env-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">环境变量配置</h2>
                        <p class="section-desc">vercel/netlify/edgeone平台修改变量后需要重新部署</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-danger" onclick="showClearCacheModal()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            清理缓存
                        </button>
                        <button class="btn btn-success" onclick="showDeploySystemModal()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            重新部署
                        </button>
                    </div>
                </div>

                <div class="category-tabs">
                    <button class="tab-btn active" onclick="switchCategory('api')">🔗 API配置</button>
                    <button class="tab-btn" onclick="switchCategory('source')">📜 源配置</button>
                    <button class="tab-btn" onclick="switchCategory('match')">🔍 匹配配置</button>
                    <button class="tab-btn" onclick="switchCategory('danmu')">🔣 弹幕配置</button>
                    <button class="tab-btn" onclick="switchCategory('cache')">💾 缓存配置</button>
                    <button class="tab-btn" onclick="switchCategory('system')">⚙️ 系统配置</button>
                </div>

                <div class="env-grid" id="env-list"></div>
            </section>
        </main>
    </div>

    <!-- 模态框：清理缓存 -->
    <div class="modal-overlay" id="clear-cache-modal">
        <div class="modal-container">
            <div class="modal-header">
                <h3 class="modal-title">确认清理缓存</h3>
                <button class="modal-close" onclick="hideClearCacheModal()">×</button>
            </div>
            <div class="modal-body">
                <p class="modal-desc">确定要清理所有缓存吗？这将清除：</p>
                <ul class="modal-list">
                    <li>动漫搜索缓存 (animes)</li>
                    <li>剧集ID缓存 (episodeIds)</li>
                    <li>剧集编号缓存 (episodeNum)</li>
                    <li>最后选择映射缓存 (lastSelectMap)</li>
                    <li>搜索结果缓存</li>
                    <li>弹幕内容缓存</li>
                    <li>请求历史记录</li>
                </ul>
                <p class="modal-warning">清理后可能需要重新登录</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="confirmClearCache()">确认清理</button>
                <button class="btn btn-secondary" onclick="hideClearCacheModal()">取消</button>
            </div>
        </div>
    </div>

    <!-- 模态框：重新部署 -->
    <div class="modal-overlay" id="deploy-system-modal">
        <div class="modal-container">
            <div class="modal-header">
                <h3 class="modal-title">确认重新部署</h3>
                <button class="modal-close" onclick="hideDeploySystemModal()">×</button>
            </div>
            <div class="modal-body">
                <p class="modal-desc">确定要重新部署系统吗？</p>
                <div class="modal-alert">
                    <p><strong>部署过程中：</strong></p>
                    <ul class="modal-list">
                        <li>系统将短暂不可用</li>
                        <li>所有配置将重新加载</li>
                        <li>服务将自动重启</li>
                    </ul>
                    <p style="margin-top: 10px;">预计耗时：30-90秒</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" onclick="confirmDeploySystem()">确认部署</button>
                <button class="btn btn-secondary" onclick="hideDeploySystemModal()">取消</button>
            </div>
        </div>
    </div>

    <!-- 模态框：编辑环境变量 -->
    <div class="modal-overlay" id="env-modal">
        <div class="modal-container modal-lg">
            <div class="modal-header">
                <h3 class="modal-title" id="modal-title">编辑配置项</h3>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <form id="env-form">
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">变量类别</label>
                        <select class="form-select" id="env-category" disabled>
                            <option value="api">🔗 API配置</option>
                            <option value="source">📜 源配置</option>
                            <option value="match">🔍 匹配配置</option>
                            <option value="danmu">🔣 弹幕配置</option>
                            <option value="cache">💾 缓存配置</option>
                            <option value="system">⚙️ 系统配置</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">变量名</label>
                        <input type="text" class="form-input" id="env-key" placeholder="例如: DB_HOST" required readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">值类型</label>
                        <select class="form-select" id="value-type" onchange="renderValueInput()" disabled>
                            <option value="text">文本</option>
                            <option value="boolean">布尔值</option>
                            <option value="number">数字 (1-100)</option>
                            <option value="select">单选</option>
                            <option value="multi-select">多选 (可排序)</option>
                        </select>
                    </div>
                    <div class="form-group" id="value-input-container"></div>
                    <div class="form-group">
                        <label class="form-label">描述</label>
                        <textarea class="form-textarea" id="env-description" placeholder="配置项说明" readonly></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success">保存</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 加载遮罩 -->
    <div class="loading-overlay" id="loading-overlay">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h3 class="loading-title" id="loading-text">正在处理...</h3>
            <p class="loading-desc" id="loading-detail">请稍候</p>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p class="footer-text">一个人人都能部署的基于 js 的弹幕 API 服务器，支持爱优腾芒哔人韩巴弹幕直接获取，兼容弹弹play的搜索、详情查询和弹幕获取接口规范。</p>
        <p class="footer-text">本项目仅为个人爱好开发，代码开源。如有任何侵权行为，请联系本人删除。</p>
        <div class="footer-links">
            <a href="https://t.me/ddjdd_bot" target="_blank" class="footer-link">💬 TG MSG ROBOT</a>
            <a href="https://t.me/logvar_danmu_group" target="_blank" class="footer-link">👥 TG GROUP</a>
            <a href="https://t.me/logvar_danmu_channel" target="_blank" class="footer-link">📢 TG CHANNEL</a>
            <a href="https://github.com/huangxd-/danmu_api" target="_blank" class="footer-link">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Repo
            </a>
        </div>
        <p class="footer-note">有问题提issue或私信机器人都ok</p>
    </footer>

    <script>
        ${mainJsContent}
        ${previewJsContent}
        ${logviewJsContent}
        ${apitestJsContent}
        ${pushDanmuJsContent}
        ${systemSettingsJsContent}
    </script>
</body>
</html>
`;