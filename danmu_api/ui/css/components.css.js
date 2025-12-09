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
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all var(--transition-base);
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-100%);
    transition: transform var(--transition-base);
}

.btn:hover::before {
    transform: translateX(100%);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
}

.btn-icon {
    width: 18px;
    height: 18px;
    stroke-width: 2;
    transition: transform var(--transition-base);
}

.btn:hover:not(:disabled) .btn-icon {
    transform: scale(1.1);
}

.btn-primary {
    background: var(--primary-gradient);
    color: white;
    box-shadow: var(--shadow);
}

.btn-primary:hover:not(:disabled) {
    box-shadow: var(--shadow-colored);
    transform: translateY(-2px);
}

.btn-primary:active:not(:disabled) {
    transform: translateY(0);
}

.btn-success {
    background: var(--success-gradient);
    color: white;
    box-shadow: var(--shadow);
}

.btn-success:hover:not(:disabled) {
    box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.4);
    transform: translateY(-2px);
}

.btn-danger {
    background: var(--danger-gradient);
    color: white;
    box-shadow: var(--shadow);
}

.btn-danger:hover:not(:disabled) {
    box-shadow: 0 10px 30px -5px rgba(239, 68, 68, 0.4);
    transform: translateY(-2px);
}

.btn-secondary {
    background: var(--gray-200);
    color: var(--text-primary);
}

.btn-secondary:hover:not(:disabled) {
    background: var(--gray-300);
    transform: translateY(-2px);
}

.btn-lg {
    padding: 1rem 2rem;
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
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: var(--border-radius);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow);
    margin-bottom: var(--spacing-lg);
    border: 1px solid var(--border-color);
    transition: all var(--transition-base);
}

.form-card:hover,
.response-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.card-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-lg) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.card-title::before {
    content: '';
    width: 4px;
    height: 1.5rem;
    background: var(--primary-gradient);
    border-radius: 2px;
}

/* ========================================
   配置预览网格
   ======================================== */
.preview-grid {
    display: grid;
    gap: var(--spacing-lg);
}

.preview-category {
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    transition: all var(--transition-base);
}

.preview-category:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
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
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
}

.preview-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--primary-gradient);
    transform: scaleY(0);
    transition: transform var(--transition-base);
}

.preview-item:hover {
    background: var(--bg-tertiary);
    transform: translateX(4px);
    box-shadow: var(--shadow-sm);
}

.preview-item:hover::before {
    transform: scaleY(1);
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
    border-radius: 6px;
    word-break: break-all;
    margin-top: var(--spacing-xs);
    border: 1px solid var(--border-color);
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
    background: linear-gradient(135deg, #0d1117 0%, #1a1f2e 100%);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.8125rem;
    line-height: 1.6;
    color: #c9d1d9;
    max-height: 600px;
    overflow-y: auto;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.log-entry {
    padding: var(--spacing-xs) 0;
    border-left: 3px solid transparent;
    padding-left: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
    transition: all var(--transition-fast);
    animation: logFadeIn 0.3s ease;
}

@keyframes logFadeIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.log-entry:hover {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
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
    background: linear-gradient(135deg, #0d1117 0%, #1a1f2e 100%);
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
    border: 1px solid rgba(255, 255, 255, 0.1);
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
    font-weight: 600;
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
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
}

.anime-card {
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

.anime-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}

.anime-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
    transition: transform var(--transition-base);
}

.anime-card:hover .anime-image {
    transform: scale(1.05);
}

.anime-info {
    padding: var(--spacing-md);
    background: var(--bg-primary);
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
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.anime-count::before {
    content: '📺';
}

.episode-grid {
    display: grid;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    max-height: 600px;
    overflow-y: auto;
    padding: var(--spacing-md);
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
}

.episode-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-sm);
    gap: var(--spacing-md);
    transition: all var(--transition-base);
    border: 1px solid transparent;
}

.episode-item:hover {
    background: var(--bg-tertiary);
    transform: translateX(4px);
    border-color: var(--primary-color);
    box-shadow: var(--shadow-sm);
}

.episode-info {
    flex: 1;
    min-width: 0;
}

.episode-number {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.episode-number::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--primary-color);
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
    -webkit-overflow-scrolling: touch;
}

.category-tabs::-webkit-scrollbar {
    height: 4px;
}

.tab-btn {
    padding: 0.75rem 1.5rem;
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border: 2px solid transparent;
    border-radius: var(--border-radius-sm);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-base);
    white-space: nowrap;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
}

.tab-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--primary-gradient);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.tab-btn:hover {
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

.tab-btn.active {
    color: white;
    border-color: transparent;
    box-shadow: var(--shadow-colored);
}

.tab-btn.active::before {
    opacity: 1;
}

.tab-btn span {
    position: relative;
    z-index: 1;
}

.env-grid {
    display: grid;
    gap: var(--spacing-md);
}

.env-item {
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-lg);
    transition: all var(--transition-base);
    border: 1px solid var(--border-color);
}

.env-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--primary-color);
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
    word-break: break-word;
}

.value-type-badge {
    display: inline-block;
    padding: 3px 10px;
    background: var(--primary-gradient);
    color: white;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 500;
    flex-shrink: 0;
    box-shadow: var(--shadow-sm);
}

.value-type-badge.multi {
    background: var(--danger-gradient);
}

.env-value {
    display: block;
    color: var(--text-secondary);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.875rem;
    background: var(--bg-secondary);
    padding: var(--spacing-sm);
    border-radius: 6px;
    word-break: break-all;
    margin: var(--spacing-sm) 0;
    overflow-wrap: break-word;
    max-width: 100%;
    border: 1px solid var(--border-color);
}

.env-desc {
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin-top: var(--spacing-xs);
    word-break: break-word;
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
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 2000;
    padding: var(--spacing-lg);
    overflow-y: auto;
    align-items: center;
    justify-content: center;
}

.modal-overlay.active {
    display: flex;
    animation: fadeIn var(--transition-base);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-container {
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn var(--transition-bounce);
    border: 1px solid var(--border-color);
}

.modal-lg {
    max-width: 700px;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(30px);
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
    background: var(--bg-primary);
    border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
}

.modal-close {
    width: 36px;
    height: 36px;
    background: var(--gray-100);
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
    flex-shrink: 0;
}

.modal-close:hover {
    background: var(--danger-color);
    color: white;
    transform: rotate(90deg);
}

.modal-body {
    padding: var(--spacing-xl);
    background: var(--bg-primary);
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
    padding: var(--spacing-sm);
    background: var(--warning-light);
    border-radius: var(--border-radius-sm);
}

.modal-alert {
    background: var(--warning-light);
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
    flex-wrap: wrap;
    background: var(--bg-secondary);
    border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
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
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 3000;
    align-items: center;
    justify-content: center;
}

.loading-overlay.active {
    display: flex;
}

.loading-content {
    background: var(--bg-glass);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-2xl);
    text-align: center;
    box-shadow: var(--shadow-xl);
    max-width: 400px;
    animation: modalSlideIn var(--transition-bounce);
    border: 1px solid var(--border-color);
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