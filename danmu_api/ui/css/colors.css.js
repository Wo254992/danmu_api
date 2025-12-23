// language=CSS
export const colorsCssContent = /* css */ `
/* ========================================
   颜色系统 - Colors System
   状态色、语义色、渐变色的应用类
   ======================================== */

/* ========== 文字颜色工具类 ========== */
.text-primary {
    color: var(--text-primary);
}

.text-secondary {
    color: var(--text-secondary);
}

.text-tertiary {
    color: var(--text-tertiary);
}

.text-inverse {
    color: var(--text-inverse);
}

.text-success {
    color: var(--success-color);
}

.text-warning {
    color: var(--warning-color);
}

.text-danger {
    color: var(--danger-color);
}

.text-info {
    color: var(--info-color);
}

/* ========== 背景颜色工具类 ========== */
.bg-primary {
    background: var(--bg-primary);
}

.bg-secondary {
    background: var(--bg-secondary);
}

.bg-tertiary {
    background: var(--bg-tertiary);
}

.bg-success {
    background: var(--success-color);
    color: var(--text-inverse);
}

.bg-warning {
    background: var(--warning-color);
    color: var(--text-inverse);
}

.bg-danger {
    background: var(--danger-color);
    color: var(--text-inverse);
}

.bg-info {
    background: var(--info-color);
    color: var(--text-inverse);
}

/* ========== 渐变背景 ========== */
.bg-gradient-primary {
    background: var(--gradient-primary);
    color: var(--text-inverse);
}

.bg-gradient-success {
    background: var(--gradient-success);
    color: var(--text-inverse);
}

.bg-gradient-warning {
    background: var(--gradient-warning);
    color: var(--text-inverse);
}

.bg-gradient-danger {
    background: var(--gradient-danger);
    color: var(--text-inverse);
}

.bg-gradient-info {
    background: var(--gradient-info);
    color: var(--text-inverse);
}

.bg-gradient-dark {
    background: var(--gradient-dark);
    color: var(--text-inverse);
}

/* ========== 边框颜色 ========== */
.border-primary {
    border-color: var(--primary-color);
}

.border-success {
    border-color: var(--success-color);
}

.border-warning {
    border-color: var(--warning-color);
}

.border-danger {
    border-color: var(--danger-color);
}

.border-info {
    border-color: var(--info-color);
}

/* ========== 状态指示器 ========== */
.status-dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    flex-shrink: 0;
    position: relative;
    transition: all var(--transition-fast);
}

.status-dot::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: var(--radius-full);
    background: inherit;
    opacity: 0.3;
    animation: statusPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.status-running {
    background: var(--success-color);
}

.status-warning {
    background: var(--warning-color);
}

.status-error {
    background: var(--danger-color);
}

.status-info {
    background: var(--info-color);
}

.status-idle {
    background: var(--text-tertiary);
}

@keyframes statusPulse {
    0%, 100% {
        opacity: 0.3;
        transform: scale(1);
    }
    50% {
        opacity: 0.1;
        transform: scale(1.5);
    }
}

/* ========== 移动端状态指示器 ========== */
.mobile-status-indicator {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    cursor: pointer;
    flex-shrink: 0;
}

.mobile-status-indicator:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    transform: scale(1.05);
}

.mobile-status-indicator:active {
    transform: scale(0.95);
}

/* ========== 徽章颜色 ========== */
.badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    line-height: 1;
    white-space: nowrap;
    transition: all var(--transition-fast);
}

.badge-primary {
    background: rgba(59, 130, 246, 0.15);
    color: var(--primary-color);
    border: 1px solid rgba(59, 130, 246, 0.3);
}

.badge-success {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-color);
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-warning {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning-color);
    border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge-danger {
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger-color);
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.badge-info {
    background: rgba(6, 182, 212, 0.15);
    color: var(--info-color);
    border: 1px solid rgba(6, 182, 212, 0.3);
}

.badge-neutral {
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
}

/* ========== 进度条颜色 ========== */
.progress-bar-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--gradient-primary);
    z-index: calc(var(--z-modal) + 10);
    transition: width var(--transition-base), opacity var(--transition-fast);
    opacity: 0;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.progress-bar-top.active {
    opacity: 1;
}

/* ========== 标签颜色系统 ========== */
.tag {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    transition: all var(--transition-fast);
    cursor: default;
}

.tag-primary {
    background: var(--glass-bg);
    color: var(--primary-color);
    border: 1px solid rgba(59, 130, 246, 0.3);
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.tag-success {
    background: var(--glass-bg);
    color: var(--success-color);
    border: 1px solid rgba(16, 185, 129, 0.3);
    box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.1);
}

.tag-warning {
    background: var(--glass-bg);
    color: var(--warning-color);
    border: 1px solid rgba(245, 158, 11, 0.3);
    box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.1);
}

.tag-danger {
    background: var(--glass-bg);
    color: var(--danger-color);
    border: 1px solid rgba(239, 68, 68, 0.3);
    box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.1);
}

.tag-info {
    background: var(--glass-bg);
    color: var(--info-color);
    border: 1px solid rgba(6, 182, 212, 0.3);
    box-shadow: 0 0 0 1px rgba(6, 182, 212, 0.1);
}

/* ========== 玻璃拟态卡片颜色变体 ========== */
.glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    border-radius: var(--radius-xl);
    overflow: hidden;
}

.glass-card-primary {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%);
    border: 1px solid rgba(59, 130, 246, 0.2);
}

.glass-card-success {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%);
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.glass-card-warning {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%);
    border: 1px solid rgba(245, 158, 11, 0.2);
}

.glass-card-danger {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(248, 113, 113, 0.05) 100%);
    border: 1px solid rgba(239, 68, 68, 0.2);
}

.glass-card-info {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%);
    border: 1px solid rgba(6, 182, 212, 0.2);
}

/* ========== 警告/提示框颜色 ========== */
.alert {
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-lg);
    border: 1px solid;
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.alert-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
}

.alert-content {
    flex: 1;
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
}

.alert-success {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.3);
    color: var(--success-color);
}

[data-theme="dark"] .alert-success {
    background: rgba(16, 185, 129, 0.15);
}

.alert-warning {
    background: rgba(245, 158, 11, 0.1);
    border-color: rgba(245, 158, 11, 0.3);
    color: var(--warning-color);
}

[data-theme="dark"] .alert-warning {
    background: rgba(245, 158, 11, 0.15);
}

.alert-danger {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: var(--danger-color);
}

[data-theme="dark"] .alert-danger {
    background: rgba(239, 68, 68, 0.15);
}

.alert-info {
    background: rgba(6, 182, 212, 0.1);
    border-color: rgba(6, 182, 212, 0.3);
    color: var(--info-color);
}

[data-theme="dark"] .alert-info {
    background: rgba(6, 182, 212, 0.15);
}

/* ========== 加载状态颜色 ========== */
.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: var(--radius-full);
    animation: spin 0.8s linear infinite;
}

.loading-spinner-small {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: currentColor;
    border-radius: var(--radius-full);
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* ========== JSON 语法高亮颜色 ========== */
.json-key {
    color: #0c7cd5;
}

[data-theme="dark"] .json-key {
    color: #4fc3f7;
}

.json-string {
    color: #22863a;
}

[data-theme="dark"] .json-string {
    color: #a5d6a7;
}

.json-number {
    color: #005cc5;
}

[data-theme="dark"] .json-number {
    color: #79c0ff;
}

.json-boolean {
    color: #d73a49;
}

[data-theme="dark"] .json-boolean {
    color: #ff7b72;
}

.json-null {
    color: #6f42c1;
}

[data-theme="dark"] .json-null {
    color: #d2a8ff;
}

/* ========== 主题切换动画 ========== */
@keyframes themeRipple {
    to {
        width: 3000px;
        height: 3000px;
        opacity: 0;
    }
}

/* ========== 渐变文字效果 ========== */
.gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.gradient-text-success {
    background: var(--gradient-success);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.gradient-text-warning {
    background: var(--gradient-warning);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.gradient-text-danger {
    background: var(--gradient-danger);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* ========== 彩色边框效果 ========== */
.border-gradient {
    position: relative;
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
}

.border-gradient::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-lg);
    padding: 1px;
    background: var(--gradient-primary);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
}

/* ========== 悬浮发光效果 ========== */
.glow-primary {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

.glow-success {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.glow-warning {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
}

.glow-danger {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
}

/* ========== 渐变边框动画 ========== */
@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animated-gradient-border {
    position: relative;
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
}

.animated-gradient-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: var(--radius-lg);
    background: linear-gradient(
        45deg,
        var(--primary-color),
        var(--success-color),
        var(--info-color),
        var(--warning-color),
        var(--danger-color),
        var(--primary-color)
    );
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
    z-index: -1;
}

/* ========== 响应式颜色调整 ========== */
@media (max-width: 768px) {
    .badge {
        font-size: 0.625rem;
        padding: 0.2rem 0.5rem;
    }
    
    .tag {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
    }
}

/* ========== 打印样式 ========== */
@media print {
    .status-dot::before {
        animation: none;
    }
    
    .loading-spinner,
    .loading-spinner-small {
        animation: none;
    }
    
    .gradient-text,
    .gradient-text-success,
    .gradient-text-warning,
    .gradient-text-danger {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}
`;