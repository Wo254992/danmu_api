// language=CSS
export const previewStatsCssContent = /* css */ `
/* ========================================
   配置预览统计卡片样式
   ======================================== */
.preview-hero-card {
    position: relative;
    background: var(--bg-card);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
}

.preview-hero-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--primary-color);
}

.preview-hero-content {
    position: relative;
}

.preview-hero-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
}

.preview-hero-icon {
    width: 48px;
    height: 48px;
    background: var(--primary-color);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all var(--transition-base);
}

.preview-hero-card:hover .preview-hero-icon {
    transform: scale(1.05);
}

.preview-hero-icon svg {
    width: 24px;
    height: 24px;
    color: white;
    stroke-width: 2;
}

.preview-hero-titles {
    flex: 1;
    min-width: 0;
}

.preview-hero-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
    letter-spacing: -0.3px;
}

.preview-hero-subtitle {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 500;
}

.preview-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
}

.preview-stat-card {
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    border: 1px solid transparent;
    transition: all var(--transition-base);
}

.preview-stat-card:hover {
    transform: translateY(-2px);
    border-color: var(--border-color);
    background: var(--bg-card);
}

.stat-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all var(--transition-base);
}

.preview-stat-card:hover .stat-icon-wrapper {
    transform: scale(1.1);
}

.stat-icon-primary {
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary-color);
}

.stat-icon-success {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success-color);
}

.stat-icon-info {
    background: rgba(59, 130, 246, 0.1);
    color: var(--info-color);
}

.stat-icon-warning {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning-color);
}

.stat-icon-wrapper svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
}

.stat-content {
    flex: 1;
    min-width: 0;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
    margin-bottom: 2px;
    letter-spacing: -0.3px;
}

.stat-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 500;
    letter-spacing: 0.3px;
}

/* 紧凑型统计卡片 */
.stat-card-compact {
    padding: var(--spacing-md) !important;
}

.stat-card-compact .stat-icon-wrapper {
    width: 36px;
    height: 36px;
}

.stat-card-compact .stat-icon-wrapper svg {
    width: 18px;
    height: 18px;
}

.stat-card-compact .stat-value {
    font-size: 1.25rem;
}

.stat-card-compact .stat-label {
    font-size: 0.7rem;
}

/* 部署平台图标 */
.stat-icon-deploy {
    background: rgba(139, 92, 246, 0.1);
    color: #8b5cf6;
}

[data-theme="dark"] .stat-icon-deploy {
    background: rgba(167, 139, 250, 0.15);
    color: #a78bfa;
}

/* 系统状态图标 */
.stat-icon-status {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success-color);
    transition: all var(--transition-base);
}

.stat-icon-status.status-error {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger-color);
}

.stat-icon-status.status-warning {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning-color);
}

/* 状态值文本 */
.stat-value-text {
    font-size: 1rem !important;
    text-transform: capitalize;
}

.stat-value-status {
    font-size: 0.9rem !important;
    font-weight: 600;
}

.stat-value-status.status-running {
    color: var(--success-color);
}

.stat-value-status.status-error {
    color: var(--danger-color);
}

.stat-value-status.status-warning {
    color: var(--warning-color);
}

/* 系统状态卡片动画 */
#system-status-card.status-error {
    animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.2);
    }
    50% {
        box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
    }
}

/* 部署平台徽章颜色 */
.deploy-badge-node { color: #68a063; }
.deploy-badge-vercel { color: #000000; }
[data-theme="dark"] .deploy-badge-vercel { color: #ffffff; }
.deploy-badge-netlify { color: #00c7b7; }
.deploy-badge-cloudflare { color: #f38020; }
.deploy-badge-edgeone { color: #0052d9; }
.deploy-badge-docker { color: #2496ed; }

/* 版本图标 */
.stat-icon-version {
    background: rgba(236, 72, 153, 0.1);
    color: #ec4899;
}

[data-theme="dark"] .stat-icon-version {
    background: rgba(244, 114, 182, 0.15);
    color: #f472b6;
}

/* 模式图标 */
.stat-icon-mode {
    background: rgba(156, 163, 175, 0.1);
    color: #6b7280;
}

[data-theme="dark"] .stat-icon-mode {
    background: rgba(161, 161, 170, 0.15);
    color: #a1a1aa;
}

.stat-icon-mode.mode-preview {
    background: rgba(156, 163, 175, 0.1);
    color: #6b7280;
}

[data-theme="dark"] .stat-icon-mode.mode-preview {
    background: rgba(161, 161, 170, 0.15);
    color: #a1a1aa;
}

.stat-icon-mode.mode-user {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

[data-theme="dark"] .stat-icon-mode.mode-user {
    background: rgba(52, 211, 153, 0.15);
    color: #34d399;
}

.stat-icon-mode.mode-admin {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

[data-theme="dark"] .stat-icon-mode.mode-admin {
    background: rgba(248, 113, 113, 0.15);
    color: #f87171;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .preview-hero-card {
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
    }
    
    .preview-hero-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
        padding-bottom: var(--spacing-md);
    }
    
    .preview-hero-icon {
        width: 44px;
        height: 44px;
    }
    
    .preview-hero-icon svg {
        width: 22px;
        height: 22px;
    }
    
    .preview-hero-title {
        font-size: 1.25rem;
    }
    
    .preview-hero-subtitle {
        font-size: 0.8125rem;
    }
    
    .preview-stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-xs);
    }
    
    .preview-stat-card,
    .stat-card-compact {
        padding: var(--spacing-sm) !important;
    }
    
    .stat-icon-wrapper,
    .stat-card-compact .stat-icon-wrapper {
        width: 32px;
        height: 32px;
    }
    
    .stat-icon-wrapper svg,
    .stat-card-compact .stat-icon-wrapper svg {
        width: 16px;
        height: 16px;
    }
    
    .stat-value,
    .stat-card-compact .stat-value {
        font-size: 1.125rem;
    }
    
    .stat-label,
    .stat-card-compact .stat-label {
        font-size: 0.65rem;
    }
    
    .stat-value-text {
        font-size: 0.875rem !important;
    }
    
    .stat-value-status {
        font-size: 0.8rem !important;
    }
}

@media (max-width: 480px) {
    .preview-hero-title {
        font-size: 1.125rem;
    }
    
    .stat-value {
        font-size: 1.125rem;
    }
}
`;
