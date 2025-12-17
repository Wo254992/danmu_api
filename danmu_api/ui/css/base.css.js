// language=CSS
export const baseCssContent = /* css */ `
/* ========================================
   CSS变量定义 - 主题系统
   ======================================== */
:root {
    /* 浅色模式颜色 - 引用色阶系统 */
    --bg-primary: rgba(255, 255, 255, 0.95);
    --bg-secondary: rgba(248, 250, 252, 0.9);
    --bg-tertiary: rgba(241, 245, 249, 0.85);
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --text-tertiary: #94a3b8;
    --border-color: rgba(226, 232, 240, 0.8);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
    --blur-sm: blur(8px);
    --blur-md: blur(12px);
    --blur-lg: blur(16px);
    
    /* 功能色 - 引用色阶 */
    --primary-color: var(--primary-500);
    --primary-hover: var(--primary-600);
    --success-color: var(--success-500);
    --success-hover: var(--success-600);
    --warning-color: var(--warning-500);
    --warning-hover: var(--warning-600);
    --danger-color: var(--danger-500);
    --danger-hover: var(--danger-600);
    
    /* 渐变色 */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-success: linear-gradient(135deg, #10b981 0%, #059669 100%);
    --gradient-warning: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    --gradient-danger: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    
    /* 过渡效果 */
    --transition-fast: 0.15s ease;
    --transition-base: 0.3s ease;
    --transition-slow: 0.5s ease;
    
    /* 圆角 */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
}

/* 深色模式 */
[data-theme="dark"] {
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
    
    /* 深色模式功能色调整 - 引用色阶 */
    --primary-color: var(--primary-400);
    --primary-hover: var(--primary-500);
    --success-color: var(--success-400);
    --success-hover: var(--success-500);
    --warning-color: var(--warning-400);
    --warning-hover: var(--warning-500);
    --danger-color: var(--danger-400);
    --danger-hover: var(--danger-500);
}

/* ========================================
   基础重置
   ======================================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: var(--text-primary);
    background: var(--bg-secondary);
    line-height: 1.6;
    overflow-x: hidden;
    transition: background var(--transition-base);
    max-width: 100vw;
}

* {
    box-sizing: border-box;
}

/* 滚动条美化 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--bg-tertiary);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
    transition: background var(--transition-fast);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--text-tertiary);
}

/* ========================================
   布局容器
   ======================================== */
.app-container {
    display: flex;
    min-height: 100vh;
    position: relative;
    max-width: 100vw;
    overflow-x: hidden;
}

.main-content {
    flex: 1;
    padding: 2rem;
    margin-left: 280px;
    transition: margin-left var(--transition-base);
}

/* ========================================
   顶部进度条
   ======================================== */
.progress-bar-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 9999;
    transition: width 0.3s ease, opacity 0.3s ease;
    opacity: 0;
}

.progress-bar-top.active {
    opacity: 1;
}

/* ========================================
   页脚
   ======================================== */
.footer {
    margin-top: 4rem;
    padding: 2rem;
    background: var(--bg-primary);
    backdrop-filter: var(--blur-md);
    border-top: 1px solid var(--border-color);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    box-shadow: var(--shadow-md);
}

.footer-description {
    margin-bottom: 1.5rem;
}

.footer-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    line-height: 1.7;
}

.footer-links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}

.footer-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
}

.footer-link:hover {
    color: var(--primary-color);
    background: var(--bg-tertiary);
    transform: translateY(-2px);
}

.footer-link-icon {
    font-size: 1.25rem;
}

.footer-icon {
    width: 20px;
    height: 20px;
}

.footer-note {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    text-align: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

/* ========================================
   工具类
   ======================================== */
.text-center {
    text-align: center;
}

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

/* ========================================
   动画关键帧
   ======================================== */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
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

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(30px);
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

@keyframes slideInRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes modalSlideOut {
    from {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
    to {
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
    }
}

/* ========================================
   加载遮罩
   ======================================== */
.loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: var(--blur-lg);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.loading-overlay.active {
    display: flex;
}

.loading-content {
    text-align: center;
    background: var(--bg-primary);
    padding: 3rem;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    backdrop-filter: var(--blur-md);
    max-width: 400px;
}

.loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1.5rem;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-spinner-small {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    vertical-align: middle;
}

.loading-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.loading-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
}
`;