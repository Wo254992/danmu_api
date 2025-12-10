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
<html lang="zh-CN" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>LogVar API - 管理控制台</title>
    <link rel="icon" type="image/jpeg" href="https://i.mji.rip/2025/09/27/eedc7b701c0fa5c1f7c175b22f441ad9.jpeg">
    <style>${baseCssContent}</style>
    <style>${componentsCssContent}</style>
    <style>${formsCssContent}</style>
    <style>${responsiveCssContent}</style>
</head>
<body>
    <!-- 顶部进度条 -->
    <div class="progress-bar-top" id="progress-bar-top"></div>

    <div class="app-layout">
        <!-- 左侧侧边栏 -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="logo-area">
                    <img src="https://i.mji.rip/2025/09/27/eedc7b701c0fa5c1f7c175b22f441ad9.jpeg" alt="Logo" class="logo-img">
                    <div class="logo-text">
                        <h1>LogVar API</h1>
                        <span class="version-tag">v${globals.version}</span>
                    </div>
                </div>
            </div>

            <nav class="sidebar-nav">
                <div class="nav-label">功能菜单</div>
                <a href="#preview" class="nav-item active" onclick="switchSection('preview'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>
                    <span>配置概览</span>
                </a>
                <a href="#logs" class="nav-item" onclick="switchSection('logs'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <span>系统日志</span>
                </a>
                <a href="#api" class="nav-item" onclick="switchSection('api'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    <span>接口调试</span>
                </a>
                <a href="#push" class="nav-item" onclick="switchSection('push'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    <span>弹幕推送</span>
                </a>
                
                <div class="nav-label">设置</div>
                <a href="#env" class="nav-item" onclick="switchSection('env'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    <span>环境配置</span>
                </a>
            </nav>

            <div class="sidebar-footer">
                <button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()" title="切换深色模式">
                    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
            </div>
        </aside>

        <!-- 主内容区 -->
        <main class="main-content">
            <!-- 移动端顶部栏 -->
            <header class="mobile-header">
                <button class="menu-btn" onclick="toggleSidebar()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
                <h2 id="mobile-page-title">配置概览</h2>
            </header>

            <!-- 1. 配置预览 -->
            <section id="preview-section" class="content-section active">
                <div class="section-header">
                    <div>
                        <h2 class="page-title">概览</h2>
                        <p class="page-desc">当前生效的环境变量及系统状态。</p>
                    </div>
                </div>
                <div id="preview-area" class="preview-grid">
                    <!-- JS 渲染内容 -->
                </div>
            </section>

            <!-- 2. 日志查看 -->
            <section id="logs-section" class="content-section">
                <div class="section-header">
                    <div>
                        <h2 class="page-title">实时日志</h2>
                        <p class="page-desc">查看系统的运行日志与错误信息。</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-secondary btn-sm" onclick="refreshLogs()">刷新</button>
                        <button class="btn btn-danger btn-sm" onclick="clearLogs()">清空</button>
                    </div>
                </div>
                <div class="log-terminal" id="log-container">
                    <div class="log-placeholder">正在获取日志...</div>
                </div>
            </section>

            <!-- 3. 接口调试 -->
            <section id="api-section" class="content-section">
                <div class="section-header">
                    <div>
                        <h2 class="page-title">API 调试</h2>
                        <p class="page-desc">直接在页面上测试后端接口。</p>
                    </div>
                </div>
                <div class="card">
                    <div class="form-group">
                        <label class="form-label">选择接口</label>
                        <select class="form-select" id="api-select" onchange="loadApiParams()">
                            <option value="">请选择要调试的接口...</option>
                            <option value="searchAnime">搜索动漫 (Search Anime)</option>
                            <option value="searchEpisodes">搜索剧集 (Search Episodes)</option>
                            <option value="matchAnime">匹配文件名 (Match Anime)</option>
                            <option value="getBangumi">获取番剧详情 (Get Bangumi)</option>
                            <option value="getComment">获取弹幕 (Get Comment)</option>
                        </select>
                    </div>
                    
                    <div id="api-params" style="display: none; margin-top: 20px;">
                        <h4 class="sub-title">请求参数</h4>
                        <div id="params-form" class="params-grid"></div>
                        <div class="form-actions">
                            <button class="btn btn-primary" onclick="testApi()">发送请求</button>
                        </div>
                    </div>
                </div>

                <div class="card result-card" id="api-response-container" style="display: none;">
                    <h4 class="sub-title">响应结果</h4>
                    <div class="code-block" id="api-response"></div>
                </div>
            </section>

            <!-- 4. 推送弹幕 -->
            <section id="push-section" class="content-section">
                <div class="section-header">
                    <div>
                        <h2 class="page-title">弹幕推送</h2>
                        <p class="page-desc">搜索并推送弹幕到本地播放器（如 kodi/dplayer 等）。</p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="form-group">
                        <label class="form-label">播放器接口地址</label>
                        <input type="text" class="form-input" id="push-url" placeholder="http://192.168.x.x:port/jsonrpc...">
                        <small class="form-help">确保两端在同一局域网。</small>
                    </div>
                    
                    <div class="search-bar">
                        <input type="text" class="form-input" id="push-search-keyword" placeholder="输入动漫名称搜索...">
                        <button class="btn btn-primary" onclick="searchAnimeForPush()">搜索</button>
                    </div>
                </div>

                <div id="push-anime-list" class="anime-cards-grid"></div>
                <div id="push-episode-list" class="episode-list-container" style="display:none;"></div>
            </section>

            <!-- 5. 环境配置 (CRUD) -->
            <section id="env-section" class="content-section">
                <div class="section-header">
                    <div>
                        <h2 class="page-title">环境配置</h2>
                        <p class="page-desc">管理系统的 API Key、源站地址等配置。</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-warning btn-sm" onclick="showClearCacheModal()">清理缓存</button>
                        <button class="btn btn-primary btn-sm" onclick="showDeploySystemModal()">重启/部署</button>
                    </div>
                </div>

                <!-- 分类 Tabs -->
                <div class="tabs-nav">
                    <button class="tab-btn active" onclick="switchCategory('api')">API配置</button>
                    <button class="tab-btn" onclick="switchCategory('source')">源站配置</button>
                    <button class="tab-btn" onclick="switchCategory('match')">匹配规则</button>
                    <button class="tab-btn" onclick="switchCategory('danmu')">弹幕设置</button>
                    <button class="tab-btn" onclick="switchCategory('cache')">缓存系统</button>
                    <button class="tab-btn" onclick="switchCategory('system')">系统核心</button>
                </div>

                <div class="env-list-container" id="env-list">
                    <!-- JS 渲染列表 -->
                </div>
            </section>

            <footer class="main-footer">
                <p>LogVar API Project | <a href="https://github.com/huangxd-/danmu_api" target="_blank">GitHub</a></p>
                <div class="api-endpoint-display" onclick="copyApiEndpoint()">
                     API Endpoint: <span id="api-endpoint">Loading...</span> (点击复制)
                </div>
            </footer>
        </main>
    </div>

    <!-- 弹窗：编辑环境变量 -->
    <div class="modal-backdrop" id="env-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 id="modal-title">编辑配置</h3>
                <button class="close-btn" onclick="closeModal()">×</button>
            </div>
            <form id="env-form">
                <div class="modal-body">
                    <!-- 隐藏字段用于逻辑 -->
                    <input type="hidden" id="env-category">
                    
                    <div class="form-group">
                        <label class="form-label">变量名 (Key)</label>
                        <input type="text" class="form-input" id="env-key" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">类型</label>
                        <select class="form-select" id="value-type" onchange="renderValueInput()" disabled>
                            <option value="text">文本 (Text)</option>
                            <option value="boolean">开关 (Boolean)</option>
                            <option value="number">数字 (Number)</option>
                            <option value="select">单选 (Select)</option>
                            <option value="multi-select">多选 (Multi)</option>
                        </select>
                    </div>

                    <!-- 动态值输入区域 -->
                    <div id="value-input-container" class="form-group"></div>

                    <div class="form-group">
                        <label class="form-label">描述</label>
                        <textarea class="form-textarea" id="env-description" rows="2" readonly></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-text" onclick="closeModal()">取消</button>
                    <button type="submit" class="btn btn-primary">保存修改</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 弹窗：清理缓存确认 -->
    <div class="modal-backdrop" id="clear-cache-modal">
        <div class="modal modal-sm">
            <div class="modal-header">
                <h3>确认清理缓存</h3>
                <button class="close-btn" onclick="hideClearCacheModal()">×</button>
            </div>
            <div class="modal-body">
                <p>确定要清理所有系统缓存吗？</p>
                <ul style="font-size:0.9em; color:var(--text-secondary); padding-left:20px; margin-top:10px;">
                    <li>搜索结果缓存</li>
                    <li>剧集映射关系</li>
                    <li>弹幕临时数据</li>
                </ul>
            </div>
            <div class="modal-footer">
                <button class="btn btn-text" onclick="hideClearCacheModal()">取消</button>
                <button class="btn btn-danger" onclick="confirmClearCache()">确认清理</button>
            </div>
        </div>
    </div>

    <!-- 弹窗：部署确认 -->
    <div class="modal-backdrop" id="deploy-system-modal">
        <div class="modal modal-sm">
            <div class="modal-header">
                <h3>重启/部署系统</h3>
                <button class="close-btn" onclick="hideDeploySystemModal()">×</button>
            </div>
            <div class="modal-body">
                <p>确定要触发重新部署吗？服务将短暂不可用。</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-text" onclick="hideDeploySystemModal()">取消</button>
                <button class="btn btn-primary" onclick="confirmDeploySystem()">确认部署</button>
            </div>
        </div>
    </div>

    <!-- 全局 Loading 遮罩 -->
    <div class="loading-overlay" id="loading-overlay">
        <div class="spinner"></div>
        <h3 id="loading-text">处理中...</h3>
        <p id="loading-detail"></p>
    </div>

    <!-- 自定义 Alert/Confirm 容器 -->
    <div id="custom-alert-container"></div>

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
