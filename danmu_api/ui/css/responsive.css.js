// language=CSS
export const responsiveCssContent = /* css */ `
/* ========================================
   全局移动端约束
   ======================================== */
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
}

/* ========================================
   平板设备 (≤1024px)
   ======================================== */
@media (max-width: 1024px) {
    :root {
        --sidebar-width: 260px;
        --spacing-2xl: 2.5rem;
        --spacing-3xl: 3.5rem;
    }

    .main-content {
        padding: var(--spacing-xl);
    }

    .section-title {
        font-size: 1.75rem;
    }

    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: var(--spacing-lg);
    }

    .form-card,
    .response-card {
        padding: var(--spacing-xl);
    }
}

/* ========================================
   移动设备 (≤768px)
   ======================================== */
@media (max-width: 768px) {
    :root {
        --spacing-xl: 1.25rem;
        --spacing-2xl: 1.75rem;
        --spacing-3xl: 2.5rem;
        --border-radius: 14px;
        --border-radius-lg: 18px;
        --border-radius-xl: 22px;
    }

    /* 防止内容超出屏幕 */
    body {
        overflow-x: hidden;
        max-width: 100vw;
        margin: 0;
        padding: 0;
    }

    body::before {
        opacity: 0.5;
    }

    .main-content,
    .content-section {
        overflow-x: hidden;
        max-width: 100%;
        width: 100%;
    }

    /* 侧边栏移动端处理 */
    .sidebar {
        transform: translateX(-100%);
        box-shadow: none;
        z-index: 2000;
    }

    .sidebar.active {
        transform: translateX(0);
        box-shadow: 8px 0 32px rgba(0, 0, 0, 0.3);
    }

    .sidebar-toggle {
        display: flex;
    }

    /* 主内容区 */
    .main-content {
        margin-left: 0;
        padding: var(--spacing-md);
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
        padding: var(--spacing-md);
    }

    /* 内容区块 */
    .content-section {
        padding: var(--spacing-md);
        margin: 0;
        width: 100%;
    }

    .content-section.active {
        display: block;
    }

    /* 区块头部 */
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: var(--spacing-xl);
        padding: var(--spacing-lg);
        background: var(--bg-card);
        backdrop-filter: var(--blur-md);
        border-radius: var(--border-radius-lg);
        margin: 0 0 var(--spacing-lg) 0;
        width: 100%;
        box-shadow: var(--shadow-md);
    }

    .section-title {
        font-size: 1.5rem;
        margin: 0;
        padding: 0;
    }

    .section-desc {
        font-size: 0.875rem;
        margin: var(--spacing-sm) 0 0 0;
    }

    .header-actions {
        width: 100%;
        flex-direction: column;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
    }

    .header-actions .btn {
        width: 100%;
        justify-content: center;
    }

    /* 按钮调整 */
    .btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.9375rem;
    }

    .btn-lg {
        padding: 0.875rem 1.5rem;
        font-size: 1rem;
    }

    /* 分类标签 - 移动端优化 */
    .category-tabs {
        gap: var(--spacing-xs);
        padding: 0 var(--spacing-md);
        margin-bottom: var(--spacing-lg);
        position: relative;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        width: 100%;
    }

    .category-tabs::-webkit-scrollbar {
        display: none;
    }

    .tab-btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.875rem;
        white-space: nowrap;
        flex-shrink: 0;
    }

    /* 环境变量网格 - 移动端优化 */
    .env-grid {
        padding: 0;
        gap: var(--spacing-md);
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0;
    }

    .env-item {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        margin: 0;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }

    .env-info {
        width: 100%;
        min-width: 0;
    }

    .env-key {
        font-size: 1rem;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-sm);
        max-width: 100%;
        word-wrap: break-word;
    }

    .env-key strong {
        word-break: break-word;
        max-width: 100%;
        display: inline-block;
    }

    .value-type-badge {
        font-size: 0.7rem;
        padding: 3px 10px;
        flex-shrink: 0;
    }

    .env-value {
        font-size: 0.8125rem;
        padding: var(--spacing-sm);
        word-break: break-all;
        white-space: pre-wrap;
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
    }

    .env-desc {
        font-size: 0.8125rem;
        line-height: 1.5;
        word-break: break-word;
    }

    .env-actions {
        width: 100%;
        max-width: 100%;
        flex-direction: row;
        gap: var(--spacing-sm);
        display: flex;
        flex-wrap: wrap;
    }

    .env-actions .btn {
        flex: 1;
        min-width: 0;
        padding: 0.75rem 0.625rem;
        font-size: 0.8125rem;
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
        padding: var(--spacing-lg);
    }

    .nav-item {
        padding: var(--spacing-md);
    }

    .nav-text {
        font-size: 0.9375rem;
    }

    /* 表单调整 */
    .form-card,
    .response-card {
        padding: var(--spacing-lg);
        margin: 0 0 var(--spacing-lg) 0;
        border-radius: var(--border-radius-lg);
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }

    .card-title {
        font-size: 1.125rem;
        margin-bottom: var(--spacing-lg);
    }
        /* 日志过滤器 - 移动端 */
    .log-filters {
        padding: var(--spacing-sm);
        gap: var(--spacing-xs);
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        margin: 0 0 var(--spacing-md) 0;
    }
    
    .log-filters::-webkit-scrollbar {
        display: none;
    }
    
    .log-filter-btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.8125rem;
        white-space: nowrap;
        flex-shrink: 0;
        min-width: auto;
    }
    
    .filter-icon {
        font-size: 0.9375rem;
    }
    
    .filter-text {
        font-size: 0.8125rem;
    }
    
    .filter-badge {
        min-width: 20px;
        height: 20px;
        font-size: 0.6875rem;
        padding: 0 5px;
    }
    
    /* 日志终端 - 移动端优化 */
    .log-terminal {
        padding: var(--spacing-sm);
        max-height: 450px;
        font-size: 0.8125rem;
        overflow-x: hidden;
        width: 100%;
        box-sizing: border-box;
    }
    
    .log-entry {
        padding: var(--spacing-sm) var(--spacing-md);
        gap: var(--spacing-xs);
        flex-direction: column;
        align-items: stretch;
        border-left-width: 3px;
        min-height: auto;
        width: 100%;
        box-sizing: border-box;
    }
    
    .log-entry-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-xs);
        flex-wrap: nowrap;
    }
    
    .log-icon {
        display: none;
    }
    
    .log-time {
        font-size: 0.6875rem;
        min-width: auto;
        flex-shrink: 0;
    }
    
    .log-message {
        font-size: 0.8125rem;
        line-height: 1.5;
        padding-left: 0;
        width: 100%;
        max-width: 100%;
        word-wrap: break-word;
        word-break: break-word;
        overflow-wrap: break-word;
        white-space: pre-wrap;
        box-sizing: border-box;
    }
    /* 模态框 - 移动端优化(不透明背景) */
    .modal-overlay {
        padding: 0;
        align-items: flex-end;
        background: rgba(0, 0, 0, 0.92);
    }

    .modal-container {
        max-height: 95vh;
        width: 100%;
        max-width: 100%;
        border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
        background: var(--bg-primary);
        border: none;
        border-top: 2px solid var(--border-color);
    }

    .modal-lg {
        max-width: 100%;
    }

    .modal-header {
        padding: var(--spacing-lg);
        position: sticky;
        top: 0;
        background: var(--bg-secondary);
        z-index: 1;
        border-bottom: 2px solid var(--border-color);
    }

    .modal-title {
        font-size: 1.125rem;
        padding-right: var(--spacing-sm);
    }

    .modal-body {
        padding: var(--spacing-lg);
        max-height: calc(95vh - 160px);
        overflow-y: auto;
        background: var(--bg-primary);
    }

    .modal-footer {
        padding: var(--spacing-lg);
        flex-direction: column-reverse;
        gap: var(--spacing-sm);
        position: sticky;
        bottom: 0;
        background: var(--bg-secondary);
        border-top: 2px solid var(--border-color);
    }

    .modal-footer .btn {
        width: 100%;
    }

    /* 表单组件 - 移动端优化 */
    .form-group {
        margin-bottom: var(--spacing-lg);
        width: 100%;
    }

    .form-label {
        font-size: 0.875rem;
        margin-bottom: var(--spacing-sm);
    }

    .form-input,
    .form-select,
    .form-textarea {
        font-size: 1rem; /* 防止iOS自动缩放 */
        padding: 0.75rem 1rem;
        width: 100%;
        box-sizing: border-box;
    }

    /* 数字选择器 - 移动端优化 */
    .number-picker {
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-lg);
        padding: var(--spacing-lg);
        width: 100%;
    }

    .number-display {
        font-size: 2.5rem;
        order: 1;
    }

    .number-controls {
        flex-direction: row;
        order: 2;
        gap: var(--spacing-lg);
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
        width: 100%;
    }

    .tag-option,
    .available-tag {
        padding: 0.625rem 1.125rem;
        font-size: 0.875rem;
        flex-shrink: 0;
    }

    /* 多选标签容器 - 移动端优化 */
    .multi-select-container {
        gap: var(--spacing-lg);
        width: 100%;
    }

    .selected-tags {
        min-height: 100px;
        padding: var(--spacing-md);
        width: 100%;
    }

    .selected-tag {
        padding: 0.625rem 1rem;
        font-size: 0.875rem;
    }

    .tag-text {
        font-size: 0.875rem;
    }

    .remove-btn {
        width: 20px;
        height: 20px;
        font-size: 1rem;
    }

    /* 开关按钮 - 移动端优化 */
    .switch-container {
        padding: var(--spacing-md);
        background: var(--bg-secondary);
        border-radius: var(--border-radius);
        width: 100%;
        justify-content: space-between;
    }

    .switch {
        width: 52px;
        height: 28px;
    }

    .switch-label {
        font-size: 0.9375rem;
    }

    /* 动漫网格 */
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: var(--spacing-lg);
        padding: 0 var(--spacing-md);
        width: 100%;
    }

    .anime-image {
        height: 190px;
    }

    .anime-title {
        font-size: 0.875rem;
    }

    /* 剧集网格 */
    .episode-grid {
        padding: var(--spacing-md);
        gap: var(--spacing-sm);
        width: 100%;
    }

    .episode-item {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
    }

    .episode-title {
        white-space: normal;
        font-size: 0.875rem;
    }

    .episode-number {
        font-size: 0.9375rem;
    }

    /* 日志终端 */
    .log-terminal {
        font-size: 0.8125rem;
        padding: var(--spacing-lg);
        max-height: 400px;
        width: 100%;
        box-sizing: border-box;
    }

    /* API 响应 */
    .response-content {
        font-size: 0.8125rem;
        padding: var(--spacing-lg);
        max-height: 350px;
        width: 100%;
        box-sizing: border-box;
    }

    /* ==================== 版本卡片 ==================== */
    .version-card {
        margin: var(--spacing-md);
        padding: var(--spacing-lg);
    }

    .version-header {
        margin-bottom: var(--spacing-md);
    }

    .version-icon {
        font-size: 1.375rem;
    }

    .version-title {
        font-size: 1.0625rem;
    }

    .version-content {
        gap: var(--spacing-sm);
    }

    .version-label {
        font-size: 0.8125rem;
    }

    .version-value {
        font-size: 0.8125rem;
        padding: 4px 10px;
    }


    .api-endpoint-card {
        margin-top: var(--spacing-md);
        padding-top: var(--spacing-md);
    }

    .endpoint-label {
        font-size: 0.9375rem;
        margin-bottom: var(--spacing-sm);
    }

    .endpoint-value {
        font-size: 0.875rem;
        padding: var(--spacing-md);
    }

    .copy-hint {
        font-size: 0.75rem;
        margin-top: var(--spacing-sm);
    }

    .version-update-notice {
        margin-top: var(--spacing-md);
        padding: var(--spacing-md);
        gap: var(--spacing-sm);
    }

    .update-icon {
        font-size: 1.375rem;
    }

    .update-title {
        font-size: 0.9375rem;
    }

    .update-desc {
        font-size: 0.8125rem;
    }

    .update-btn {
        padding: 10px 18px;
        font-size: 0.875rem;
    }

    /* 局域网扫描 - 移动端 */
    .presets-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-xs);
    }

    .preset-btn {
        padding: var(--spacing-sm) var(--spacing-xs) !important;
        font-size: 0.75rem !important;
        flex-direction: column;
        gap: 4px !important;
    }

    .preset-btn svg {
        width: 20px;
        height: 20px;
    }

    .lan-scan-controls {
        width: 100%;
    }

    .lan-input-group {
        width: 100%;
    }

    .lan-subnet-input {
        flex: 1;
        min-width: 0;
        padding: 0.5rem 0.625rem !important;
    }

    .lan-port-input {
        width: 55px !important;
        padding: 0.5rem 0.375rem !important;
    }

    .lan-input-separator {
        font-size: 0.875rem;
        padding: 0 1px;
    }

    .lan-scan-btn {
        padding: 0.5rem 0.75rem !important;
    }

    .lan-scan-btn .scan-btn-text {
        display: none;
    }

    .lan-scan-btn svg {
        width: 18px;
        height: 18px;
    }

    .lan-device-card {
        padding: var(--spacing-sm) var(--spacing-md);
    }

    .device-icon {
        font-size: 1.25rem;
    }

    .device-ip {
        font-size: 0.8125rem;
    }

    .device-type {
        font-size: 0.6875rem;
    }
    
    /* 表单行 */
    .form-row {
        grid-template-columns: 1fr;
        width: 100%;
    }

    .form-inline {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }

    .form-inline .btn {
        width: 100%;
    }

    /* 输入组 */
    .input-group {
        flex-direction: column;
        width: 100%;
    }

    .input-group .btn {
        width: 100%;
    }

    /* 页脚 */
    .footer {
        padding: var(--spacing-xl) var(--spacing-md);
        margin: var(--spacing-xl) 0 0 0;
    }

    .footer-description {
        margin-bottom: var(--spacing-lg);
    }

    .footer-text {
        font-size: 0.75rem;
        line-height: 1.6;
    }

    .footer-links {
        gap: var(--spacing-sm);
        max-width: 100%;
    }

    .footer-link {
        flex: 1;
        min-width: calc(50% - var(--spacing-xs));
        max-width: calc(50% - var(--spacing-xs));
        padding: var(--spacing-md) var(--spacing-sm);
        font-size: 0.8125rem;
    }

    .footer-link-icon {
        font-size: 1rem;
    }

    .footer-link-text {
        font-size: 0.8125rem;
    }

    .footer-icon {
        width: 16px;
        height: 16px;
    }

    .footer-note {
        font-size: 0.7rem;
        margin-top: var(--spacing-md);
    }

    /* 预览网格移动端优化 */
    .preview-grid {
        padding: 0;
        gap: var(--spacing-md);
        width: 100%;
        margin: 0;
    }

    .preview-category {
        margin: 0 0 var(--spacing-lg) 0;
        padding: var(--spacing-lg);
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }

    .preview-category-title {
        font-size: 1.125rem;
        margin-bottom: var(--spacing-md);
    }

    .preview-item {
        padding: var(--spacing-md);
        border-left-width: 3px;
        width: 100%;
        box-sizing: border-box;
    }

    .preview-key {
        font-size: 0.9375rem;
    }

    .preview-value {
        font-size: 0.8125rem;
        padding: var(--spacing-sm);
        line-height: 1.4;
        word-break: break-all;
        max-width: 100%;
    }

    .preview-desc {
        font-size: 0.75rem;
    }

    /* 预览项容器优化 */
    .preview-items {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        width: 100%;
    }

    /* 加载遮罩 - 移动端优化 */
    .loading-overlay {
        background: rgba(0, 0, 0, 0.94);
    }

    .loading-content {
        width: calc(100% - 2rem);
        max-width: 420px;
        margin: 0 1rem;
        padding: var(--spacing-2xl);
        background: var(--bg-primary);
    }

    .loading-spinner {
        width: 64px;
        height: 64px;
        border-width: 4px;
    }

    .loading-title {
        font-size: 1.125rem;
    }

    .loading-desc {
        font-size: 0.875rem;
    }
}

/* ========================================
   小型移动设备 (≤480px)
   ======================================== */
@media (max-width: 480px) {
    :root {
        --spacing-lg: 1rem;
        --spacing-xl: 1.25rem;
        --spacing-2xl: 1.5rem;
    }

    /* 主内容区增加内边距 */
    .main-content {
        padding: var(--spacing-sm);
    }

    /* Logo调整 */
    .logo-image {
        width: 44px;
        height: 44px;
    }

    .logo-text {
        font-size: 1.125rem;
    }

    /* 区块标题 */
    .section-title {
        font-size: 1.25rem;
    }

    .section-desc {
        font-size: 0.8125rem;
    }

    /* 分类标签 */
    .tab-btn {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
        min-width: auto;
    }

    /* 环境变量项 - 超小屏幕优化 */
    .env-item {
        padding: var(--spacing-md);
        margin: 0;
        width: 100%;
        max-width: 100%;
    }

    .env-key {
        font-size: 0.9375rem;
    }

    .env-key strong {
        font-size: 0.9375rem;
        max-width: 100%;
    }

    .value-type-badge {
        font-size: 0.65rem;
        padding: 2px 8px;
    }

    .env-value {
        font-size: 0.75rem;
        padding: var(--spacing-sm);
        max-width: 100%;
    }

    .env-desc {
        font-size: 0.75rem;
    }

    /* 超小屏幕按钮改为垂直布局 */
    .env-actions {
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .env-actions .btn {
        width: 100%;
        padding: 0.75rem;
        font-size: 0.8125rem;
        justify-content: center;
    }

    .env-actions .btn-icon {
        width: 14px;
        height: 14px;
        margin-right: var(--spacing-xs);
    }

    /* 动漫网格 */
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: var(--spacing-md);
        padding: 0 var(--spacing-sm);
    }

    .anime-image {
        height: 160px;
    }

    .anime-info {
        padding: var(--spacing-sm);
    }

    .anime-title {
        font-size: 0.8125rem;
    }

    .anime-count {
        font-size: 0.75rem;
    }

    /* 标签选择器 */
    .tag-selector,
    .available-tags {
        gap: var(--spacing-xs);
    }

    .tag-option,
    .available-tag {
        padding: 0.625rem 1rem;
        font-size: 0.8125rem;
    }

    .selected-tag {
        padding: 0.5rem 0.875rem;
        font-size: 0.8125rem;
    }

    /* 按钮 */
    .btn {
        padding: 0.625rem 1.125rem;
        font-size: 0.875rem;
    }

    .btn-icon {
        width: 16px;
        height: 16px;
    }
/* 页脚 */
    .footer {
        padding: var(--spacing-lg) var(--spacing-sm);
    }

    .footer-text {
        font-size: 0.7rem;
    }

    .footer-links {
        gap: var(--spacing-xs);
    }

    .footer-link {
        min-width: calc(50% - 4px);
        max-width: calc(50% - 4px);
        padding: var(--spacing-sm);
        font-size: 0.75rem;
    }

    .footer-link-icon {
        font-size: 0.9375rem;
    }

    .footer-link-text {
        font-size: 0.75rem;
    }

    .footer-icon {
        width: 14px;
        height: 14px;
    }
    /* 版本卡片 */
    .version-card {
        margin: var(--spacing-sm);
        padding: var(--spacing-lg);
    }

    .version-header {
        margin-bottom: var(--spacing-md);
    }

    .version-icon {
        font-size: 1.25rem;
    }

    .version-title {
        font-size: 1rem;
    }

    .version-content {
        gap: var(--spacing-sm);
    }

    .version-item {
        flex-wrap: wrap;
        gap: var(--spacing-xs);
    }

    .version-label {
        font-size: 0.75rem;
    }

    .version-value {
        font-size: 0.75rem;
        padding: 3px 8px;
    }

    .api-endpoint-card {
        margin-top: var(--spacing-md);
        padding-top: var(--spacing-md);
    }

    .endpoint-label {
        font-size: 0.875rem;
        margin-bottom: var(--spacing-sm);
    }

    .endpoint-value {
        font-size: 0.8125rem;
        padding: var(--spacing-sm) var(--spacing-md);
    }

    .copy-hint {
        font-size: 0.6875rem;
        margin-top: var(--spacing-xs);
    }

    .version-update-notice {
        margin-top: var(--spacing-md);
        padding: var(--spacing-md);
        gap: var(--spacing-sm);
        flex-wrap: wrap;
    }

    .update-icon {
        font-size: 1.25rem;
    }

    .update-text {
        flex: 1;
        min-width: 140px;
    }

    .update-title {
        font-size: 0.875rem;
    }

    .update-desc {
        font-size: 0.75rem;
    }

    .update-btn {
        padding: 10px 16px;
        font-size: 0.8125rem;
        width: 100%;
        margin-top: var(--spacing-sm);
    }

    /* 加载遮罩 */
    .loading-content {
        padding: var(--spacing-xl);
        width: calc(100% - 2rem);
    }

    .loading-spinner {
        width: 56px;
        height: 56px;
        border-width: 4px;
    }

    .loading-title {
        font-size: 1.125rem;
    }

    .loading-desc {
        font-size: 0.875rem;
    }

    /* 日志终端 - 超小屏幕 */
    .log-terminal {
        font-size: 0.75rem;
        max-height: 350px;
        padding: var(--spacing-xs) var(--spacing-sm);
        overflow-x: hidden;
    }
    
    .log-entry {
        padding: var(--spacing-xs) var(--spacing-sm);
        gap: 6px;
        min-height: auto;
    }
    
    .log-icon {
        display: none;
    }
    
    .log-time {
        font-size: 0.625rem;
    }
    
    .log-message {
        font-size: 0.75rem;
        line-height: 1.4;
    }

    /* 模态框 */
    .modal-overlay {
        padding: 0;
        background: rgba(0, 0, 0, 0.95);
    }

    .modal-container {
        max-height: 100vh;
        width: 100%;
        border-radius: 0;
        background: var(--bg-primary);
    }

    .modal-header,
    .modal-body,
    .modal-footer {
        padding: var(--spacing-lg);
        background: var(--bg-primary);
    }

    .modal-header {
        background: var(--bg-secondary);
    }

    .modal-footer {
        background: var(--bg-secondary);
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

    /* 预览类别标题优化 */
    .preview-category-title {
        font-size: 1rem;
        flex-wrap: wrap;
    }

    /* 预览项优化 */
    .preview-item {
        padding: var(--spacing-sm);
    }

    .preview-key {
        font-size: 0.875rem;
    }

    .preview-value {
        font-size: 0.75rem;
    }
}

/* ========================================
   横屏模式优化
   ======================================== */
@media (max-width: 768px) and (orientation: landscape) {
    .sidebar {
        width: 240px;
    }

    .sidebar.active {
        width: 240px;
    }

    .logo-text {
        font-size: 1.125rem;
    }

    .nav-menu {
        padding: var(--spacing-md);
    }

    .nav-item {
        padding: var(--spacing-sm) var(--spacing-md);
    }

    .nav-text {
        font-size: 0.875rem;
    }

    .version-card {
        margin: 0 0 var(--spacing-md) 0;
        padding: var(--spacing-md);
    }

    .modal-overlay {
        padding: 2vh 0;
        background: rgba(0, 0, 0, 0.93);
    }

    .modal-container {
        max-height: 96vh;
        background: var(--bg-primary);
    }

    .modal-body {
        max-height: calc(96vh - 140px);
    }
        /* 日志终端 - 横屏优化 */
    .log-terminal {
        max-height: 35vh;
        font-size: 0.8125rem;
    }
    
    .log-entry {
        padding: var(--spacing-xs) var(--spacing-sm);
    }
    
    .log-icon {
        display: none;
    }
    
    .log-message {
        font-size: 0.8125rem;
        line-height: 1.5;
    }

    /* ==================== 版本卡片 ==================== */
    .version-card {
        margin: var(--spacing-sm);
        padding: var(--spacing-md);
    }

    .version-header {
        margin-bottom: var(--spacing-sm);
    }

    .version-icon {
        font-size: 1.125rem;
    }

    .version-title {
        font-size: 0.9375rem;
    }

    .version-content {
        gap: var(--spacing-xs);
    }

    .version-label {
        font-size: 0.75rem;
    }

    .version-value {
        font-size: 0.75rem;
        padding: 3px 8px;
    }


    .api-endpoint-card {
        margin-top: var(--spacing-sm);
        padding-top: var(--spacing-sm);
    }

    .endpoint-label {
        font-size: 0.875rem;
        margin-bottom: var(--spacing-xs);
    }

    .endpoint-value {
        font-size: 0.8125rem;
        padding: var(--spacing-sm);
    }

    .copy-hint {
        font-size: 0.625rem;
        margin-top: var(--spacing-xs);
    }

    .version-update-notice {
        margin-top: var(--spacing-sm);
        padding: var(--spacing-sm);
        gap: var(--spacing-xs);
        flex-wrap: wrap;
    }

    .update-icon {
        font-size: 1.125rem;
    }

    .update-title {
        font-size: 0.8125rem;
    }

    .update-desc {
        font-size: 0.75rem;
    }

    .update-btn {
        padding: 8px 14px;
        font-size: 0.75rem;
        width: 100%;
        margin-top: var(--spacing-xs);
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
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }

    .form-card,
    .response-card {
        padding: var(--spacing-3xl);
    }

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
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

/* ========================================
   触摸设备优化
   ======================================== */
@media (hover: none) and (pointer: coarse) {
    .btn {
        min-height: 48px;
    }

    .nav-item {
        min-height: 52px;
    }

    .tab-btn {
        min-height: 48px;
    }

    .tag-option,
    .available-tag {
        min-height: 44px;
    }

    .form-input,
    .form-select,
    .form-textarea {
        min-height: 48px;
    }

    /* 移除悬停效果,改用点击反馈 */
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

    .nav-item:active,
    .tab-btn:active,
    .tag-option:active {
        opacity: 0.8;
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
    .footer,
    .theme-toggle {
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
        margin-bottom: var(--spacing-lg);
    }

    .env-item,
    .preview-category {
        page-break-inside: avoid;
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
        scroll-behavior: auto !important;
    }

    .btn::before,
    .tag-option::before {
        display: none;
    }
}

/* ========================================
   高对比度模式支持
   ======================================== */
@media (prefers-contrast: high) {
    :root {
        --border-color: currentColor;
        --shadow-sm: none;
        --shadow: 0 0 0 2px currentColor;
        --shadow-md: 0 0 0 2px currentColor;
        --shadow-lg: 0 0 0 3px currentColor;
    }

    .btn {
        border: 2px solid currentColor;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
        outline: 3px solid currentColor;
    }
}
`;