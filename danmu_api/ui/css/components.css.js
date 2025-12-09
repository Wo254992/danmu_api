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
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.5;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all var(--transition-base);
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}

.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn:hover::before {
    width: 300px;
    height: 300px;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-icon {
    width: 18px;
    height: 18px;
    stroke-width: 2.5;
    transition: transform var(--transition-base);
}

.btn:hover .btn-icon {
    transform: scale(1.1);
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-color) 100%);
    box-shadow: var(--shadow-colored);
    transform: translateY(-2px);
}

.btn-primary:active:not(:disabled) {
    transform: translateY(0);
}

.btn-success {
    background: linear-gradient(135deg, var(--success-color) 0%, #059669 100%);
    color: white;
}

.btn-success:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--success-hover) 0%, var(--success-color) 100%);
    box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.4);
    transform: translateY(-2px);
}

.btn-danger {
    background: linear-gradient(135deg, var(--danger-color) 0%, #dc2626 100%);
    color: white;
}

.btn-danger:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--danger-hover) 0%, var(--danger-color) 100%);
    box-shadow: 0 10px 30px -5px rgba(239, 68, 68, 0.4);
    transform: translateY(-2px);
}

.btn-secondary {
    background: var(--gray-200);
    color: var(--text-primary);
}

.btn-secondary:hover:not(:disabled) {
    background: var(--gray-300);
    transform: translateY(-1px);
}

.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.0625rem;
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
    transition: all var(--transition-base);
    border: 1px solid var(--border-color);
    position: relative;
    overflow: hidden;
}

.form-card::before,
.response-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary-gradient);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.form-card:hover,
.response-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--primary-color);
}

.form-card:hover::before,
.response-card:hover::before {
    opacity: 1;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-lg) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.card-title::before {
    content: '';
    width: 4px;
    height: 24px;
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
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    transition: all var(--transition-base);
}

.preview-category:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--primary-color);
}

.preview-category-title {
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--primary-color);
    margin: 0 0 var(--spacing-lg) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid var(--border-color);
}

.preview-item {
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-sm);
    margin-bottom: var(--spacing-sm);
    border-left: 4px solid var(--primary-color);
    transition: all var(--transition-base);
    position: relative;
}

.preview-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent);
    transition: width var(--transition-base);
}

.preview-item:hover {
    background: var(--bg-tertiary);
    transform: translateX(8px);
    box-shadow: var(--shadow-sm);
}

.preview-item:hover::before {
    width: 100%;
}

.preview-item:last-child {
    margin-bottom: 0;
}

.preview-key {
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
    display: block;
    font-size: 0.9375rem;
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
    font-style: italic;
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
    border: 1px solid #30363d;
    position: relative;
}

.log-terminal::before {
    content: '● ● ●';
    position: absolute;
    top: 12px;
    left: 12px;
    color: #58a6ff;
    font-size: 1rem;
    letter-spacing: 4px;
}

.log-entry {
    padding: var(--spacing-xs) 0;
    padding-left: var(--spacing-md);
    border-left: 3px solid transparent;
    margin-bottom: var(--spacing-xs);
    margin-top: 2rem;
    transition: all var(--transition-fast);
}

.log-entry:first-child {
    margin-top: 0;
}

.log-entry:hover {
    background: rgba(88, 166, 255, 0.05);
    border-left-color: #58a6ff;
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
    border: 1px solid #30363d;
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
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    position: relative;
}

.anime-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.anime-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}

.anime-card:hover::before {
    opacity: 1;
}

.anime-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
    transition: transform var(--transition-slow);
}

.anime-card:hover .anime-image {
    transform: scale(1.1);
}

.anime-info {
    padding: var(--spacing-md);
    position: relative;
    z-index: 1;
}

.anime-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
}

.anime-count {
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    display: flex;
    align-items: center;
    gap: 4px;
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
    background: var(--bg-primary);
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
    border: 1px solid var(--border-color);
}

.episode-item:hover {
    background: var(--bg-tertiary);
    transform: translateX(4px);
    box-shadow: var(--shadow-sm);
    border-color: var(--primary-color);
}

.episode-info {
    flex: 1;
    min-width: 0;
}

.episode-number {
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
    font-size: 0.9375rem;
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
    background: var(--bg-primary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    font-size: 0.9375rem;
    font-weight: 600;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--primary-gradient);
    opacity: 0;
    transition: opacity var(--transition-base);
    z-index: -1;
}

.tab-btn:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

.tab-btn.active {
    color: white;
    border-color: transparent;
    box-shadow: var(--shadow-md);
}

.tab-btn.active::before {
    opacity: 1;
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
    transition: all var(--transition-base);
    border: 1px solid var(--border-color);
    position: relative;
    overflow: hidden;
}

.env-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--primary-gradient);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.env-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--primary-color);
}

.env-item:hover::before {
    opacity: 1;
}

.env-info {
    flex: 1;
    min-width: 0;
}

.env-key {
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    word-break: break-word;
    font-size: 1rem;
}

.value-type-badge {
    display: inline-block;
    padding: 4px 10px;
    background: var(--primary-color);
    color: white;
    border-radius: 14px;
    font-size: 0.7rem;
    font-weight: 600;
    flex-shrink: 0;
    letter-spacing: 0.3px;
    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
}

.value-type-badge.multi {
    background: linear-gradient(135deg, var(--danger-color), #dc2626);
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
    font-style: italic;
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
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-container {
    background: var(--bg-primary);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn var(--transition-slow);
    border: 1px solid var(--border-color);
}

.modal-lg {
    max-width: 700px;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(40px);
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
    background: var(--bg-secondary);
}

.modal-title {
    font-size: 1.375rem;
    font-weight: 700;
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
    transform: rotate(90deg) scale(1.1);
}

.modal-body {
    padding: var(--spacing-xl);
}

.modal-desc {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
    line-height: 1.6;
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
    content: '●';
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
    border-left: 4px solid var(--warning-color);
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
    z-index: 3000;
    align-items: center;
    justify-content: center;
}

.loading-overlay.active {
    display: flex;
    animation: fadeIn var(--transition-base);
}

.loading-content {
    background: var(--bg-primary);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-2xl);
    text-align: center;
    box-shadow: var(--shadow-xl);
    max-width: 400px;
    animation: modalSlideIn var(--transition-slow);
    border: 1px solid var(--border-color);
}

.loading-spinner {
    width: 70px;
    height: 70px;
    border: 4px solid var(--gray-200);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto var(--spacing-lg);
    position: relative;
}

.loading-spinner::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: var(--primary-light);
    animation: spin 1.2s linear infinite reverse;
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
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-sm) 0;
}

.loading-desc {
    font-size: 0.9375rem;
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