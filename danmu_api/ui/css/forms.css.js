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
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
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
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-fast);
}

.form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-input:disabled {
    background: var(--bg-secondary);
    color: var(--text-tertiary);
    cursor: not-allowed;
}

.form-input::placeholder {
    color: var(--text-tertiary);
}

/* ========================================
   下拉选择框
   ======================================== */
.form-select {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
}

.form-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-select:disabled {
    background-color: var(--bg-secondary);
    color: var(--text-tertiary);
    cursor: not-allowed;
}

/* ========================================
   文本域
   ======================================== */
.form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    resize: vertical;
    min-height: 100px;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    transition: all var(--transition-fast);
}

.form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-textarea:disabled {
    background: var(--bg-secondary);
    color: var(--text-tertiary);
    cursor: not-allowed;
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
}

.switch {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 28px;
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
    border-radius: 28px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: var(--transition-base);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
    background: var(--primary-color);
}

input:checked + .slider:before {
    transform: translateX(24px);
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
    background: var(--bg-secondary);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
}

.number-display {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    min-width: 80px;
    text-align: center;
    user-select: none;
}

.number-controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.number-btn {
    width: 40px;
    height: 40px;
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
    transition: all var(--transition-fast);
}

.number-btn:hover {
    background: var(--primary-color);
    color: white;
    transform: scale(1.05);
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
    height: 6px;
    border-radius: 3px;
    background: var(--gray-200);
    outline: none;
    -webkit-appearance: none;
    cursor: pointer;
}

.number-range input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    box-shadow: var(--shadow);
    transition: all var(--transition-fast);
}

.number-range input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-md);
}

.number-range input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: none;
    box-shadow: var(--shadow);
    transition: all var(--transition-fast);
}

.number-range input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-md);
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
    padding: 0.625rem 1.25rem;
    background: var(--bg-secondary);
    border: 2px solid transparent;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
}

.tag-option:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateY(-2px);
}

.tag-option.selected {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    box-shadow: var(--shadow);
}

.tag-option.selected:hover {
    background: var(--primary-hover);
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
    min-height: 100px;
    background: var(--bg-secondary);
    border: 2px dashed var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    align-items: flex-start;
    transition: all var(--transition-fast);
}

.selected-tags.empty {
    justify-content: center;
    align-items: center;
}

.selected-tags.empty::before {
    content: '拖动或点击下方选项添加...';
    color: var(--text-tertiary);
    font-size: 0.875rem;
}

.selected-tags.drag-over {
    background: rgba(99, 102, 241, 0.05);
    border-color: var(--primary-color);
}

.selected-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    background: var(--primary-color);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
    cursor: move;
    user-select: none;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow);
}

.selected-tag:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.selected-tag.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}

.tag-text {
    font-weight: 500;
    font-size: 0.875rem;
}

.remove-btn {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
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
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.available-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.available-tag {
    padding: 0.625rem 1.25rem;
    background: var(--bg-secondary);
    border: 2px solid transparent;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
}

.available-tag:hover:not(.disabled) {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateY(-2px);
}

.available-tag.disabled {
    opacity: 0.4;
    cursor: not-allowed;
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
}

.form-input.error:focus,
.form-select.error:focus,
.form-textarea.error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input.success,
.form-select.success,
.form-textarea.success {
    border-color: var(--success-color);
}

.form-input.success:focus,
.form-select.success:focus,
.form-textarea.success:focus {
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-error {
    display: block;
    margin-top: var(--spacing-xs);
    font-size: 0.8125rem;
    color: var(--danger-color);
}

.form-success {
    display: block;
    margin-top: var(--spacing-xs);
    font-size: 0.8125rem;
    color: var(--success-color);
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
}

.form-checkbox input[type="checkbox"],
.form-radio input[type="radio"] {
    width: 18px;
    height: 18px;
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