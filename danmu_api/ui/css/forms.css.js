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
    letter-spacing: 0.2px;
}

.form-label::after {
    content: '';
}

.form-label.required::after {
    content: ' *';
    color: var(--danger-color);
    font-weight: 700;
}

/* ========================================
   输入框样式
   ======================================== */
.form-input {
    width: 100%;
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
    font-weight: 500;
}

.form-input:hover {
    border-color: var(--border-color-hover);
    background: var(--bg-secondary);
}

.form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    background: var(--bg-primary);
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
    font-weight: 400;
}

/* ========================================
   下拉选择框
   ======================================== */
.form-select {
    width: 100%;
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 16 16'%3E%3Cpath fill='%236b7280' d='M12.293 5.293L8 9.586 3.707 5.293A1 1 0 002.293 6.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.875rem center;
    background-size: 14px;
    padding-right: 2.5rem;
    font-weight: 500;
}

.form-select:hover {
    border-color: var(--border-color-hover);
    background-color: var(--bg-secondary);
}

.form-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    background-color: var(--bg-primary);
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
    padding: 0.625rem 0.875rem;
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    resize: vertical;
    min-height: 100px;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    transition: all var(--transition-fast);
    font-weight: 500;
}

.form-textarea:hover {
    border-color: var(--border-color-hover);
    background: var(--bg-secondary);
}

.form-textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    background: var(--bg-primary);
}

.form-textarea:disabled {
    background: var(--bg-secondary);
    color: var(--text-tertiary);
    cursor: not-allowed;
    opacity: 0.6;
}

.form-textarea::placeholder {
    color: var(--text-tertiary);
    font-weight: 400;
}

/* ========================================
   开关按钮
   ======================================== */
.switch-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
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
    box-shadow: var(--shadow-inner);
}

.slider:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: var(--transition-spring);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    box-shadow: var(--primary-glow);
}

input:checked + .slider:before {
    transform: translateX(26px);
}

input:disabled + .slider {
    opacity: 0.5;
    cursor: not-allowed;
}

.switch-label {
    font-weight: 600;
    color: var(--text-primary);
    user-select: none;
    font-size: 0.875rem;
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
    border-radius: var(--border-radius-lg);
    border: 2px solid var(--border-color);
}

.number-display {
    font-size: 2rem;
    font-weight: 800;
    color: var(--primary-color);
    min-width: 80px;
    text-align: center;
    user-select: none;
    text-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
    letter-spacing: -1px;
}

.number-controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.number-btn {
    width: 36px;
    height: 36px;
    background: white;
    border: 2px solid var(--primary-color);
    border-radius: var(--border-radius);
    color: var(--primary-color);
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-sm);
}

.number-btn:hover {
    background: var(--primary-color);
    color: white;
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
}

.number-btn:active {
    transform: scale(0.95);
}

.number-range {
    width: 100%;
    margin-top: var(--spacing-lg);
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

.number-range input[type="range"]::-webkit-slider-track {
    width: 100%;
    height: 8px;
    background: linear-gradient(
        to right,
        var(--primary-color) 0%,
        var(--primary-color) var(--value, 50%),
        var(--gray-200) var(--value, 50%),
        var(--gray-200) 100%
    );
    border-radius: 4px;
}

.number-range input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-fast);
    border: 3px solid white;
}

.number-range input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-colored);
}

.number-range input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: 3px solid white;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-fast);
}

.number-range input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-colored);
}

.number-range input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8px;
    background: var(--gray-200);
    border-radius: 4px;
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
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
    position: relative;
    overflow: hidden;
}

.tag-option::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(99, 102, 241, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
}

.tag-option:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
}

.tag-option:hover::before {
    width: 200px;
    height: 200px;
}

.tag-option.selected {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border-color: transparent;
    box-shadow: var(--shadow-colored);
    transform: scale(1.05);
}

.tag-option.selected:hover {
    background: linear-gradient(135deg, var(--primary-hover), var(--primary-color));
    transform: scale(1.05) translateY(-3px);
}

/* ========================================
   多选标签（可拖动排序）
   ======================================== */
.multi-select-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.selected-tags {
    min-height: 120px;
    background: var(--bg-secondary);
    border: 3px dashed var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
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
    content: '🎯 拖动或点击下方选项添加...';
    color: var(--text-tertiary);
    font-size: 0.9375rem;
    font-weight: 600;
}

.selected-tags.drag-over {
    background: rgba(99, 102, 241, 0.08);
    border-color: var(--primary-color);
    box-shadow: inset 0 0 0 2px var(--primary-color);
}

.selected-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    padding: 0.5rem 0.875rem;
    border-radius: 20px;
    cursor: move;
    user-select: none;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-md);
    font-weight: 600;
}

.selected-tag:hover {
    background: linear-gradient(135deg, var(--primary-hover), var(--primary-color));
    transform: translateY(-3px) scale(1.05);
    box-shadow: var(--shadow-colored);
}

.selected-tag.dragging {
    opacity: 0.5;
    transform: rotate(5deg) scale(1.1);
    cursor: grabbing;
}

.tag-text {
    font-weight: 600;
    font-size: 0.875rem;
}

.remove-btn {
    width: 22px;
    height: 22px;
    background: rgba(255, 255, 255, 0.25);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    font-weight: bold;
    transition: all var(--transition-fast);
    padding: 0;
    line-height: 1;
}

.remove-btn:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.2) rotate(90deg);
}

.available-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.available-tag {
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
}

.available-tag:hover:not(.disabled) {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
}

.available-tag.disabled {
    opacity: 0.3;
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
    line-height: 1.5;
}

/* ========================================
   表单验证状态
   ======================================== */
.form-input.error,
.form-select.error,
.form-textarea.error {
    border-color: var(--danger-color);
    background: rgba(239, 68, 68, 0.05);
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
    background: rgba(16, 185, 129, 0.05);
}

.form-input.success:focus,
.form-select.success:focus,
.form-textarea.success:focus {
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

.form-error {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-sm);
    font-size: 0.875rem;
    color: var(--danger-color);
    font-weight: 600;
}

.form-error::before {
    content: '⚠';
    font-size: 1rem;
}

.form-success {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-sm);
    font-size: 0.875rem;
    color: var(--success-color);
    font-weight: 600;
}

.form-success::before {
    content: '✓';
    font-size: 1rem;
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
    background: var(--bg-secondary);
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
    font-size: 0.9375rem;
    color: var(--text-primary);
    cursor: pointer;
    font-weight: 500;
}

/* ========================================
   表单布局工具
   ======================================== */
.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--spacing-lg);
}

.form-inline {
    display: flex;
    align-items: flex-end;
    gap: var(--spacing-lg);
}

.form-inline .form-group {
    flex: 1;
    margin-bottom: 0;
}

.form-inline .btn {
    flex-shrink: 0;
}

/* ========================================
   颜色池编辑器 - 优化版
   ======================================== */
.color-pool-hint {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
    border-left: 4px solid var(--primary-color);
    border-radius: var(--border-radius);
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
}

.hint-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
}

/* 颜色编辑面板 */
.color-editor-panel {
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    box-shadow: var(--shadow-lg);
}

.color-editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid var(--border-color);
}

.editor-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
}

.editor-icon {
    font-size: 1.5rem;
}

.editor-close-btn {
    width: 32px;
    height: 32px;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    color: var(--text-secondary);
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    line-height: 1;
}

.editor-close-btn:hover {
    background: var(--danger-color);
    color: white;
    border-color: var(--danger-color);
    transform: rotate(90deg);
}

.color-editor-body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

/* 颜色预览 */
.color-preview-section {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
}

.color-preview-box {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    border: 3px solid var(--border-color);
    background: 
        repeating-conic-gradient(#f3f4f6 0% 25%, white 0% 50%) 
        50% / 16px 16px;
}

.preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.preview-alpha {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
}

.color-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.color-info-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.color-info-value {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    color: var(--text-primary);
}

/* 编辑器标签 */
.editor-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.label-icon {
    font-size: 1rem;
}

/* 拾色器部分 */
.color-picker-section {
    display: flex;
    flex-direction: column;
}

.color-editor-picker {
    width: 100%;
    height: 60px;
    border: 3px solid var(--border-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-sm);
}

.color-editor-picker:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    transform: scale(1.02);
}

/* HEX输入 */
.color-hex-section {
    display: flex;
    flex-direction: column;
}

.hex-input-group {
    position: relative;
    display: flex;
    align-items: center;
}

.hex-prefix {
    position: absolute;
    left: 1rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-tertiary);
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    pointer-events: none;
}

.color-editor-hex-input {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 2.5rem;
    font-size: 1rem;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    font-weight: 600;
    color: var(--text-primary);
    background: white;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.color-editor-hex-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}

/* 透明度滑块 */
.color-alpha-section {
    display: flex;
    flex-direction: column;
}

.editor-label .alpha-value {
    margin-left: auto;
    color: var(--primary-color);
    font-weight: 700;
}

.color-editor-alpha-slider {
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: linear-gradient(
        to right,
        transparent 0%,
        var(--primary-color) 100%
    );
    border-radius: 4px;
    outline: none;
    margin: var(--spacing-sm) 0;
}

.color-editor-alpha-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: 4px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all var(--transition-fast);
}

.color-editor-alpha-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.color-editor-alpha-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: 4px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all var(--transition-fast);
}

.alpha-markers {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-tertiary);
    padding: 0 var(--spacing-xs);
}

/* 编辑器操作按钮 */
.editor-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
}

.editor-actions .btn {
    flex: 1;
}

/* 颜色池操作按钮 */
.color-pool-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    background: var(--bg-primary);
}

.action-btn-icon {
    font-size: 1.125rem;
}

.action-btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border-color: transparent;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.action-btn-primary:hover {
    background: linear-gradient(135deg, var(--primary-hover), var(--primary-color));
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.action-btn-secondary {
    color: var(--text-primary);
}

.action-btn-secondary:hover {
    background: var(--bg-secondary);
    border-color: var(--primary-color);
    transform: translateY(-2px);
}

.action-btn-danger {
    color: var(--danger-color);
}

.action-btn-danger:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: var(--danger-color);
    transform: translateY(-2px);
}

/* 颜色块网格 */
.color-chips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--bg-secondary);
    border: 2px dashed var(--border-color);
    border-radius: var(--border-radius-lg);
    min-height: 140px;
    align-content: start;
}

.color-chips-grid.empty {
    display: flex;
    justify-content: center;
    align-items: center;
}

.color-chips-grid.empty::before {
    content: '🎨 暂无颜色\A点击"添加"按钮创建';
    white-space: pre-wrap;
    text-align: center;
    color: var(--text-tertiary);
    font-size: 0.875rem;
    line-height: 1.6;
}

/* 颜色块 */
@keyframes chipFadeIn {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(10px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes chipFadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.8) translateY(-10px);
    }
}

.color-chip-item {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    min-height: 70px;
    border-radius: var(--border-radius);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 3px solid rgba(255, 255, 255, 0.3);
    overflow: hidden;
    animation: chipFadeIn 0.4s ease-out backwards;
}

.color-chip-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.color-chip-item:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.6);
    z-index: 10;
}

.color-chip-item:hover::before {
    opacity: 1;
}

.chip-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--spacing-xs);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.color-chip-item:hover .chip-content {
    opacity: 1;
}

.chip-hex {
    font-size: 0.75rem;
    font-weight: 700;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.5px;
}

.chip-remove-btn {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    background: var(--danger-color);
    color: white;
    border-radius: 50%;
    border: 3px solid white;
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 2;
}

.color-chip-item:hover .chip-remove-btn {
    opacity: 1;
}

.chip-remove-btn:hover {
    background: #dc2626;
    transform: scale(1.2) rotate(90deg);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
}

/* 统计信息 */
.color-pool-stats {
    display: flex;
    justify-content: flex-start;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
}

.stat-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border-radius: 24px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.stat-icon {
    font-size: 1.125rem;
}

.stat-label {
    font-weight: 500;
}

.stat-value {
    font-weight: 700;
    font-size: 1rem;
}

/* 动画 */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideOutDown {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(20px);
    }
}

/* 移动端适配 */
@media (max-width: 768px) {
    .color-editor-panel {
        padding: var(--spacing-md);
    }
    
    .color-preview-section {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .color-preview-box {
        width: 80px;
        height: 80px;
    }
    
    .color-info-value {
        font-size: 1.25rem;
    }
    
    .color-editor-picker {
        height: 50px;
    }
    
    .color-pool-actions {
        grid-template-columns: 1fr;
    }
    
    .action-btn {
        width: 100%;
        min-height: 44px;
    }
    
    .color-chips-grid {
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
    }
    
    .color-chip-item {
        min-height: 60px;
    }
    
    .chip-hex {
        font-size: 0.625rem;
    }
    
    .chip-remove-btn {
        width: 22px;
        height: 22px;
        font-size: 12px;
        top: -6px;
        right: -6px;
        opacity: 1;
    }
    
    .editor-actions {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .color-chips-grid {
        grid-template-columns: repeat(auto-fill, minmax(55px, 1fr));
    }
    
    .color-chip-item {
        min-height: 55px;
        border-width: 2px;
    }
    
    .chip-hex {
        font-size: 0.5625rem;
    }
    
    .stat-item {
        padding: var(--spacing-xs) var(--spacing-md);
        font-size: 0.8125rem;
    }
}
`;