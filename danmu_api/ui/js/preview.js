// language=JavaScript
export const previewJsContent = /* javascript */ `
/* ========================================
   渲染配置预览
   ======================================== */
function renderPreview() {
    const preview = document.getElementById('preview-area');
    
    // 显示加载状态
    showLoadingIndicator('preview-area');
    
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            const categorizedVars = config.categorizedEnvVars || {};
            
            let html = '';
            
            // 按类别顺序排列
            const categoryOrder = ['api', 'source', 'match', 'danmu', 'cache', 'system'];
            const sortedCategories = categoryOrder.filter(cat => categorizedVars[cat] && categorizedVars[cat].length > 0);
            
            // 更新统计信息（在这里，数据已经获取到了）
            const totalConfigs = sortedCategories.reduce((sum, cat) => sum + categorizedVars[cat].length, 0);
            const totalCategories = sortedCategories.length;
            
            const totalConfigsEl = document.getElementById('total-configs');
            const totalCategoriesEl = document.getElementById('total-categories');
            
            if (totalConfigsEl) {
                animateNumber('total-configs', 0, totalConfigs, 800);
            }
            
            if (totalCategoriesEl) {
                animateNumber('total-categories', 0, totalCategories, 600);
            }
            
            sortedCategories.forEach((category, index) => {
                const items = categorizedVars[category];
                const categoryIcon = getCategoryIcon(category);
                const categoryName = getCategoryName(category);
                const categoryColor = getCategoryColor(category);
                
                html += \`
                    <div class="preview-category" style="animation: fadeInUp 0.4s ease-out \${index * 0.1}s backwards;">
                        <div class="preview-category-header">
                            <h3 class="preview-category-title">
                                <span class="category-icon" style="background: \${categoryColor};">\${categoryIcon}</span>
                                <span>\${categoryName}</span>
                                <span class="category-badge">\${items.length} 项</span>
                            </h3>
                        </div>
                        <div class="preview-items">
                            \${items.map((item, itemIndex) => \`
                                <div class="preview-item" style="animation: fadeInUp 0.3s ease-out \${(index * 0.1) + (itemIndex * 0.05)}s backwards;">
                                    <div class="preview-item-header">
                                        <strong class="preview-key">
                                            <span class="key-icon">🔑</span>
                                            \${escapeHtml(item.key)}
                                        </strong>
                                        <span class="preview-type-badge">\${getTypeBadge(item.type || 'text')}</span>
                                    </div>
                                    <div class="preview-value-container">
                                        <code class="preview-value">\${escapeHtml(formatValue(item.value))}</code>
                                        <button class="preview-copy-btn" onclick="copyPreviewValue('\${escapeHtml(String(item.value)).replace(/'/g, "\\\\'")}', this)" title="复制值">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    \${item.description ? \`
                                        <div class="preview-desc">
                                            <span class="desc-icon">💡</span>
                                            \${escapeHtml(item.description)}
                                        </div>
                                    \` : ''}
                                </div>
                            \`).join('')}
                        </div>
                    </div>
                \`;
            });
            
            if (html === '') {
                html = \`
                    <div class="preview-empty">
                        <div class="empty-icon">📭</div>
                        <h3>暂无配置</h3>
                        <p>还没有配置任何环境变量</p>
                    </div>
                \`;
            }
            
            preview.innerHTML = html;
            
            addLog('✅ 配置预览加载完成，共 ' + sortedCategories.length + ' 个类别', 'success');
        })
        .catch(error => {
            console.error('Failed to load config for preview:', error);
            preview.innerHTML = \`
                <div class="preview-error">
                    <div class="error-icon">⚠️</div>
                    <h3>加载失败</h3>
                    <p>\${escapeHtml(error.message)}</p>
                    <button class="btn btn-primary" onclick="renderPreview()">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        重新加载
                    </button>
                </div>
            \`;
            addLog('❌ 配置预览加载失败: ' + error.message, 'error');
        });
}

/* ========================================
   复制预览值
   ======================================== */
function copyPreviewValue(value, button) {
    // 确保value是字符串
    const textToCopy = String(value);
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = \`
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            \`;
            button.style.background = 'var(--success-color)';
            button.style.borderColor = 'var(--success-color)';
            button.style.animation = 'pulse 0.4s ease-out';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
                button.style.borderColor = '';
                button.style.animation = '';
            }, 1500);
            
            addLog('📋 已复制配置值到剪贴板', 'success');
        })
        .catch(err => {
            console.error('复制失败:', err);
            addLog('❌ 复制失败: ' + err.message, 'error');
        });
}

/* ========================================
   格式化值显示
   ======================================== */
function formatValue(value) {
    // 确保value是字符串
    const stringValue = String(value);
    if (stringValue.length > 200) {
        return stringValue.substring(0, 200) + '...';
    }
    return stringValue;
}

/* ========================================
   获取类型徽章
   ======================================== */
function getTypeBadge(type) {
    const badges = {
        text: '文本',
        boolean: '布尔',
        number: '数字',
        select: '单选',
        'multi-select': '多选'
    };
    return badges[type] || '文本';
}

/* ========================================
   获取类别名称
   ======================================== */
function getCategoryName(category) {
    const names = {
        api: 'API 配置',
        source: '源配置',
        match: '匹配配置',
        danmu: '弹幕配置',
        cache: '缓存配置',
        system: '系统配置'
    };
    return names[category] || category;
}

/* ========================================
   获取类别图标
   ======================================== */
function getCategoryIcon(category) {
    const icons = {
        api: '🔗',
        source: '📜',
        match: '🔍',
        danmu: '🔣',
        cache: '💾',
        system: '⚙️'
    };
    return icons[category] || '📋';
}

/* ========================================
   获取类别颜色
   ======================================== */
function getCategoryColor(category) {
    const colors = {
        api: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        source: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        match: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        danmu: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        cache: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        system: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    };
    return colors[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

/* ========================================
   转义HTML
   ======================================== */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
`;