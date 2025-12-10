/* ========================================
   渲染配置预览 - 现代化仪表盘风格
   ======================================== */
function renderPreview() {
    const preview = document.getElementById('preview-area');
    
    // 显示加载状态
    showLoadingIndicator('preview-area');
    
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            const categorizedVars = config.categorizedEnvVars || {};
            
            // 统计数据
            const stats = calculateStats(categorizedVars);
            
            let html = `
                <!-- 统计卡片区域 -->
                <div class="dashboard-stats">
                    <div class="stat-card" style="animation: fadeInUp 0.4s ease-out;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                        </div>
                        <div class="stat-info">
                            <div class="stat-label">配置总数</div>
                            <div class="stat-value">${stats.total}</div>
                        </div>
                    </div>
                    
                    <div class="stat-card" style="animation: fadeInUp 0.4s ease-out 0.1s backwards;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <div class="stat-info">
                            <div class="stat-label">配置类别</div>
                            <div class="stat-value">${stats.categories}</div>
                        </div>
                    </div>
                    
                    <div class="stat-card" style="animation: fadeInUp 0.4s ease-out 0.2s backwards;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                        </div>
                        <div class="stat-info">
                            <div class="stat-label">系统状态</div>
                            <div class="stat-value stat-status">运行中</div>
                        </div>
                    </div>
                </div>
            `;
            
            // 按类别顺序排列
            const categoryOrder = ['api', 'source', 'match', 'danmu', 'cache', 'system'];
            const sortedCategories = categoryOrder.filter(cat => categorizedVars[cat] && categorizedVars[cat].length > 0);
            
            html += '<div class="config-categories">';
            
            sortedCategories.forEach((category, index) => {
                const items = categorizedVars[category];
                const categoryIcon = getCategoryIcon(category);
                const categoryName = getCategoryName(category);
                const categoryColor = getCategoryColor(category);
                
                html += `
                    <div class="category-section" style="animation: fadeInUp 0.4s ease-out ${(index + 3) * 0.1}s backwards;">
                        <div class="category-header" onclick="toggleCategory('${category}')">
                            <div class="category-header-left">
                                <div class="category-icon-wrapper" style="background: ${categoryColor};">
                                    <span class="category-icon-emoji">${categoryIcon}</span>
                                </div>
                                <div class="category-title-wrapper">
                                    <h3 class="category-title">${categoryName}</h3>
                                    <p class="category-count">${items.length} 项配置</p>
                                </div>
                            </div>
                            <div class="category-toggle">
                                <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                        
                        <div class="category-content active" id="category-${category}">
                            <div class="config-grid">
                                ${items.map((item, itemIndex) => `
                                    <div class="config-card" style="animation: fadeInUp 0.3s ease-out ${itemIndex * 0.05}s backwards;">
                                        <div class="config-card-header">
                                            <div class="config-name">
                                                <span class="config-icon">🔑</span>
                                                <span class="config-key">${escapeHtml(item.key)}</span>
                                            </div>
                                            <button class="config-copy-btn" onclick="copyConfigValue('${escapeHtml(String(item.value)).replace(/'/g, "\\'")}', this)" title="复制值">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="config-value-wrapper">
                                            <code class="config-value">${escapeHtml(formatDisplayValue(item.value))}</code>
                                        </div>
                                        ${item.description ? `
                                            <div class="config-description">
                                                <span class="desc-icon">💡</span>
                                                <span>${escapeHtml(item.description)}</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            
            if (sortedCategories.length === 0) {
                html = `
                    <div class="preview-empty-state">
                        <div class="empty-illustration">
                            <svg viewBox="0 0 200 200" fill="none">
                                <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="2" opacity="0.2"/>
                                <path d="M70 90h60M70 110h40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <h3 class="empty-title">暂无配置数据</h3>
                        <p class="empty-desc">还没有配置任何环境变量，请前往系统配置添加</p>
                    </div>
                `;
            }
            
            preview.innerHTML = html;
            
            // 添加现代化样式
            addModernPreviewStyles();
            
            addLog('✅ 配置预览加载完成，共 ' + sortedCategories.length + ' 个类别，' + stats.total + ' 项配置', 'success');
        })
        .catch(error => {
            console.error('Failed to load config for preview:', error);
            preview.innerHTML = `
                <div class="preview-error-state">
                    <div class="error-illustration">
                        <svg viewBox="0 0 200 200" fill="none">
                            <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="2"/>
                            <path d="M70 70l60 60M130 70l-60 60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <h3 class="error-title">加载失败</h3>
                    <p class="error-desc">${escapeHtml(error.message)}</p>
                    <button class="btn btn-primary" onclick="renderPreview()">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        重新加载
                    </button>
                </div>
            `;
            addLog('❌ 配置预览加载失败: ' + error.message, 'error');
        });
}

/* ========================================
   计算统计数据
   ======================================== */
function calculateStats(categorizedVars) {
    let total = 0;
    let categories = 0;
    
    for (const category in categorizedVars) {
        if (categorizedVars[category] && categorizedVars[category].length > 0) {
            total += categorizedVars[category].length;
            categories++;
        }
    }
    
    return { total, categories };
}

/* ========================================
   切换类别展开/收起
   ======================================== */
function toggleCategory(category) {
    const content = document.getElementById('category-' + category);
    const section = content.closest('.category-section');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        section.classList.add('collapsed');
    } else {
        content.classList.add('active');
        section.classList.remove('collapsed');
    }
}

/* ========================================
   复制配置值
   ======================================== */
function copyConfigValue(value, button) {
    const textToCopy = String(value);
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('copied');
            }, 1500);
            
            addLog('📋 已复制配置值到剪贴板', 'success');
        })
        .catch(err => {
            console.error('复制失败:', err);
            addLog('❌ 复制失败: ' + err.message, 'error');
        });
}

/* ========================================
   格式化显示值
   ======================================== */
function formatDisplayValue(value) {
    const stringValue = String(value);
    if (stringValue.length > 100) {
        return stringValue.substring(0, 100) + '...';
    }
    return stringValue;
}

/* ========================================
   添加现代化预览样式
   ======================================== */
function addModernPreviewStyles() {
    if (document.getElementById('modern-preview-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'modern-preview-styles';
    style.textContent = `
        /* 仪表盘统计卡片 */
        .dashboard-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--spacing-xl);
            margin-bottom: var(--spacing-2xl);
        }
        
        .stat-card {
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-xl);
            display: flex;
            align-items: center;
            gap: var(--spacing-lg);
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border-color);
            transition: all var(--transition-base);
            position: relative;
            overflow: hidden;
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
            opacity: 0;
            transition: opacity var(--transition-base);
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
        
        .stat-card:hover::before {
            opacity: 1;
        }
        
        .stat-icon {
            width: 64px;
            height: 64px;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: var(--shadow-md);
        }
        
        .stat-icon svg {
            width: 32px;
            height: 32px;
            stroke: white;
        }
        
        .stat-info {
            flex: 1;
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            font-weight: 600;
            margin-bottom: var(--spacing-xs);
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--text-primary);
            line-height: 1;
        }
        
        .stat-status {
            font-size: 1.25rem;
            color: var(--success-color);
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
        }
        
        .stat-status::before {
            content: '';
            width: 10px;
            height: 10px;
            background: var(--success-color);
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
        }
        
        /* 配置类别区域 */
        .config-categories {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xl);
        }
        
        .category-section {
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border-color);
            transition: all var(--transition-base);
        }
        
        .category-section:hover {
            box-shadow: var(--shadow-lg);
        }
        
        .category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-xl);
            cursor: pointer;
            transition: background var(--transition-fast);
            user-select: none;
        }
        
        .category-header:hover {
            background: var(--bg-secondary);
        }
        
        .category-header-left {
            display: flex;
            align-items: center;
            gap: var(--spacing-lg);
            flex: 1;
        }
        
        .category-icon-wrapper {
            width: 56px;
            height: 56px;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: var(--shadow-md);
        }
        
        .category-icon-emoji {
            font-size: 1.75rem;
        }
        
        .category-title-wrapper {
            flex: 1;
        }
        
        .category-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-xs) 0;
        }
        
        .category-count {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin: 0;
            font-weight: 600;
        }
        
        .category-toggle {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: transform var(--transition-base);
        }
        
        .category-section.collapsed .category-toggle {
            transform: rotate(-90deg);
        }
        
        .toggle-icon {
            width: 24px;
            height: 24px;
            stroke: var(--text-secondary);
        }
        
        .category-content {
            max-height: 5000px;
            opacity: 1;
            transition: all var(--transition-slow);
            overflow: hidden;
        }
        
        .category-content:not(.active) {
            max-height: 0;
            opacity: 0;
            padding: 0;
        }
        
        /* 配置卡片网格 */
        .config-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: var(--spacing-lg);
            padding: var(--spacing-xl);
            padding-top: 0;
        }
        
        .config-card {
            background: var(--bg-secondary);
            border-radius: var(--border-radius);
            padding: var(--spacing-lg);
            border: 2px solid var(--border-color);
            transition: all var(--transition-base);
            position: relative;
        }
        
        .config-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: var(--primary-color);
            opacity: 0;
            transition: opacity var(--transition-base);
        }
        
        .config-card:hover {
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
        
        .config-card:hover::before {
            opacity: 1;
        }
        
        .config-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);
        }
        
        .config-name {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            flex: 1;
            min-width: 0;
        }
        
        .config-icon {
            font-size: 1rem;
            flex-shrink: 0;
        }
        
        .config-key {
            font-weight: 700;
            color: var(--text-primary);
            font-size: 0.9375rem;
            word-break: break-word;
        }
        
        .config-copy-btn {
            width: 32px;
            height: 32px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all var(--transition-fast);
            flex-shrink: 0;
            padding: 0;
        }
        
        .config-copy-btn:hover {
            background: var(--primary-color);
            border-color: var(--primary-color);
            transform: scale(1.1);
        }
        
        .config-copy-btn:hover svg {
            stroke: white;
        }
        
        .config-copy-btn.copied {
            background: var(--success-color);
            border-color: var(--success-color);
        }
        
        .config-copy-btn.copied svg {
            stroke: white;
        }
        
        .config-copy-btn svg {
            width: 16px;
            height: 16px;
            stroke: var(--text-secondary);
            transition: stroke var(--transition-fast);
        }
        
        .config-value-wrapper {
            margin-bottom: var(--spacing-md);
        }
        
        .config-value {
            display: block;
            background: var(--bg-primary);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--border-radius-sm);
            font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
            font-size: 0.8125rem;
            color: var(--text-secondary);
            word-break: break-all;
            border: 1px solid var(--border-color);
        }
        
        .config-description {
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-xs);
            font-size: 0.8125rem;
            color: var(--text-tertiary);
            line-height: 1.5;
        }
        
        .desc-icon {
            font-size: 0.875rem;
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        /* 空状态 */
        .preview-empty-state,
        .preview-error-state {
            text-align: center;
            padding: var(--spacing-3xl);
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-xl);
            border: 2px dashed var(--border-color);
            box-shadow: var(--shadow-md);
        }
        
        .empty-illustration,
        .error-illustration {
            width: 200px;
            height: 200px;
            margin: 0 auto var(--spacing-xl);
            color: var(--text-tertiary);
            opacity: 0.5;
        }
        
        .empty-title,
        .error-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-sm) 0;
        }
        
        .empty-desc,
        .error-desc {
            font-size: 1rem;
            color: var(--text-secondary);
            margin: 0 0 var(--spacing-xl) 0;
        }
        
        /* 移动端适配 */
        @media (max-width: 768px) {
            .dashboard-stats {
                grid-template-columns: 1fr;
                gap: var(--spacing-md);
            }
            
            .stat-card {
                padding: var(--spacing-lg);
            }
            
            .stat-icon {
                width: 56px;
                height: 56px;
            }
            
            .stat-icon svg {
                width: 28px;
                height: 28px;
            }
            
            .stat-value {
                font-size: 1.75rem;
            }
            
            .category-header {
                padding: var(--spacing-lg);
            }
            
            .category-icon-wrapper {
                width: 48px;
                height: 48px;
            }
            
            .category-icon-emoji {
                font-size: 1.5rem;
            }
            
            .category-title {
                font-size: 1.125rem;
            }
            
            .config-grid {
                grid-template-columns: 1fr;
                padding: var(--spacing-lg);
                padding-top: 0;
            }
            
            .config-card {
                padding: var(--spacing-md);
            }
        }
    `;
    document.head.appendChild(style);
}

/* ========================================
   工具函数保持不变
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