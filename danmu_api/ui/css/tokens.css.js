// language=CSS
export const tokensCssContent = /* css */ `
/* ========================================
   设计令牌 - Design Tokens
   现代化玻璃拟态风格的基础变量系统
   ======================================== */

:root {
    /* ========== 颜色系统 - 亮色模式 ========== */
    
    /* 主色调 - 渐变蓝紫 */
    --primary-color: #3b82f6;
    --primary-hover: #2563eb;
    --primary-light: #60a5fa;
    --primary-dark: #1e40af;
    
    /* 成功色 - 翠绿 */
    --success-color: #10b981;
    --success-hover: #059669;
    --success-light: #34d399;
    
    /* 警告色 - 琥珀 */
    --warning-color: #f59e0b;
    --warning-hover: #d97706;
    --warning-light: #fbbf24;
    
    /* 危险色 - 玫红 */
    --danger-color: #ef4444;
    --danger-hover: #dc2626;
    --danger-light: #f87171;
    
    /* 信息色 - 青色 */
    --info-color: #06b6d4;
    --info-hover: #0891b2;
    --info-light: #22d3ee;
    
    /* 背景层级 - 玻璃拟态 */
    --bg-base: #ffffff;
    --bg-primary: rgba(255, 255, 255, 0.85);
    --bg-secondary: rgba(249, 250, 251, 0.8);
    --bg-tertiary: rgba(243, 244, 246, 0.7);
    --bg-hover: rgba(243, 244, 246, 0.9);
    --bg-active: rgba(229, 231, 235, 0.95);
    
    /* 文字颜色 */
    --text-primary: #111827;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;
    --text-inverse: #ffffff;
    
    /* 边框颜色 */
    --border-color: rgba(229, 231, 235, 0.6);
    --border-hover: rgba(209, 213, 219, 0.8);
    --border-active: rgba(156, 163, 175, 0.9);
    
    /* 阴影系统 */
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.03);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
    
    /* 玻璃效果 */
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.2);
    --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    --glass-blur: 12px;
    
    /* 渐变色 */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-success: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    --gradient-warning: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    --gradient-danger: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-info: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --gradient-dark: linear-gradient(135deg, #434343 0%, #000000 100%);
    
    /* 间距系统 */
    --spacing-xs: 0.25rem;    /* 4px */
    --spacing-sm: 0.5rem;     /* 8px */
    --spacing-md: 1rem;       /* 16px */
    --spacing-lg: 1.5rem;     /* 24px */
    --spacing-xl: 2rem;       /* 32px */
    --spacing-2xl: 3rem;      /* 48px */
    --spacing-3xl: 4rem;      /* 64px */
    
    /* 圆角系统 */
    --radius-sm: 0.375rem;    /* 6px */
    --radius-md: 0.5rem;      /* 8px */
    --radius-lg: 0.75rem;     /* 12px */
    --radius-xl: 1rem;        /* 16px */
    --radius-2xl: 1.5rem;     /* 24px */
    --radius-full: 9999px;
    
    /* 字体系统 */
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;
    
    /* 字号系统 */
    --text-xs: 0.75rem;       /* 12px */
    --text-sm: 0.875rem;      /* 14px */
    --text-base: 1rem;        /* 16px */
    --text-lg: 1.125rem;      /* 18px */
    --text-xl: 1.25rem;       /* 20px */
    --text-2xl: 1.5rem;       /* 24px */
    --text-3xl: 1.875rem;     /* 30px */
    --text-4xl: 2.25rem;      /* 36px */
    
    /* 字重系统 */
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    
    /* 行高系统 */
    --leading-none: 1;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
    --leading-loose: 2;
    
    /* 过渡动画 */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-smooth: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
    
    /* Z-index 层级 */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
    
    /* 滚动条 */
    --scrollbar-width: 8px;
    --scrollbar-bg: rgba(0, 0, 0, 0.05);
    --scrollbar-thumb: rgba(0, 0, 0, 0.2);
    --scrollbar-thumb-hover: rgba(0, 0, 0, 0.3);
}

/* ========== 暗色模式 - Dark Mode ========== */
[data-theme="dark"] {
    /* 主色调 - 提高亮度 */
    --primary-color: #60a5fa;
    --primary-hover: #3b82f6;
    --primary-light: #93c5fd;
    --primary-dark: #2563eb;
    
    /* 成功色 */
    --success-color: #34d399;
    --success-hover: #10b981;
    --success-light: #6ee7b7;
    
    /* 警告色 */
    --warning-color: #fbbf24;
    --warning-hover: #f59e0b;
    --warning-light: #fcd34d;
    
    /* 危险色 */
    --danger-color: #f87171;
    --danger-hover: #ef4444;
    --danger-light: #fca5a5;
    
    /* 信息色 */
    --info-color: #22d3ee;
    --info-hover: #06b6d4;
    --info-light: #67e8f9;
    
    /* 背景层级 - 深色玻璃拟态 */
    --bg-base: #0A0F1E;
    --bg-primary: rgba(15, 23, 42, 0.85);
    --bg-secondary: rgba(30, 41, 59, 0.8);
    --bg-tertiary: rgba(51, 65, 85, 0.7);
    --bg-hover: rgba(51, 65, 85, 0.9);
    --bg-active: rgba(71, 85, 105, 0.95);
    
    /* 文字颜色 */
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --text-inverse: #0f172a;
    
    /* 边框颜色 */
    --border-color: rgba(71, 85, 105, 0.6);
    --border-hover: rgba(100, 116, 139, 0.8);
    --border-active: rgba(148, 163, 184, 0.9);
    
    /* 阴影系统 - 深色模式增强 */
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.6), 0 4px 6px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.7), 0 10px 10px rgba(0, 0, 0, 0.5);
    --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.8);
    
    /* 玻璃效果 */
    --glass-bg: rgba(15, 23, 42, 0.7);
    --glass-border: rgba(148, 163, 184, 0.1);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    --glass-blur: 16px;
    
    /* 渐变色 - 暗色模式优化 */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-success: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    --gradient-warning: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    --gradient-danger: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-info: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --gradient-dark: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    /* 滚动条 - 暗色 */
    --scrollbar-bg: rgba(255, 255, 255, 0.05);
    --scrollbar-thumb: rgba(255, 255, 255, 0.2);
    --scrollbar-thumb-hover: rgba(255, 255, 255, 0.3);
}

/* ========== 响应式断点 ========== */
/* 这些变量主要在 JS 中使用，CSS 中通过媒体查询实现 */
:root {
    --breakpoint-xs: 0;
    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
    --breakpoint-2xl: 1536px;
}

/* ========== 动画时间函数 ========== */
:root {
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* ========== 性能优化 ========== */
* {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
}

/* 优化字体渲染 */
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
}
`;