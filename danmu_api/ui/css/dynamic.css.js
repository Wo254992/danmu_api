// language=CSS
export const dynamicCssContent = /* css */ `
/* ========================================
   动态内容样式 - Dynamic Content
   日志、API测试、弹幕、推送、环境变量等
   ======================================== */

/* ========== 配置预览模块 ========== */
.preview-hero-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    box-shadow: var(--glass-shadow);
}

.preview-hero-header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.preview-hero-icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-primary);
    border-radius: var(--radius-xl);
    color: var(--text-inverse);
    flex-shrink: 0;
}

.preview-hero-icon svg {
    width: 32px;
    height: 32px;
    stroke-width: 2;
}

.preview-hero-titles {
    flex: 1;
}

.preview-hero-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
}

.preview-hero-subtitle {
    font-size: var(--text-sm);
    color: var(--text-secondary);
}

.preview-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--spacing-md);
}

.preview-stat-card {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    transition: all var(--transition-fast);
}

.preview-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.stat-card-compact {
    padding: var(--spacing-md);
}

.stat-icon-wrapper {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-lg);
    flex-shrink: 0;
}

.stat-icon-wrapper svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
}

.stat-icon-primary {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.1));
    color: var(--primary-color);
}

.stat-icon-success {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.1));
    color: var(--success-color);
}

.stat-icon-warning {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.1));
    color: var(--warning-color);
}

.stat-icon-status {
    background: var(--bg-secondary);
    color: var(--text-secondary);
}

.stat-icon-mode {
    background: var(--bg-secondary);
    color: var(--text-secondary);
}

.stat-content {
    flex: 1;
    min-width: 0;
}

.stat-value {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    line-height: 1.2;
}

.stat-value-status,
.stat-value-text {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
}

.stat-label {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    margin-top: 2px;
}

/* 状态颜色 */
.status-running .stat-icon-wrapper {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.1));
    color: var(--success-color);
}

.status-warning .stat-icon-wrapper {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.1));
    color: var(--warning-color);
}

.status-error .stat-icon-wrapper {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(248, 113, 113, 0.1));
    color: var(--danger-color);
}

/* 模式颜色 */
.mode-admin .stat-icon-wrapper {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(167, 139, 250, 0.1));
    color: #8b5cf6;
}

.mode-user .stat-icon-wrapper {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(96, 165, 250, 0.1));
    color: var(--primary-color);
}

.mode-preview .stat-icon-wrapper {
    background: var(--bg-secondary);
    color: var(--text-secondary);
}

/* 配置类别 */
.preview-category {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-xl);
    box-shadow: var(--glass-shadow);
}

.preview-category-header {
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
}

.preview-category-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0;
}

.category-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-lg);
    font-size: 20px;
    flex-shrink: 0;
}

.category-badge {
    margin-left: auto;
    padding: 0.25rem 0.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
}

.preview-items {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.preview-item {
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
}

.preview-item:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-sm);
}

.preview-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
}

.preview-key {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
}

.key-icon {
    font-size: var(--text-base);
}

.preview-type-badge {
    padding: 0.125rem 0.5rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 10px;
    font-weight: var(--font-medium);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.preview-value-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
}

.preview-value {
    flex: 1;
    padding: var(--spacing-sm);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--primary-color);
    word-break: break-all;
    line-height: 1.5;
}

.preview-copy-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    flex-shrink: 0;
}

.preview-copy-btn:hover {
    background: var(--bg-hover);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.preview-copy-btn svg {
    width: 16px;
    height: 16px;
}

.preview-desc {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-xs);
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    line-height: var(--leading-relaxed);
}

.desc-icon {
    flex-shrink: 0;
    font-size: var(--text-sm);
}

.preview-empty {
    text-align: center;
    padding: var(--spacing-3xl);
    color: var(--text-secondary);
}

.preview-empty .empty-icon {
    font-size: 64px;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
}

.preview-error {
    text-align: center;
    padding: var(--spacing-3xl);
}

.preview-error .error-icon {
    font-size: 64px;
    margin-bottom: var(--spacing-lg);
}

/* ========== 日志模块 ========== */
.log-filters {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: var(--spacing-xs);
}

.log-filter-btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
    user-select: none;
}

.log-filter-btn:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    color: var(--text-primary);
}

.log-filter-btn.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--text-inverse);
    font-weight: var(--font-medium);
}

.filter-icon {
    font-size: var(--text-lg);
}

.filter-text {
    font-weight: inherit;
}

.filter-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 0.375rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: var(--font-semibold);
    line-height: 1;
}

.log-filter-btn.active .filter-badge {
    background: rgba(255, 255, 255, 0.3);
}

.log-terminal {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: var(--spacing-md);
    max-height: 600px;
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
}

.log-entry {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    margin-bottom: var(--spacing-xs);
    background: var(--bg-secondary);
    border-left: 3px solid transparent;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    animation: logSlideIn 0.3s ease-out;
}

@keyframes logSlideIn {
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
    background: var(--bg-hover);
}

.log-error {
    border-left-color: var(--danger-color);
    background: rgba(239, 68, 68, 0.05);
}

.log-warn {
    border-left-color: var(--warning-color);
    background: rgba(245, 158, 11, 0.05);
}

.log-info {
    border-left-color: var(--info-color);
    background: rgba(6, 182, 212, 0.05);
}

.log-success {
    border-left-color: var(--success-color);
    background: rgba(16, 185, 129, 0.05);
}

.log-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex-shrink: 0;
}

.log-icon {
    font-size: var(--text-base);
}

.log-time {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    font-family: var(--font-mono);
}

.log-type-tag {
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-sm);
    font-size: 10px;
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.log-type-error {
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger-color);
}

.log-type-warn {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning-color);
}

.log-type-info {
    background: rgba(6, 182, 212, 0.15);
    color: var(--info-color);
}

.log-type-success {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-color);
}

.log-content {
    flex: 1;
    min-width: 0;
}

.log-message {
    color: var(--text-primary);
    word-break: break-word;
}

.log-message-full {
    color: var(--text-primary);
    word-break: break-word;
    white-space: pre-wrap;
}

.log-expand-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: var(--spacing-xs);
    padding: 0.25rem 0.5rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.log-expand-btn:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.expand-icon {
    width: 12px;
    height: 12px;
    transition: transform var(--transition-fast);
}

.log-expand-btn.expanded .expand-icon {
    transform: rotate(180deg);
}

.log-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-3xl);
    color: var(--text-tertiary);
}

.log-empty-state .empty-icon {
    font-size: 64px;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
}

.log-empty-state .empty-text {
    font-size: var(--text-base);
    font-weight: var(--font-medium);
}

/* ========== API 测试模块 ========== */
.api-mode-tabs {
    display: flex;
    gap: var(--spacing-sm);
}

.api-mode-tab {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.625rem 1.25rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.api-mode-tab:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    color: var(--text-primary);
}

.api-mode-tab.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--text-inverse);
    box-shadow: var(--shadow-sm);
}

.api-mode-tab svg {
    width: 18px;
    height: 18px;
}

.api-test-container,
.danmu-test-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.api-info-card {
    padding: var(--spacing-lg);
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.03));
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: var(--radius-xl);
}

.api-info-header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.api-icon {
    font-size: 32px;
    flex-shrink: 0;
}

.api-info-content {
    flex: 1;
}

.api-name {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
}

.api-description {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin: 0;
}

.api-info-details {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-lg);
}

.api-detail-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.detail-label {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    font-weight: var(--font-medium);
}

.method-badge {
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.method-get {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-color);
}

.method-post {
    background: rgba(59, 130, 246, 0.15);
    color: var(--primary-color);
}

.method-put {
    background: rgba(245, 158, 11, 0.15);
    color: var(--warning-color);
}

.method-delete {
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger-color);
}

.api-path {
    padding: 0.25rem 0.5rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--primary-color);
}

.no-params-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
    background: var(--bg-secondary);
    border: 1px dashed var(--border-color);
    border-radius: var(--radius-lg);
    color: var(--text-tertiary);
}

.message-icon {
    font-size: 48px;
    margin-bottom: var(--spacing-md);
}

.response-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--glass-shadow);
}

.response-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
}

.response-status {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
}

.response-status.success {
    color: var(--success-color);
}

.response-status.error {
    color: var(--danger-color);
}

.response-time {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--text-sm);
    color: var(--text-secondary);
}

.copy-response-btn {
    position: relative;
}

.copy-response-btn.copied {
    background: var(--success-color);
    border-color: var(--success-color);
}

.response-content {
    padding: var(--spacing-lg);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    line-height: var(--leading-relaxed);
    overflow-x: auto;
    max-height: 600px;
    overflow-y: auto;
}

.response-content.xml {
    color: var(--text-secondary);
    white-space: pre-wrap;
    word-break: break-all;
}

.response-content.error {
    color: var(--danger-color);
    border-color: var(--danger-color);
    background: rgba(239, 68, 68, 0.05);
}

/* 接上文 dynamic.css.js ... */

/* ========== 弹幕测试模块 ========== */
.danmu-method-switcher {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--glass-shadow);
}

.danmu-method-switcher-header {
    margin-bottom: var(--spacing-lg);
}

.danmu-method-tabs {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.danmu-method-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.danmu-method-tab:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    color: var(--text-primary);
    transform: translateY(-2px);
}

.danmu-method-tab.active {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.05));
    border-color: var(--primary-color);
    color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.tab-icon {
    font-size: var(--text-xl);
}

.danmu-method-empty {
    text-align: center;
    padding: var(--spacing-3xl) var(--spacing-xl);
    color: var(--text-tertiary);
}

.danmu-method-empty .empty-icon {
    font-size: 64px;
    margin-bottom: var(--spacing-lg);
}

.danmu-method-empty .empty-title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
}

.danmu-method-empty .empty-desc {
    font-size: var(--text-sm);
}

.danmu-method-panel {
    animation: fadeInUp 0.4s ease-out;
}

.method-header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
}

.method-icon-wrapper {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-lg);
    color: var(--text-inverse);
    flex-shrink: 0;
}

.method-icon-wrapper svg {
    width: 24px;
    height: 24px;
}

.method-info {
    flex: 1;
}

.method-title {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
}

.method-desc {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin: 0;
}

.danmu-info-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--glass-shadow);
}

.danmu-info-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
}

.danmu-title-section {
    flex: 1;
    min-width: 0;
}

.danmu-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
    word-break: break-word;
}

.danmu-subtitle {
    font-size: var(--text-sm);
    color: var(--text-secondary);
}

.danmu-actions {
    display: flex;
    gap: var(--spacing-sm);
    flex-shrink: 0;
}

.danmu-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--spacing-md);
}

.danmu-stat-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
}

.danmu-stat-item .stat-icon {
    font-size: 24px;
    flex-shrink: 0;
}

.danmu-heatmap-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--glass-shadow);
}

.heatmap-legend {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    padding: var(--spacing-sm);
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
}

.legend-label {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
}

.legend-gradient {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex: 1;
}

.legend-bar {
    flex: 1;
    height: 8px;
    border-radius: var(--radius-full);
    background: linear-gradient(90deg, 
        rgba(59, 130, 246, 0.3) 0%,
        rgba(139, 92, 246, 0.5) 25%,
        rgba(236, 72, 153, 0.7) 50%,
        rgba(239, 68, 68, 0.9) 100%
    );
}

.legend-low,
.legend-high {
    font-size: 11px;
    color: var(--text-tertiary);
}

#danmu-heatmap-canvas {
    width: 100%;
    height: 150px;
    border-radius: var(--radius-md);
    cursor: pointer;
}

.heatmap-node-info {
    margin-top: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    text-align: center;
}

.heatmap-tooltip {
    position: absolute;
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    pointer-events: none;
    z-index: 100;
    opacity: 0;
    transition: opacity var(--transition-fast);
    white-space: nowrap;
}

.heatmap-tooltip.visible {
    opacity: 1;
}

.danmu-list-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--glass-shadow);
}

.danmu-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
}

.danmu-list-filters {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}

.danmu-filter-btn {
    padding: 0.375rem 0.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
}

.danmu-filter-btn:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    color: var(--text-primary);
}

.danmu-filter-btn.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--text-inverse);
    font-weight: var(--font-medium);
}

.danmu-list-container {
    max-height: 600px;
    overflow-y: auto;
}

.danmu-item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-xs);
    background: var(--bg-secondary);
    border-left: 3px solid var(--primary-color);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
}

.danmu-item:hover {
    background: var(--bg-hover);
    box-shadow: var(--shadow-sm);
}

.danmu-item.type-top {
    border-left-color: var(--warning-color);
}

.danmu-item.type-bottom {
    border-left-color: var(--info-color);
}

.danmu-item-time {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    font-weight: var(--font-medium);
    flex-shrink: 0;
}

.danmu-item-content {
    flex: 1;
    min-width: 0;
}

.danmu-item-text {
    color: var(--text-primary);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    word-break: break-word;
    margin-bottom: var(--spacing-xs);
}

.danmu-item-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--text-xs);
}

.danmu-item-type {
    padding: 0.125rem 0.5rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
}

.danmu-list-empty {
    text-align: center;
    padding: var(--spacing-3xl);
    color: var(--text-tertiary);
}

.danmu-list-empty .empty-icon {
    font-size: 48px;
    margin-bottom: var(--spacing-md);
}

.load-more-btn {
    text-align: center;
}

.danmu-list-end {
    text-align: center;
    color: var(--text-tertiary);
    font-size: var(--text-sm);
}

/* ========== 推送弹幕模块 ========== */
.push-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.push-presets-section {
    margin-top: var(--spacing-md);
}

.presets-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
    margin-bottom: var(--spacing-sm);
}

.presets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-sm);
}

.preset-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: 0.625rem;
    font-size: var(--text-xs);
}

.preset-btn svg {
    width: 16px;
    height: 16px;
}

.lan-scan-section {
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--border-color);
}

.lan-scan-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
    margin-bottom: var(--spacing-md);
}

.lan-scan-controls {
    display: flex;
    gap: var(--spacing-sm);
}

.lan-input-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    flex: 1;
}

.lan-subnet-input {
    flex: 1;
    min-width: 0;
}

.lan-port-input {
    width: 80px;
    flex-shrink: 0;
}

.lan-input-separator {
    color: var(--text-tertiary);
    font-weight: var(--font-bold);
}

.lan-scan-btn {
    flex-shrink: 0;
    white-space: nowrap;
}

.lan-devices-list {
    margin-top: var(--spacing-md);
}

.lan-devices-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
}

.devices-count {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
}

.lan-devices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-sm);
}

.lan-device-card {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.lan-device-card:hover {
    background: var(--bg-hover);
    border-color: var(--primary-color);
    box-shadow: var(--shadow-sm);
    transform: translateY(-2px);
}

.device-icon {
    font-size: 24px;
    flex-shrink: 0;
}

.device-info {
    flex: 1;
    min-width: 0;
}

.device-ip {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    word-break: break-all;
}

.device-type {
    font-size: var(--text-xs);
    color: var(--text-secondary);
}

.device-select-icon {
    flex-shrink: 0;
    color: var(--text-tertiary);
}

.device-select-icon svg {
    width: 16px;
    height: 16px;
}

.lan-scan-progress {
    padding: var(--spacing-xl);
    text-align: center;
}

.scan-progress-bar {
    width: 100%;
    height: 8px;
    background: var(--bg-tertiary);
    border-radius: var(--radius-full);
    overflow: hidden;
    margin-bottom: var(--spacing-md);
}

.scan-progress-fill {
    height: 100%;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    transition: width var(--transition-base);
}

.scan-progress-text {
    font-size: var(--text-sm);
    color: var(--text-secondary);
}

.lan-scan-empty {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--text-tertiary);
}

.lan-scan-empty .empty-icon {
    font-size: 48px;
    margin-bottom: var(--spacing-md);
}

.lan-scan-empty .empty-hint {
    display: block;
    font-size: var(--text-xs);
    margin-top: var(--spacing-xs);
}

.anime-grid-container {
    margin-top: var(--spacing-md);
}

.anime-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);
}

.anime-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.anime-card-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 133.33%; /* 3:4 比例 */
    overflow: hidden;
    background: var(--bg-secondary);
}

.anime-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
}

.anime-card:hover .anime-image {
    transform: scale(1.05);
}

.anime-card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.anime-card:hover .anime-card-overlay {
    opacity: 1;
}

.view-icon {
    font-size: 32px;
}

.view-text {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: white;
}

.anime-info {
    padding: var(--spacing-md);
}

.anime-title {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
}

.anime-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--text-xs);
    color: var(--text-secondary);
}

.meta-icon {
    font-size: var(--text-sm);
}

.episode-count {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.episode-list-header {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.03));
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-lg);
}

.episode-anime-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-md) 0;
}

.episode-anime-icon {
    font-size: 28px;
}

.episode-stats {
    display: flex;
    gap: var(--spacing-lg);
}

.episode-stat-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--text-sm);
    color: var(--text-secondary);
}

.episode-stat-icon {
    font-size: var(--text-lg);
}

.episode-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
}

.episode-item:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-sm);
}

.episode-info {
    flex: 1;
    min-width: 0;
}

.episode-number {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: 4px;
}

.episode-icon {
    font-size: var(--text-base);
}

.episode-title {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.episode-push-btn {
    flex-shrink: 0;
}

.episode-push-btn.pushed {
    background: var(--success-color);
    border-color: var(--success-color);
    pointer-events: none;
}

.push-success-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-left: var(--spacing-sm);
    padding: 0.25rem 0.5rem;
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: var(--radius-sm);
    font-size: 11px;
    color: var(--success-color);
    animation: fadeInUp 0.3s ease-out;
}

.search-empty,
.search-error {
    text-align: center;
    padding: var(--spacing-3xl);
}

.search-empty .empty-icon,
.search-error .error-icon {
    font-size: 64px;
    margin-bottom: var(--spacing-lg);
}

.search-empty h3,
.search-error h3 {
    font-size: var(--text-xl);
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.search-empty p,
.search-error p {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
}

.search-results-header {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
}

.results-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin: 0 0 var(--spacing-xs) 0;
}

.title-icon {
    font-size: 28px;
}

.results-count {
    margin-left: auto;
    padding: 0.25rem 0.75rem;
    background: var(--primary-color);
    color: var(--text-inverse);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
}

.results-hint {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin: 0;
}

.loading-state {
    text-align: center;
    padding: var(--spacing-3xl);
}

.loading-state p {
    margin-top: var(--spacing-md);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
}

/* ========== 环境变量模块 ========== */
.category-tabs {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: var(--spacing-xs);
}

.tab-btn {
    padding: 0.625rem 1.25rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
}

.tab-btn:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
    color: var(--text-primary);
}

.tab-btn.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--text-inverse);
    box-shadow: var(--shadow-sm);
}

.env-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--glass-shadow);
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
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
}

.env-key strong {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
}

.value-type-badge {
    padding: 0.125rem 0.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 10px;
    font-weight: var(--font-semibold);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.value-type-badge.multi,
.value-type-badge.color {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(167, 139, 250, 0.1));
    color: #8b5cf6;
    border-color: rgba(139, 92, 246, 0.3);
}

.env-value {
    display: block;
    padding: var(--spacing-sm);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--primary-color);
    word-break: break-all;
    line-height: 1.5;
    margin-bottom: var(--spacing-sm);
}

.env-desc {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    line-height: var(--leading-relaxed);
}

.env-actions {
    display: flex;
    gap: var(--spacing-sm);
    flex-shrink: 0;
}

.env-empty-state {
    text-align: center;
    padding: var(--spacing-3xl);
    color: var(--text-tertiary);
}

.env-empty-state .empty-icon {
    font-size: 64px;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
}

/* ========== 颜色池组件 ========== */
.color-pool-controls {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.color-input-group {
    flex: 1;
    min-width: 280px;
}

.color-input-label {
    display: block;
    font-size: var(--text-xs);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
    margin-bottom: var(--spacing-xs);
}

.color-input-wrapper {
    display: flex;
    gap: var(--spacing-sm);
}

.color-picker-panel-wrapper {
    position: relative;
    flex-shrink: 0;
}

.color-picker-trigger {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.5rem 0.875rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.color-picker-trigger:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
}

.color-picker-trigger.active {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.color-preview {
    width: 24px;
    height: 24px;
    border-radius: var(--radius-sm);
    border: 2px solid var(--border-color);
    flex-shrink: 0;
}

.color-picker-label {
    font-size: var(--text-sm);
    color: var(--text-secondary);
}

.picker-arrow {
    width: 14px;
    height: 14px;
    color: var(--text-tertiary);
    transition: transform var(--transition-fast);
}

.color-picker-trigger.active .picker-arrow {
    transform: rotate(180deg);
}

.color-picker-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 300px;
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-2xl);
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all var(--transition-base);
}

.color-picker-dropdown.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.color-picker-canvas-wrapper {
    position: relative;
    margin-bottom: var(--spacing-md);
}

#color-picker-canvas {
    width: 100%;
    height: 180px;
    border-radius: var(--radius-md);
    cursor: crosshair;
}

.color-picker-cursor {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), var(--shadow-md);
    pointer-events: none;
    transform: translate(-50%, -50%);
}

.color-picker-hue-wrapper {
    position: relative;
    margin-bottom: var(--spacing-md);
}

#color-picker-hue {
    width: 100%;
    height: 20px;
    border-radius: var(--radius-md);
    cursor: pointer;
}

.color-hue-cursor {
    position: absolute;
    top: 50%;
    width: 4px;
    height: 26px;
    background: white;
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), var(--shadow-md);
    pointer-events: none;
    transform: translate(-50%, -50%);
}

.color-picker-info {
    display: flex;
    gap: var(--spacing-md);
}

.color-preview-large {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-md);
    border: 2px solid var(--border-color);
    flex-shrink: 0;
}

.color-values {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.color-value-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.color-value-label {
    font-size: 10px;
    color: var(--text-tertiary);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.color-value-input {
    padding: 0.375rem 0.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-primary);
}

.color-hex-input-wrapper {
    display: flex;
    align-items: center;
    flex: 1;
}

.color-hex-prefix {
    padding: 0.5rem 0.75rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-right: none;
    border-radius: var(--radius-md) 0 0 var(--radius-md);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-tertiary);
}

.color-hex-input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    font-family: var(--font-mono);
    text-transform: uppercase;
}

.color-add-btn {
    flex-shrink: 0;
}

.color-pool-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 2px dashed var(--border-color);
    border-radius: var(--radius-lg);
    min-height: 120px;
    align-content: flex-start;
}

.color-pool-container.empty::after {
    content: '🎨 暂无颜色，点击上方按钮添加';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--text-tertiary);
    font-size: var(--text-sm);
}

.color-chip {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: var(--radius-md);
    border: 2px solid var(--border-color);
    cursor: move;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: colorChipFadeIn 0.3s ease-out;
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
    box-shadow: var(--shadow-lg);
    z-index: 10;
}

.color-chip.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
}

.color-hex-label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: var(--font-bold);
    color: rgba(0, 0, 0, 0.6);
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
    user-select: none;
}

.remove-chip-btn {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 20px;
    height: 20px;
    background: var(--danger-color);
    border: 2px solid white;
    border-radius: 50%;
    color: white;
    font-size: 14px;
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
    background: var(--danger-hover);
    transform: scale(1.2);
}

.pool-stats {
    display: flex;
    gap: var(--spacing-md);
}

.pool-count-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.1));
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--primary-color);
}

.pool-count-icon {
    font-size: var(--text-sm);
}

.color-pool-hint {
    margin-bottom: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    color: var(--text-secondary);
}

/* ========== 批量导入模态框 ========== */
.batch-import-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
    z-index: calc(var(--z-modal) + 10);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
}

.batch-import-modal.active {
    opacity: 1;
    visibility: visible;
}

.batch-import-container {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-2xl);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.batch-import-header {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-primary);
}

.batch-import-title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0;
}

.batch-import-close {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--text-secondary);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.batch-import-close:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.batch-import-hint {
    padding: var(--spacing-md) var(--spacing-xl);
    background: rgba(59, 130, 246, 0.05);
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
}

.batch-import-textarea {
    flex: 1;
    margin: var(--spacing-xl);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    resize: none;
    outline: none;
    min-height: 200px;
}

.batch-import-textarea:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.batch-import-preview {
    margin: 0 var(--spacing-xl) var(--spacing-xl);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
}

.batch-import-preview-title {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.batch-import-preview-colors {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
}

.batch-import-preview-chip {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-sm);
    border: 2px solid var(--border-color);
}

.batch-import-actions {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-top: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-md);
    background: var(--bg-primary);
}

/* ========== 自定义对话框 ========== */
.custom-dialog-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
    z-index: calc(var(--z-modal) + 20);
}

.custom-dialog-container {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-2xl);
    max-width: 480px;
    width: 100%;
    overflow: hidden;
}

.custom-dialog-header {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-primary);
}

.custom-dialog-header h3 {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin: 0;
}

.custom-dialog-body {
    padding: var(--spacing-xl);
}

.custom-dialog-body p {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-md);
}

.custom-dialog-actions {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-top: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    background: var(--bg-primary);
}

/* ========== 部署平台环境变量状态模态框 ========== */
.deploy-env-status-modal {
    max-width: 700px;
}

.deploy-env-status-hero {
    padding: var(--spacing-xl);
    border-radius: var(--radius-xl);
    margin-bottom: var(--spacing-lg);
}

.deploy-env-status-hero.success {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.05));
    border: 1px solid rgba(16, 185, 129, 0.3);
}

.deploy-env-status-hero.error {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(248, 113, 113, 0.05));
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.deploy-env-status-hero-content {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-lg);
}

.deploy-env-status-hero-icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-xl);
    flex-shrink: 0;
}

.deploy-env-status-hero.success .deploy-env-status-hero-icon {
    background: var(--success-color);
    color: white;
}

.deploy-env-status-hero.error .deploy-env-status-hero-icon {
    background: var(--danger-color);
    color: white;
}

.deploy-env-status-hero-icon svg {
    width: 32px;
    height: 32px;
}

.deploy-env-status-hero-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--spacing-xs);
}

.deploy-env-status-hero.success .deploy-env-status-hero-title {
    color: var(--success-color);
}

.deploy-env-status-hero.error .deploy-env-status-hero-title {
    color: var(--danger-color);
}

.deploy-env-status-hero-subtitle {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-md);
}

.deploy-env-status-chip {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: 0.5rem 0.875rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
}

.deploy-env-status-chip strong {
    color: var(--text-primary);
}

.deploy-env-status-grid {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.deploy-env-var-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
}

.deploy-env-var-name {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
}

.deploy-env-var-status {
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
}

.deploy-env-var-status.ok {
    background: rgba(16, 185, 129, 0.15);
    color: var(--success-color);
}

.deploy-env-var-status.missing {
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger-color);
}

.deploy-env-status-hint {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
}

.deploy-env-code {
    padding: 0.125rem 0.375rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--primary-color);
}

/* ========== 响应式优化 ========== */
@media (max-width: 768px) {
    .preview-hero-card {
        padding: var(--spacing-lg);
    }
    
    .preview-hero-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .preview-hero-icon {
        width: 48px;
        height: 48px;
    }
    
    .preview-hero-icon svg {
        width: 24px;
        height: 24px;
    }
    
    .preview-hero-title {
        font-size: var(--text-xl);
    }
    
    .preview-stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--spacing-sm);
    }
    
    .log-filters {
        gap: var(--spacing-xs);
    }
    
    .log-filter-btn {
        padding: 0.375rem 0.75rem;
        font-size: var(--text-xs);
    }
    
    .api-mode-tabs {
        flex-direction: column;
    }
    
    .api-mode-tab {
        width: 100%;
        justify-content: center;
    }
    
    .danmu-method-tabs {
        flex-direction: column;
    }
    
    .danmu-stats-grid {
        grid-template-columns: 1fr;
    }
    
    .lan-scan-controls {
        flex-direction: column;
    }
    
    .lan-input-group {
        width: 100%;
    }
    
    .lan-devices-grid {
        grid-template-columns: 1fr;
    }
    
    .category-tabs {
        gap: var(--spacing-xs);
    }
    
    .tab-btn {
        padding: 0.5rem 0.875rem;
        font-size: var(--text-xs);
    }
    
    .env-item {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .env-actions {
        width: 100%;
    }
    
    .env-actions .btn {
        flex: 1;
    }
    
    .color-pool-controls {
        flex-direction: column;
    }
    
    .color-input-group {
        min-width: 0;
    }
    
    .batch-import-container {
        max-width: calc(100% - var(--spacing-lg) * 2);
    }
}

@media (max-width: 480px) {
    .preview-stats-grid {
        grid-template-columns: 1fr;
    }
    
    .color-chip {
        width: 48px;
        height: 48px;
    }
    
    .color-hex-label {
        font-size: 9px;
    }
}

/* ========== 打印样式 ========== */
@media print {
    .log-filters,
    .api-mode-tabs,
    .danmu-method-tabs,
    .danmu-actions,
    .env-actions,
    .color-pool-controls,
    .batch-import-modal {
        display: none !important;
    }
    
    .preview-category,
    .form-card,
    .env-item {
        page-break-inside: avoid;
    }
}
`;

