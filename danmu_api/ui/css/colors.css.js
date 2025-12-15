// language=CSS
export const colorsCssContent = /* css */ `
/* ========================================
   颜色池编辑器样式 - 完整修复版（高级质感优化）
   ======================================== */
.color-pool-hint {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
    padding: 8px var(--spacing-sm);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.10), rgba(139, 92, 246, 0.06));
    border-left: 3px solid var(--primary-color);
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
}

.color-pool-hint::before {
    content: '💡';
    font-size: 1rem;
    flex-shrink: 0;
}

/* ========================================
   控制区：输入整行 + 功能按钮两列（更高级）
   HTML结构（你现在的）：
   .color-pool-controls
      .color-input-group (整行)
      button.btn-secondary
      button.btn-primary
      button.btn-danger
   ======================================== */
.color-pool-controls {
    --cp-radius: calc(var(--border-radius) + 2px);
    --cp-gap: 10px;

    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--cp-gap);
    margin-bottom: var(--spacing-sm);
    padding: calc(var(--spacing-sm) + 2px);

    background:
        radial-gradient(1200px 200px at 10% 0%, rgba(99,102,241,0.10), transparent 60%),
        radial-gradient(900px 220px at 90% 0%, rgba(139,92,246,0.10), transparent 55%),
        linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));

    border-radius: var(--cp-radius);
    border: 1px solid color-mix(in srgb, var(--border-color) 75%, transparent);
    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255,255,255,0.35);
    position: relative;
    overflow: hidden;
}

.color-pool-controls::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.06), transparent 40%, rgba(255,255,255,0.04));
    pointer-events: none;
}

/* 输入区占满整行 */
.color-pool-controls .color-input-group {
    grid-column: 1 / -1;
    position: relative;
    z-index: 1;
}

.color-input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.color-input-label {
    font-size: 0.625rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    opacity: 0.95;
}

.color-input-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.4fr auto;
    gap: 8px;
    align-items: stretch;
}

/* 拾色器区域：更“卡片化” */
.color-picker-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 10px;
    background: color-mix(in srgb, #fff 92%, var(--bg-secondary));
    border: 1px solid color-mix(in srgb, var(--border-color) 85%, transparent);
    border-radius: calc(var(--border-radius-sm) + 2px);
    cursor: pointer;
    transition: all var(--transition-fast);
    min-height: 40px;
    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.6),
        0 6px 18px rgba(0, 0, 0, 0.06);
}

.color-picker-wrapper:hover {
    border-color: color-mix(in srgb, var(--primary-color) 60%, var(--border-color));
    box-shadow:
        0 10px 22px rgba(99,102,241,0.14),
        inset 0 1px 0 rgba(255,255,255,0.7);
    transform: translateY(-1px);
}

.color-picker-wrapper:active {
    transform: translateY(0);
}

/* color input 更“徽章”效果 */
.color-picker-input {
    width: 28px;
    height: 28px;
    padding: 0;
    border: 2px solid rgba(255,255,255,0.95);
    border-radius: 10px;
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
}

.color-picker-input:hover {
    transform: scale(1.06);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22);
}

.color-picker-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-secondary);
    user-select: none;
    white-space: nowrap;
}

/* HEX 输入：更稳、更高级 */
.color-hex-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.color-hex-prefix {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.875rem;
    font-weight: 800;
    color: color-mix(in srgb, var(--text-tertiary) 75%, #000);
    pointer-events: none;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
}

.color-hex-input {
    width: 100%;
    padding: 0.60rem 0.75rem;
    padding-left: 1.9rem;
    font-size: 0.80rem;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    font-weight: 700;
    color: var(--text-primary);
    background: color-mix(in srgb, #fff 94%, var(--bg-secondary));
    border: 1px solid color-mix(in srgb, var(--border-color) 85%, transparent);
    border-radius: calc(var(--border-radius-sm) + 2px);
    transition: all var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 0.7px;
    min-height: 40px;
    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.7),
        0 6px 18px rgba(0, 0, 0, 0.05);
}

.color-hex-input::placeholder {
    color: var(--text-tertiary);
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0.2px;
}

.color-hex-input:hover {
    border-color: color-mix(in srgb, var(--border-color-hover) 70%, var(--border-color));
}

.color-hex-input:focus {
    outline: none;
    border-color: color-mix(in srgb, var(--primary-color) 75%, #0000);
    box-shadow:
        0 0 0 4px rgba(99, 102, 241, 0.16),
        0 10px 22px rgba(99,102,241,0.12);
    background: #fff;
}

/* + 按钮：更像主操作按钮 */
.color-add-btn {
    height: 40px;
    min-width: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.75rem;

    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border: none;
    border-radius: calc(var(--border-radius-sm) + 4px);
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast), filter var(--transition-fast);
    box-shadow:
        0 12px 24px rgba(99, 102, 241, 0.28),
        inset 0 1px 0 rgba(255,255,255,0.25);
    position: relative;
    z-index: 1;
}

.color-add-btn:hover {
    transform: translateY(-2px);
    box-shadow:
        0 16px 30px rgba(99, 102, 241, 0.34),
        inset 0 1px 0 rgba(255,255,255,0.28);
    filter: brightness(1.02);
}

.color-add-btn:active {
    transform: translateY(0);
}

.color-add-btn:focus-visible {
    outline: none;
    box-shadow:
        0 0 0 4px rgba(99,102,241,0.22),
        0 16px 30px rgba(99, 102, 241, 0.30);
}

/* 功能按钮：统一为“高级块状按钮”，两列布局 */
.color-pool-controls > .btn,
.color-pool-controls > button {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: 40px;
    border-radius: calc(var(--border-radius-sm) + 4px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 700;
    letter-spacing: 0.2px;

    box-shadow:
        0 10px 22px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255,255,255,0.22);
    transform: translateY(0);
    transition: transform var(--transition-fast), box-shadow var(--transition-fast), filter var(--transition-fast);
}

.color-pool-controls > .btn:hover,
.color-pool-controls > button:hover {
    transform: translateY(-1px);
    box-shadow:
        0 14px 28px rgba(0, 0, 0, 0.10),
        inset 0 1px 0 rgba(255,255,255,0.22);
    filter: brightness(1.01);
}

.color-pool-controls > .btn:active,
.color-pool-controls > button:active {
    transform: translateY(0);
}

.color-pool-controls > .btn:focus-visible,
.color-pool-controls > button:focus-visible {
    outline: none;
    box-shadow:
        0 0 0 4px rgba(99,102,241,0.16),
        0 14px 28px rgba(0,0,0,0.10);
}

/* 让第三个按钮（重置）在桌面端看起来更平衡：占满两列 */
.color-pool-controls > .btn.btn-danger {
    grid-column: 1 / -1;
}

/* icon+text 对齐更舒服 */
.btn-icon-text {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    line-height: 1;
}

/* ========================================
   颜色池区域（稍微增强质感）
   ======================================== */
.color-pool-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 8px;
    padding: calc(var(--spacing-sm) + 2px);
    background: linear-gradient(180deg, var(--bg-secondary), color-mix(in srgb, var(--bg-secondary) 70%, #fff 30%));
    border: 1px dashed color-mix(in srgb, var(--border-color) 85%, transparent);
    border-radius: var(--border-radius);
    min-height: 110px;
    align-content: start;
    transition: all 0.25s ease;
}

.color-pool-container:hover {
    background: linear-gradient(180deg, var(--bg-tertiary), color-mix(in srgb, var(--bg-tertiary) 70%, #fff 30%));
    border-color: color-mix(in srgb, var(--primary-color) 55%, var(--border-color));
}

.color-pool-container.empty {
    display: flex;
    justify-content: center;
    align-items: center;
}

.color-pool-container.empty::before {
    content: '🎨 暂无颜色，请点击上方按钮添加';
    color: var(--text-tertiary);
    font-size: 0.875rem;
    text-align: center;
}

@keyframes colorChipFadeIn {
    from {
        opacity: 0;
        transform: scale(0.85) translateY(10px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.color-chip {
    width: 100%;
    aspect-ratio: 1;
    min-height: 60px;
    border-radius: calc(var(--border-radius) + 2px);
    position: relative;
    cursor: move;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.10);
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
    border: 1px solid rgba(255,255,255,0.55);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: visible;
    animation: colorChipFadeIn 0.35s ease-out backwards;
}

.color-chip:hover {
    transform: translateY(-4px) scale(1.06);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
    z-index: 10;
    border-color: rgba(255,255,255,0.85);
}

.color-chip:active {
    cursor: grabbing;
}

.color-chip.dragging {
    opacity: 0.75;
    transform: scale(1.08) rotate(4deg);
    cursor: grabbing;
    z-index: 100;
    box-shadow: 0 22px 46px rgba(0, 0, 0, 0.26);
}

.color-hex-label {
    font-size: 0.625rem;
    font-weight: 800;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    color: rgba(0,0,0,0.82);
    background: rgba(255,255,255,0.96);
    padding: 3px 6px;
    border-radius: 8px;
    text-shadow: none;
    letter-spacing: 0.45px;
    pointer-events: none;
    user-select: none;
    box-shadow: 0 10px 18px rgba(0,0,0,0.14);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(0,0,0,0.08);
}

.color-chip .remove-chip-btn {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 22px;
    height: 22px;
    background: var(--danger-color);
    color: white;
    border-radius: 999px;
    border: 2px solid rgba(255,255,255,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.20);
    z-index: 2;
}

.color-chip:hover .remove-chip-btn {
    opacity: 1;
    transform: scale(1);
}

.color-chip .remove-chip-btn:hover {
    filter: brightness(1.05);
    transform: scale(1.12) rotate(90deg);
    box-shadow: 0 12px 24px rgba(220, 38, 38, 0.35);
}

.color-chip .remove-chip-btn:active {
    transform: scale(1.05) rotate(90deg);
}

/* 统计徽章 */
.pool-stats {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.pool-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.75rem;
    box-shadow: 0 10px 20px rgba(99,102,241,0.22);
}

.pool-count-icon {
    font-size: 0.875rem;
}

/* ========================================
   批量导入模态框样式（保留原逻辑，稍微提质感）
   ======================================== */
.batch-import-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    z-index: 10000;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
}

.batch-import-modal.active {
    display: flex;
}

.batch-import-container {
    background: var(--bg-primary);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
    max-width: 540px;
    width: 92%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 18px 50px rgba(0,0,0,0.35);
    animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 1px solid color-mix(in srgb, var(--border-color) 70%, transparent);
}

.batch-import-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid color-mix(in srgb, var(--border-color) 80%, transparent);
}

.batch-import-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;
}

.batch-import-close {
    width: 30px;
    height: 30px;
    background: var(--bg-secondary);
    border: 1px solid color-mix(in srgb, var(--border-color) 80%, transparent);
    border-radius: 999px;
    color: var(--text-secondary);
    font-size: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.batch-import-close:hover {
    background: var(--danger-color);
    color: white;
    transform: rotate(90deg);
}

.batch-import-hint {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.10), rgba(139, 92, 246, 0.06));
    border-left: 3px solid var(--primary-color);
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.55;
}

.batch-import-hint strong {
    color: var(--text-primary);
    display: block;
    margin-bottom: 6px;
    font-weight: 800;
}

.batch-import-textarea {
    width: 100%;
    min-height: 160px;
    padding: var(--spacing-sm);
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--text-primary);
    background: var(--bg-secondary);
    border: 1px solid color-mix(in srgb, var(--border-color) 85%, transparent);
    border-radius: var(--border-radius);
    resize: vertical;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    transition: all var(--transition-fast);
}

.batch-import-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.14);
    background: var(--bg-primary);
}

.batch-import-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
    flex-wrap: wrap;
}

.batch-import-actions .btn {
    flex: 1;
    min-height: 40px;
    border-radius: calc(var(--border-radius-sm) + 4px);
}

.batch-import-preview {
    margin-top: var(--spacing-md);
    padding: var(--spacing-sm);
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    max-height: 160px;
    overflow-y: auto;
    border: 1px solid color-mix(in srgb, var(--border-color) 80%, transparent);
}

.batch-import-preview-title {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--text-secondary);
    margin-bottom: 8px;
}

.batch-import-preview-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.batch-import-preview-chip {
    width: 36px;
    height: 36px;
    border-radius: calc(var(--border-radius-sm) + 2px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 20px rgba(0,0,0,0.12);
    transition: transform var(--transition-fast);
}

.batch-import-preview-chip:hover {
    transform: scale(1.12);
}

/* ========================================
   移动端优化：保持两列按钮 + 触控更友好
   ======================================== */
@media (max-width: 768px) {
    .color-pool-controls {
        gap: 8px;
        padding: 8px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .color-input-wrapper {
        grid-template-columns: 1fr;
        gap: 8px;
    }

    .color-picker-wrapper,
    .color-hex-input,
    .color-add-btn {
        width: 100%;
    }

    .color-add-btn {
        min-height: 42px;
        height: 42px;
        font-size: 1.05rem;
    }

    /* 重置按钮在移动端也占满两列更稳 */
    .color-pool-controls > .btn.btn-danger {
        grid-column: 1 / -1;
    }

    .color-pool-controls > .btn,
    .color-pool-controls > button {
        min-height: 42px;
        font-size: 0.9rem;
    }

    .color-pool-container {
        grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
        gap: 8px;
        padding: 8px;
    }

    .color-chip {
        min-height: 52px;
    }

    .color-hex-label {
        font-size: 0.5625rem;
        padding: 2px 5px;
    }

    .color-chip .remove-chip-btn {
        width: 20px;
        height: 20px;
        font-size: 11px;
        top: -5px;
        right: -5px;
        opacity: 1;
        transform: scale(1);
    }

    .pool-count-badge {
        font-size: 0.70rem;
    }
}

@media (max-width: 480px) {
    .color-pool-container {
        grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
    }

    .color-chip {
        min-height: 48px;
    }

    .color-hex-label {
        font-size: 0.5rem;
        padding: 2px 4px;
    }
}

/* 超小屏：按钮改单列，避免挤压 */
@media (max-width: 360px) {
    .color-pool-controls {
        grid-template-columns: 1fr;
    }
    .color-pool-controls > .btn.btn-danger {
        grid-column: auto;
    }
}
/* ========================================
   导入方式选择对话框样式 (追加/替换)
   ======================================== */
.custom-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
}

.custom-dialog-container {
    background: var(--bg-primary, #ffffff);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    max-width: 500px;
    width: 90%;
    animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 1px solid color-mix(in srgb, var(--border-color, #e2e8f0) 80%, transparent);
}

.custom-dialog-header {
    padding: 1.5rem;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color, #e2e8f0) 80%, transparent);
}

.custom-dialog-header h3 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary, #1e293b);
}

.custom-dialog-body {
    padding: 1.5rem;
    color: var(--text-secondary, #64748b);
    line-height: 1.6;
}

.custom-dialog-body strong {
    color: var(--primary-color, #3b82f6);
    font-size: 1.2em;
}

.custom-dialog-actions {
    padding: 1rem 1.5rem 1.5rem;
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
}

.custom-dialog-actions .btn {
    min-width: 100px;
}

/* 适配暗色模式 (如果系统变量未定义则使用默认值) */
@media (prefers-color-scheme: dark) {
    .custom-dialog-container {
        background: var(--bg-primary, #1e293b);
    }
    .custom-dialog-header h3 {
        color: var(--text-primary, #f1f5f9);
    }
    .custom-dialog-body {
        color: var(--text-secondary, #94a3b8);
    }
}
`;