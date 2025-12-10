// language=JavaScript
export const previewJsContent = /* javascript */ `
/* ========================================
   渲染配置预览
   ======================================== */
function renderPreview() {
    const preview = document.getElementById('preview-area');
    
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            const categorizedVars = config.categorizedEnvVars || {};
            
            let html = '';
            
            Object.keys(categorizedVars).forEach(category => {
                const items = categorizedVars[category];
                if (items && items.length > 0) {
                    html += \`
                        <div class="preview-category">
                            <h3 class="preview-category-title">\${getCategoryIcon(category)} \${getCategoryName(category)}</h3>
                            <div class="preview-items">
                                \${items.map(item => \`
                                    <div class="preview-item">
                                        <strong class="preview-key">\${item.key}</strong>
                                        <code class="preview-value">\${escapeHtml(item.value)}</code>
                                        \${item.description ? \`<span class="preview-desc">\${item.description}</span>\` : ''}
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                    \`;
                }
            });
            
            preview.innerHTML = html || '<p style="text-align: center; color: var(--text-tertiary); padding: 2rem;">暂无配置</p>';
        })
        .catch(error => {
            console.error('Failed to load config for preview:', error);
            preview.innerHTML = '<p style="text-align: center; color: var(--danger-color); padding: 2rem;">加载配置失败: ' + error.message + '</p>';
        });
}

/* ========================================
   获取类别名称
   ======================================== */
function getCategoryName(category) {
    const names = {
        api: 'API配置',
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