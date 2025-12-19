import { globals } from "../configs/globals.js";
import { baseCssContent } from "./css/base.css.js";
import { componentsCssContent } from "./css/components.css.js";
import { formsCssContent } from "./css/forms.css.js";
import { responsiveCssContent } from "./css/responsive.css.js";
import { dynamicCssContent } from "./css/dynamic.css.js";
import { mainJsContent } from "./js/main.js";
import { previewJsContent } from "./js/preview.js";
import { logviewJsContent } from "./js/logview.js";
import { apitestJsContent } from "./js/apitest.js";
import { pushDanmuJsContent } from "./js/pushdanmu.js";
import { systemSettingsJsContent } from "./js/systemsettings.js";
import { modeBadgeCssContent } from "./css/mode-badge.css.js";
import { colorsCssContent } from "./css/colors.css.js";
// language=HTML
export const HTML_TEMPLATE = /* html */ `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#0A0F1E">
    <title>LogVar弹幕API - 现代化管理平台</title>
    <link rel="icon" type="image/jpg" href="https://i.mji.rip/2025/09/27/eedc7b701c0fa5c1f7c175b22f441ad9.jpeg">
    <style>${baseCssContent}</style>
    <style>${componentsCssContent}</style>
    <style>${formsCssContent}</style>
    <style>${responsiveCssContent}</style>
    <style>${dynamicCssContent}</style>
    <style>${modeBadgeCssContent}</style>
    <style>${colorsCssContent}</style>
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
                <div class="version-header">
                    <div class="version-icon">📦</div>
                    <div class="version-title">版本信息</div>
                </div>
                <div class="version-content">
                    <div class="version-item">
                        <span class="version-label">当前版本</span>
                        <span class="version-value" id="current-version">v${globals.version}</span>
                    </div>
                    <div class="version-item">
                        <span class="version-label">最新版本</span>
                        <span class="version-value version-latest" id="latest-version">检查中...</span>
                    </div>
                    <div class="version-update-notice" id="version-update-notice" style="display: none;">
                        <div class="update-icon">🎉</div>
                        <div class="update-text">
                            <div class="update-title">发现新版本</div>
                            <div class="update-desc" id="update-desc">有可用更新</div>
                        </div>
                        <button class="update-btn" onclick="showUpdateGuide()">查看</button>
                    </div>
                </div>
                <div class="api-endpoint-card" onclick="copyApiEndpoint()">
                    <span class="endpoint-label">API端点</span>
                    <span class="endpoint-value" id="api-endpoint">加载中...</span>
                    <span class="copy-hint">点击复制</span>
                </div>
            </div>
            <nav class="nav-menu">
                <a href="#preview" class="nav-item active" data-section="preview" onclick="switchSection('preview'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <span class="nav-text">配置预览</span>
                </a>
                <a href="#logs" class="nav-item" data-section="logs" onclick="switchSection('logs'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span class="nav-text">日志查看</span>
                </a>
                <a href="#api" class="nav-item" data-section="api" onclick="switchSection('api'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span class="nav-text">接口调试</span>
                </a>
                <a href="#push" class="nav-item" data-section="push" onclick="switchSection('push'); return false;">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    <span class="nav-text">推送弹幕</span>
                </a>
                <a href="#env" class="nav-item" data-section="env" id="env-nav-btn" onclick="switchSection('env'); return false;">
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
                <div class="mobile-header-left">
                    <button class="mobile-menu-btn" onclick="toggleSidebar()" aria-label="打开菜单">
                        <span class="menu-line"></span>
                        <span class="menu-line"></span>
                        <span class="menu-line"></span>
                    </button>
                    <div class="mobile-logo-wrapper">
                        <img src="https://i.mji.rip/2025/09/27/eedc7b701c0fa5c1f7c175b22f441ad9.jpeg" alt="Logo" class="mobile-logo-image">
                        <div class="mobile-title-group">
                            <h2 class="mobile-title" id="mobile-title">配置预览</h2>
                            <span class="mobile-subtitle" id="mobile-subtitle">Configuration</span>
                        </div>
                    </div>
                </div>
                <div class="mobile-header-right">
                    <button class="mobile-action-btn" onclick="toggleTheme()" title="切换主题">
                        <svg class="mobile-action-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                        <svg class="mobile-action-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </button>
                    <div class="mobile-status-indicator" id="mobile-status" title="系统运行正常">
                        <span class="status-dot status-running"></span>
                    </div>
                </div>
            </div>

            <!-- 配置预览 -->
            <section class="content-section active" id="preview-section">
                <div class="preview-hero-card">
                    <div class="preview-hero-content">
                        <div class="preview-hero-header">
                            <div class="preview-hero-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                    <path d="M9 12h6m-6 4h6"/>
                                </svg>
                            </div>
                            <div class="preview-hero-titles">
                                <h2 class="preview-hero-title">环境配置总览</h2>
                                <p class="preview-hero-subtitle">实时生效的系统环境变量配置</p>
                            </div>
                        </div>
                        <div class="preview-stats-grid" id="preview-stats-grid">
                            <div class="preview-stat-card stat-card-compact">
                                <div class="stat-icon-wrapper stat-icon-primary">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                                    </svg>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value" id="total-configs">-</div>
                                    <div class="stat-label">配置项</div>
                                </div>
                            </div>
                            <div class="preview-stat-card stat-card-compact">
                                <div class="stat-icon-wrapper stat-icon-success">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                                    </svg>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value" id="total-categories">-</div>
                                    <div class="stat-label">配置类别</div>
                                </div>
                            </div>
                            <div class="preview-stat-card stat-card-compact">
                                <div class="stat-icon-wrapper stat-icon-warning">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value" id="manual-configs">-</div>
                                    <div class="stat-label">已配置</div>
                                </div>
                            </div>
                            <div class="preview-stat-card stat-card-compact" id="system-status-card">
                                <div class="stat-icon-wrapper stat-icon-status" id="status-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                                    </svg>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value stat-value-status" id="system-status">检测中</div>
                                    <div class="stat-label">系统状态</div>
                                </div>
                            </div>
                            <div class="preview-stat-card stat-card-compact" id="mode-card">
                                <div class="stat-icon-wrapper stat-icon-mode" id="mode-icon-wrapper">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                </div>
                                <div class="stat-content">
                                    <div class="stat-value stat-value-text" id="current-mode">检测中...</div>
                                    <div class="stat-label">当前模式</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="preview-grid" id="preview-area"></div>
            </section>
            
            <!-- 日志查看 -->
            <section class="content-section" id="logs-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">日志查看</h2>
                        <p class="section-desc">实时监控系统运行日志，支持按类型筛选和自动刷新</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="refreshLogs()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2"/>
                            </svg>
                            刷新
                        </button>
                        <button class="btn btn-secondary" id="autoRefreshBtn" onclick="toggleAutoRefresh()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/>
                            </svg>
                            自动刷新
                        </button>
                        <button class="btn btn-success" onclick="exportLogs()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2"/>
                            </svg>
                            导出
                        </button>
                        <button class="btn btn-danger" onclick="clearLogs()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/>
                            </svg>
                            清空
                        </button>
                    </div>
                </div>
                
                <!-- 日志过滤器 -->
                <div class="log-filters">
                    <button class="log-filter-btn active" data-filter="all" onclick="setLogFilter('all')">
                        <span class="filter-icon">📊</span>
                        <span class="filter-text">全部</span>
                        <span class="filter-badge">0</span>
                    </button>
                    <button class="log-filter-btn" data-filter="error" onclick="setLogFilter('error')">
                        <span class="filter-icon">❌</span>
                        <span class="filter-text">错误</span>
                        <span class="filter-badge">0</span>
                    </button>
                    <button class="log-filter-btn" data-filter="warn" onclick="setLogFilter('warn')">
                        <span class="filter-icon">⚠️</span>
                        <span class="filter-text">警告</span>
                        <span class="filter-badge">0</span>
                    </button>
                    <button class="log-filter-btn" data-filter="info" onclick="setLogFilter('info')">
                        <span class="filter-icon">ℹ️</span>
                        <span class="filter-text">信息</span>
                        <span class="filter-badge">0</span>
                    </button>
                    <button class="log-filter-btn" data-filter="success" onclick="setLogFilter('success')">
                        <span class="filter-icon">✅</span>
                        <span class="filter-text">成功</span>
                        <span class="filter-badge">0</span>
                    </button>
                </div>
                
                <!-- 日志终端 -->
                <div class="log-terminal" id="log-container">
                    <div class="log-empty-state">
                        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2"/>
                        </svg>
                        <p class="empty-text">暂无日志</p>
                    </div>
                </div>
            </section>

            <!-- 接口调试 -->
            <section class="content-section" id="api-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">API 测试平台</h2>
                        <p class="section-desc">支持接口调试和弹幕测试，可视化展示弹幕数据</p>
                    </div>
                    <div class="api-mode-tabs">
                        <button class="api-mode-tab active" data-mode="api-test" onclick="switchApiMode('api-test')">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <span>接口调试</span>
                        </button>
                        <button class="api-mode-tab" data-mode="danmu-test" onclick="switchApiMode('danmu-test')">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                            </svg>
                            <span>弹幕测试</span>
                        </button>
                    </div>
                </div>

                <!-- 接口调试模式 -->
                <div class="api-test-container" id="api-test-mode">
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
                        <button class="btn btn-success btn-lg" onclick="testApi()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" stroke-width="2"/>
                            </svg>
                            <span>发送请求</span>
                        </button>
                    </div>

                    <div class="response-card" id="api-response-container" style="display: none;">
                        <h3 class="card-title">响应结果</h3>
                        <div class="response-content" id="api-response"></div>
                    </div>
                </div>

                <!-- 弹幕测试模式 -->
                <div class="danmu-test-container" id="danmu-test-mode" style="display: none;">
                    <div class="danmu-test-methods">
                        <div class="form-card danmu-method-card">
                            <div class="method-header">
                                <div class="method-icon-wrapper" style="background: var(--gradient-primary);">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <div class="method-info">
                                    <h3 class="method-title">🎯 自动匹配测试</h3>
                                    <p class="method-desc">通过文件名自动匹配弹幕</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">文件名</label>
                                <input type="text" class="form-input" id="auto-match-filename" 
                                       placeholder="例如: 生万物 S02E08 或 无忧渡.S01E01.2160p.WEB-DL.H265.DDP.5.1">
                                <small class="form-help">
                                    <span class="help-icon">💡</span>
                                    支持多种格式：季集格式、网盘命名、外语标题等
                                </small>
                            </div>
                            <button class="btn btn-primary btn-lg" onclick="autoMatchDanmu()">
                                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                <span>开始匹配</span>
                            </button>
                        </div>

                        <div class="form-card danmu-method-card">
                            <div class="method-header">
                                <div class="method-icon-wrapper" style="background: var(--gradient-success);">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="m21 21-4.35-4.35"/>
                                    </svg>
                                </div>
                                <div class="method-info">
                                    <h3 class="method-title">🔍 手动搜索测试</h3>
                                    <p class="method-desc">搜索动漫并选择集数</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">搜索关键词</label>
                                <input type="text" class="form-input" id="manual-search-keyword" 
                                       placeholder="例如: 生万物"
                                       onkeypress="if(event.key==='Enter') manualSearchDanmu()">
                                <small class="form-help">
                                    <span class="help-icon">💡</span>
                                    输入动漫名称进行精确搜索
                                </small>
                            </div>
                            <button class="btn btn-success btn-lg" onclick="manualSearchDanmu()">
                                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="m21 21-4.35-4.35"/>
                                </svg>
                                <span>开始搜索</span>
                            </button>
                        </div>
                    </div>

                    <!-- 搜索结果展示 -->
                    <div id="danmu-search-results" style="display: none;"></div>

                    <!-- 弹幕展示区域 -->
                    <div id="danmu-display-area" style="display: none;">
                        <!-- 弹幕信息卡片 -->
                        <div class="form-card danmu-info-card">
                            <div class="danmu-info-header">
                                <div class="danmu-title-section">
                                    <h3 class="danmu-title" id="danmu-title">弹幕数据</h3>
                                    <span class="danmu-subtitle" id="danmu-subtitle">加载中...</span>
                                </div>
                                <div class="danmu-actions">
                                    <button class="btn btn-primary" onclick="exportDanmu('json')">
                                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                        </svg>
                                        <span>导出 JSON</span>
                                    </button>
                                    <button class="btn btn-success" onclick="exportDanmu('xml')">
                                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                        </svg>
                                        <span>导出 XML</span>
                                    </button>
                                </div>
                            </div>

                            <!-- 统计信息 -->
                            <div class="danmu-stats-grid">
                                <div class="danmu-stat-item">
                                    <span class="stat-icon">💬</span>
                                    <div class="stat-content">
                                        <div class="stat-value" id="danmu-total-count">0</div>
                                        <div class="stat-label">弹幕总数</div>
                                    </div>
                                </div>
                                <div class="danmu-stat-item">
                                    <span class="stat-icon">⏱️</span>
                                    <div class="stat-content">
                                        <div class="stat-value" id="danmu-duration">0:00</div>
                                        <div class="stat-label">视频时长</div>
                                    </div>
                                </div>
                                <div class="danmu-stat-item">
                                    <span class="stat-icon">📊</span>
                                    <div class="stat-content">
                                        <div class="stat-value" id="danmu-density">0</div>
                                        <div class="stat-label">平均密度/分</div>
                                    </div>
                                </div>
                                <div class="danmu-stat-item">
                                    <span class="stat-icon">🔥</span>
                                    <div class="stat-content">
                                        <div class="stat-value" id="danmu-peak-time">--:--</div>
                                        <div class="stat-label">高能时刻</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 热力图 -->
                        <div class="form-card danmu-heatmap-card">
                            <h3 class="card-title">
                                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                </svg>
                                <span>弹幕热力图</span>
                            </h3>
                            <div class="heatmap-legend">
                                <span class="legend-label">弹幕密度：</span>
                                <div class="legend-gradient">
                                    <span class="legend-low">低</span>
                                    <div class="legend-bar"></div>
                                    <span class="legend-high">高</span>
                                </div>
                            </div>
                            <canvas id="danmu-heatmap-canvas"></canvas>
                        </div>

                        <!-- 弹幕列表 -->
                        <div class="form-card danmu-list-card">
                            <div class="danmu-list-header">
                                <h3 class="card-title">
                                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 6h16M4 12h16M4 18h7"/>
                                    </svg>
                                    <span>弹幕列表</span>
                                </h3>
                                <div class="danmu-list-filters">
                                    <button class="danmu-filter-btn active" data-type="all" onclick="filterDanmuList('all')">
                                        全部 (<span id="filter-all-count">0</span>)
                                    </button>
                                    <button class="danmu-filter-btn" data-type="scroll" onclick="filterDanmuList('scroll')">
                                        滚动 (<span id="filter-scroll-count">0</span>)
                                    </button>
                                    <button class="danmu-filter-btn" data-type="top" onclick="filterDanmuList('top')">
                                        顶部 (<span id="filter-top-count">0</span>)
                                    </button>
                                    <button class="danmu-filter-btn" data-type="bottom" onclick="filterDanmuList('bottom')">
                                        底部 (<span id="filter-bottom-count">0</span>)
                                    </button>
                                </div>
                            </div>
                            <div class="danmu-list-container" id="danmu-list-container">
                                <div class="danmu-list-empty">
                                    <span class="empty-icon">💬</span>
                                    <p>暂无弹幕数据</p>
                                </div>
                            </div>
                        </div>
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
                        
                        <!-- 快速预设 -->
                        <div class="push-presets-section">
                            <div class="presets-header">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2"/>
                                </svg>
                                <span>快速预设</span>
                            </div>
                            <div class="presets-grid">
                                <button class="btn btn-secondary preset-btn" onclick="applyPushPreset('okvideo')">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                                    </svg>
                                    OK影视
                                </button>
                                <button class="btn btn-secondary preset-btn" onclick="applyPushPreset('kodi')">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2" stroke="white" stroke-width="2" fill="none"/>
                                    </svg>
                                    Kodi
                                </button>
                                <button class="btn btn-secondary preset-btn" onclick="applyPushPreset('potplayer')">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                        <rect x="4" y="4" width="16" height="16" rx="2"/>
                                        <path d="M9 8l6 4-6 4V8z" fill="white"/>
                                    </svg>
                                    PotPlayer
                                </button>
                            </div>
                        </div>

                        <!-- 局域网扫描 -->
                        <div class="lan-scan-section">
                            <div class="lan-scan-header">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke-width="2"/>
                                </svg>
                                <span>局域网设备扫描</span>
                            </div>
                            <div class="lan-scan-controls">
                                <div class="lan-input-group">
                                    <input type="text" class="form-input lan-subnet-input" id="lanSubnet" value="192.168.1" placeholder="网段">
                                    <span class="lan-input-separator">:</span>
                                    <input type="number" class="form-input lan-port-input" id="lanPort" value="9978" placeholder="端口" min="1" max="65535">
                                    <button class="btn btn-primary lan-scan-btn" id="scanLanBtn" onclick="scanLanDevices()">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
                                            <circle cx="11" cy="11" r="8" stroke-width="2"/>
                                            <path d="m21 21-4.35-4.35" stroke-width="2"/>
                                        </svg>
                                        <span class="scan-btn-text">扫描</span>
                                    </button>
                                </div>
                            </div>
                            <div id="lanDevicesList" class="lan-devices-list"></div>
                        </div>
                        
                        <label class="form-label" style="margin-top: 20px;">搜索关键字</label>
                        <div class="input-group search-input-group">
                            <input type="text" class="form-input search-input" id="push-search-keyword" placeholder="请输入搜索关键字" onkeypress="if(event.key==='Enter') searchAnimeForPush()">
                            <button class="btn btn-primary search-btn" onclick="searchAnimeForPush()">
                                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8" stroke-width="2"/>
                                    <path d="m21 21-4.35-4.35" stroke-width="2"/>
                                </svg>
                                <span class="search-btn-text">搜索</span>
                            </button>
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
            <div class="modal-footer modal-footer-compact">
                <button class="btn btn-secondary btn-modal" onclick="hideClearCacheModal()">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>取消</span>
                </button>
                <button class="btn btn-primary btn-modal" onclick="confirmClearCache()">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7"/>
                    </svg>
                    <span>确认清理</span>
                </button>
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
            <div class="modal-footer modal-footer-compact">
                <button class="btn btn-secondary btn-modal" onclick="hideDeploySystemModal()">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>取消</span>
                </button>
                <button class="btn btn-success btn-modal" onclick="confirmDeploySystem()">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span>确认部署</span>
                </button>
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
                <div class="modal-footer modal-footer-compact">
                    <button type="button" class="btn btn-secondary btn-modal" onclick="closeModal()">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <span>取消</span>
                    </button>
                    <button type="submit" class="btn btn-success btn-modal">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>保存</span>
                    </button>
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
        <div class="footer-description">
            <p class="footer-text">一个人人都能部署的基于 js 的弹幕 API 服务器，支持爱优腾芒哔人韩巴弹幕直接获取，兼容弹弹play的搜索、详情查询和弹幕获取接口规范。</p>
            <p class="footer-text">本项目仅为个人爱好开发，代码开源。如有任何侵权行为，请联系本人删除。</p>
        </div>
        <div class="footer-links">
            <a href="https://t.me/ddjdd_bot" target="_blank" class="footer-link">
                <span class="footer-link-icon">💬</span>
                <span class="footer-link-text">TG机器人</span>
            </a>
            <a href="https://t.me/logvar_danmu_group" target="_blank" class="footer-link">
                <span class="footer-link-icon">👥</span>
                <span class="footer-link-text">TG群组</span>
            </a>
            <a href="https://t.me/logvar_danmu_channel" target="_blank" class="footer-link">
                <span class="footer-link-icon">📢</span>
                <span class="footer-link-text">TG频道</span>
            </a>
            <a href="https://github.com/huangxd-/danmu_api" target="_blank" class="footer-link">
                <span class="footer-link-icon">
                    <svg class="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </span>
                <span class="footer-link-text">GitHub</span>
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