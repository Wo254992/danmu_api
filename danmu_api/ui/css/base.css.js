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
    --primary-glow: 0 0 20px rgba(99, 102, 241, 0.3);
    
    /* 辅助色 - 更鲜明的配色 */
    --success-color: #10b981;
    --success-hover: #059669;
    --success-light: #d1fae5;
    --success-glow: 0 0 20px rgba(16, 185, 129, 0.3);
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
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    --bg-hover: #f3f4f6;
    --bg-body: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --bg-card: rgba(255, 255, 255, 0.95);
    --bg-glass: rgba(255, 255, 255, 0.8);
    
    /* 文字颜色 */
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --text-tertiary: #94a3b8;
    --text-inverse: #ffffff;
    
    /* 边框 */
    --border-color: #e2e8f0;
    --border-color-hover: #cbd5e1;
    --border-radius: 16px;
    --border-radius-sm: 10px;
    --border-radius-lg: 20px;
    --border-radius-xl: 24px;
    
    /* 阴影 - 浅色模式 */
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    --shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 8px 24px -4px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 12px 40px -8px rgba(0, 0, 0, 0.15);
    --shadow-xl: 0 20px 60px -12px rgba(0, 0, 0, 0.25);
    --shadow-colored: 0 12px 40px -8px rgba(99, 102, 241, 0.4);
    --shadow-inner: inset 0 2px 8px rgba(0, 0, 0, 0.06);
    
    /* 过渡 */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
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
    
    /* 模糊效果 */
    --blur-sm: blur(8px);
    --blur-md: blur(12px);
    --blur-lg: blur(16px);
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
    --primary-glow: 0 0 30px rgba(129, 140, 248, 0.4);
    
    /* 辅助色 - 深色模式适配 */
    --success-color: #34d399;
    --success-hover: #6ee7b7;
    --success-light: rgba(16, 185, 129, 0.1);
    --success-glow: 0 0 30px rgba(52, 211, 153, 0.3);
    --danger-color: #f87171;
    --danger-hover: #fca5a5;
    --danger-light: rgba(239, 68, 68, 0.1);
    --warning-color: #fbbf24;
    --warning-light: rgba(245, 158, 11, 0.1);
    --info-color: #60a5fa;
    --info-light: rgba(59, 130, 246, 0.1);
    
    /* 中性色 - 深色模式反转 */
    --gray-50: #0f172a;
    --gray-100: #1e293b;
    --gray-200: #334155;
    --gray-300: #475569;
    --gray-400: #64748b;
    --gray-500: #94a3b8;
    --gray-600: #cbd5e1;
    --gray-700: #e2e8f0;
    --gray-800: #f1f5f9;
    --gray-900: #f8fafc;
    
    /* 背景色 - 深色模式 */
    --bg-primary: #1e293b;
    --bg-secondary: #0f172a;
    --bg-tertiary: #334155;
    --bg-hover: #475569;
    --bg-body: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
    --bg-card: rgba(30, 41, 59, 0.95);
    --bg-glass: rgba(30, 41, 59, 0.7);
    
    /* 文字颜色 - 深色模式 */
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --text-inverse: #0f172a;
    
    /* 边框 - 深色模式 */
    --border-color: #334155;
    --border-color-hover: #475569;
    
    /* 阴影 - 深色模式 */
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    --shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.5);
    --shadow-md: 0 8px 24px -4px rgba(0, 0, 0, 0.6);
    --shadow-lg: 0 12px 40px -8px rgba(0, 0, 0, 0.7);
    --shadow-xl: 0 20px 60px -12px rgba(0, 0, 0, 0.8);
    --shadow-colored: 0 12px 40px -8px rgba(129, 140, 248, 0.4);
    --shadow-inner: inset 0 2px 8px rgba(0, 0, 0, 0.3);
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
    position: relative;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
}

/* ========================================
   主题切换按钮
   ======================================== */
.theme-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    transition: all var(--transition-spring);
}

.theme-toggle:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: var(--shadow-colored);
    border-color: var(--primary-color);
    background: var(--primary-color);
}

.theme-toggle:hover .theme-icon {
    color: white;
}

.theme-toggle:active {
    transform: scale(0.95);
}

.theme-icon {
    width: 26px;
    height: 26px;
    color: var(--primary-color);
    transition: all var(--transition-base);
}

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
        width: 52px;
        height: 52px;
    }
    
    .theme-icon {
        width: 22px;
        height: 22px;
    }
}

/* ========================================
   主容器布局
   ======================================== */
.app-container {
    display: flex;
    min-height: 100vh;
    position: relative;
    z-index: 1;
}

/* ========================================
   侧边栏样式
   ======================================== */
.sidebar {
    width: var(--sidebar-width);
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    box-shadow: var(--shadow-xl);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
    transition: transform var(--transition-base);
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid var(--border-color);
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
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    background: var(--bg-primary);
}

.logo-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex: 1;
    min-width: 0;
}

.logo-image {
    width: 52px;
    height: 52px;
    border-radius: var(--border-radius-sm);
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: var(--shadow-md);
    border: 2px solid var(--border-color);
    transition: all var(--transition-base);
}

.logo-image:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-lg);
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
    width: 36px;
    height: 36px;
    background: var(--gray-100);
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    flex-shrink: 0;
}

.sidebar-toggle:hover {
    background: var(--primary-color);
}

.sidebar-toggle:hover .toggle-icon,
.sidebar-toggle:hover .toggle-icon::before,
.sidebar-toggle:hover .toggle-icon::after {
    background: white;
}

.toggle-icon {
    width: 18px;
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

/* 版本卡片 */
.version-card {
    padding: var(--spacing-lg);
    margin: var(--spacing-lg);
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    border-radius: var(--border-radius);
    color: white;
    box-shadow: var(--shadow-colored);
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
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-30%, -30%); }
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
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    backdrop-filter: blur(8px);
}

.api-endpoint-card {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(255, 255, 255, 0.15);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    backdrop-filter: blur(8px);
    position: relative;
    z-index: 1;
}

.api-endpoint-card:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
}

.endpoint-label {
    display: block;
    font-size: 0.75rem;
    opacity: 0.9;
    margin-bottom: 6px;
    font-weight: 500;
}

.endpoint-value {
    display: block;
    font-weight: 700;
    font-size: 0.875rem;
    word-break: break-all;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
}

.copy-hint {
    display: block;
    font-size: 0.7rem;
    opacity: 0.75;
    margin-top: 6px;
}

/* 导航菜单 */
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
    border-radius: var(--border-radius-sm);
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
    top: 0;
    bottom: 0;
    width: 0;
    background: var(--primary-color);
    border-radius: 0 4px 4px 0;
    transition: width var(--transition-fast);
}

.nav-item:hover {
    background: var(--gray-100);
    color: var(--text-primary);
    transform: translateX(4px);
}

.nav-item:hover::before {
    width: 4px;
}

.nav-item.active {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    box-shadow: var(--shadow-md);
    transform: translateX(4px);
}

.nav-item.active::before {
    width: 4px;
    background: white;
}

.nav-icon {
    width: 22px;
    height: 22px;
    stroke-width: 2;
    flex-shrink: 0;
}

.nav-text {
    font-weight: 600;
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
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-xl);
    box-shadow: var(--shadow);
}

.mobile-menu-btn {
    width: 44px;
    height: 44px;
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
    background: var(--primary-color);
}

.mobile-menu-btn:hover span {
    background: white;
}

.mobile-menu-btn span {
    width: 22px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 1px;
    transition: all var(--transition-fast);
}

.mobile-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
}

/* 内容区块 */
.content-section {
    display: none;
    animation: fadeInUp var(--transition-slow);
}

.content-section.active {
    display: block;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
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
    margin-bottom: var(--spacing-2xl);
    flex-wrap: wrap;
    gap: var(--spacing-lg);
}

.section-title {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.2;
    letter-spacing: -0.5px;
}

.section-desc {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    margin: var(--spacing-sm) 0 0 0;
    font-weight: 500;
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
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-light), var(--primary-color));
    background-size: 200% 100%;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-base);
    z-index: 9999;
    box-shadow: var(--primary-glow);
}

.progress-bar-top.active {
    transform: scaleX(1);
    animation: progressShimmer 1.5s infinite;
}

@keyframes progressShimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
}

/* ========================================
   页脚
   ======================================== */
.footer {
    margin-top: var(--spacing-3xl);
    padding: var(--spacing-2xl) var(--spacing-xl);
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-lg);
    text-align: center;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
}

.footer-text {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    margin: var(--spacing-sm) 0;
    line-height: 1.7;
}

.footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-xl);
    margin: var(--spacing-xl) 0;
    flex-wrap: wrap;
}

.footer-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9375rem;
    transition: all var(--transition-fast);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-sm);
}

.footer-link:hover {
    color: var(--primary-hover);
    background: var(--primary-light);
    background-opacity: 0.1;
    transform: translateY(-2px);
}

.footer-icon {
    width: 18px;
    height: 18px;
}

.footer-note {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    margin: var(--spacing-sm) 0 0 0;
    font-weight: 500;
}

/* ========================================
   滚动条美化
   ======================================== */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: var(--gray-100);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 5px;
    transition: background var(--transition-fast);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
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