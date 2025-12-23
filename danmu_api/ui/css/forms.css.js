// language=CSS
export const formsCssContent = /* css */ `
/* ========================================
   表单组件 - Forms
   输入框、选择器、开关、标签选择器等
   ======================================== */

/* ========== 表单组 ========== */
.form-group {
    margin-bottom: var(--spacing-lg);
}

.form-label {
    display: block;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.form-label.required::after {
    content: ' *';
    color: var(--danger-color);
}

.form-help {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-xs);
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    line-height: var(--leading-relaxed);
}

.help-icon {
    flex-shrink: 0;
    font-size: var(--text-sm);
}

/* ========== 文本输入框 ========== */
.form-input {
    width: 100%;
    padding: 0.625rem 1rem;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--text-primary);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    outline: none;
}

.form-input::placeholder {
    color: var(--text-tertiary);
}

.form-input:hover {
    border-color: var(--border-hover);
    background: var(--bg-hover);
}

.form-input:focus {
    border-color: var(--primary-color);
    background: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--bg-tertiary);
}

.form-input.error,
.form-input:invalid {
    border-color: var(--danger-color);
}

.form-input.error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* ========== 文本域 ========== */
.form-textarea {
    width: 100%;
    min-height: 120px;
    padding: 0.75rem 1rem;
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--text-primary);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    resize: vertical;
    transition: all var(--transition-fast);
    outline: none;
    font-family: var(--font-sans);
}

.form-textarea::placeholder {
    color: var(--text-tertiary);
}

.form-textarea:hover {
    border-color: var(--border-hover);
    background: var(--bg-hover);
}

.form-textarea:focus {
    border-color: var(--primary-color);
    background: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--bg-tertiary);
    resize: none;
}

/* ========== 选择器 ========== */
.form-select {
    width: 100%;
    padding: 0.625rem 2.5rem 0.625rem 1rem;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--text-primary);
    background: var(--bg-secondary);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

[data-theme="dark"] .form-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
}

.form-select:hover {
    border-color: var(--border-hover);
    background-color: var(--bg-hover);
}

.form-select:focus {
    border-color: var(--primary-color);
    background-color: var(--bg-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--bg-tertiary);
}

/* ========== 开关按钮 ========== */
.switch-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
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
    inset: 0;
    background: var(--bg-tertiary);
    border: 2px solid var(--border-color);
    transition: all var(--transition-base);
    border-radius: 26px;
}

.slider::before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background: white;
    transition: all var(--transition-base);
    border-radius: 50%;
    box-shadow: var(--shadow-sm);
}

.switch input:checked + .slider {
    background: var(--primary-color);
    border-color: var(--primary-color);
}

.switch input:checked + .slider::before {
    transform: translateX(22px);
}

.switch input:focus + .slider {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.switch input:disabled + .slider {
    opacity: 0.5;
    cursor: not-allowed;
}

.switch-label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    user-select: none;
}

/* ========== 数字选择器 ========== */
.number-picker {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
}

.number-controls {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.number-btn {
    width: 28px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 10px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
}

.number-btn:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    color: var(--text-primary);
}

.number-btn:active {
    transform: scale(0.95);
}

.number-display {
    flex: 1;
    text-align: center;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--primary-color);
    min-width: 60px;
}

.number-range {
    margin-top: var(--spacing-md);
}

.number-range input[type="range"] {
    width: 100%;
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--bg-tertiary);
    outline: none;
    appearance: none;
    -webkit-appearance: none;
}

.number-range input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-fast);
}

.number-range input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-lg);
}

.number-range input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border: none;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-fast);
}

.number-range input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-lg);
}

/* ========== 标签选择器 ========== */
.tag-selector {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
}

.tag-option {
    padding: 0.5rem 1rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
}

.tag-option:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.tag-option.selected {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--text-inverse);
    font-weight: var(--font-medium);
}

/* ========== 多选容器 ========== */
.multi-select-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.selected-tags {
    min-height: 80px;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 2px dashed var(--border-color);
    border-radius: var(--radius-lg);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    align-content: flex-start;
    transition: all var(--transition-fast);
}

.selected-tags.empty::after {
    content: '拖动标签到此处';
    color: var(--text-tertiary);
    font-size: var(--text-sm);
    width: 100%;
    text-align: center;
    padding: var(--spacing-lg) 0;
}

.selected-tags.drag-over {
    border-color: var(--primary-color);
    background: rgba(59, 130, 246, 0.05);
}

.selected-tag {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.5rem 0.75rem;
    background: var(--primary-color);
    color: var(--text-inverse);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    cursor: move;
    transition: all var(--transition-fast);
    user-select: none;
}

.selected-tag:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.selected-tag.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}

.tag-text {
    flex: 1;
}

.remove-btn {
    width: 20px;
    height: 20px;
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: var(--text-inverse);
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.remove-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.available-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
}

.available-tag {
    padding: 0.5rem 1rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    user-select: none;
}

.available-tag:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.available-tag.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
}

/* ========== 输入组 ========== */
.input-group {
    display: flex;
    width: 100%;
}

.input-group .form-input {
    border-radius: var(--radius-lg) 0 0 var(--radius-lg);
    border-right: none;
}

.input-group .btn {
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    flex-shrink: 0;
}

/* 搜索输入组 */
.search-input-group {
    display: flex;
    gap: var(--spacing-sm);
    width: 100%;
}

.search-input-group .form-input {
    flex: 1;
}

.search-input-group .btn {
    flex-shrink: 0;
}

/* ========== 响应式表单 ========== */
@media (max-width: 768px) {
    .form-input,
    .form-textarea,
    .form-select {
        font-size: 16px; /* 防止 iOS 自动缩放 */
    }
    
    .switch {
        width: 44px;
        height: 24px;
    }
    
    .slider::before {
        height: 16px;
        width: 16px;
    }
    
    .switch input:checked + .slider::before {
        transform: translateX(20px);
    }
    
    .number-picker {
        flex-direction: column;
    }
    
    .number-controls {
        flex-direction: row;
        order: 2;
    }
    
    .number-display {
        order: 1;
    }
    
    .tag-selector,
    .available-tags {
        padding: var(--spacing-sm);
        gap: var(--spacing-xs);
    }
    
    .tag-option,
    .available-tag {
        padding: 0.375rem 0.75rem;
        font-size: var(--text-xs);
    }
    
    .selected-tag {
        padding: 0.375rem 0.625rem;
        font-size: var(--text-xs);
    }
    
    .input-group {
        flex-direction: column;
    }
    
    .input-group .form-input {
        border-radius: var(--radius-lg);
        border-right: 1px solid var(--border-color);
    }
    
    .input-group .btn {
        border-radius: var(--radius-lg);
        width: 100%;
    }
    
    .search-input-group {
        flex-direction: column;
    }
}

/* ========== 触摸设备优化 ========== */
@media (hover: none) and (pointer: coarse) {
    .form-input:hover,
    .form-textarea:hover,
    .form-select:hover {
        border-color: var(--border-color);
        background: var(--bg-secondary);
    }
    
    .tag-option:hover,
    .available-tag:hover {
        transform: none;
        box-shadow: none;
    }
    
    .tag-option:active,
    .available-tag:active {
        transform: scale(0.95);
    }
}

/* ========== 无障碍增强 ========== */
.form-input:focus-visible,
.form-textarea:focus-visible,
.form-select:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.switch input:focus-visible + .slider {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* ========== 打印样式 ========== */
@media print {
    .form-input,
    .form-textarea,
    .form-select {
        border: 1px solid #000;
        background: white;
    }
    
    .switch,
    .number-picker,
    .tag-selector,
    .multi-select-container {
        display: none;
    }
}
`;