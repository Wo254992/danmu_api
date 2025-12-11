// language=CSS
export const baseCssContent = /* css */ `
/* ========================================
   CSS变量定义 - 浅色模式
   ======================================== */
:root {
    /* 主色调 - 现代化渐变色 */
    --primary-color: #6366f1;
    --primary-hover: #4f46e5;
    --primary-light: #818cf8;
    --primary-dark: #3730a3;
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    /* 辅助色 - 更鲜明的配色 */
    --success-color: #10b981;
    --success-hover: #059669;
    --success-light: #d1fae5;
    --danger-color: #ef4444;
    --danger-hover: #dc2626;
    --danger-light: #fee2e2;
    --warning-color: #f59e0b;
    --warning-light: #fef3c7;
    --info-color: #3b82f6;
    --info-light: #dbeafe;
    
    /* 中性色 */
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    
    /* 背景色 - 浅色模式 */
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --bg-tertiary: #f3f4f6;
    --bg-hover: #f3f4f6;
    --bg-body: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --bg-card: rgba(255, 255, 255, 0.95);
    --blur-md: blur(10px);
    --blur-lg: blur(20px);
    
    /* 文字颜色 */
    --text-primary: #111827;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;
    --text-inverse: #ffffff;
    
    /* 边框 */
    --border-color: #e5e7eb;
    --border-color-hover: #d1d5db;
    --border-radius: 12px;
    --border-radius-sm: 8px;
    --border-radius-lg: 16px;
    --border-radius-xl: 20px;
    
    /* 阴影 - 浅色模式 */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --shadow-colored: 0 10px 30px -5px rgba(99, 102, 241, 0.3);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    
    /* 过渡 */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
    
    /* 间距 */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    
    /* 侧边栏 */
    --sidebar-width: 280px;
    --sidebar-collapsed-width: 80px;
}

/* ========================================
   CSS变量定义 - 深色模式
   ======================================== */
[data-theme="dark"] {
    /* 主色调 - 深色模式下更柔和 */
    --primary-color: #818cf8;
    --primary-hover: #a5b4fc;
    --primary-light: #6366f1;
    --primary-dark: #4f46e5;
    --primary-gradient: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%);
    
    /* 辅助色 - 深色模式适配 */
    --success-color: #34d399;
    --success-hover: #6ee7b7;
    --success-light: rgba(16, 185, 129, 0.1);
    --danger-color: #f87171;
    --danger-hover: #fca5a5;
    --danger-light: rgba(239, 68, 68, 0.1);
    --warning-color: #fbbf24;
    --warning-light: rgba(245, 158, 11, 0.1);
    --info-color: #60a5fa;
    --info-light: rgba(59, 130, 246, 0.1);
    
    /* 中性色 - 深色模式反转 */
    --gray-50: #18181b;
    --gray-100: #27272a;
    --gray-200: #3f3f46;
    --gray-300: #52525b;
    --gray-400: #71717a;
    --gray-500: #a1a1aa;
    --gray-600: #d4d4d8;
    --gray-700: #e4e4e7;
    --gray-800: #f4f4f5;
    --gray-900: #fafafa;
    
    /* 背景色 - 深色模式 */
    --bg-primary: #1e1e2e;
    --bg-secondary: #181825;
    --bg-tertiary: #27273a;
    --bg-hover: #2a2a3e;
    --bg-body: linear-gradient(135deg, #1e1e2e 0%, #2d1b4e 100%);
    --bg-card: rgba(30, 30, 46, 0.95);
    
    /* 文字颜色 - 深色模式 */
    --text-primary: #e4e4e7;
    --text-secondary: #a1a1aa;
    --text-tertiary: #71717a;
    --text-inverse: #18181b;
    
    /* 边框 - 深色模式 */
    --border-color: #3f3f46;
    --border-color-hover: #52525b;
    
    /* 阴影 - 深色模式 */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
    --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    --shadow-colored: 0 10px 30px -5px rgba(129, 140, 248, 0.3);
}

/* ========================================
   基础重置
   ======================================== */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    background: var(--bg-body);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
    transition: background var(--transition-base), color var(--transition-base);
}

/* ========================================
   主题切换按钮
   ======================================== */
.theme-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    transition: all var(--transition-base);
}

.theme-toggle:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: var(--shadow-colored);
    border-color: var(--primary-color);
}

.theme-toggle:active {
    transform: scale(0.95);
}

.theme-icon {
    width: 24px;
    height: 24px;
    color: var(--primary-color);
    transition: all var(--transition-base);
}

.theme-toggle:hover .theme-icon {
    color: var(--primary-hover);
}

/* 太阳图标(浅色模式显示) */
.theme-icon-sun {
    display: block;
}

.theme-icon-moon {
    display: none;
}

[data-theme="dark"] .theme-icon-sun {
    display: none;
}

[data-theme="dark"] .theme-icon-moon {
    display: block;
}

@media (max-width: 768px) {
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
}

/* ========================================
   主容器布局
   ======================================== */
.app-container {
    display: flex;
    min-height: 100vh;
    position: relative;
}

/* ========================================
   侧边栏样式 - 无遮罩层版本
   ======================================== */
.sidebar {
    width: var(--sidebar-width);
    background: var(--bg-primary);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transition: transform var(--transition-base);
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid var(--border-color);
}

.sidebar::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, 
        transparent 0%, 
        var(--primary-color) 30%, 
        var(--primary-color) 70%, 
        transparent 100%);
    opacity: 0.3;
    pointer-events: none;
}

.sidebar::-webkit-scrollbar {
    width: 6px;
}

.sidebar::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
}

/* 侧边栏头部 */
.sidebar-header {
    padding: var(--spacing-xl) var(--spacing-lg);
    border-bottom: 2px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    background: linear-gradient(180deg, 
        var(--bg-primary) 0%, 
        var(--bg-secondary) 100%);
    position: relative;
}

.sidebar-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: var(--spacing-lg);
    right: var(--spacing-lg);
    height: 2px;
    background: linear-gradient(90deg, 
        transparent 0%, 
        var(--primary-color) 50%, 
        transparent 100%);
    pointer-events: none;
}

.logo-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex: 1;
    min-width: 0;
}

.logo-image {
    width: 48px;
    height: 48px;
    border-radius: var(--border-radius);
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    border: 2px solid var(--primary-color);
    transition: all var(--transition-base);
}

.logo-image:hover {
    transform: scale(1.05) rotate(5deg);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.logo-text {
    font-size: 1.375rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -0.5px;
}

.sidebar-toggle {
    display: none;
    width: 32px;
    height: 32px;
    background: var(--gray-100);
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: background var(--transition-fast);
    flex-shrink: 0;
}

.sidebar-toggle:hover {
    background: var(--gray-200);
}

.toggle-icon {
    width: 16px;
    height: 2px;
    background: var(--text-primary);
    position: relative;
    display: block;
    transition: transform var(--transition-base);
}

.toggle-icon::before,
.toggle-icon::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: var(--text-primary);
    left: 0;
    transition: transform var(--transition-base);
}

.toggle-icon::before {
    top: -6px;
}

.toggle-icon::after {
    bottom: -6px;
}

/* 版本卡片 - 优化版 */
.version-card {
    padding: var(--spacing-lg);
    margin: var(--spacing-lg);
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    border-radius: var(--border-radius-lg);
    color: white;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
    position: relative;
    overflow: hidden;
}

.version-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: shimmer 8s linear infinite;
    pointer-events: none;
}

@keyframes shimmer {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.version-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) 0;
    position: relative;
    z-index: 1;
}

.version-item:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.version-label {
    font-size: 0.875rem;
    opacity: 0.95;
    font-weight: 500;
}

.version-value {
    font-weight: 700;
    font-size: 0.875rem;
}

.version-latest {
    background: rgba(255, 255, 255, 0.25);
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
    backdrop-filter: blur(10px);
}

.api-endpoint-card {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(255, 255, 255, 0.15);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px);
}

.api-endpoint-card:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
}

.endpoint-label {
    display: block;
    font-size: 0.75rem;
    opacity: 0.9;
    margin-bottom: 4px;
    font-weight: 600;
}

.endpoint-value {
    display: block;
    font-weight: 700;
    font-size: 0.875rem;
    word-break: break-all;
}

.copy-hint {
    display: block;
    font-size: 0.7rem;
    opacity: 0.8;
    margin-top: 4px;
}

/* 导航菜单 - 优化版 */
.nav-menu {
    flex: 1;
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.nav-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--border-radius);
    color: var(--text-secondary);
    text-decoration: none;
    transition: all var(--transition-fast);
    cursor: pointer;
    position: relative;
    font-weight: 500;
}

.nav-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    background: var(--primary-color);
    border-radius: 0 2px 2px 0;
    transition: all var(--transition-base);
    pointer-events: none;
}

.nav-item:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
    transform: translateX(4px);
}

.nav-item:hover::before {
    width: 3px;
    height: 60%;
}

.nav-item.active {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    font-weight: 600;
}

.nav-item.active::before {
    width: 4px;
    height: 70%;
    background: white;
}

.nav-icon {
    width: 20px;
    height: 20px;
    stroke-width: 2;
    flex-shrink: 0;
}

.nav-text {
    font-size: 0.9375rem;
}

/* ========================================
   主内容区
   ======================================== */
.main-content {
    flex: 1;
    margin-left: var(--sidebar-width);
    padding: var(--spacing-2xl);
    background: var(--bg-secondary);
    min-height: 100vh;
    transition: margin-left var(--transition-base);
}

/* 移动端顶栏 */
.mobile-header {
    display: none;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-xl);
    box-shadow: var(--shadow);
}

.mobile-menu-btn {
    width: 40px;
    height: 40px;
    background: var(--gray-100);
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    transition: background var(--transition-fast);
}

.mobile-menu-btn:hover {
    background: var(--gray-200);
}

.mobile-menu-btn span {
    width: 20px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 1px;
    transition: all var(--transition-fast);
}

.mobile-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
}

/* 内容区块 */
.content-section {
    display: none;
    animation: fadeInUp var(--transition-base);
}

.content-section.active {
    display: block;
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

/* 区块头部 */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacing-xl);
    flex-wrap: wrap;
    gap: var(--spacing-md);
}

.section-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.2;
}

.section-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: var(--spacing-sm) 0 0 0;
}

.header-actions {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}

/* ========================================
   顶部进度条
   ======================================== */
.progress-bar-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-base);
    z-index: 9999;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    pointer-events: none;
}

.progress-bar-top.active {
    transform: scaleX(1);
}

/* ========================================
   页脚
   ======================================== */
.footer {
    margin-top: var(--spacing-2xl);
    padding: var(--spacing-xl) var(--spacing-lg);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    text-align: center;
    border: 1px solid var(--border-color);
}

.footer-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: var(--spacing-sm) 0;
    line-height: 1.7;
}

.footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md);
    margin: var(--spacing-lg) 0;
    flex-wrap: wrap;
}

.footer-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all var(--transition-fast);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-sm);
}

.footer-link:hover {
    color: var(--primary-hover);
    background: var(--bg-hover);
}

.footer-icon {
    width: 16px;
    height: 16px;
}

.footer-note {
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin: var(--spacing-sm) 0 0 0;
}

/* ========================================
   滚动条美化
   ======================================== */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--gray-100);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 4px;
    transition: background var(--transition-fast);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
}

/* ========================================
   通用工具类
   ======================================== */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }

.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-tertiary { color: var(--text-tertiary); }
.text-success { color: var(--success-color); }
.text-danger { color: var(--danger-color); }
.text-warning { color: var(--warning-color); }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

.mt-1 { margin-top: var(--spacing-xs); }
.mt-2 { margin-top: var(--spacing-sm); }
.mt-3 { margin-top: var(--spacing-md); }
.mt-4 { margin-top: var(--spacing-lg); }
.mt-5 { margin-top: var(--spacing-xl); }

.mb-1 { margin-bottom: var(--spacing-xs); }
.mb-2 { margin-bottom: var(--spacing-sm); }
.mb-3 { margin-bottom: var(--spacing-md); }
.mb-4 { margin-bottom: var(--spacing-lg); }
.mb-5 { margin-bottom: var(--spacing-xl); }
`;