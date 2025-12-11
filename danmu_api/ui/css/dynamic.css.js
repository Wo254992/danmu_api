// language=CSS
export const dynamicCssContent = /* css */ `
/* ========================================
   API测试相关样式
   ======================================== */
.api-info-card {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    border: 2px solid var(--primary-color);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    box-shadow: var(--shadow-md);
    animation: fadeInDown 0.4s ease-out;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.api-info-header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
}

.api-icon {
    font-size: 3rem;
    flex-shrink: 0;
    animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.api-info-content {
    flex: 1;
}

.api-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-sm) 0;
}

.api-description {
    font-size: 0.9375rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.6;
}

.api-info-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--border-color);
}

.api-detail-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.detail-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.method-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    width: fit-content;
    box-shadow: var(--shadow-sm);
}

.method-get {
    background: linear-gradient(135deg, #10b981, #34d399);
    color: white;
}

.method-post {
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    color: white;
}

.api-path {
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.875rem;
    color: var(--primary-color);
    background: var(--bg-secondary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--border-color);
    display: block;
    word-break: break-all;
}

.no-params-message {
    text-align: center;
    padding: var(--spacing-2xl);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    border: 2px dashed var(--border-color);
}

.message-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: var(--spacing-md);
    opacity: 0.7;
}

.no-params-message p {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    margin: 0;
}

.param-icon {
    font-size: 0.875rem;
    margin-right: var(--spacing-xs);
}

.help-icon {
    font-size: 0.875rem;
    margin-right: var(--spacing-xs);
}

.response-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--border-color);
}

.response-status {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 20px;
    font-size: 0.8125rem;
    font-weight: 700;
    white-space: nowrap;
}

.response-status.success {
    background: var(--success-light);
    color: var(--success-color);
    border: 1px solid var(--success-color);
}

.response-status.error {
    background: var(--danger-light);
    color: var(--danger-color);
    border: 1px solid var(--danger-color);
}

.response-time {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--bg-tertiary);
    border-radius: var(--border-radius-sm);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-secondary);
    white-space: nowrap;
}

.copy-response-btn {
    margin-left: auto;
    white-space: nowrap;
    transition: all 0.3s ease;
}

.copy-response-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.copy-response-btn.copied {
    background: var(--success-color) !important;
    color: white !important;
    border-color: var(--success-color) !important;
}

/* ========================================
   推送弹幕相关样式
   ======================================== */
.search-results-header {
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-lg);
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-lg);
    border: 2px solid var(--border-color);
    box-shadow: var(--shadow-md);
}

.results-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-sm) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}

.title-icon {
    font-size: 1.75rem;
}

.results-count {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 700;
    box-shadow: var(--shadow-sm);
}

.results-hint {
    color: var(--text-secondary);
    margin: 0;
    font-size: 0.9375rem;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.results-hint::before {
    content: '💡';
    font-size: 1rem;
}

.anime-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--spacing-xl);
}

.anime-card-image-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    aspect-ratio: 3/4;
}

.anime-card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.anime-card:hover .anime-card-overlay {
    opacity: 1;
}

.view-icon {
    font-size: 2rem;
    animation: pulse 1.5s ease-in-out infinite;
}

.view-text {
    color: white;
    font-weight: 700;
    font-size: 0.9375rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.anime-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-xs);
}

.episode-count {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    font-weight: 600;
}

.meta-icon {
    font-size: 0.875rem;
}

.search-empty,
.search-error {
    text-align: center;
    padding: var(--spacing-3xl);
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-xl);
    border: 2px dashed var(--border-color);
    box-shadow: var(--shadow-md);
    grid-column: 1 / -1;
}

.empty-icon,
.error-icon {
    font-size: 5rem;
    margin-bottom: var(--spacing-lg);
    animation: pulse 2s ease-in-out infinite;
}

.search-empty h3,
.search-error h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-sm) 0;
}

.search-empty p,
.search-error p {
    color: var(--text-secondary);
    margin: 0 0 var(--spacing-lg) 0;
    font-size: 1rem;
}

.episode-list-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--bg-card);
    backdrop-filter: var(--blur-lg);
    padding: var(--spacing-xl);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--spacing-lg);
    box-shadow: var(--shadow-lg);
    border: 2px solid var(--primary-color);
}

.episode-anime-title {
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--primary-color);
    margin: 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.episode-anime-icon {
    font-size: 1.75rem;
}

.episode-stats {
    display: flex;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-md);
    flex-wrap: wrap;
}

.episode-stat-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--text-secondary);
    font-size: 0.9375rem;
    font-weight: 600;
}

.episode-stat-icon {
    font-size: 1.125rem;
}

.push-success-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: 4px 10px;
    background: var(--success-light);
    color: var(--success-color);
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
    margin-left: var(--spacing-sm);
    border: 1px solid var(--success-color);
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
}

.loading-state {
    text-align: center;
    padding: var(--spacing-3xl);
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-xl);
    border: 2px solid var(--border-color);
    box-shadow: var(--shadow-md);
}

.episode-icon {
    font-size: 0.875rem;
    margin-right: var(--spacing-xs);
}

.episode-push-btn {
    flex-shrink: 0;
    min-width: 100px;
}

.episode-push-btn.pushed {
    background: var(--gray-300) !important;
    color: var(--text-secondary) !important;
    cursor: default;
}

.episode-push-btn.pushed:hover {
    transform: none !important;
}

/* ========================================
   预览相关样式 - 优化版
   ======================================== */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.preview-category-header {
    position: relative;
    margin-bottom: var(--spacing-lg);
}

.preview-category-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
}

.category-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    box-shadow: var(--shadow-md);
    flex-shrink: 0;
}

.category-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
}

.preview-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    flex-wrap: wrap;
}

.preview-key {
    word-break: break-word;
    max-width: 100%;
    flex: 1;
    min-width: 0;
}

.key-icon {
    display: inline-block;
    margin-right: var(--spacing-xs);
    font-size: 1rem;
}

.preview-type-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    white-space: nowrap;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
}

.preview-value-container {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    width: 100%;
    max-width: 100%;
}

.preview-value {
    flex: 1;
    min-width: 0;
    word-break: break-all;
    overflow-wrap: break-word;
    max-width: 100%;
}

/* 敏感值相关样式 - 新增 */
.preview-value-masked {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex: 1;
}

.preview-value.sensitive {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1));
    border: 2px solid var(--warning-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-sm);
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 0.875rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    transition: all var(--transition-base);
}

.preview-value.sensitive.revealed {
    background: var(--bg-primary);
    border-color: var(--success-color);
}

.sensitive-icon {
    font-size: 1rem;
    flex-shrink: 0;
}

.preview-toggle-btn {
    width: 36px;
    height: 36px;
    background: var(--bg-tertiary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    flex-shrink: 0;
}

.preview-toggle-btn:hover {
    background: var(--warning-color);
    border-color: var(--warning-color);
    transform: scale(1.1);
}

.preview-toggle-btn:hover svg {
    stroke: white;
}

.preview-toggle-btn svg {
    width: 18px;
    height: 18px;
    stroke: var(--text-secondary);
    transition: stroke var(--transition-fast);
}

.preview-copy-btn {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: var(--bg-tertiary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    opacity: 0.7;
}

.preview-item:hover .preview-copy-btn,
.preview-item:active .preview-copy-btn {
    opacity: 1;
}

.preview-copy-btn:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    transform: scale(1.1);
}

.preview-copy-btn:hover svg {
    stroke: white;
}

.preview-copy-btn:active {
    transform: scale(0.95);
}

.preview-copy-btn svg {
    width: 16px;
    height: 16px;
    stroke: var(--text-secondary);
    transition: stroke var(--transition-fast);
}

.preview-desc {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--bg-tertiary);
    border-radius: var(--border-radius-sm);
    border-left: 3px solid var(--primary-color);
    word-break: break-word;
    max-width: 100%;
}

.desc-icon {
    font-size: 0.875rem;
    flex-shrink: 0;
    margin-top: 2px;
}

.preview-empty,
.preview-error {
    text-align: center;
    padding: var(--spacing-3xl);
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-xl);
    border: 2px dashed var(--border-color);
    box-shadow: var(--shadow-md);
}

.preview-empty h3,
.preview-error h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-sm) 0;
}

.preview-empty p,
.preview-error p {
    color: var(--text-secondary);
    margin: 0 0 var(--spacing-lg) 0;
    font-size: 1rem;
    word-break: break-word;
}

/* ========================================
   系统设置相关样式
   ======================================== */
@keyframes fadeOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100px);
    }
}

@keyframes modalSlideOut {
    from {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
    to {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
}

.env-empty-state {
    text-align: center;
    padding: var(--spacing-3xl);
    background: var(--bg-card);
    backdrop-filter: var(--blur-md);
    border-radius: var(--border-radius-xl);
    border: 2px dashed var(--border-color);
    box-shadow: var(--shadow-md);
}

.env-empty-state .empty-icon {
    font-size: 5rem;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
    animation: pulse 2s ease-in-out infinite;
}

.env-empty-state h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--spacing-sm) 0;
}

.env-empty-state p {
    color: var(--text-secondary);
    margin: 0;
    font-size: 1rem;
}

/* ========================================
   移动端响应式优化
   ======================================== */
@media (max-width: 768px) {
    .api-info-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .api-icon {
        font-size: 2.5rem;
    }
    
    .api-name {
        font-size: 1.25rem;
    }
    
    .api-info-details {
        grid-template-columns: 1fr;
    }
    
    .response-header {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-sm);
    }
    
    .response-status,
    .response-time {
        justify-content: center;
    }
    
    .copy-response-btn {
        margin-left: 0;
        width: 100%;
        justify-content: center;
    }
    
    .anime-grid-container {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: var(--spacing-lg);
    }
    
    .results-title {
        font-size: 1.25rem;
    }
    
    .episode-list-header {
        padding: var(--spacing-lg);
    }
    
    .episode-anime-title {
        font-size: 1.125rem;
    }
    
    .episode-stats {
        flex-direction: column;
        gap: var(--spacing-sm);
    }
    
    .episode-push-btn {
        min-width: 80px;
        padding: 0.625rem 0.75rem;
    }
    
    .preview-category-title {
        font-size: 1.125rem;
    }
    
    .category-icon {
        width: 36px;
        height: 36px;
        font-size: 1.25rem;
    }
    
    .category-badge {
        font-size: 0.7rem;
        padding: 3px 10px;
    }
    
    .preview-item-header {
        gap: var(--spacing-sm);
    }
    
    .preview-key {
        font-size: 0.9375rem;
    }
    
    .key-icon {
        font-size: 0.875rem;
    }
    
    .preview-type-badge {
        font-size: 0.65rem;
        padding: 2px 8px;
    }
    
    .preview-value {
        font-size: 0.8125rem;
        padding: var(--spacing-sm);
    }
    
    .preview-copy-btn,
    .preview-toggle-btn {
        width: 32px;
        height: 32px;
        opacity: 1;
    }
    
    .preview-copy-btn svg,
    .preview-toggle-btn svg {
        width: 16px;
        height: 16px;
    }
    
    .preview-desc {
        font-size: 0.75rem;
        padding: var(--spacing-xs) var(--spacing-sm);
    }
    
    .desc-icon {
        font-size: 0.75rem;
    }
}

@media (max-width: 480px) {
    .preview-category-title {
        font-size: 1rem;
    }
    
    .category-icon {
        width: 32px;
        height: 32px;
        font-size: 1.125rem;
    }
    
    .preview-key {
        font-size: 0.875rem;
    }
    
    .preview-value {
        font-size: 0.75rem;
    }
    
    .preview-toggle-btn,
    .preview-copy-btn {
        width: 28px;
        height: 28px;
    }
}
`;