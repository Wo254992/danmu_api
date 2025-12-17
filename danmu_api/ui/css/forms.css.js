// language=CSS
export const formsCssContent = /* css */ `
/* ========================================
   表单基础样式
   ======================================== */
.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    font-weight: 500;
    font-size: 0.9375rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.form-label.required::after {
    content: ' *';
    color: var(--danger-color);
}

.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--bg-secondary);
    backdrop-filter: var(--blur-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 0.9375rem;
    transition: all var(--transition-fast);
    font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    background: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:hover,
.form-select:hover,
.form-textarea:hover {
    border-color: var(--primary-color);
}

.form-input::placeholder,
.form-textarea::placeholder {
    color: var(--text-tertiary);
}

.form-input.error {
    border-color: var(--danger-color);
    animation: shake 0.3s ease;
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
}

.form-help {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin-top: 0.5rem;
}

.help-icon {
    font-size: 1rem;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
}

/* ========================================
   表单卡片
   ======================================== */
.form-card {
    background: var(--bg-primary);
    backdrop-filter: var(--blur-md);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
}

/* ========================================
   输入组
   ======================================== */
.input-group {
    display: flex;
    gap: 0.75rem;
}

.input-group .form-input {
    flex: 1;
}

/* ========================================
   开关组件
   ======================================== */
.switch-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.switch {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 28px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: var(--bg-tertiary);
    transition: all var(--transition-base);
    border-radius: 28px;
    border: 2px solid var(--border-color);
}

.slider:before {
    content: "";
    position: absolute;
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 2px;
    background: white;
    transition: all var(--transition-base);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.switch input:checked + .slider {
    background: var(--gradient-primary);
    border-color: var(--primary-color);
}

.switch input:checked + .slider:before {
    transform: translateX(24px);
}

.switch input:focus + .slider {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.switch-label {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text-primary);
    user-select: none;
}

/* ========================================
   数字选择器
   ======================================== */
.number-picker {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-secondary);
    backdrop-filter: var(--blur-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
}

.number-controls {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.number-btn {
    width: 32px;
    height: 32px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
    font-size: 0.875rem;
    transition: all var(--transition-fast);
}

.number-btn:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    transform: scale(1.1);
}

.number-btn:active {
    transform: scale(0.95);
}

.number-display {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    min-width: 60px;
    text-align: center;
    font-family: 'Courier New', monospace;
}

.number-range {
    margin-top: 1rem;
}

.number-range input[type="range"] {
    width: 100%;
    height: 6px;
    background: var(--bg-tertiary);
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
}

.number-range input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--gradient-primary);
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    transition: all var(--transition-fast);
}

.number-range input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
}

.number-range input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--gradient-primary);
    cursor: pointer;
    border-radius: 50%;
    border: none;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    transition: all var(--transition-fast);
}

.number-range input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
}

/* ========================================
   标签选择器
   ======================================== */
.tag-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--bg-secondary);
    backdrop-filter: var(--blur-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    min-height: 80px;
}

.tag-option {
    padding: 0.5rem 1rem;
    background: var(--bg-primary);
    backdrop-filter: var(--blur-sm);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
}

.tag-option:hover {
    background: var(--bg-tertiary);
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.tag-option.selected {
    background: var(--gradient-primary);
    color: white;
    border-color: var(--primary-color);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* ========================================
   多选标签容器
   ======================================== */
.multi-select-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--bg-secondary);
    backdrop-filter: var(--blur-sm);
    border: 2px dashed var(--border-color);
    border-radius: var(--radius-md);
    min-height: 80px;
    transition: all var(--transition-fast);
}

.selected-tags.empty::before {
    content: '拖动标签到此处或点击下方标签添加';
    color: var(--text-tertiary);
    font-size: 0.875rem;
    width: 100%;
    text-align: center;
    line-height: 48px;
}

.selected-tags.drag-over {
    border-color: var(--primary-color);
    background: rgba(59, 130, 246, 0.05);
}

.selected-tag {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--gradient-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: move;
    transition: all var(--transition-fast);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.selected-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.selected-tag.dragging {
    opacity: 0.5;
    transform: scale(0.95);
}

.selected-tag.drag-over {
    transform: scale(1.05);
}

.tag-text {
    user-select: none;
}

.remove-btn {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
}

.remove-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.2);
}

.available-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--bg-secondary);
    backdrop-filter: var(--blur-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
}

.available-tag {
    padding: 0.5rem 1rem;
    background: var(--bg-primary);
    backdrop-filter: var(--blur-sm);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
}

.available-tag:hover:not(.disabled) {
    background: var(--bg-tertiary);
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.available-tag.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: var(--bg-tertiary);
}

/* ========================================
   颜色选择器基础
   ======================================== */
.color-input-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.color-input-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
}

.color-input-wrapper {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.color-picker-input {
    width: 60px;
    height: 44px;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    background: var(--bg-primary);
}

.color-picker-input:hover {
    border-color: var(--primary-color);
    transform: scale(1.05);
}

.color-hex-input-wrapper {
    position: relative;
    flex: 1;
    max-width: 200px;
}

.color-hex-prefix {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    font-weight: 600;
    font-family: 'Courier New', monospace;
    pointer-events: none;
}

.color-hex-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2rem;
    background: var(--bg-secondary);
    backdrop-filter: var(--blur-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 0.9375rem;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    transition: all var(--transition-fast);
}

.color-hex-input:focus {
    outline: none;
    border-color: var(--primary-color);
    background: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.color-add-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
}

.color-add-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.color-add-btn:active {
    transform: translateY(0);
}

.color-add-btn svg {
    width: 18px;
    height: 18px;
}

/* ========================================
   颜色池样式
   ======================================== */
.color-pool-hint {
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: var(--bg-secondary);
    backdrop-filter: var(--blur-sm);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--primary-color);
}

.color-pool-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.btn-icon-text {
    font-size: 0.875rem;
}

.color-pool-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--bg-secondary);
    backdrop-filter: var(--blur-sm);
    border: 2px dashed var(--border-color);
    border-radius: var(--radius-md);
    min-height: 120px;
    transition: all var(--transition-fast);
}

.color-pool-container.empty::before {
    content: '暂无颜色，点击上方按钮添加';
    color: var(--text-tertiary);
    font-size: 0.875rem;
    width: 100%;
    text-align: center;
    line-height: 88px;
}

.color-chip {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: var(--radius-md);
    cursor: move;
    transition: all var(--transition-fast);
    border: 2px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    animation: colorChipFadeIn 0.4s ease-out backwards;
}

@keyframes colorChipFadeIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.color-chip:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
    z-index: 1;
}

.color-chip.dragging {
    opacity: 0.5;
    transform: scale(0.9);
}

.color-hex-label {
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.3);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    backdrop-filter: blur(4px);
}

.remove-chip-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    background: rgba(239, 68, 68, 0.9);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    opacity: 0;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
}

.color-chip:hover .remove-chip-btn {
    opacity: 1;
}

.remove-chip-btn:hover {
    background: var(--danger-color);
    transform: scale(1.2);
}

.pool-stats {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pool-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: var(--gradient-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 0.8125rem;
    font-weight: 600;
}

.pool-count-icon {
    font-size: 1rem;
}
`;