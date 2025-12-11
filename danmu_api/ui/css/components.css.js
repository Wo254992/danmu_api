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
    transition: all var(--transition-fast);
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.2px;
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

.btn:active::before {
    width: 300px;
    height: 300px;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
}

.btn-icon {
    width: 18px;
    height: 18px;
    stroke-width: 2.5;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    box-shadow: var(--shadow);
}

.btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--primary-hover), var(--primary-color));
    box-shadow: var(--shadow-colored);
    transform: translateY(-3px) scale(1.02);
}

.btn-primary:active:not(:disabled) {
    transform: translateY(-1px) scale(0.98);
}

.btn-success {
    background: linear-gradient(135deg, var(--success-color), #34d399);
    color: white;
    box-shadow: var(--shadow);
}

.btn-success:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--success-hover), var(--success-color));
    box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.4);
    transform: translateY(-3px) scale(1.02);
}

.btn-danger {
    background: linear-gradient(135deg, var(--danger-color), #f87171);
    color: white;
    box-shadow: var(--shadow);
}

.btn-danger:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--danger-hover), var(--danger-color));
    box-shadow: 0 10px 30px -5px rgba(239, 68, 68, 0.4);
    transform: translateY(-3px) scale(1.02);
}

.btn-secondary {
    background: var(--gray-100);
    color: var(--text-primary);
    border: 2px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
    background: var(--gray-200);
    border-color: var(--border-color-hover);
    transform: translateY(-2px);
}

.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.0625rem;
    border-radius: var(--border-radius);
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

/* ========================================
   卡片组件
   ======================================== */
.form-card,
.response-card {
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-2xl);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-xl);
    border: 1px solid var(--border-color);
    transition: all var(--transition-base);
}

.form-card:hover,
.response-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
}

.card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xl) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    letter-spacing: -0.3px;
}

.card-title::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(180deg, var(--primary-color), var(--primary-light));
    border-radius: 2px;
}

/* ========================================
   配置预览网格
   ======================================== */
.preview-grid {
    display: grid;
    gap: var(--spacing-xl);
}

.preview-category {
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    transition: all var(--transition-base);
}

.preview-category:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
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
    padding: var(--spacing-lg);
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-md);
    border-left: 4px solid var(--primary-color);
    transition: all var(--transition-fast);
    position: relative;
    overflow: hidden;
}

.preview-item::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, var(--primary-color), var(--primary-light));
    transition: width var(--transition-fast);
}

.preview-item:hover {
    background: var(--bg-tertiary);
    transform: translateX(8px);
    box-shadow: var(--shadow-sm);
}

.preview-item:hover::before {
    width: 6px;
}

.preview-item:last-child {
    margin-bottom: 0;
}

.preview-key {
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    display: block;
    font-size: 1rem;
}

.preview-value {
    display: block;
    color: var(--text-secondary);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.875rem;
    background: var(--bg-primary);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-sm);
    word-break: break-all;
    margin-top: var(--spacing-sm);
    border: 1px solid var(--border-color);
}

.preview-desc {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    margin-top: var(--spacing-sm);
    font-style: italic;
}

/* ========================================
   日志终端
   ======================================== */
.log-terminal {
    background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.7;
    color: #c9d1d9;
    max-height: 600px;
    overflow-y: auto;
    box-shadow: var(--shadow-inner), var(--shadow-lg);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
}

.log-terminal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
    pointer-events: none;
}

.log-entry {
    padding: var(--spacing-sm) var(--spacing-md);
    border-left: 3px solid transparent;
    margin-bottom: var(--spacing-xs);
    border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
    transition: all var(--transition-fast);
    animation: logFadeIn 0.3s ease-out;
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
    background: rgba(248, 81, 73, 0.05);
}

/* ========================================
   API测试容器
   ======================================== */
.api-test-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.response-content {
    background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.875rem;
    line-height: 1.7;
    color: #c9d1d9;
    max-height: 500px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    box-shadow: var(--shadow-inner), var(--shadow-lg);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.response-content.xml {
    color: #79c0ff;
}

.response-content.error {
    color: #f85149;
    border-left: 4px solid #f85149;
    background: linear-gradient(135deg, rgba(248, 81, 73, 0.1) 0%, rgba(248, 81, 73, 0.05) 100%);
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
    font-weight: 600;
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
    gap: var(--spacing-2xl);
}

.anime-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
}

.anime-card {
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md);
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
    background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.6) 100%);
    opacity: 0;
    transition: opacity var(--transition-base);
    z-index: 1;
}

.anime-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-colored);
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
    padding: var(--spacing-lg);
    position: relative;
    z-index: 2;
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
    font-weight: 500;
}

.episode-grid {
    display: grid;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
    max-height: 600px;
    overflow-y: auto;
    padding: var(--spacing-lg);
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color);
}

.episode-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    background: var(--bg-secondary);
    border-radius: var(--border-radius);
    gap: var(--spacing-lg);
    transition: all var(--transition-fast);
    border: 2px solid transparent;
}

.episode-item:hover {
    background: var(--bg-tertiary);
    border-color: var(--primary-color);
    transform: translateX(4px);
    box-shadow: var(--shadow-sm);
}

.episode-info {
    flex: 1;
    min-width: 0;
}

.episode-number {
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
    font-size: 1rem;
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
    padding-bottom: var(--spacing-sm);
    -webkit-overflow-scrolling: touch;
}

.category-tabs::-webkit-scrollbar {
    height: 6px;
}

.tab-btn {
    padding: 0.75rem 1.5rem;
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
}

.tab-btn:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border-color: var(--border-color-hover);
    transform: translateY(-2px);
}

.tab-btn.active {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border-color: transparent;
    box-shadow: var(--shadow-colored);
    transform: translateY(-2px);
}

.env-grid {
    display: grid;
    gap: var(--spacing-md);
}

.env-item {
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-lg);
    transition: all var(--transition-base);
    border: 1px solid var(--border-color);
    border-left: 3px solid var(--primary-color);
}

.env-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateX(4px);
    border-left-color: var(--primary-light);
    background: var(--bg-hover);
}

.env-info {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
}

.env-key {
    font-weight: 700;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 0.9375rem;
    min-width: 180px;
    flex-shrink: 0;
}

.value-type-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    background: var(--primary-color);
    color: white;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 700;
    flex-shrink: 0;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.value-type-badge.multi {
    background: var(--danger-color);
}

.env-value {
    flex: 1;
    color: var(--text-secondary);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.8125rem;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 400px;
}

.env-desc {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    margin-left: var(--spacing-sm);
    font-style: italic;
    line-height: 1.4;
    opacity: 0.8;
}

.env-actions {
    display: flex;
    gap: var(--spacing-xs);
    flex-shrink: 0;
}

.env-actions .btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
}

/* ========================================
   模态框 - 优化版(不透明)
   ======================================== */
.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 2000;
    padding: var(--spacing-lg);
    overflow-y: auto;
    align-items: center;
    justify-content: center;
    animation: overlayFadeIn var(--transition-base);
}

@keyframes overlayFadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-overlay.active {
    display: flex;
}

.modal-container {
    background: var(--bg-primary);
    border-radius: var(--border-radius-xl);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 540px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn var(--transition-spring);
    border: 2px solid var(--border-color);
}

.modal-lg {
    max-width: 760px;
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
    padding: var(--spacing-2xl);
    border-bottom: 2px solid var(--border-color);
    background: var(--bg-secondary);
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    letter-spacing: -0.3px;
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
    transition: all var(--transition-fast);
    flex-shrink: 0;
}

.modal-close:hover {
    background: var(--danger-color);
    color: white;
    transform: rotate(90deg) scale(1.1);
}

.modal-body {
    padding: var(--spacing-2xl);
    background: var(--bg-primary);
}

.modal-desc {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    line-height: 1.7;
    font-size: 0.9375rem;
}

.modal-list {
    list-style: none;
    padding-left: 0;
    margin: var(--spacing-lg) 0;
}

.modal-list li {
    padding: var(--spacing-sm) 0;
    padding-left: var(--spacing-xl);
    position: relative;
    color: var(--text-secondary);
    line-height: 1.6;
}

.modal-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 1.2em;
}

.modal-warning {
    color: var(--warning-color);
    font-size: 0.9375rem;
    margin-top: var(--spacing-lg);
    font-weight: 600;
}

.modal-alert {
    background: var(--warning-light);
    border-left: 4px solid var(--warning-color);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
    margin-top: var(--spacing-lg);
}

.modal-alert p {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--text-primary);
    font-weight: 600;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    padding: var(--spacing-2xl);
    border-top: 2px solid var(--border-color);
    flex-wrap: wrap;
    background: var(--bg-secondary);
}

/* ========================================
   加载遮罩 - 优化版(不透明)
   ======================================== */
.loading-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.92);
    backdrop-filter: blur(12px);
    z-index: 3000;
    align-items: center;
    justify-content: center;
}

.loading-overlay.active {
    display: flex;
    animation: overlayFadeIn var(--transition-base);
}

.loading-content {
    background: var(--bg-primary);
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-3xl);
    text-align: center;
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
    max-width: 420px;
    animation: modalSlideIn var(--transition-spring);
    border: 2px solid var(--border-color);
}

.loading-spinner {
    width: 72px;
    height: 72px;
    border: 5px solid var(--gray-200);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto var(--spacing-xl);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-spinner-small {
    display: inline-block;
    width: 16px;
    height: 16px;
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
    letter-spacing: -0.3px;
}

.loading-desc {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.6;
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