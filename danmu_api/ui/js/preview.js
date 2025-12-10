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
                                        <button class="preview-copy-btn" onclick="copyPreviewValue('\${escapeHtml(item.value).replace(/'/g, "\\\\'")}', this)" title="复制值">
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
            
            // 添加动画样式
            addPreviewAnimationStyles();
            
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
   添加预览动画样式
   ======================================== */
function addPreviewAnimationStyles() {
    if (document.getElementById('preview-animation-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'preview-animation-styles';
    style.textContent = \`
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
            opacity: 0;
            transform: translateX(-10px);
        }
        
        .preview-item:hover .preview-copy-btn {
            opacity: 1;
            transform: translateX(0);
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
        
        .empty-icon,
        .error-icon {
            font-size: 5rem;
            margin-bottom: var(--spacing-lg);
            animation: pulse 2s ease-in-out infinite;
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
        }
    \`;
    document.head.appendChild(style);
}

/* ========================================
   复制预览值
   ======================================== */
function copyPreviewValue(value, button) {
    navigator.clipboard.writeText(value)
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
    if (typeof value === 'string' && value.length > 200) {
        return value.substring(0, 200) + '...';
    }
    return value;
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