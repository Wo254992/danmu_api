// language=CSS
export const responsiveCssContent = /* css */ `
/* ========================================
   响应式断点定义
   ======================================== */
/* 
   断点策略：
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px
   - Large Desktop: > 1440px
*/

/* ========================================
   移动端适配 (< 768px)
   ======================================== */
@media (max-width: 767px) {
    /* 全局防止溢出 */
    html, body {
        max-width: 100vw;
        overflow-x: hidden;
    }
    
    * {
        max-width: 100%;
    }
    
    .app-container,
    .main-content,
    .sidebar,
    .content-section {
        max-width: 100vw;
        overflow-x: hidden;
    }
    /* 主布局 */
    .main-content {
        margin-left: 0;
        padding: 0.75rem;
        max-width: 100vw;
        overflow-x: hidden;
    }

    /* 侧边栏 */
    .sidebar {
        transform: translateX(-100%);
    }

    .sidebar.active {
        transform: translateX(0);
        box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);
    }

    .sidebar-toggle {
        display: block;
    }

    /* 侧边栏遮罩 */
    .sidebar-overlay {
        animation: overlayFadeIn 0.3s ease-out;
    }

    /* 移动端头部 */
    .mobile-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.875rem 1rem;
        background: var(--bg-primary);
        backdrop-filter: var(--blur-md);
        border-radius: var(--radius-lg);
        margin-bottom: 1rem;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .mobile-menu-btn {
        display: flex;
        flex-direction: column;
        gap: 4px;
        background: none;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
    }

    .mobile-menu-btn span {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--text-primary);
        border-radius: 2px;
        transition: all var(--transition-fast);
    }

    .mobile-menu-btn:active span:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
    }

    .mobile-menu-btn:active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-btn:active span:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
    }

    .mobile-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
    }

    /* 区块标题 */
    .section-header {
        flex-direction: column;
        align-items: flex-start !important;
        gap: 1rem;
    }

    .section-title {
        font-size: 1.5rem;
    }

    .section-desc {
        font-size: 0.875rem;
    }

    .header-actions {
        width: 100%;
        flex-wrap: wrap;
    }

    .header-actions .btn {
        flex: 1;
        min-width: calc(50% - 0.375rem);
        justify-content: center;
    }

    /* 表单 */
    .form-card {
        padding: 1rem;
    }

    .input-group {
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
    }

    .input-group .btn {
        width: 100%;
        box-sizing: border-box;
    }
    
    .form-input,
    .form-select,
    .form-textarea {
        max-width: 100%;
        box-sizing: border-box;
    }

    /* 按钮 */
    .btn {
        padding: 0.625rem 1rem;
        font-size: 0.875rem;
    }

    .btn-sm {
        padding: 0.5rem 0.875rem;
        font-size: 0.8125rem;
    }

    .btn-lg {
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
    }

    /* 模态框 */
    .modal-container {
        margin: 1rem;
        max-height: calc(100vh - 2rem);
    }

    .modal-header {
        padding: 1rem;
    }

    .modal-body {
        padding: 1rem;
    }

    .modal-footer {
        padding: 1rem;
        flex-direction: column;
    }

    .modal-footer .btn {
        width: 100%;
    }

    /* 页脚 */
    .footer {
        padding: 1.5rem 1rem;
        margin-top: 3rem;
    }

    .footer-links {
        flex-direction: column;
        gap: 0.75rem;
    }

    .footer-link {
        justify-content: center;
    }

    /* 主题切换按钮 */
    .theme-toggle {
        bottom: 1rem;
        right: 1rem;
        width: 48px;
        height: 48px;
    }

    .theme-icon {
        width: 20px;
        height: 20px;
    }

    /* 版本卡片 */
    .version-card {
        margin: 0.75rem;
        padding: 0.875rem;
    }

    .version-item {
        font-size: 0.8125rem;
    }

    .version-update-notice {
        flex-direction: column;
        text-align: center;
    }

    .update-btn {
        width: 100%;
    }

    /* API端点卡片 */
    .endpoint-value {
        font-size: 0.75rem;
    }

    /* 多选标签 */
    .selected-tags,
    .available-tags {
        padding: 0.75rem;
    }

    .selected-tag,
    .available-tag,
    .tag-option {
        font-size: 0.8125rem;
        padding: 0.375rem 0.75rem;
    }

    /* 数字选择器 */
    .number-display {
        font-size: 1.5rem;
    }

    /* 颜色池 */
    .color-pool-controls {
        flex-direction: column;
    }

    .color-pool-controls .btn {
        width: 100%;
    }

    .color-input-wrapper {
        flex-direction: column;
        width: 100%;
    }

    .color-hex-input-wrapper {
        max-width: 100%;
    }

    .color-add-btn {
        width: 100%;
        justify-content: center;
    }

    .color-chip {
        width: 70px;
        height: 70px;
    }

    .pool-stats {
        flex-direction: column;
        align-items: flex-start;
    }

    /* 加载状态 */
    .loading-content {
        padding: 2rem;
        margin: 1rem;
    }

    .loading-spinner {
        width: 48px;
        height: 48px;
    }

    .loading-title {
        font-size: 1.125rem;
    }

    /* 卡片 */
    .card {
        padding: 1rem;
        max-width: 100%;
        box-sizing: border-box;
    }
    
    .form-card,
    .preview-hero-card,
    .preview-category,
    .env-item,
    .log-terminal {
        max-width: 100%;
        box-sizing: border-box;
    }

    /* 动漫搜索结果网格 - 移动端优化 */
    .anime-grid,
    .anime-grid-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
    }

    .anime-card {
        border-radius: var(--radius-md);
    }

    .anime-card-image-wrapper {
        padding-top: 140%;
    }

    .anime-info {
        padding: 0.5rem;
    }

    .anime-title {
        font-size: 0.75rem;
        -webkit-line-clamp: 1;
        margin-bottom: 0.25rem;
    }

    .anime-meta {
        gap: 0.25rem;
    }

    .episode-count {
        font-size: 0.6875rem;
    }

    .meta-icon {
        font-size: 0.75rem;
    }

    /* 成功动画 */
    .success-icon {
        font-size: 4rem;
    }

    .success-message {
        font-size: 1.25rem;
    }
}

/* ========================================
   小屏手机优化 (< 480px)
   ======================================== */
@media (max-width: 479px) {
    html {
        font-size: 14px;
    }

    .main-content {
        padding: 0.75rem;
    }

    .mobile-header {
        padding: 0.75rem;
        margin-bottom: 1rem;
    }

    .section-title {
        font-size: 1.25rem;
    }

    .btn {
        padding: 0.5rem 0.875rem;
        font-size: 0.8125rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
        padding: 0.625rem 0.875rem;
        font-size: 0.875rem;
    }

    .color-chip {
        width: 60px;
        height: 60px;
    }

    .number-btn {
        width: 28px;
        height: 28px;
    }

    .theme-toggle {
        width: 44px;
        height: 44px;
    }

    /* 动漫搜索结果 - 小屏优化 */
    .anime-grid,
    .anime-grid-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }

    .anime-info {
        padding: 0.375rem;
    }

    .anime-title {
        font-size: 0.6875rem;
    }

    .episode-count {
        font-size: 0.625rem;
    }
}

/* ========================================
   平板适配 (768px - 1024px)
   ======================================== */
@media (min-width: 768px) and (max-width: 1024px) {
    /* 隐藏移动端头部 */
    .mobile-header {
        display: none;
    }

    /* 主布局微调 */
    .main-content {
        padding: 1.5rem;
    }

    /* 侧边栏 */
    .sidebar {
        width: 260px;
    }

    .main-content {
        margin-left: 260px;
    }

    /* 按钮组 */
    .header-actions .btn {
        padding: 0.625rem 1rem;
        font-size: 0.875rem;
    }

    /* 网格布局 */
    .two-col-grid {
        grid-template-columns: 1fr;
    }

    .three-col-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    /* 表单 */
    .input-group .form-input {
        min-width: 200px;
    }

    /* 颜色池 */
    .color-chip {
        width: 75px;
        height: 75px;
    }

    /* 页脚 */
    .footer {
        padding: 1.75rem;
    }
}

/* ========================================
   桌面端适配 (> 1024px)
   ======================================== */
@media (min-width: 1025px) {
    /* 隐藏移动端头部 */
    .mobile-header {
        display: none;
    }

    /* 内容宽度限制 */
    .main-content {
        max-width: 1400px;
    }

    /* 悬浮效果增强 */
    .card:hover {
        transform: translateY(-4px);
    }

    /* 按钮悬浮效果 */
    .btn:hover:not(:disabled) {
        transform: translateY(-2px);
    }

    /* 标签悬浮效果 */
    .tag-option:hover {
        transform: translateY(-3px);
    }

    /* 颜色块悬浮效果 */
    .color-chip:hover {
        transform: scale(1.15);
    }
}

/* ========================================
   大屏幕优化 (> 1440px)
   ======================================== */
@media (min-width: 1441px) {
    html {
        font-size: 17px;
    }

    .sidebar {
        width: 300px;
    }

    .main-content {
        margin-left: 300px;
        padding: 2.5rem;
    }

    .section-title {
        font-size: 2rem;
    }

    /* 网格优化 */
    .four-col-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    /* 更大的卡片间距 */
    .card {
        padding: 2rem;
    }

    /* 页脚 */
    .footer {
        padding: 2.5rem;
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

    .tag-option,
    .available-tag,
    .selected-tag {
        min-height: 40px;
    }

    .number-btn {
        min-width: 44px;
        min-height: 44px;
    }

    /* 移除悬浮效果 */
    .card:hover {
        transform: none;
    }

    .btn:hover {
        transform: none;
    }

    /* 增强点击反馈 */
    .btn:active {
        transform: scale(0.97);
    }

    .nav-item:active {
        transform: scale(0.98);
    }

    .tag-option:active,
    .available-tag:active {
        transform: scale(0.95);
    }
}

/* ========================================
   打印样式
   ======================================== */
@media print {
    /* 隐藏不需要打印的元素 */
    .sidebar,
    .theme-toggle,
    .mobile-header,
    .header-actions,
    .btn,
    .nav-menu,
    .footer-links {
        display: none !important;
    }

    /* 重置布局 */
    .main-content {
        margin-left: 0;
        padding: 0;
    }

    /* 移除背景和边框 */
    body,
    .card,
    .form-card {
        background: white !important;
        box-shadow: none !important;
        border: none !important;
    }

    /* 确保文字清晰 */
    body {
        color: black !important;
    }

    /* 分页优化 */
    .card,
    .form-card {
        page-break-inside: avoid;
    }
}

/* ========================================
   横屏模式优化
   ======================================== */
@media (max-width: 767px) and (orientation: landscape) {
    /* 减小垂直间距 */
    .main-content {
        padding: 0.75rem;
    }

    .mobile-header {
        padding: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .section-header {
        margin-bottom: 1rem;
    }

    /* 紧凑按钮 */
    .btn {
        padding: 0.5rem 0.875rem;
    }

    /* 模态框高度优化 */
    .modal-container {
        max-height: 90vh;
    }

    /* 侧边栏宽度 */
    .sidebar {
        width: 260px;
    }
}

/* ========================================
   减少动画 (用户偏好)
   ======================================== */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }

    .loading-spinner {
        animation: none;
        border-top-color: var(--primary-color);
    }
}

/* ========================================
   高对比度模式
   ======================================== */
@media (prefers-contrast: high) {
    :root {
        --border-color: rgba(0, 0, 0, 0.3);
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
        --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
        --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    [data-theme="dark"] {
        --border-color: rgba(255, 255, 255, 0.3);
    }

    /* 增强边框 */
    .card,
    .form-input,
    .form-select,
    .btn,
    .sidebar {
        border-width: 2px;
    }

    /* 减少透明度 */
    .backdrop-blur {
        backdrop-filter: none;
    }
}

/* ========================================
   深色模式用户偏好
   ======================================== */
@media (prefers-color-scheme: dark) {
    /* 如果用户偏好深色，但未手动设置主题，则自动应用深色 */
    :root:not([data-theme]) {
        --bg-primary: rgba(15, 23, 42, 0.95);
        --bg-secondary: rgba(30, 41, 59, 0.9);
        --bg-tertiary: rgba(51, 65, 85, 0.85);
        --text-primary: #f1f5f9;
        --text-secondary: #cbd5e1;
        --text-tertiary: #94a3b8;
        --border-color: rgba(71, 85, 105, 0.6);
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
        --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
        --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
    }
}
`;