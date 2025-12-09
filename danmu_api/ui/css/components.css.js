// language=CSS
export const componentsCssContent = /* css */ `
/* ========================================
   按钮组件
   ======================================== */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-icon {
    width: 18px;
    height: 18px;
    stroke-width: 2;
}

.btn-primary {
    background: var(--primary-color);
    color: white;
    box-shadow: var(--shadow-sm);
}

.btn-primary:hover:not(:disabled) {
    background: var(--primary-hover);
    box-shadow: var(--shadow);
    transform: translateY(-1px);
}

.btn-primary:active:not(:disabled) {
    transform: translateY(0);
}

.btn-success {
    background: var(--success-color);
    color: white;
    box-shadow: var(--shadow-sm);
}

.btn-success:hover:not(:disabled) {
    background: var(--success-hover);
    box-shadow: var(--shadow);
    transform: translateY(-1px);
}

.btn-danger {
    background: var(--danger-color);
    color: white;
    box-shadow: var(--shadow-sm);
}

.btn-danger:hover:not(:disabled) {
    background: var(--danger-hover);
    box-shadow: var(--shadow);
    transform: translateY(-1px);
}

.btn-secondary {
    background: var(--gray-200);
    color: var(--text-primary);
}

.btn-secondary:hover:not(:disabled) {
    background: var(--gray-300);
}

.btn-lg {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
}

/* ========================================
   卡片组件
   ======================================== */
.form-card,
.response-card {
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow);
    margin-bottom: var(--spacing-lg);
}

.card-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-lg) 0;
}

/* ========================================
   配置预览网格
   ======================================== */
.preview-grid {
    display: grid;
    gap: var(--spacing-lg);
}

.preview-category {
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow);
}

.preview-category-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 0 0 var(--spacing-lg) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.preview-item {
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-sm);
    margin-bottom: var(--spacing-sm);
    border-left: 4px solid var(--primary-color);
    transition: all var(--transition-fast);
}

.preview-item:hover {
    background: var(--bg-tertiary);
    transform: translateX(4px);
}

.preview-item:last-child {
    margin-bottom: 0;
}

.preview-key {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
    display: block;
}

.preview-value {
    display: block;
    color: var(--text-secondary);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.875rem;
    background: var(--bg-primary);
    padding: var(--spacing-sm);
    border-radius: 4px;
    word-break: break-all;
    margin-top: var(--spacing-xs);
}

.preview-desc {
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin-top: var(--spacing-xs);
}

/* ========================================
   日志终端
   ======================================== */
.log-terminal {
    background: #0d1117;
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.8125rem;
    line-height: 1.6;
    color: #c9d1d9;
    max-height: 600px;
    overflow-y: auto;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
}

.log-entry {
    padding: var(--spacing-xs) 0;
    border-left: 3px solid transparent;
    padding-left: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
}

.log-entry.info {
    color: #58a6ff;
    border-left-color: #58a6ff;
}

.log-entry.success {
    color: #3fb950;
    border-left-color: #3fb950;
}

.log-entry.warn {
    color: #d29922;
    border-left-color: #d29922;
}

.log-entry.error {
    color: #f85149;
    border-left-color: #f85149;
}

/* ========================================
   API测试容器
   ======================================== */
.api-test-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.response-content {
    background: #0d1117;
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-lg);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.8125rem;
    line-height: 1.6;
    color: #c9d1d9;
    max-height: 500px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
}

.response-content.xml {
    color: #79c0ff;
}

.response-content.error {
    color: #f85149;
    border-left: 4px solid #f85149;
}

/* JSON语法高亮 */
.json-key {
    color: #79c0ff;
}

.json-string {
    color: #a5d6ff;
}

.json-number {
    color: #79c0ff;
}

.json-boolean {
    color: #ff7b72;
}

.json-null {
    color: #8b949e;
}

/* ========================================
   推送弹幕相关
   ======================================== */
.push-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.anime-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
}

.anime-card {
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow);
}

.anime-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.anime-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.anime-info {
    padding: var(--spacing-md);
}

.anime-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.anime-count {
    font-size: 0.75rem;
    color: var(--text-tertiary);
}

.episode-grid {
    display: grid;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    max-height: 600px;
    overflow-y: auto;
    padding: var(--spacing-md);
    background: var(--bg-primary);
    border-radius: var(--border-radius);
}

.episode-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-sm);
    gap: var(--spacing-md);
    transition: background var(--transition-fast);
}

.episode-item:hover {
    background: var(--bg-tertiary);
}

.episode-info {
    flex: 1;
    min-width: 0;
}

.episode-number {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
}

.episode-title {
    font-size: 0.875rem;
    color: var(--text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ========================================
   环境变量配置
   ======================================== */
.category-tabs {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
    overflow-x: auto;
    padding-bottom: var(--spacing-xs);
}

.category-tabs::-webkit-scrollbar {
    height: 4px;
}

.tab-btn {
    padding: 0.625rem 1.25rem;
    background: var(--bg-primary);
    border: 2px solid transparent;
    border-radius: var(--border-radius-sm);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
    box-shadow: var(--shadow-sm);
}

.tab-btn:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
}

.tab-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    box-shadow: var(--shadow);
}

.env-grid {
    display: grid;
    gap: var(--spacing-md);
}

.env-item {
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-lg);
    transition: all var(--transition-fast);
}

.env-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.env-info {
    flex: 1;
    min-width: 0;
}

.env-key {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}

.value-type-badge {
    display: inline-block;
    padding: 2px 8px;
    background: var(--primary-color);
    color: white;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 500;
}

.value-type-badge.multi {
    background: var(--danger-color);
}

.env-value {
    display: block;
    color: var(--text-secondary);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.875rem;
    background: var(--bg-secondary);
    padding: var(--spacing-sm);
    border-radius: 4px;
    word-break: break-all;
    margin: var(--spacing-sm) 0;
}

.env-desc {
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin-top: var(--spacing-xs);
}

.env-actions {
    display: flex;
    gap: var(--spacing-sm);
    flex-shrink: 0;
}

/* ========================================
   模态框
   ======================================== */
.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 2000;
    padding: var(--spacing-lg);
    overflow-y: auto;
    align-items: center;
    justify-content: center;
}

.modal-overlay.active {
    display: flex;
}

.modal-container {
    background: var(--bg-primary);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn var(--transition-base);
}

.modal-lg {
    max-width: 700px;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-xl);
    border-bottom: 1px solid var(--border-color);
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
}

.modal-close {
    width: 32px;
    height: 32px;
    background: var(--gray-100);
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.modal-close:hover {
    background: var(--gray-200);
    color: var(--text-primary);
    transform: rotate(90deg);
}

.modal-body {
    padding: var(--spacing-xl);
}

.modal-desc {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
}

.modal-list {
    list-style: none;
    padding-left: 0;
    margin: var(--spacing-md) 0;
}

.modal-list li {
    padding: var(--spacing-xs) 0;
    padding-left: var(--spacing-lg);
    position: relative;
    color: var(--text-secondary);
}

.modal-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 1.2em;
}

.modal-warning {
    color: var(--warning-color);
    font-size: 0.875rem;
    margin-top: var(--spacing-md);
}

.modal-alert {
    background: #fef3c7;
    border-left: 4px solid var(--warning-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-sm);
    margin-top: var(--spacing-md);
}

.modal-alert p {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--text-primary);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    padding: var(--spacing-xl);
    border-top: 1px solid var(--border-color);
}

/* ========================================
   加载遮罩
   ======================================== */
.loading-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    z-index: 3000;
    align-items: center;
    justify-content: center;
}

.loading-overlay.active {
    display: flex;
}

.loading-content {
    background: var(--bg-primary);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-2xl);
    text-align: center;
    box-shadow: var(--shadow-xl);
    max-width: 400px;
    animation: modalSlideIn var(--transition-base);
}

.loading-spinner {
    width: 64px;
    height: 64px;
    border: 4px solid var(--gray-200);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto var(--spacing-lg);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-spinner-small {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

.loading-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-sm) 0;
}

.loading-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
}

/* ========================================
   输入组
   ======================================== */
.input-group {
    display: flex;
    gap: var(--spacing-sm);
    align-items: stretch;
}

.input-group .form-input {
    flex: 1;
}

.input-group .btn {
    flex-shrink: 0;
}
`;