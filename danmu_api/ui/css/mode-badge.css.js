// language=CSS
export const modeBadgeCssContent = /* css */ `
/* ========================================
   模式徽章 - Mode Badge
   管理员模式、用户模式、预览模式的视觉标识
   ======================================== */

/* ========== 模式徽章基础样式 ========== */
.mode-badge {
    position: fixed;
    bottom: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: var(--z-fixed);
    pointer-events: none;
}

.mode-badge-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-full);
    box-shadow: var(--glass-shadow), 0 0 0 1px rgba(0, 0, 0, 0.05);
    animation: modeBadgeSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modeBadgeSlideIn {
    from {
        opacity: 0;
        transform: translateX(100px) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

.mode-badge-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    font-size: 18px;
    flex-shrink: 0;
}

.mode-badge-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.mode-badge-label {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    font-weight: var(--font-medium);
    line-height: 1;
}

.mode-badge-mode {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    line-height: 1;
}

/* 管理员模式样式 */
.mode-badge.admin .mode-badge-icon {
    background: linear-gradient(135deg, #f59e0b, #f97316);
}

.mode-badge.admin .mode-badge-mode {
    color: #f59e0b;
}

/* 用户模式样式 */
.mode-badge.user .mode-badge-icon {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
}

.mode-badge.user .mode-badge-mode {
    color: #3b82f6;
}

/* 预览模式样式 */
.mode-badge.preview .mode-badge-icon {
    background: linear-gradient(135deg, #10b981, #14b8a6);
}

.mode-badge.preview .mode-badge-mode {
    color: #10b981;
}

/* ========== 状态指示器 ========== */
.status-indicator {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    transition: all var(--transition-fast);
}

.status-indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.6;
        transform: scale(1.2);
    }
}

/* 成功状态 */
.status-indicator.success {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-color);
}

.status-indicator.success .status-indicator-dot {
    background: var(--success-color);
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

/* 警告状态 */
.status-indicator.warning {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning-color);
}

.status-indicator.warning .status-indicator-dot {
    background: var(--warning-color);
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

/* 错误状态 */
.status-indicator.error {
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger-color);
}

.status-indicator.error .status-indicator-dot {
    background: var(--danger-color);
    box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
}

/* 信息状态 */
.status-indicator.info {
    background: rgba(59, 130, 246, 0.15);
    color: var(--primary-color);
}

.status-indicator.info .status-indicator-dot {
    background: var(--primary-color);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
}

/* 进行中状态 */
.status-indicator.processing {
    background: rgba(139, 92, 246, 0.15);
    color: #8b5cf6;
}

.status-indicator.processing .status-indicator-dot {
    background: #8b5cf6;
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
    animation: statusSpin 1s linear infinite;
}

@keyframes statusSpin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* ========== 加载指示器 ========== */
.loading-indicator {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.5rem 0.875rem;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    box-shadow: var(--shadow-sm);
}

.loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: loadingSpin 0.8s linear infinite;
}

@keyframes loadingSpin {
    to {
        transform: rotate(360deg);
    }
}

/* ========== 徽章组合样式 ========== */
.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    line-height: 1.4;
}

/* 主要徽章 */
.badge.primary {
    background: rgba(59, 130, 246, 0.15);
    color: var(--primary-color);
}

/* 次要徽章 */
.badge.secondary {
    background: var(--bg-secondary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
}

/* 成功徽章 */
.badge.success {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-color);
}

/* 警告徽章 */
.badge.warning {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning-color);
}

/* 错误徽章 */
.badge.danger {
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger-color);
}

/* 信息徽章 */
.badge.info {
    background: rgba(14, 165, 233, 0.15);
    color: #0ea5e9;
}

/* 徽章图标 */
.badge-icon {
    font-size: var(--text-sm);
    line-height: 1;
}

/* ========== 计数徽章 ========== */
.count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 0.375rem;
    background: var(--danger-color);
    color: white;
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: var(--font-bold);
    line-height: 1;
}

.count-badge.empty {
    display: none;
}

/* ========== 新功能徽章 ========== */
.new-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 0.5rem;
    background: linear-gradient(135deg, #ec4899, #f97316);
    color: white;
    border-radius: var(--radius-full);
    font-size: 10px;
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
    animation: newBadgePulse 2s ease-in-out infinite;
}

@keyframes newBadgePulse {
    0%, 100% {
        box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
    }
    50% {
        box-shadow: 0 4px 16px rgba(236, 72, 153, 0.6);
    }
}

.new-badge::before {
    content: '✨';
    font-size: 10px;
}

/* ========== 在线状态徽章 ========== */
.online-badge {
    position: relative;
    display: inline-block;
}

.online-badge::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background: var(--success-color);
    border: 2px solid var(--bg-primary);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.online-badge.offline::after {
    background: var(--text-tertiary);
    box-shadow: none;
}

.online-badge.busy::after {
    background: var(--warning-color);
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

/* ========== 进度徽章 ========== */
.progress-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.375rem 0.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
}

.progress-bar-mini {
    width: 60px;
    height: 4px;
    background: var(--bg-tertiary);
    border-radius: var(--radius-full);
    overflow: hidden;
}

.progress-bar-mini-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: var(--radius-full);
    transition: width var(--transition-base);
}

.progress-text {
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
}

/* ========== 验证徽章 ========== */
.verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.1));
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--primary-color);
}

.verified-badge::before {
    content: '✓';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    font-size: 10px;
    font-weight: var(--font-bold);
}

/* ========== 热门徽章 ========== */
.hot-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.1));
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    color: var(--danger-color);
    animation: hotBadgeShake 2s ease-in-out infinite;
}

@keyframes hotBadgeShake {
    0%, 100% {
        transform: rotate(0deg);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: rotate(-2deg);
    }
    20%, 40%, 60%, 80% {
        transform: rotate(2deg);
    }
}

.hot-badge::before {
    content: '🔥';
    font-size: 12px;
}

/* ========== 响应式优化 ========== */
@media (max-width: 768px) {
    .mode-badge {
        bottom: var(--spacing-md);
        right: var(--spacing-md);
    }
    
    .mode-badge-content {
        padding: var(--spacing-sm) var(--spacing-md);
    }
    
    .mode-badge-icon {
        width: 28px;
        height: 28px;
        font-size: 16px;
    }
    
    .mode-badge-label {
        font-size: 10px;
    }
    
    .mode-badge-mode {
        font-size: var(--text-xs);
    }
}

@media (max-width: 480px) {
    .mode-badge {
        bottom: var(--spacing-sm);
        right: var(--spacing-sm);
    }
    
    .mode-badge-content {
        padding: var(--spacing-xs) var(--spacing-sm);
        gap: var(--spacing-sm);
    }
    
    .mode-badge-icon {
        width: 24px;
        height: 24px;
        font-size: 14px;
    }
    
    .mode-badge-text {
        display: none;
    }
}

/* ========== 打印样式 ========== */
@media print {
    .mode-badge,
    .loading-indicator,
    .status-indicator {
        display: none !important;
    }
}
`;
