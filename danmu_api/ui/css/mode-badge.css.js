// language=CSS
export const modeBadgeCssContent = /* css */ `
/* ========================================
   访问模式徽章样式
   ======================================== */
/* 移动端顶栏模式徽章 */
.mode-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 5px 10px;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    margin-left: auto;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all var(--transition-fast);
    line-height: 1.2;
}

.mode-badge-icon {
    font-size: 0.8125rem;
    line-height: 1;
    display: flex;
    align-items: center;
}

.mode-badge-text {
    color: var(--text-secondary);
    line-height: 1;
}

/* 预览模式 - 灰色 */
.mode-badge.mode-preview {
    background: rgba(107, 114, 128, 0.1);
    border-color: rgba(107, 114, 128, 0.3);
}

.mode-badge.mode-preview .mode-badge-text {
    color: var(--gray-500);
}

/* 用户模式 - 蓝色 */
.mode-badge.mode-user {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
}

.mode-badge.mode-user .mode-badge-text {
    color: var(--info-color);
}

/* 管理员模式 - 绿色 */
.mode-badge.mode-admin {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.3);
}

.mode-badge.mode-admin .mode-badge-text {
    color: var(--success-color);
}

/* 侧边栏访问模式项 */
.access-mode-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-sm);
    margin-bottom: var(--spacing-md);
    border: 1px solid var(--border-color);
    transition: all var(--transition-fast);
}

.access-mode-icon {
    font-size: 1rem;
    line-height: 1;
    display: flex;
    align-items: center;
}

.access-mode-text {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-secondary);
    line-height: 1.2;
}

/* 预览模式 - 灰色 */
.access-mode-item.mode-preview {
    background: rgba(107, 114, 128, 0.08);
    border-color: rgba(107, 114, 128, 0.2);
}

.access-mode-item.mode-preview .access-mode-text {
    color: var(--gray-500);
}

/* 用户模式 - 蓝色 */
.access-mode-item.mode-user {
    background: rgba(59, 130, 246, 0.08);
    border-color: rgba(59, 130, 246, 0.25);
}

.access-mode-item.mode-user .access-mode-text {
    color: var(--info-color);
}

/* 管理员模式 - 绿色 */
.access-mode-item.mode-admin {
    background: rgba(16, 185, 129, 0.08);
    border-color: rgba(16, 185, 129, 0.25);
}

.access-mode-item.mode-admin .access-mode-text {
    color: var(--success-color);
}

/* 深色模式适配 */
[data-theme="dark"] .mode-badge.mode-preview {
    background: rgba(161, 161, 170, 0.1);
    border-color: rgba(161, 161, 170, 0.25);
}

[data-theme="dark"] .mode-badge.mode-user {
    background: rgba(96, 165, 250, 0.1);
    border-color: rgba(96, 165, 250, 0.25);
}

[data-theme="dark"] .mode-badge.mode-admin {
    background: rgba(52, 211, 153, 0.1);
    border-color: rgba(52, 211, 153, 0.25);
}

[data-theme="dark"] .access-mode-item.mode-preview {
    background: rgba(161, 161, 170, 0.08);
    border-color: rgba(161, 161, 170, 0.2);
}

[data-theme="dark"] .access-mode-item.mode-user {
    background: rgba(96, 165, 250, 0.08);
    border-color: rgba(96, 165, 250, 0.2);
}

[data-theme="dark"] .access-mode-item.mode-admin {
    background: rgba(52, 211, 153, 0.08);
    border-color: rgba(52, 211, 153, 0.2);
}

/* 移动端响应式 */
@media (max-width: 768px) {
    .mode-badge {
        padding: 4px 8px;
        font-size: 0.6875rem;
        gap: 3px;
    }
    
    .mode-badge-icon {
        font-size: 0.75rem;
    }
    
    .access-mode-item {
        padding: var(--spacing-xs) var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
    }
    
    .access-mode-icon {
        font-size: 0.875rem;
    }
    
    .access-mode-text {
        font-size: 0.75rem;
    }
}

@media (max-width: 480px) {
    .mode-badge {
        padding: 3px 6px;
        font-size: 0.625rem;
    }
    
    .mode-badge-icon {
        font-size: 0.6875rem;
    }
}
`;
