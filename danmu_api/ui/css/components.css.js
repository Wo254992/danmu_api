// language=CSS
export const componentsCssContent = /* css */ `
/* ========================================
   组件样式 - Components
   按钮、卡片、模态框、表格等核心组件
   ======================================== */

/* ========== 按钮系统 ========== */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: 0.625rem 1.25rem;
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all var(--transition-fast);
    position: relative;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
}

.btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity var(--transition-fast);
    pointer-events: none;
}

.btn:hover::before {
    opacity: 1;
}

.btn:active {
    transform: scale(0.97);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.btn-icon {
    width: 18px;
    height: 18px;
    stroke-width: 2;
    flex-shrink: 0;
}

/* 按钮尺寸 */
.btn-sm {
    padding: 0.375rem 0.875rem;
    font-size: var(--text-xs);
}

.btn-sm .btn-icon {
    width: 16px;
    height: 16px;
}

.btn-lg {
    padding: 0.875rem 1.75rem;
    font-size: var(--text-base);
}

.btn-lg .btn-icon {
    width: 20px;
    height: 20px;
}

/* 主要按钮 */
.btn-primary {
    background: var(--primary-color);
    color: var(--text-inverse);
    box-shadow: var(--shadow-sm), 0 0 0 1px rgba(59, 130, 246, 0.1);
}

.btn-primary:hover {
    background: var(--primary-hover);
    box-shadow: var(--shadow-md), 0 0 0 1px rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
}

.btn-primary:active {
    transform: translateY(0) scale(0.97);
}

/* 成功按钮 */
.btn-success {
    background: var(--success-color);
    color: var(--text-inverse);
    box-shadow: var(--shadow-sm), 0 0 0 1px rgba(16, 185, 129, 0.1);
}

.btn-success:hover {
    background: var(--success-hover);
    box-shadow: var(--shadow-md), 0 0 0 1px rgba(16, 185, 129, 0.2);
    transform: translateY(-1px);
}

/* 警告按钮 */
.btn-warning {
    background: var(--warning-color);
    color: var(--text-inverse);
    box-shadow: var(--shadow-sm), 0 0 0 1px rgba(245, 158, 11, 0.1);
}

.btn-warning:hover {
    background: var(--warning-hover);
    box-shadow: var(--shadow-md), 0 0 0 1px rgba(245, 158, 11, 0.2);
    transform: translateY(-1px);
}

/* 危险按钮 */
.btn-danger {
    background: var(--danger-color);
    color: var(--text-inverse);
    box-shadow: var(--shadow-sm), 0 0 0 1px rgba(239, 68, 68, 0.1);
}

.btn-danger:hover {
    background: var(--danger-hover);
    box-shadow: var(--shadow-md), 0 0 0 1px rgba(239, 68, 68, 0.2);
    transform: translateY(-1px);
}

/* 次要按钮 */
.btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-xs);
}

.btn-secondary:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
}

/* 模态框按钮样式 */
.btn-modal {
    min-width: 120px;
}

/* ========== 卡片系统 ========== */
.card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    transition: all var(--transition-base);
}

.card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}

.card-header {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-primary);
}

.card-title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0;
}

.card-body {
    padding: var(--spacing-xl);
}

.card-footer {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-top: 1px solid var(--border-color);
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-md);
}

/* 表单卡片 */
.form-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--glass-shadow);
    margin-bottom: var(--spacing-lg);
}

/* ========== 模态框系统 ========== */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
    z-index: var(--z-modal);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal-container {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-2xl);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transform: scale(0.95);
    opacity: 0;
    transition: all var(--transition-base);
}

.modal-overlay.active .modal-container {
    transform: scale(1);
    opacity: 1;
}

.modal-lg {
    max-width: 800px;
}

.modal-header {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-primary);
    flex-shrink: 0;
}

.modal-title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0;
}

.modal-close {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--text-secondary);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.modal-close:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.modal-body {
    padding: var(--spacing-xl);
    flex: 1;
    overflow-y: auto;
}

.modal-footer {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-top: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-md);
    background: var(--bg-primary);
    flex-shrink: 0;
}

.modal-footer-compact {
    justify-content: center;
}

.modal-desc {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-md);
}

.modal-list {
    margin: var(--spacing-md) 0;
    padding-left: var(--spacing-lg);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
}

.modal-list li {
    list-style: disc;
    margin-bottom: var(--spacing-xs);
}

.modal-warning {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: var(--radius-lg);
    color: var(--warning-color);
    font-size: var(--text-sm);
}

.modal-alert {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
}

/* 模态框动画 */
@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes modalSlideOut {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }
}

/* ========== 加载遮罩 ========== */
.loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: calc(var(--z-modal) + 100);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
}

.loading-overlay.active {
    opacity: 1;
    visibility: visible;
}

.loading-content {
    text-align: center;
    color: var(--text-inverse);
}

.loading-title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    margin: var(--spacing-lg) 0 var(--spacing-sm) 0;
}

.loading-desc {
    color: rgba(255, 255, 255, 0.7);
    font-size: var(--text-sm);
}

/* ========== 版本卡片 ========== */
.version-card {
    margin: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--glass-shadow);
}

.version-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
}

.version-icon {
    font-size: 24px;
}

.version-title {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
}

.version-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.version-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-sm);
}

.version-label {
    color: var(--text-secondary);
}

.version-value {
    font-weight: var(--font-medium);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
}

.version-latest {
    color: var(--success-color);
}

.version-update-notice {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    animation: fadeInUp 0.4s ease-out;
}

.update-icon {
    font-size: 24px;
    flex-shrink: 0;
}

.update-text {
    flex: 1;
}

.update-title {
    font-weight: var(--font-semibold);
    color: var(--success-color);
    margin-bottom: 2px;
}

.update-desc {
    font-size: var(--text-xs);
    color: var(--text-secondary);
}

.update-btn {
    padding: 0.375rem 0.875rem;
    border-radius: var(--radius-md);
    background: var(--success-color);
    color: var(--text-inverse);
    border: none;
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
    flex-shrink: 0;
}

.update-btn:hover {
    background: var(--success-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}

/* ========== API 端点卡片 ========== */
.api-endpoint-card {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.api-endpoint-card:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-sm);
    transform: scale(1.02);
}

.endpoint-label {
    display: block;
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    margin-bottom: 4px;
}

.endpoint-value {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--primary-color);
    word-break: break-all;
    font-weight: var(--font-medium);
}

.copy-hint {
    display: block;
    font-size: 10px;
    color: var(--text-tertiary);
    margin-top: 4px;
    text-align: right;
}

/* ========== 空状态 ========== */
.empty-state {
    text-align: center;
    padding: var(--spacing-3xl) var(--spacing-xl);
    color: var(--text-secondary);
}

.empty-icon {
    font-size: 64px;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
}

.empty-state h3 {
    font-size: var(--text-xl);
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.empty-state p {
    font-size: var(--text-sm);
    color: var(--text-tertiary);
}

/* ========== 成功动画覆盖层 ========== */
.success-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: calc(var(--z-modal) + 200);
    animation: fadeIn 0.3s ease-out;
}

.success-content {
    text-align: center;
    color: var(--text-inverse);
}

.success-icon {
    font-size: 80px;
    margin-bottom: var(--spacing-lg);
    animation: successBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-message {
    font-size: var(--text-2xl);
    font-weight: var(--font-semibold);
    animation: fadeInUp 0.4s ease-out 0.2s backwards;
}

@keyframes successBounce {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes successFadeOut {
    to {
        opacity: 0;
        transform: scale(1.1);
    }
}

/* ========== 响应式组件调整 ========== */
@media (max-width: 768px) {
    .btn {
        padding: 0.5rem 1rem;
        font-size: var(--text-sm);
    }
    
    .btn-lg {
        padding: 0.75rem 1.5rem;
    }
    
    .btn-sm {
        padding: 0.375rem 0.75rem;
    }
    
    .modal-container {
        max-width: calc(100% - var(--spacing-lg) * 2);
        margin: var(--spacing-lg);
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
        padding: var(--spacing-md) var(--spacing-lg);
    }
    
    .form-card {
        padding: var(--spacing-lg);
    }
    
    .version-card {
        margin: var(--spacing-sm);
        padding: var(--spacing-md);
    }
    
    .card:hover {
        transform: none;
    }
}

/* ========== 触摸设备优化 ========== */
@media (hover: none) and (pointer: coarse) {
    .btn:hover::before {
        opacity: 0;
    }
    
    .btn:active {
        transform: scale(0.95);
    }
    
    .card:hover {
        transform: none;
        box-shadow: var(--glass-shadow);
    }
}

/* ========== 打印样式 ========== */
@media print {
    .modal-overlay,
    .loading-overlay,
    .success-overlay {
        display: none !important;
    }
}
`;