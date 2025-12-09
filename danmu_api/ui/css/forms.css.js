// language=CSS
export const formsCssContent = /* css */ `
/* ========================================
   表单基础样式
   ======================================== */
.form-group {
    margin-bottom: var(--spacing-lg);
}

.form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    transition: color var(--transition-fast);
}

.form-label::after {
    content: '';
}

.form-label.required::after {
    content: ' *';
    color: var(--danger-color);
}

/* ========================================
   输入框样式
   ======================================== */
.form-input {
    width: 100%;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--text-primary);
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-sm);
}

.form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), var(--shadow);
    transform: translateY(-1px);
}

.form-input:disabled {
    background: var(--bg-secondary);
    color: var(--text-tertiary);
    cursor: not-allowed;
    opacity: 0.6;
}

.form-input::placeholder {
    color: var(--text-tertiary);
}

/* ========================================
   下拉选择框
   ======================================== */
.form-select {
    width: 100%;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--text-primary);
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all var(--transition-base);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1.125rem center;
    padding-right: 3rem;
    box-shadow: var(--shadow-sm);
}

.form-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), var(--shadow);
    transform: translateY(-1px);
}

.form-select:disabled {
    background-color: var(--bg-secondary);
    color: var(--text-tertiary);
    cursor: not-allowed;
    opacity: 0.6;
}

/* ========================================
   文本域
   ======================================== */
.form-textarea {
    width: 100%;
    padding: 0.875rem 1.125rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--text-primary);
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    resize: vertical;
    min-height: 120px;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-sm);
}

.form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), var(--shadow);
    transform: translateY(-1px);
}

.form-textarea:disabled {
    background: var(--bg-secondary);
    color: var(--text-tertiary);
    cursor: not-allowed;
    opacity: 0.6;
}

.form-textarea::placeholder {
    color: var(--text-tertiary);
}

/* ========================================
   开关按钮
   ======================================== */
.switch-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-sm);
    transition: background var(--transition-fast);
}

.switch-container:hover {
    background: var(--bg-tertiary);
}

.switch {
    position: relative;
    display: inline-block;
    width: 56px;
    height: 30px;
    flex-shrink: 0;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gray-300);
    transition: var(--transition-base);
    border-radius: 30px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: var(--transition-base);
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
    background: var(--primary-gradient);
    box-shadow: var(--shadow-glow);
}

input:checked + .slider:before {
    transform: translateX(26px);
}

input:disabled + .slider {
    opacity: 0.5;
    cursor: not-allowed;
}

.switch-label {
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
    gap: var(--spacing-lg);
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    padding: var(--spacing-xl);
    border-radius: var(--border-radius);
    border: 2px solid var(--border-color);
    box-shadow: var(--shadow);
}

.number-display {
    font-size: 3rem;
    font-weight: 700;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    min-width: 100px;
    text-align: center;
    user-select: none;
}

.number-controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.number-btn {
    width: 44px;
    height: 44px;
    background: white;
    border: 2px solid var(--primary-color);
    border-radius: var(--border-radius-sm);
    color: var(--primary-color);
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-sm);
}

.number-btn:hover {
    background: var(--primary-gradient);
    color: white;
    transform: scale(1.1);
    box-shadow: var(--shadow-colored);
}

.number-btn:active {
    transform: scale(0.95);
}

.number-range {
    width: 100%;
    margin-top: var(--spacing-md);
}

.number-range input[type="range"] {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: var(--gray-200);
    outline: none;
    -webkit-appearance: none;
    cursor: pointer;
    position: relative;
}

.number-range input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-gradient);
    cursor: pointer;
    box-shadow: var(--shadow);
    transition: all var(--transition-base);
}

.number-range input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-colored);
}

.number-range input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-gradient);
    cursor: pointer;
    border: none;
    box-shadow: var(--shadow);
    transition: all var(--transition-base);
}

.number-range input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-colored);
}

/* ========================================
   标签选择器
   ======================================== */
.tag-selector {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.tag-option {
    padding: 0.75rem 1.5rem;
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border: 2px solid var(--border-color);
    border-radius: 24px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-base);
    user-select: none;
    box-shadow: var(--shadow-sm);
    position: relative;
    overflow: hidden;
}

.tag-option::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--primary-gradient);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.tag-option:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
    border-color: var(--primary-color);
}

.tag-option.selected {
    color: white;
    border-color: transparent;
    box-shadow: var(--shadow-colored);
}

.tag-option.selected::before {
    opacity: 1;
}

.tag-option span {
    position: relative;
    z-index: 1;
}

/* ========================================
   多选标签（可拖动排序）
   ======================================== */
.multi-select-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.selected-tags {
    min-height: 120px;
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border: 2px dashed var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    align-items: flex-start;
    transition: all var(--transition-fast);
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

.selected-tags.empty {
    justify-content: center;
    align-items: center;
}

.selected-tags.empty::before {
    content: '✨ 拖动或点击下方选项添加...';
    color: var(--text-tertiary);
    font-size: 0.875rem;
}

.selected-tags.drag-over {
    background: var(--primary-gradient-subtle);
    border-color: var(--primary-color);
    box-shadow: inset 0 0 20px rgba(99, 102, 241, 0.1);
}

.selected-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    background: var(--primary-gradient);
    color: white;
    padding: 0.625rem 1rem;
    border-radius: 24px;
    cursor: move;
    user-select: none;
    transition: all var(--transition-base);
    box-shadow: var(--shadow);
}

.selected-tag:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: var(--shadow-colored);
}

.selected-tag.dragging {
    opacity: 0.5;
    transform: rotate(5deg) scale(1.05);
    box-shadow: var(--shadow-xl);
}

.tag-text {
    font-weight: 500;
    font-size: 0.875rem;
}

.remove-btn {
    width: 22px;
    height: 22px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    transition: all var(--transition-fast);
    padding: 0;
    line-height: 1;
}

.remove-btn:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.2);
}

.available-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.available-tag {
    padding: 0.75rem 1.5rem;
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border: 2px solid var(--border-color);
    border-radius: 24px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-base);
    user-select: none;
    box-shadow: var(--shadow-sm);
}

.available-tag:hover:not(.disabled) {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
    border-color: var(--primary-color);
}

.available-tag.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
}

/* ========================================
   表单帮助文本
   ======================================== */
.form-help {
    display: block;
    margin-top: var(--spacing-xs);
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    font-style: italic;
}

/* ========================================
   表单验证状态
   ======================================== */
.form-input.error,
.form-select.error,
.form-textarea.error {
    border-color: var(--danger-color);
    animation: shake 0.4s;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.form-input.error:focus,
.form-select.error:focus,
.form-textarea.error:focus {
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15);
}

.form-input.success,
.form-select.success,
.form-textarea.success {
    border-color: var(--success-color);
}

.form-input.success:focus,
.form-select.success:focus,
.form-textarea.success:focus {
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

.form-error {
    display: block;
    margin-top: var(--spacing-xs);
    font-size: 0.8125rem;
    color: var(--danger-color);
    animation: slideDown 0.3s ease;
}

.form-success {
    display: block;
    margin-top: var(--spacing-xs);
    font-size: 0.8125rem;
    color: var(--success-color);
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ========================================
   复选框和单选框
   ======================================== */
.form-checkbox,
.form-radio {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    cursor: pointer;
    user-select: none;
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    transition: background var(--transition-fast);
}

.form-checkbox:hover,
.form-radio:hover {
    background: var(--bg-hover);
}

.form-checkbox input[type="checkbox"],
.form-radio input[type="radio"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: var(--primary-color);
}

.form-checkbox label,
.form-radio label {
    font-size: 0.875rem;
    color: var(--text-primary);
    cursor: pointer;
}

/* ========================================
   表单布局工具
   ======================================== */
.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
}

.form-inline {
    display: flex;
    align-items: flex-end;
    gap: var(--spacing-md);
}

.form-inline .form-group {
    flex: 1;
    margin-bottom: 0;
}

.form-inline .btn {
    flex-shrink: 0;
}
`;