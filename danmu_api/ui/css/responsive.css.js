// language=CSS
export const responsiveCssContent = /* css */ `
/* ========================================
   全局移动端约束
   ======================================== */
* {
    box-sizing: border-box;
}

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
        font-size: 1.75rem;
    }

    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
}

/* ========================================
   移动设备 (≤768px)
   ======================================== */
@media (max-width: 768px) {
    :root {
        --spacing-xl: 1rem;
        --spacing-2xl: 1.5rem;
        --border-radius: 12px;
        --border-radius-sm: 8px;
    }

    /* 防止内容超出屏幕 */
    body {
        overflow-x: hidden;
        max-width: 100vw;
    }

    body::before {
        animation-duration: 20s;
    }

    .main-content,
    .content-section {
        overflow-x: hidden;
        max-width: 100%;
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
        box-shadow: var(--shadow-md);
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
        padding: var(--spacing-lg);
        background: var(--bg-glass);
        backdrop-filter: blur(20px);
        border-radius: var(--border-radius);
        margin: var(--spacing-md);
        max-width: calc(100% - 2rem);
        box-shadow: var(--shadow);
        border: 1px solid var(--border-color);
    }

    .section-title {
        font-size: 1.5rem;
    }

    .section-desc {
        font-size: 0.8125rem;
    }

    .header-actions {
        width: 100%;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .header-actions .btn {
        width: 100%;
        justify-content: center;
    }

    /* 按钮调整 */
    .btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.8125rem;
    }

    .btn-lg {
        padding: 0.875rem 1.5rem;
        font-size: 0.875rem;
    }

    /* 分类标签 - 移动端优化 */
    .category-tabs {
        gap: var(--spacing-xs);
        padding: 0 var(--spacing-md);
        margin-bottom: var(--spacing-md);
        position: relative;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
    }

    .category-tabs::-webkit-scrollbar {
        display: none;
    }

    .category-tabs::after {
        content: '→';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: linear-gradient(to right, transparent, var(--bg-secondary) 50%);
        padding: 0.5rem 1rem 0.5rem 2rem;
        pointer-events: none;
        font-size: 1rem;
        color: var(--text-tertiary);
    }

    .tab-btn {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
        white-space: nowrap;
        flex-shrink: 0;
    }

    /* 环境变量网格 - 移动端优化 */
    .env-grid {
        padding: 0;
        gap: var(--spacing-sm);
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .env-item {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
        margin: 0 var(--spacing-md);
        width: auto;
        max-width: calc(100vw - 2rem);
    }

    .env-info {
        width: 100%;
        min-width: 0;
    }

    .env-key {
        font-size: 0.875rem;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-sm);
        max-width: 100%;
    }

    .env-key strong {
        word-break: break-word;
        max-width: 100%;
        display: inline-block;
    }

    .value-type-badge {
        font-size: 0.65rem;
        padding: 2px 6px;
        flex-shrink: 0;
    }

    .env-value {
        font-size: 0.75rem;
        padding: var(--spacing-xs);
        word-break: break-all;
        white-space: pre-wrap;
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .env-desc {
        font-size: 0.75rem;
        line-height: 1.4;
        word-break: break-word;
    }

    .env-actions {
        width: 100%;
        max-width: 100%;
        flex-direction: row;
        gap: var(--spacing-sm);
        display: flex;
    }

    .env-actions .btn {
        flex: 1;
        min-width: 0;
        padding: 0.625rem 0.5rem;
        font-size: 0.75rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .env-actions .btn-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
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

    /* 表单调整 */
    .form-card,
    .response-card {
        padding: var(--spacing-lg);
        margin: var(--spacing-md);
        border-radius: var(--border-radius-sm);
        max-width: calc(100vw - 2rem);
    }

    .card-title {
        font-size: 1rem;
        margin-bottom: var(--spacing-md);
    }

    /* 模态框 - 移动端优化 */
    .modal-overlay {
        padding: var(--spacing-sm);
        align-items: flex-start;
        padding-top: 10vh;
    }

    .modal-container {
        max-height: 85vh;
        width: calc(100% - 2rem);
        margin: 0 auto;
    }

    .modal-lg {
        max-width: 100%;
    }

    .modal-header {
        padding: var(--spacing-lg);
        position: sticky;
        top: 0;
        background: var(--bg-glass);
        backdrop-filter: blur(20px);
        z-index: 1;
        border-bottom: 1px solid var(--border-color);
    }

    .modal-title {
        font-size: 1.125rem;
        padding-right: var(--spacing-sm);
    }

    .modal-body {
        padding: var(--spacing-lg);
        max-height: calc(85vh - 160px);
        overflow-y: auto;
    }

    .modal-footer {
        padding: var(--spacing-lg);
        flex-direction: column-reverse;
        gap: var(--spacing-sm);
        position: sticky;
        bottom: 0;
        background: var(--bg-glass);
        backdrop-filter: blur(20px);
        border-top: 1px solid var(--border-color);
    }

    .modal-footer .btn {
        width: 100%;
    }

    /* 表单组件 - 移动端优化 */
    .form-group {
        margin-bottom: var(--spacing-md);
    }

    .form-label {
        font-size: 0.8125rem;
        margin-bottom: var(--spacing-xs);
    }

    .form-input,
    .form-select,
    .form-textarea {
        font-size: 0.875rem;
        padding: 0.75rem 1rem;
    }

    /* 数字选择器 - 移动端优化 */
    .number-picker {
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
    }

    .number-display {
        font-size: 2.5rem;
        order: 1;
    }

    .number-controls {
        flex-direction: row;
        order: 2;
        gap: var(--spacing-md);
    }

    .number-btn {
        width: 52px;
        height: 52px;
        font-size: 1.5rem;
    }

    .number-range {
        width: 100%;
        order: 3;
        margin-top: 0;
    }

    /* 标签选择器 - 移动端优化 */
    .tag-selector,
    .available-tags {
        gap: var(--spacing-xs);
        justify-content: flex-start;
    }

    .tag-option,
    .available-tag {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
        flex-shrink: 0;
    }

    /* 多选标签容器 - 移动端优化 */
    .multi-select-container {
        gap: var(--spacing-md);
    }

    .selected-tags {
        min-height: 100px;
        padding: var(--spacing-md);
    }

    .selected-tag {
        padding: 0.5rem 0.875rem;
        font-size: 0.8125rem;
    }

    .tag-text {
        font-size: 0.8125rem;
    }

    .remove-btn {
        width: 20px;
        height: 20px;
        font-size: 0.875rem;
    }

    /* 开关按钮 - 移动端优化 */
    .switch-container {
        padding: var(--spacing-md);
        background: var(--bg-secondary);
        border-radius: var(--border-radius-sm);
        width: 100%;
        justify-content: space-between;
    }

    .switch {
        width: 52px;
        height: 28px;
    }

    .switch-label {
        font-size: 0.875rem;
    }

    /* 动漫网格 */
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: var(--spacing-md);
        padding: 0 var(--spacing-md);
    }

    .anime-image {
        height: 180px;
    }

    .anime-title {
        font-size: 0.8125rem;
    }

    /* 剧集网格 */
    .episode-grid {
        padding: var(--spacing-md);
        gap: var(--spacing-xs);
    }

    .episode-item {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
    }

    .episode-title {
        white-space: normal;
        font-size: 0.8125rem;
    }

    .episode-number {
        font-size: 0.875rem;
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
        padding: var(--spacing-lg);
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

    /* 页脚 */
    .footer {
        padding: var(--spacing-xl) var(--spacing-md);
        margin: var(--spacing-md);
        border-radius: var(--border-radius-sm);
    }

    .footer-links {
        flex-direction: column;
        gap: var(--spacing-sm);
        align-items: center;
    }

    .footer-text {
        font-size: 0.8125rem;
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
        padding: var(--spacing-lg);
        max-width: calc(100vw - 2rem);
    }

    .preview-category-title {
        font-size: 1.125rem;
        margin-bottom: var(--spacing-md);
    }

    .preview-item {
        padding: var(--spacing-md);
        border-left-width: 3px;
    }

    .preview-key {
        font-size: 0.8125rem;
    }

    .preview-value {
        font-size: 0.75rem;
        padding: var(--spacing-sm);
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
        width: 42px;
        height: 42px;
    }

    .logo-text {
        font-size: 1.125rem;
    }

    /* 区块标题 */
    .section-title {
        font-size: 1.25rem;
    }

    .section-desc {
        font-size: 0.75rem;
    }

    /* 分类标签 */
    .tab-btn {
        padding: 0.5rem 0.875rem;
        font-size: 0.75rem;
        min-width: auto;
    }

    /* 环境变量项 - 超小屏幕优化 */
    .env-item {
        padding: var(--spacing-md);
        margin: 0 var(--spacing-sm);
        max-width: calc(100vw - 1rem);
    }

    .env-key {
        font-size: 0.8125rem;
    }

    .env-key strong {
        font-size: 0.8125rem;
        max-width: calc(100vw - 120px);
    }

    .value-type-badge {
        font-size: 0.625rem;
        padding: 2px 6px;
    }

    .env-value {
        font-size: 0.7rem;
        padding: var(--spacing-xs);
        max-width: calc(100vw - 48px);
    }

    .env-desc {
        font-size: 0.7rem;
    }

    /* 超小屏幕按钮改为垂直布局 */
    .env-actions {
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .env-actions .btn {
        width: 100%;
        padding: 0.625rem;
        font-size: 0.75rem;
        justify-content: center;
    }

    .env-actions .btn-icon {
        width: 14px;
        height: 14px;
        margin-right: 6px;
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
        gap: 6px;
    }

    .tag-option,
    .available-tag {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
    }

    .selected-tag {
        padding: 0.375rem 0.625rem;
        font-size: 0.75rem;
    }

    /* 按钮 */
    .btn {
        padding: 0.625rem 1rem;
        font-size: 0.75rem;
    }

    .btn-icon {
        width: 14px;
        height: 14px;
    }

    /* 版本信息 */
    .version-item {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
        padding: var(--spacing-xs) 0;
    }

    .version-label,
    .version-value {
        font-size: 0.75rem;
    }

    /* 加载遮罩 */
    .loading-content {
        padding: var(--spacing-xl);
        width: calc(100% - 2rem);
    }

    .loading-spinner {
        width: 52px;
        height: 52px;
        border-width: 3px;
    }

    .loading-title {
        font-size: 1rem;
    }

    .loading-desc {
        font-size: 0.8125rem;
    }

    /* 日志终端 */
    .log-terminal {
        font-size: 0.7rem;
        max-height: 300px;
        padding: var(--spacing-sm);
    }

    /* 模态框 */
    .modal-overlay {
        padding: 0;
        padding-top: 5vh;
    }

    .modal-container {
        max-height: 95vh;
        width: 100%;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
        padding: var(--spacing-md);
    }

    .modal-title {
        font-size: 1rem;
    }

    /* 数字选择器 */
    .number-display {
        font-size: 2rem;
    }

    .number-btn {
        width: 48px;
        height: 48px;
    }

    /* 表单元素 - 防止iOS自动缩放 */
    .form-input,
    .form-select,
    .form-textarea {
        font-size: 16px;
    }

    /* 卡片标题 */
    .card-title::before {
        width: 3px;
        height: 1.2rem;
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
        padding: 0.625rem;
    }

    .nav-text {
        font-size: 0.8125rem;
    }

    .version-card {
        margin: var(--spacing-sm);
        padding: var(--spacing-md);
    }

    .modal-overlay {
        padding-top: 2vh;
    }

    .modal-container {
        max-height: 96vh;
    }

    .modal-body {
        max-height: calc(96vh - 120px);
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
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    }

    .form-card,
    .response-card {
        padding: var(--spacing-2xl);
    }

    /* 更大的边距和圆角 */
    .preview-category,
    .env-item {
        padding: var(--spacing-2xl);
    }
}

/* ========================================
   超大屏幕优化 (≥1920px)
   ======================================== */
@media (min-width: 1920px) {
    .main-content {
        max-width: 1600px;
    }

    .section-title {
        font-size: 2.5rem;
    }

    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
}

/* ========================================
   触摸设备优化
   ======================================== */
@media (hover: none) and (pointer: coarse) {
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

    .btn:hover,
    .nav-item:hover,
    .tab-btn:hover,
    .tag-option:hover {
        transform: none;
    }

    .btn:active {
        transform: scale(0.97);
        opacity: 0.8;
    }

    .nav-item:active {
        opacity: 0.8;
    }

    /* 触摸反馈 */
    .btn:active::after,
    .nav-item:active::after,
    .tab-btn:active::after {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.1);
        animation: ripple 0.6s ease-out;
    }

    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
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
    .theme-toggle,
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
        box-shadow: none;
        border: 1px solid #000;
    }

    .preview-category,
    .env-item,
    .form-card {
        box-shadow: none;
        border: 1px solid #000;
    }
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

    body::before {
        animation: none !important;
    }
}

/* ========================================
   高对比度模式支持
   ======================================== */
@media (prefers-contrast: high) {
    :root {
        --border-color: #000;
        --shadow: none;
        --shadow-md: none;
        --shadow-lg: none;
    }

    [data-theme="dark"] {
        --border-color: #fff;
    }

    .btn,
    .nav-item,
    .form-input,
    .form-select,
    .form-textarea {
        border-width: 2px;
    }
}
`;