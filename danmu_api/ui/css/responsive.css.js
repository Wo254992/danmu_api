// language=CSS
export const responsiveCssContent = /* css */ `
/* ========================================
   响应式布局样式
   适配平板、手机等不同屏幕尺寸
   ======================================== */

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

    .preview-grid {
        grid-template-columns: 1fr;
    }
}

/* ========================================
   移动设备 (≤768px) - 全面优化
   ======================================== */
@media (max-width: 768px) {
    :root {
        --spacing-xl: 1rem;
        --spacing-2xl: 1.5rem;
    }

    /* ===== 侧边栏移动端处理 ===== */
    .sidebar {
        transform: translateX(-100%);
        box-shadow: none;
        z-index: 2000;
        transition: transform var(--transition-base);
    }

    .sidebar.active {
        transform: translateX(0);
        box-shadow: var(--shadow-xl);
    }

    .sidebar-toggle {
        display: flex;
    }

    /* ===== 主内容区 ===== */
    .main-content {
        margin-left: 0;
        padding: 0;
        background: var(--bg-secondary);
    }

    /* ===== 移动端顶栏 ===== */
    .mobile-header {
        display: flex;
        margin: 0;
        border-radius: 0;
        position: sticky;
        top: 0;
        z-index: 100;
    }

    /* ===== 内容区块 ===== */
    .content-section {
        padding: var(--spacing-md);
    }

    .content-section.active {
        display: block;
    }

    /* ===== 区块头部 ===== */
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
        margin-bottom: var(--spacing-xs);
    }

    .section-desc {
        font-size: 0.8125rem;
        margin-bottom: var(--spacing-md);
    }

    .header-actions {
        width: 100%;
        justify-content: stretch;
        flex-wrap: wrap;
    }

    .header-actions .btn {
        flex: 1;
        min-width: 0;
    }

    /* ===== 按钮通用调整 ===== */
    .btn {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
    }

    .btn-icon {
        width: 16px;
        height: 16px;
    }

    .btn-lg {
        padding: 0.75rem 1.25rem;
        font-size: 0.875rem;
    }

    /* ========================================
       系统配置页面 - 环境变量区域优化
       ======================================== */
    
    /* 🔥 分类标签容器 */
    .category-tabs {
        gap: var(--spacing-xs);
        padding: 0 var(--spacing-md) var(--spacing-xs);
        margin-bottom: var(--spacing-md);
        display: flex;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: x proximity;
        scrollbar-width: none;  /* Firefox */
    }

    .category-tabs::-webkit-scrollbar {
        display: none;  /* Chrome, Safari */
    }

    /* 🔥 分类标签按钮 */
    .tab-btn {
        padding: 0.5rem 0.875rem;
        font-size: 0.75rem;
        white-space: nowrap;
        flex-shrink: 0;
        scroll-snap-align: start;
        min-width: auto;
    }

    /* 🔥 环境变量网格 */
    .env-grid {
        padding: 0 var(--spacing-md);
        gap: var(--spacing-md);
    }

    /* 🔥 环境变量项 - 核心修复：纵向布局 */
    .env-item {
        flex-direction: column !important;  /* 强制纵向排列 */
        align-items: stretch;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
    }

    /* 🔥 环境变量信息区域 */
    .env-info {
        flex: 1;
        min-width: 0;
        width: 100%;  /* 确保占据全宽 */
    }

    /* 🔥 环境变量键名区域 */
    .env-key {
        font-size: 0.875rem;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
        word-wrap: break-word;
        overflow-wrap: break-word;
    }

    .env-key strong {
        word-break: break-word;
        max-width: 100%;
    }

    /* 🔥 值类型标签 */
    .value-type-badge {
        align-self: flex-start;
        font-size: 0.65rem;
        padding: 2px 6px;
        margin-top: var(--spacing-xs);
    }

    /* 🔥 环境变量值 - 全宽显示，支持滚动 */
    .env-value {
        width: 100%;  /* 占据全宽 */
        font-size: 0.75rem;
        padding: var(--spacing-sm);
        line-height: 1.5;
        max-height: 150px;
        overflow-y: auto;
        overflow-x: auto;  /* 允许横向滚动长内容 */
        white-space: pre-wrap;
        word-break: break-all;
        box-sizing: border-box;
    }

    /* 🔥 环境变量描述 */
    .env-desc {
        font-size: 0.75rem;
        line-height: 1.4;
        word-break: break-word;
    }

    /* 🔥 环境变量操作按钮区 - 横向平分 */
    .env-actions {
        width: 100%;
        flex-direction: row;
        gap: var(--spacing-sm);
        flex-shrink: 0;
    }

    .env-actions .btn {
        flex: 1;  /* 按钮平分宽度 */
        justify-content: center;
        min-height: 44px;  /* 触摸友好 */
        padding: 0.625rem 0.75rem;
        font-size: 0.8125rem;
    }

    /* ========================================
       模态框移动端优化
       ======================================== */
    
    .modal-overlay {
        padding: 0;
        align-items: flex-end;
    }

    .modal-container {
        max-height: 85vh;
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        width: 100%;
        max-width: 100%;
        animation: modalSlideUp var(--transition-base);
    }

    @keyframes modalSlideUp {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .modal-header {
        padding: var(--spacing-lg) var(--spacing-md);
    }

    .modal-body {
        padding: var(--spacing-md);
        max-height: 60vh;
        overflow-y: auto;
    }

    .modal-title {
        font-size: 1.125rem;
    }

    .modal-footer {
        padding: var(--spacing-md);
        flex-direction: column-reverse;
        gap: var(--spacing-sm);
    }

    .modal-footer .btn {
        width: 100%;
        min-height: 44px;
    }

    /* ========================================
       表单控件移动端优化
       ======================================== */
    
    /* 开关按钮 */
    .switch-container {
        width: 100%;
        padding: var(--spacing-md);
        background: var(--bg-secondary);
        border-radius: var(--border-radius-sm);
    }

    /* 数字选择器 */
    .number-picker {
        flex-direction: column;
        align-items: stretch;
        padding: var(--spacing-md);
    }

    .number-display {
        font-size: 2rem;
        text-align: center;
        padding: var(--spacing-md) 0;
    }

    .number-controls {
        flex-direction: row;
        justify-content: center;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-md);
    }

    .number-btn {
        width: 48px;
        height: 48px;
        font-size: 1.5rem;
    }

    .number-range {
        width: 100%;
    }

    /* 标签选择器 */
    .tag-selector {
        gap: var(--spacing-sm);
    }

    .tag-option {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* 多选标签容器 */
    .multi-select-container {
        gap: var(--spacing-md);
    }

    /* 已选择标签区域 */
    .selected-tags {
        min-height: 80px;
        padding: var(--spacing-sm);
        gap: var(--spacing-xs);
    }

    .selected-tag {
        padding: 0.5rem 0.75rem;
        font-size: 0.8125rem;
        touch-action: none;
    }

    .tag-text {
        font-size: 0.8125rem;
    }

    .remove-btn {
        width: 22px;
        height: 22px;
        font-size: 1.1rem;
    }

    /* 可选标签区域 */
    .available-tags {
        gap: var(--spacing-xs);
    }

    .available-tag {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* ========================================
       导航菜单调整
       ======================================== */
    .nav-menu {
        padding: var(--spacing-md);
    }

    .nav-item {
        padding: 0.75rem;
        min-height: 48px;
    }

    .nav-text {
        font-size: 0.875rem;
    }

    /* ========================================
       卡片组件
       ======================================== */
    .form-card,
    .response-card {
        padding: var(--spacing-md);
        margin: var(--spacing-md);
        border-radius: var(--border-radius);
    }

    .card-title {
        font-size: 1rem;
        margin-bottom: var(--spacing-md);
    }

    /* ========================================
       配置预览网格
       ======================================== */
    .preview-grid {
        gap: var(--spacing-md);
        padding: 0 var(--spacing-md);
    }

    .preview-category {
        padding: var(--spacing-md);
    }

    .preview-category-title {
        font-size: 1.125rem;
        margin-bottom: var(--spacing-md);
    }

    .preview-item {
        padding: var(--spacing-sm);
    }

    .preview-key {
        font-size: 0.875rem;
        margin-bottom: var(--spacing-xs);
    }

    .preview-value {
        font-size: 0.75rem;
        padding: var(--spacing-xs);
    }

    .preview-desc {
        font-size: 0.75rem;
    }

    /* ========================================
       日志终端
       ======================================== */
    .log-terminal {
        font-size: 0.75rem;
        padding: var(--spacing-md);
        max-height: 400px;
    }

    .log-entry {
        padding-left: var(--spacing-xs);
        word-break: break-all;
    }

    /* ========================================
       API测试
       ======================================== */
    .api-test-container {
        padding: 0 var(--spacing-md);
    }

    .response-content {
        font-size: 0.75rem;
        padding: var(--spacing-md);
        max-height: 300px;
    }

    /* ========================================
       推送弹幕相关
       ======================================== */
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: var(--spacing-md);
        padding: 0 var(--spacing-md);
    }

    .anime-image {
        height: 140px;
    }

    .anime-info {
        padding: var(--spacing-sm);
    }

    .anime-title {
        font-size: 0.75rem;
        -webkit-line-clamp: 2;
    }

    .anime-count {
        font-size: 0.7rem;
    }

    .episode-grid {
        padding: var(--spacing-sm);
        gap: var(--spacing-xs);
        max-height: 400px;
    }

    .episode-item {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
    }

    .episode-info {
        width: 100%;
    }

    .episode-number {
        font-size: 0.875rem;
    }

    .episode-title {
        font-size: 0.75rem;
        white-space: normal;
    }

    .episode-item .btn {
        width: 100%;
    }

    /* ========================================
       输入组
       ======================================== */
    .input-group {
        flex-direction: column;
    }

    .input-group .form-input {
        width: 100%;
    }

    .input-group .btn {
        width: 100%;
    }

    /* ========================================
       加载遮罩
       ======================================== */
    .loading-content {
        padding: var(--spacing-xl);
        max-width: 90%;
        margin: 0 var(--spacing-md);
    }

    .loading-spinner {
        width: 48px;
        height: 48px;
        margin-bottom: var(--spacing-md);
    }

    .loading-title {
        font-size: 1rem;
    }

    .loading-desc {
        font-size: 0.8125rem;
    }
}

/* ========================================
   小屏幕设备 (≤480px) - 进一步优化
   ======================================== */
@media (max-width: 480px) {
    :root {
        --spacing-md: 0.75rem;
        --spacing-lg: 1rem;
        --spacing-xl: 1rem;
    }

    /* 分类标签 */
    .tab-btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.7rem;
    }

    /* 环境变量项 */
    .env-item {
        padding: var(--spacing-sm);
    }

    .env-key {
        font-size: 0.8125rem;
    }

    .value-type-badge {
        font-size: 0.625rem;
        padding: 1px 5px;
    }

    .env-value {
        font-size: 0.7rem;
    }

    .env-desc {
        font-size: 0.7rem;
    }

    /* 模态框 */
    .modal-header {
        padding: var(--spacing-md);
    }

    .modal-title {
        font-size: 1rem;
    }

    .modal-close {
        width: 28px;
        height: 28px;
        font-size: 1.25rem;
    }

    .modal-body {
        padding: var(--spacing-sm);
    }

    .modal-footer {
        padding: var(--spacing-sm);
    }

    /* 按钮 */
    .btn {
        padding: 0.5rem 0.875rem;
        font-size: 0.75rem;
        min-height: 40px;
    }

    .btn-icon {
        width: 14px;
        height: 14px;
    }

    /* 表单控件 */
    .number-display {
        font-size: 1.75rem;
    }

    .number-btn {
        width: 42px;
        height: 42px;
        font-size: 1.25rem;
    }

    .tag-option,
    .available-tag {
        padding: 0.5rem 0.875rem;
        font-size: 0.75rem;
        min-height: 38px;
    }

    .selected-tag {
        padding: 0.375rem 0.625rem;
        font-size: 0.75rem;
    }

    .tag-text {
        font-size: 0.75rem;
    }

    .remove-btn {
        width: 20px;
        height: 20px;
        font-size: 1rem;
    }

    /* 卡片 */
    .form-card,
    .response-card,
    .preview-category {
        padding: var(--spacing-sm);
        margin: var(--spacing-sm);
    }

    /* 动漫网格 */
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        gap: var(--spacing-sm);
    }

    .anime-image {
        height: 120px;
    }

    .anime-info {
        padding: var(--spacing-xs);
    }

    .anime-title {
        font-size: 0.7rem;
    }

    /* 章节列表 */
    .episode-item {
        padding: var(--spacing-xs);
    }

    .episode-number {
        font-size: 0.8125rem;
    }

    .episode-title {
        font-size: 0.7rem;
    }
}

/* ========================================
   横屏模式优化
   ======================================== */
@media (max-width: 768px) and (orientation: landscape) {
    .modal-container {
        max-height: 90vh;
    }

    .modal-body {
        max-height: 50vh;
    }

    .episode-grid,
    .log-terminal {
        max-height: 300px;
    }

    .loading-overlay {
        padding: var(--spacing-md);
    }
}

/* ========================================
   触摸设备优化
   ======================================== */
@media (hover: none) and (pointer: coarse) {
    /* 增加可点击区域 */
    .btn,
    .tab-btn,
    .nav-item,
    .tag-option,
    .available-tag {
        min-height: 44px;
    }

    /* 禁用悬停效果,避免触摸时的视觉混乱 */
    .btn:hover,
    .tab-btn:hover,
    .nav-item:hover,
    .env-item:hover,
    .anime-card:hover,
    .preview-item:hover {
        transform: none;
    }

    /* 优化拖拽提示 */
    .selected-tag {
        cursor: grab;
    }

    .selected-tag:active {
        cursor: grabbing;
        opacity: 0.7;
    }

    /* 隐藏滚动条 */
    .category-tabs::-webkit-scrollbar,
    .env-value::-webkit-scrollbar,
    .modal-body::-webkit-scrollbar {
        display: none;
    }

    .category-tabs,
    .env-value,
    .modal-body {
        scrollbar-width: none;  /* Firefox */
    }
}

/* ========================================
   打印样式
   ======================================== */
@media print {
    .sidebar,
    .mobile-header,
    .sidebar-toggle,
    .btn,
    .modal-overlay,
    .loading-overlay {
        display: none !important;
    }

    .main-content {
        margin-left: 0;
        padding: 0;
    }

    .content-section {
        display: block !important;
        page-break-inside: avoid;
    }

    .env-item,
    .preview-item {
        page-break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ddd;
    }
}

/* ========================================
   高分辨率屏幕优化 (Retina)
   ======================================== */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .btn,
    .tab-btn,
    .env-item {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}
`;
