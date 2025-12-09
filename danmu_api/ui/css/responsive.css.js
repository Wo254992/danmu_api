// language=CSS
export const responsiveCssContent = /* css */ `
/* ========================================
   平板设备 (≤1024px)
   ======================================== */
@media (max-width: 1024px) {
    :root {
        --sidebar-width: 260px;
    }

    .main-content {
        padding: var(--spacing-xl);
    }

    .section-title {
        font-size: 1.5rem;
    }

    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
}

/* ========================================
   移动设备 (≤768px)
   ======================================== */
@media (max-width: 768px) {
    :root {
        --spacing-xl: 1rem;
        --spacing-2xl: 1.5rem;
    }

    /* 侧边栏移动端处理 */
    .sidebar {
        transform: translateX(-100%);
        box-shadow: none;
        z-index: 2000;
    }

    .sidebar.active {
        transform: translateX(0);
        box-shadow: var(--shadow-xl);
    }

    .sidebar-toggle {
        display: flex;
    }

    /* 主内容区 */
    .main-content {
        margin-left: 0;
        padding: 0;
        background: var(--bg-secondary);
    }

    /* 显示移动端顶栏 */
    .mobile-header {
        display: flex;
        margin: 0;
        border-radius: 0;
        position: sticky;
        top: 0;
        z-index: 100;
    }

    /* 内容区块 */
    .content-section {
        padding: var(--spacing-md);
    }

    .content-section.active {
        display: block;
    }

    /* 区块头部 */
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: var(--spacing-lg);
        padding: var(--spacing-md);
        background: var(--bg-primary);
        border-radius: var(--border-radius);
        margin: var(--spacing-md);
    }

    .section-title {
        font-size: 1.25rem;
    }

    .section-desc {
        font-size: 0.8125rem;
    }

    .header-actions {
        width: 100%;
    }

    .header-actions .btn {
        flex: 1;
    }

    /* 按钮调整 */
    .btn {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
    }

    .btn-lg {
        padding: 0.75rem 1.25rem;
        font-size: 0.875rem;
    }

    /* 分类标签 */
    .category-tabs {
        gap: var(--spacing-xs);
        padding: 0 var(--spacing-md);
        margin-bottom: var(--spacing-md);
    }

    .tab-btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
        white-space: nowrap;
    }

    /* 环境变量网格 */
    .env-grid {
        padding: 0 var(--spacing-md);
        gap: var(--spacing-sm);
    }

    /* 导航菜单调整 */
    .nav-menu {
        padding: var(--spacing-md);
    }

    .nav-item {
        padding: 0.75rem;
    }

    .nav-text {
        font-size: 0.875rem;
    }

    /* 环境变量项 */
    .env-item {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
    }

    .env-key {
        font-size: 0.875rem;
    }

    .env-value {
        font-size: 0.75rem;
        padding: var(--spacing-xs);
    }

    .env-desc {
        font-size: 0.75rem;
    }

    .env-actions {
        width: 100%;
        flex-direction: row;
        gap: var(--spacing-sm);
    }

    .env-actions .btn {
        flex: 1;
    }

    /* 表单调整 */
    .form-card,
    .response-card {
        padding: var(--spacing-md);
        margin: var(--spacing-md);
        border-radius: var(--border-radius-sm);
    }

    .card-title {
        font-size: 0.9375rem;
        margin-bottom: var(--spacing-md);
    }

    /* 模态框 */
    .modal-overlay {
        padding: var(--spacing-sm);
    }

    .modal-container {
        max-height: 95vh;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
        padding: var(--spacing-lg);
    }

    .modal-title {
        font-size: 1.125rem;
    }

    .modal-footer {
        flex-direction: column-reverse;
    }

    .modal-footer .btn {
        width: 100%;
    }

    /* 动漫网格 */
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: var(--spacing-md);
    }

    .anime-title {
        font-size: 0.8125rem;
    }

    /* 剧集网格 */
    .episode-grid {
        padding: var(--spacing-sm);
    }

    .episode-item {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-sm);
    }

    .episode-title {
        white-space: normal;
    }

    /* 日志终端 */
    .log-terminal {
        font-size: 0.75rem;
        padding: var(--spacing-md);
        max-height: 400px;
    }

    /* API 响应 */
    .response-content {
        font-size: 0.75rem;
        padding: var(--spacing-md);
        max-height: 300px;
    }

    /* 版本卡片 */
    .version-card {
        margin: var(--spacing-md);
        padding: var(--spacing-md);
    }

    .version-label,
    .version-value {
        font-size: 0.8125rem;
    }

    .endpoint-value {
        font-size: 0.8125rem;
        word-break: break-all;
    }

    /* 表单行 */
    .form-row {
        grid-template-columns: 1fr;
    }

    .form-inline {
        flex-direction: column;
        align-items: stretch;
    }

    .form-inline .btn {
        width: 100%;
    }

    /* 输入组 */
    .input-group {
        flex-direction: column;
    }

    .input-group .btn {
        width: 100%;
    }

    /* 数字选择器 */
    .number-picker {
        flex-wrap: wrap;
        justify-content: center;
    }

    .number-display {
        font-size: 2rem;
    }

    /* 页脚 */
    .footer {
        padding: var(--spacing-lg) var(--spacing-md);
        margin: var(--spacing-md);
        border-radius: var(--border-radius-sm);
    }

    .footer-links {
        flex-direction: column;
        gap: var(--spacing-sm);
        align-items: center;
    }

    .footer-text {
        font-size: 0.75rem;
        line-height: 1.5;
    }

    .footer-link {
        font-size: 0.8125rem;
    }

    .footer-note {
        font-size: 0.75rem;
    }

    /* 预览网格移动端优化 */
    .preview-grid {
        padding: 0;
        gap: var(--spacing-sm);
    }

    .preview-category {
        margin: var(--spacing-md);
        padding: var(--spacing-md);
    }

    .preview-category-title {
        font-size: 0.9375rem;
        margin-bottom: var(--spacing-sm);
    }

    .preview-item {
        padding: var(--spacing-sm);
        border-left-width: 2px;
    }

    .preview-key {
        font-size: 0.8125rem;
    }

    .preview-value {
        font-size: 0.75rem;
        padding: 6px;
        line-height: 1.3;
    }

    .preview-desc {
        font-size: 0.7rem;
    }
}

/* ========================================
   小型移动设备 (≤480px)
   ======================================== */
@media (max-width: 480px) {
    /* Logo调整 */
    .logo-image {
        width: 40px;
        height: 40px;
    }

    .logo-text {
        font-size: 1.125rem;
    }

    /* 区块标题 */
    .section-title {
        font-size: 1.25rem;
    }

    /* 动漫网格 */
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: var(--spacing-sm);
    }

    .anime-image {
        height: 150px;
    }

    .anime-info {
        padding: var(--spacing-sm);
    }

    .anime-title {
        font-size: 0.75rem;
    }

    .anime-count {
        font-size: 0.7rem;
    }

    /* 标签选择器 */
    .tag-selector,
    .available-tags {
        gap: var(--spacing-xs);
    }

    .tag-option,
    .available-tag {
        padding: 0.5rem 1rem;
        font-size: 0.8125rem;
    }

    .selected-tag {
        padding: 0.375rem 0.625rem;
        font-size: 0.8125rem;
    }

    /* 分类标签 */
    .tab-btn {
        padding: 0.5rem 0.875rem;
        font-size: 0.75rem;
    }

    /* 按钮 */
    .btn {
        padding: 0.5rem 0.875rem;
        font-size: 0.75rem;
    }

    .btn-icon {
        width: 16px;
        height: 16px;
    }

    /* 版本信息 */
    .version-item {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
    }

    /* 加载遮罩 */
    .loading-content {
        padding: var(--spacing-xl);
    }

    .loading-spinner {
        width: 48px;
        height: 48px;
    }

    .loading-title {
        font-size: 1rem;
    }

    /* 日志终端 */
    .log-terminal {
        font-size: 0.7rem;
        max-height: 300px;
    }

    /* 环境变量值 */
    .env-value {
        font-size: 0.8125rem;
    }

    .env-desc {
        font-size: 0.75rem;
    }
}

/* ========================================
   横屏模式优化
   ======================================== */
@media (max-width: 768px) and (orientation: landscape) {
    .sidebar {
        width: 220px;
    }

    .sidebar.active {
        width: 220px;
    }

    .logo-text {
        font-size: 1rem;
    }

    .nav-menu {
        padding: var(--spacing-sm);
    }

    .nav-item {
        padding: 0.5rem;
    }

    .nav-text {
        font-size: 0.8125rem;
    }

    .version-card {
        margin: var(--spacing-sm);
        padding: var(--spacing-sm);
    }
}

/* ========================================
   大屏幕优化 (≥1440px)
   ======================================== */
@media (min-width: 1440px) {
    .main-content {
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
        padding-left: calc(var(--sidebar-width) + var(--spacing-2xl));
    }

    .section-title {
        font-size: 2.25rem;
    }

    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .form-card,
    .response-card {
        padding: var(--spacing-2xl);
    }
}

/* ========================================
   打印样式
   ======================================== */
@media print {
    .sidebar,
    .mobile-header,
    .header-actions,
    .nav-menu,
    .btn,
    .modal-overlay,
    .loading-overlay,
    .footer {
        display: none !important;
    }

    .main-content {
        margin-left: 0;
        padding: 0;
    }

    .content-section {
        display: block !important;
        page-break-after: always;
    }

    .section-header {
        margin-bottom: var(--spacing-md);
    }
}

/* ========================================
   暗色模式支持 (可选)
   ======================================== */
@media (prefers-color-scheme: dark) {
    /* 可根据需要启用暗色模式 */
    /*
    :root {
        --bg-primary: #1e1e1e;
        --bg-secondary: #2d2d2d;
        --bg-tertiary: #3d3d3d;
        --text-primary: #e0e0e0;
        --text-secondary: #b0b0b0;
        --text-tertiary: #808080;
        --border-color: #404040;
    }
    */
}

/* ========================================
   减少动画 (尊重用户偏好)
   ======================================== */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* ========================================
   触摸设备优化
   ======================================== */
@media (hover: none) and (pointer: coarse) {
    /* 增大可点击区域 */
    .btn {
        min-height: 44px;
    }

    .nav-item {
        min-height: 48px;
    }

    .tab-btn {
        min-height: 44px;
    }

    .tag-option,
    .available-tag {
        min-height: 40px;
    }

    /* 移除悬停效果 */
    .btn:hover,
    .nav-item:hover,
    .tab-btn:hover,
    .tag-option:hover {
        transform: none;
    }

    /* 增强点击反馈 */
    .btn:active {
        transform: scale(0.97);
        opacity: 0.8;
    }

    .nav-item:active {
        opacity: 0.8;
    }
}

/* ========================================
   侧边栏折叠状态 (桌面端)
   ======================================== */
@media (min-width: 769px) {
    .sidebar.collapsed {
        width: var(--sidebar-collapsed-width);
    }

    .sidebar.collapsed .logo-text,
    .sidebar.collapsed .nav-text,
    .sidebar.collapsed .version-card {
        display: none;
    }

    .sidebar.collapsed .logo-wrapper {
        justify-content: center;
    }

    .sidebar.collapsed .nav-item {
        justify-content: center;
    }

    .sidebar.collapsed .nav-item::before {
        display: none;
    }

    .main-content.sidebar-collapsed {
        margin-left: var(--sidebar-collapsed-width);
    }
}
`;