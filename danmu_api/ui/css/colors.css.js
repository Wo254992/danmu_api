// language=CSS
export const colorsCssContent = /* css */ `
/* ========================================
   颜色系统 - 色阶定义
   ======================================== */

:root {
    /* Primary 蓝色系 */
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3b82f6;
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    --primary-800: #1e40af;
    --primary-900: #1e3a8a;

    /* Success 绿色系 */
    --success-50: #ecfdf5;
    --success-100: #d1fae5;
    --success-200: #a7f3d0;
    --success-300: #6ee7b7;
    --success-400: #34d399;
    --success-500: #10b981;
    --success-600: #059669;
    --success-700: #047857;
    --success-800: #065f46;
    --success-900: #064e3b;

    /* Warning 橙色系 */
    --warning-50: #fffbeb;
    --warning-100: #fef3c7;
    --warning-200: #fde68a;
    --warning-300: #fcd34d;
    --warning-400: #fbbf24;
    --warning-500: #f59e0b;
    --warning-600: #d97706;
    --warning-700: #b45309;
    --warning-800: #92400e;
    --warning-900: #78350f;

    /* Danger 红色系 */
    --danger-50: #fef2f2;
    --danger-100: #fee2e2;
    --danger-200: #fecaca;
    --danger-300: #fca5a5;
    --danger-400: #f87171;
    --danger-500: #ef4444;
    --danger-600: #dc2626;
    --danger-700: #b91c1c;
    --danger-800: #991b1b;
    --danger-900: #7f1d1d;

    /* Gray 灰色系 */
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

    /* Purple 紫色系 */
    --purple-50: #faf5ff;
    --purple-100: #f3e8ff;
    --purple-200: #e9d5ff;
    --purple-300: #d8b4fe;
    --purple-400: #c084fc;
    --purple-500: #a855f7;
    --purple-600: #9333ea;
    --purple-700: #7e22ce;
    --purple-800: #6b21a8;
    --purple-900: #581c87;

    /* Pink 粉色系 */
    --pink-50: #fdf2f8;
    --pink-100: #fce7f3;
    --pink-200: #fbcfe8;
    --pink-300: #f9a8d4;
    --pink-400: #f472b6;
    --pink-500: #ec4899;
    --pink-600: #db2777;
    --pink-700: #be185d;
    --pink-800: #9f1239;
    --pink-900: #831843;

    /* Teal 青色系 */
    --teal-50: #f0fdfa;
    --teal-100: #ccfbf1;
    --teal-200: #99f6e4;
    --teal-300: #5eead4;
    --teal-400: #2dd4bf;
    --teal-500: #14b8a6;
    --teal-600: #0d9488;
    --teal-700: #0f766e;
    --teal-800: #115e59;
    --teal-900: #134e4a;

    /* Indigo 靛蓝系 */
    --indigo-50: #eef2ff;
    --indigo-100: #e0e7ff;
    --indigo-200: #c7d2fe;
    --indigo-300: #a5b4fc;
    --indigo-400: #818cf8;
    --indigo-500: #6366f1;
    --indigo-600: #4f46e5;
    --indigo-700: #4338ca;
    --indigo-800: #3730a3;
    --indigo-900: #312e81;
}

/* ========================================
   语义化颜色类
   ======================================== */

/* 文本颜色 */
.text-primary { color: var(--text-primary) !important; }
.text-secondary { color: var(--text-secondary) !important; }
.text-tertiary { color: var(--text-tertiary) !important; }
.text-success { color: var(--success-color) !important; }
.text-warning { color: var(--warning-color) !important; }
.text-danger { color: var(--danger-color) !important; }
.text-info { color: var(--primary-color) !important; }

/* 背景颜色 */
.bg-primary { background: var(--bg-primary) !important; }
.bg-secondary { background: var(--bg-secondary) !important; }
.bg-tertiary { background: var(--bg-tertiary) !important; }
.bg-success { background: var(--success-color) !important; color: white !important; }
.bg-warning { background: var(--warning-color) !important; color: white !important; }
.bg-danger { background: var(--danger-color) !important; color: white !important; }
.bg-info { background: var(--primary-color) !important; color: white !important; }

/* 渐变背景 */
.bg-gradient-primary { background: var(--gradient-primary) !important; }
.bg-gradient-success { background: var(--gradient-success) !important; }
.bg-gradient-warning { background: var(--gradient-warning) !important; }
.bg-gradient-danger { background: var(--gradient-danger) !important; }

/* 边框颜色 */
.border-primary { border-color: var(--primary-color) !important; }
.border-success { border-color: var(--success-color) !important; }
.border-warning { border-color: var(--warning-color) !important; }
.border-danger { border-color: var(--danger-color) !important; }

/* ========================================
   彩虹渐变效果
   ======================================== */
.gradient-rainbow {
    background: linear-gradient(
        135deg,
        #667eea 0%,
        #764ba2 25%,
        #f093fb 50%,
        #4facfe 75%,
        #43e97b 100%
    );
}

.gradient-sunset {
    background: linear-gradient(
        135deg,
        #fa709a 0%,
        #fee140 100%
    );
}

.gradient-ocean {
    background: linear-gradient(
        135deg,
        #2e3192 0%,
        #1bffff 100%
    );
}

.gradient-fire {
    background: linear-gradient(
        135deg,
        #f12711 0%,
        #f5af19 100%
    );
}

/* ========================================
   色彩叠加效果
   ======================================== */
.overlay-primary {
    position: relative;
}

.overlay-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--primary-color);
    opacity: 0.1;
    border-radius: inherit;
    pointer-events: none;
}

.overlay-success {
    position: relative;
}

.overlay-success::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--success-color);
    opacity: 0.1;
    border-radius: inherit;
    pointer-events: none;
}

.overlay-warning {
    position: relative;
}

.overlay-warning::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--warning-color);
    opacity: 0.1;
    border-radius: inherit;
    pointer-events: none;
}

.overlay-danger {
    position: relative;
}

.overlay-danger::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--danger-color);
    opacity: 0.1;
    border-radius: inherit;
    pointer-events: none;
}

/* ========================================
   高亮颜色 - 用于代码和特殊标记
   ======================================== */
.highlight-blue { background: var(--primary-100); color: var(--primary-800); }
.highlight-green { background: var(--success-100); color: var(--success-800); }
.highlight-yellow { background: var(--warning-100); color: var(--warning-800); }
.highlight-red { background: var(--danger-100); color: var(--danger-800); }
.highlight-purple { background: var(--purple-100); color: var(--purple-800); }
.highlight-pink { background: var(--pink-100); color: var(--pink-800); }

[data-theme="dark"] .highlight-blue { background: rgba(96, 165, 250, 0.2); color: var(--primary-300); }
[data-theme="dark"] .highlight-green { background: rgba(52, 211, 153, 0.2); color: var(--success-300); }
[data-theme="dark"] .highlight-yellow { background: rgba(251, 191, 36, 0.2); color: var(--warning-300); }
[data-theme="dark"] .highlight-red { background: rgba(248, 113, 113, 0.2); color: var(--danger-300); }
[data-theme="dark"] .highlight-purple { background: rgba(192, 132, 252, 0.2); color: var(--purple-300); }
[data-theme="dark"] .highlight-pink { background: rgba(244, 114, 182, 0.2); color: var(--pink-300); }

/* ========================================
   阴影颜色变体
   ======================================== */
.shadow-primary {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
}

.shadow-success {
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
}

.shadow-warning {
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3) !important;
}

.shadow-danger {
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3) !important;
}

.shadow-purple {
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3) !important;
}

/* ========================================
   悬浮发光效果
   ======================================== */
.glow-primary:hover {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}

.glow-success:hover {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}

.glow-warning:hover {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
}

.glow-danger:hover {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
}

/* ========================================
   颜色过渡动画
   ======================================== */
.color-transition {
    transition: color var(--transition-base),
                background-color var(--transition-base),
                border-color var(--transition-base),
                box-shadow var(--transition-base);
}

/* ========================================
   透明度工具类
   ======================================== */
.opacity-0 { opacity: 0 !important; }
.opacity-10 { opacity: 0.1 !important; }
.opacity-20 { opacity: 0.2 !important; }
.opacity-30 { opacity: 0.3 !important; }
.opacity-40 { opacity: 0.4 !important; }
.opacity-50 { opacity: 0.5 !important; }
.opacity-60 { opacity: 0.6 !important; }
.opacity-70 { opacity: 0.7 !important; }
.opacity-80 { opacity: 0.8 !important; }
.opacity-90 { opacity: 0.9 !important; }
.opacity-100 { opacity: 1 !important; }

/* ========================================
   混合模式
   ======================================== */
.mix-blend-multiply { mix-blend-mode: multiply; }
.mix-blend-screen { mix-blend-mode: screen; }
.mix-blend-overlay { mix-blend-mode: overlay; }
.mix-blend-darken { mix-blend-mode: darken; }
.mix-blend-lighten { mix-blend-mode: lighten; }
.mix-blend-color-dodge { mix-blend-mode: color-dodge; }
.mix-blend-color-burn { mix-blend-mode: color-burn; }
.mix-blend-hard-light { mix-blend-mode: hard-light; }
.mix-blend-soft-light { mix-blend-mode: soft-light; }
.mix-blend-difference { mix-blend-mode: difference; }
.mix-blend-exclusion { mix-blend-mode: exclusion; }
`;