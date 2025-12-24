// language=CSS
export const baseCssContent = /* css */ `
/* ========================================
   基础样式 - Base Styles
   现代化重置 + 全局布局 + 玻璃拟态基础
   ======================================== */

/* ========== 现代化 CSS 重置 ========== */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    scroll-behavior: smooth;
}

body {
    margin: 0;
    padding: 0;
    font-family: var(--font-sans);
    font-size: var(--text-base);
    font-weight: var(--font-normal);
    line-height: var(--leading-normal);
    color: var(--text-primary);
    background: var(--bg-base);
    overflow-x: hidden;
    transition: background-color var(--transition-base), color var(--transition-base);
    min-height: 100vh;
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* 背景纹理效果（可选） */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
    opacity: 0.5;
}

[data-theme="dark"] body::before {
    background-image: 
        radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
}

/* ========== 排版重置 ========== */
h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: var(--font-semibold);
    line-height: var(--leading-tight);
    color: var(--text-primary);
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
h4 { font-size: var(--text-lg); }
h5 { font-size: var(--text-base); }
h6 { font-size: var(--text-sm); }

p {
    margin: 0;
    line-height: var(--leading-relaxed);
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-fast);
}

a:hover {
    color: var(--primary-hover);
}

ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
}

img, svg {
    display: block;
    max-width: 100%;
    height: auto;
}

button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    color: inherit;
}

input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
}

/* ========== 自定义滚动条 ========== */
::-webkit-scrollbar {
    width: var(--scrollbar-width);
    height: var(--scrollbar-width);
}

::-webkit-scrollbar-track {
    background: var(--scrollbar-bg);
    border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: var(--radius-full);
    transition: background var(--transition-fast);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
}

/* Firefox 滚动条 */
* {
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-bg);
}

/* ========== 全局选中效果 ========== */
::selection {
    background: rgba(59, 130, 246, 0.3);
    color: var(--text-primary);
}

::-moz-selection {
    background: rgba(59, 130, 246, 0.3);
    color: var(--text-primary);
}

/* ========== 应用主容器 ========== */
.app-container {
    display: flex;
    min-height: 100vh;
    width: 100%;
    position: relative;
    background: var(--bg-base);
}

/* ========== 侧边栏样式 ========== */
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 280px;
    height: 100vh;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border-right: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    z-index: var(--z-fixed);
    overflow-y: auto;
    overflow-x: hidden;
    transition: transform var(--transition-base);
    display: flex;
    flex-direction: column;
}

.sidebar-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    background: var(--bg-primary);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.logo-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.logo-image {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    object-fit: cover;
    box-shadow: var(--shadow-md);
}

.logo-text {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.sidebar-toggle {
    display: none;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.sidebar-toggle:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
}

.toggle-icon {
    width: 20px;
    height: 2px;
    background: var(--text-primary);
    position: relative;
    transition: all var(--transition-base);
}

.toggle-icon::before,
.toggle-icon::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: var(--text-primary);
    transition: all var(--transition-base);
}

.toggle-icon::before {
    top: -6px;
}

.toggle-icon::after {
    bottom: -6px;
}

/* ========== 导航菜单 ========== */
.nav-menu {
    flex: 1;
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.nav-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-lg);
    color: var(--text-secondary);
    transition: all var(--transition-fast);
    position: relative;
    overflow: hidden;
}

.nav-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    background: var(--gradient-primary);
    opacity: 0;
    transition: all var(--transition-base);
    border-radius: var(--radius-lg);
}

.nav-item:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
    transform: translateX(4px);
}

.nav-item:hover::before {
    width: 4px;
    opacity: 1;
}

.nav-item.active {
    background: var(--bg-primary);
    color: var(--primary-color);
    font-weight: var(--font-medium);
    box-shadow: var(--shadow-sm);
}

.nav-item.active::before {
    width: 4px;
    opacity: 1;
}

.nav-icon {
    width: 20px;
    height: 20px;
    stroke-width: 2;
    flex-shrink: 0;
}

.nav-text {
    font-size: var(--text-base);
}

/* ========== 主内容区 ========== */
.main-content {
    flex: 1;
    margin-left: 280px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg-base);
    transition: margin-left var(--transition-base);
}

/* ========== 移动端头部 ========== */
.mobile-header {
    display: none;
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    /* 与「环境配置总览」卡片同一气质：上方轻渐变 + 玻璃质感 */
    background: linear-gradient(
        180deg,
        rgba(99, 102, 241, 0.14) 0%,
        var(--glass-bg) 55%,
        var(--glass-bg) 100%
    );
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border-bottom: 1px solid rgba(99, 102, 241, 0.14);
    padding: 0.875rem var(--spacing-lg);
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

.mobile-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 18% 20%, rgba(99, 102, 241, 0.22), transparent 56%),
        radial-gradient(circle at 88% 18%, rgba(168, 85, 247, 0.12), transparent 48%);
    pointer-events: none;
    opacity: 0.85;
}

.mobile-header::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0), rgba(99, 102, 241, 0.38), rgba(168, 85, 247, 0.28), rgba(99, 102, 241, 0));
    pointer-events: none;
}

.mobile-header-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex: 1;
    position: relative;
    z-index: 1;
}

.mobile-header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    position: relative;
    z-index: 1;
}

.mobile-menu-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(99, 102, 241, 0.18);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex-shrink: 0;
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-fast);
}

.mobile-menu-btn:hover {
    transform: translateY(-1px);
    border-color: rgba(99, 102, 241, 0.32);
    box-shadow: var(--shadow-md);
}

.mobile-menu-btn:active {
    transform: translateY(0) scale(0.96);
}

.menu-line {
    width: 20px;
    height: 2px;
    background: var(--text-primary);
    transition: all var(--transition-base);
    border-radius: 2px;
}

.mobile-logo-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    min-width: 0;
}

.mobile-logo-image {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    object-fit: cover;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
}

.mobile-title-group {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.mobile-title {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mobile-subtitle {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.mobile-action-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(99, 102, 241, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    flex-shrink: 0;
    box-shadow: var(--shadow-sm);
}

.mobile-action-btn:hover {
    border-color: rgba(99, 102, 241, 0.32);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.mobile-action-icon {
    width: 20px;
    height: 20px;
}

/* 主题切换图标显示/隐藏 */
[data-theme="light"] .theme-icon-moon {
    display: none;
}

[data-theme="dark"] .theme-icon-sun {
    display: none;
}

/* ========== 内容区域 ========== */
.content-section {
    display: none;
    flex: 1;
    padding: var(--spacing-2xl);
    animation: fadeIn var(--transition-base);
}

.content-section.active {
    display: block;
}

/* ========== 页脚 ========== */
.footer {
    margin-top: auto;
    padding: var(--spacing-2xl) var(--spacing-2xl) var(--spacing-xl);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border-top: 1px solid var(--glass-border);
}

.footer-description {
    margin-bottom: var(--spacing-lg);
}

.footer-text {
    color: var(--text-secondary);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-sm);
}

.footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
}

.footer-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--text-secondary);
    font-size: var(--text-sm);
    transition: all var(--transition-fast);
}

.footer-link:hover {
    color: var(--primary-color);
    transform: translateY(-2px);
}

.footer-link-icon {
    font-size: var(--text-lg);
}

.footer-icon {
    width: 16px;
    height: 16px;
}

.footer-link-text {
    font-weight: var(--font-medium);
}

.footer-note {
    color: var(--text-tertiary);
    font-size: var(--text-xs);
    text-align: center;
    margin-top: var(--spacing-md);
}

/* ========== 响应式布局 - 平板 ========== */
@media (max-width: 1024px) {
    .sidebar {
        width: 240px;
    }
    
    .main-content {
        margin-left: 240px;
    }
    
    .content-section {
        padding: var(--spacing-xl);
    }
}

/* ========== 响应式布局 - 移动端 ========== */
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
        width: 280px;
    }
    
    .sidebar.active {
        transform: translateX(0);
    }
    
    .sidebar-toggle {
        display: flex;
    }
    
    .main-content {
        margin-left: 0;
    }
    
    .mobile-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .content-section {
        padding: var(--spacing-lg);
    }
    
    .footer {
        padding: var(--spacing-xl) var(--spacing-lg);
    }
    
    .footer-links {
        flex-direction: column;
        gap: var(--spacing-md);
    }
}

/* ========== 移动端侧边栏遮罩 ========== */
.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: calc(var(--z-fixed) - 1);
    opacity: 0;
    animation: overlayFadeIn 0.3s ease-out forwards;
}

@keyframes overlayFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes overlayFadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

/* ========== 基础动画 ========== */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

/* ========== 性能优化 ========== */
.sidebar,
.main-content,
.mobile-header {
    will-change: transform;
}

/* 减少动画开销 */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;