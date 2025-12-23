// language=CSS
export const responsiveCssContent = /* css */ `
/* ========================================
   响应式布局 - Responsive Layout
   断点管理、移动端优化、触摸交互
   ======================================== */

/* ========== 容器最大宽度 ========== */
.container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--spacing-lg);
    padding-right: var(--spacing-lg);
}

@media (min-width: 640px) {
    .container {
        max-width: 640px;
    }
}

@media (min-width: 768px) {
    .container {
        max-width: 768px;
    }
}

@media (min-width: 1024px) {
    .container {
        max-width: 1024px;
    }
}

@media (min-width: 1280px) {
    .container {
        max-width: 1280px;
    }
}

@media (min-width: 1536px) {
    .container {
        max-width: 1536px;
    }
}

/* ========== 响应式网格系统 ========== */
.grid {
    display: grid;
    gap: var(--spacing-lg);
}

.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (max-width: 1024px) {
    .grid-cols-4 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 768px) {
    .grid-cols-3,
    .grid-cols-4 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    
    .grid {
        gap: var(--spacing-md);
    }
}

@media (max-width: 480px) {
    .grid-cols-2,
    .grid-cols-3,
    .grid-cols-4 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

/* ========== Flex 工具类 ========== */
.flex {
    display: flex;
}

.flex-col {
    flex-direction: column;
}

.flex-wrap {
    flex-wrap: wrap;
}

.items-center {
    align-items: center;
}

.items-start {
    align-items: flex-start;
}

.items-end {
    align-items: flex-end;
}

.justify-center {
    justify-content: center;
}

.justify-between {
    justify-content: space-between;
}

.justify-end {
    justify-content: flex-end;
}

.gap-sm {
    gap: var(--spacing-sm);
}

.gap-md {
    gap: var(--spacing-md);
}

.gap-lg {
    gap: var(--spacing-lg);
}

/* ========== 显示/隐藏工具类 ========== */
.hidden {
    display: none !important;
}

.visible {
    visibility: visible;
}

.invisible {
    visibility: hidden;
}

/* 响应式显示 */
@media (max-width: 768px) {
    .hide-mobile {
        display: none !important;
    }
}

@media (min-width: 769px) {
    .show-mobile {
        display: none !important;
    }
}

@media (max-width: 1024px) {
    .hide-tablet {
        display: none !important;
    }
}

@media (min-width: 1025px) {
    .show-tablet {
        display: none !important;
    }
}

/* ========== 移动端优化的视口高度 ========== */
:root {
    --app-vh: 1vh;
}

@supports (-webkit-touch-callout: none) {
    /* iOS Safari 修复 */
    .full-height {
        height: calc(var(--app-vh, 1vh) * 100);
    }
}

/* ========== 章节头部 ========== */
.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
    gap: var(--spacing-md);
}

.section-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin: 0;
}

.section-desc {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin-top: var(--spacing-xs);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .section-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .section-title {
        font-size: var(--text-xl);
    }
    
    .header-actions {
        width: 100%;
        justify-content: flex-start;
    }
    
    .header-actions .btn {
        flex: 1;
        min-width: 0;
    }
}

/* ========== 统计卡片网格 ========== */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }
}

.stat-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg);
    box-shadow: var(--glass-shadow);
    transition: all var(--transition-base);
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.stat-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
}

.stat-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-lg);
    background: var(--gradient-primary);
    color: var(--text-inverse);
    font-size: 24px;
}

.stat-value {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    line-height: 1;
}

.stat-label {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin-top: var(--spacing-xs);
}

@media (max-width: 768px) {
    .stat-card {
        padding: var(--spacing-md);
    }
    
    .stat-value {
        font-size: var(--text-2xl);
    }
}

/* ========== 动漫网格布局 ========== */
.anime-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--spacing-lg);
}

@media (max-width: 1024px) {
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: var(--spacing-md);
    }
}

@media (max-width: 768px) {
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: var(--spacing-md);
    }
}

@media (max-width: 480px) {
    .anime-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-sm);
    }
}

/* ========== 剧集网格布局 ========== */
.episode-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-md);
}

@media (max-width: 768px) {
    .episode-grid {
        grid-template-columns: 1fr;
    }
}

/* ========== 环境变量网格 ========== */
.env-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: var(--spacing-lg);
}

@media (max-width: 1024px) {
    .env-grid {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
}

@media (max-width: 768px) {
    .env-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }
}

/* ========== 配置预览网格 ========== */
.preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: var(--spacing-xl);
}

@media (max-width: 1024px) {
    .preview-grid {
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        gap: var(--spacing-lg);
    }
}

@media (max-width: 768px) {
    .preview-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
    }
}

/* ========== 移动端优化：按钮组 ========== */
@media (max-width: 768px) {
    .modal-footer .btn,
    .header-actions .btn {
        flex: 1;
        justify-content: center;
    }
    
    .btn-icon-text {
        display: flex;
        align-items: center;
        gap: 0.375rem;
    }
}

/* ========== 移动端优化：卡片间距 ========== */
@media (max-width: 768px) {
    .form-card,
    .card {
        border-radius: var(--radius-lg);
    }
    
    .card-header,
    .card-body,
    .card-footer {
        padding: var(--spacing-md);
    }
}

/* ========== 移动端优化：表格横向滚动 ========== */
.table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 calc(-1 * var(--spacing-lg));
    padding: 0 var(--spacing-lg);
}

@media (max-width: 768px) {
    .table-wrapper {
        margin: 0 calc(-1 * var(--spacing-md));
        padding: 0 var(--spacing-md);
    }
}

/* ========== 移动端优化：模态框 ========== */
@media (max-width: 768px) {
    .modal-overlay {
        padding: 0;
        align-items: flex-end;
    }
    
    .modal-container {
        max-width: 100%;
        max-height: 95vh;
        border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        margin: 0;
        animation: modalSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    @keyframes modalSlideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }
}

/* ========== 移动端优化：搜索结果 ========== */
@media (max-width: 768px) {
    .search-results-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
    }
    
    .results-title {
        font-size: var(--text-lg);
    }
}

/* ========== 触摸设备优化 ========== */
@media (hover: none) and (pointer: coarse) {
    /* 增加可点击区域 */
    .btn,
    .nav-item,
    .tag-option,
    .available-tag {
        min-height: 44px;
        padding-top: 0.625rem;
        padding-bottom: 0.625rem;
    }
    
    /* 移除悬浮效果 */
    .anime-card:hover,
    .episode-item:hover,
    .env-item:hover {
        transform: none;
        box-shadow: var(--shadow-sm);
    }
    
    /* 优化触摸反馈 */
    .btn:active,
    .nav-item:active {
        opacity: 0.7;
    }
    
    /* 移除悬浮工具提示 */
    [title]:hover::after {
        display: none;
    }
}

/* ========== 横屏模式优化 ========== */
@media (max-width: 768px) and (orientation: landscape) {
    .sidebar {
        width: 240px;
    }
    
    .mobile-header {
        padding: var(--spacing-sm) var(--spacing-md);
    }
    
    .content-section {
        padding: var(--spacing-md);
    }
    
    .modal-container {
        max-height: 85vh;
    }
}

/* ========== 小屏设备优化 (< 375px) ========== */
@media (max-width: 375px) {
    :root {
        font-size: 15px;
    }
    
    .section-title {
        font-size: var(--text-lg);
    }
    
    .btn {
        padding: 0.5rem 0.875rem;
        font-size: var(--text-xs);
    }
    
    .form-card {
        padding: var(--spacing-md);
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
        padding: var(--spacing-md);
    }
}

/* ========== 大屏设备优化 (> 1920px) ========== */
@media (min-width: 1920px) {
    .container {
        max-width: 1680px;
    }
    
    .sidebar {
        width: 300px;
    }
    
    .main-content {
        margin-left: 300px;
    }
}

/* ========== 打印样式 ========== */
@media print {
    .sidebar,
    .mobile-header,
    .footer,
    .header-actions,
    .modal-overlay,
    .loading-overlay {
        display: none !important;
    }
    
    .main-content {
        margin-left: 0 !important;
    }
    
    .content-section {
        padding: 0 !important;
    }
    
    .card,
    .form-card {
        page-break-inside: avoid;
        box-shadow: none !important;
        border: 1px solid #ddd !important;
    }
    
    body {
        background: white !important;
    }
}

/* ========== 高对比度模式支持 ========== */
@media (prefers-contrast: high) {
    .btn,
    .form-input,
    .form-select,
    .card {
        border-width: 2px;
    }
    
    .glass-bg {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background: var(--bg-primary);
    }
}

/* ========== 减少动画模式 ========== */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    .sidebar,
    .modal-container,
    .loading-overlay {
        transition: none !important;
    }
}

/* ========== 文本缩放优化 ========== */
@media (min-resolution: 2dppx) {
    body {
        -webkit-font-smoothing: subpixel-antialiased;
    }
}

/* ========== 安全区域适配 (iPhone X+) ========== */
@supports (padding: max(0px)) {
    .mobile-header {
        padding-left: max(var(--spacing-lg), env(safe-area-inset-left));
        padding-right: max(var(--spacing-lg), env(safe-area-inset-right));
    }
    
    .sidebar {
        padding-bottom: max(var(--spacing-lg), env(safe-area-inset-bottom));
    }
    
    .footer {
        padding-bottom: max(var(--spacing-xl), env(safe-area-inset-bottom));
    }
}

/* ========== Notch 适配 ========== */
@media (max-width: 768px) {
    .mobile-header {
        padding-top: max(var(--spacing-md), env(safe-area-inset-top));
    }
}

/* ========== 折叠屏设备优化 ========== */
@media (min-width: 600px) and (max-width: 900px) {
    .sidebar {
        width: 260px;
    }
    
    .main-content {
        margin-left: 260px;
    }
    
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
}
`;