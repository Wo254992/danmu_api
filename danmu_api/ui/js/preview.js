/* ========================================
   渲染配置预览 - 现代化仪表板
   ======================================== */
function renderPreview() {
    const preview = document.getElementById('preview-area');
    
    // 显示加载状态
    showLoadingIndicator('preview-area');
    
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            const categorizedVars = config.categorizedEnvVars || {};
            
            // 统计信息
            const stats = {
                total: 0,
                categories: Object.keys(categorizedVars).length,
                byCategory: {}
            };
            
            Object.keys(categorizedVars).forEach(cat => {
                const count = categorizedVars[cat].length;
                stats.total += count;
                stats.byCategory[cat] = count;
            });
            
            let html = `
                <div class="dashboard-container">
                    <!-- 欢迎卡片 -->
                    <div class="welcome-card">
                        <div class="welcome-icon">🎉</div>
                        <div class="welcome-content">
                            <h2 class="welcome-title">欢迎使用 LogVar 弹幕API</h2>
                            <p class="welcome-subtitle">系统配置总览 - 一切运行正常</p>
                        </div>
                        <div class="welcome-status">
                            <div class="status-indicator status-online"></div>
                            <span class="status-text">在线运行中</span>
                        </div>
                    </div>
                    
                    <!-- 统计卡片区 -->
                    <div class="stats-grid">
                        <div class="stat-card stat-primary">
                            <div class="stat-icon-wrapper">
                                <div class="stat-icon">📊</div>
                            </div>
                            <div class="stat-content">
                                <div class="stat-value">${stats.total}</div>
                                <div class="stat-label">配置项总数</div>
                            </div>
                        </div>
                        
                        <div class="stat-card stat-success">
                            <div class="stat-icon-wrapper">
                                <div class="stat-icon">📁</div>
                            </div>
                            <div class="stat-content">
                                <div class="stat-value">${stats.categories}</div>
                                <div class="stat-label">配置类别</div>
                            </div>
                        </div>
                        
                        <div class="stat-card stat-info">
                            <div class="stat-icon-wrapper">
                                <div class="stat-icon">✅</div>
                            </div>
                            <div class="stat-content">
                                <div class="stat-value">100%</div>
                                <div class="stat-label">配置完整度</div>
                            </div>
                        </div>
                        
                        <div class="stat-card stat-warning">
                            <div class="stat-icon-wrapper">
                                <div class="stat-icon">🚀</div>
                            </div>
                            <div class="stat-content">
                                <div class="stat-value">活跃</div>
                                <div class="stat-label">系统状态</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 配置类别概览 -->
                    <div class="categories-overview">
                        <h3 class="section-heading">
                            <span class="heading-icon">🎯</span>
                            配置类别概览
                        </h3>
                        <div class="category-cards-grid">
            `;
            
            // 按类别顺序排列
            const categoryOrder = ['api', 'source', 'match', 'danmu', 'cache', 'system'];
            const sortedCategories = categoryOrder.filter(cat => categorizedVars[cat] && categorizedVars[cat].length > 0);
            
            sortedCategories.forEach((category, index) => {
                const items = categorizedVars[category];
                const categoryIcon = getCategoryIcon(category);
                const categoryName = getCategoryName(category);
                const categoryColor = getCategoryColor(category);
                const categoryDesc = getCategoryDescription(category);
                
                html += `
                    <div class="category-overview-card" style="animation: fadeInUp 0.4s ease-out ${index * 0.1}s backwards;">
                        <div class="category-card-header">
                            <div class="category-card-icon" style="background: ${categoryColor};">
                                ${categoryIcon}
                            </div>
                            <div class="category-card-info">
                                <h4 class="category-card-title">${categoryName}</h4>
                                <p class="category-card-desc">${categoryDesc}</p>
                            </div>
                        </div>
                        <div class="category-card-stats">
                            <div class="category-stat">
                                <span class="category-stat-icon">📝</span>
                                <span class="category-stat-value">${items.length}</span>
                                <span class="category-stat-label">配置项</span>
                            </div>
                            <div class="category-stat">
                                <span class="category-stat-icon">✨</span>
                                <span class="category-stat-value">已生效</span>
                            </div>
                        </div>
                        <div class="category-card-items">
                            ${items.slice(0, 4).map(item => `
                                <div class="category-item-chip">
                                    <span class="chip-icon">🔹</span>
                                    <span class="chip-text">${escapeHtml(item.key)}</span>
                                </div>
                            `).join('')}
                            ${items.length > 4 ? `
                                <div class="category-item-chip chip-more">
                                    <span class="chip-icon">➕</span>
                                    <span class="chip-text">还有 ${items.length - 4} 项...</span>
                                </div>
                            ` : ''}
                        </div>
                        <button class="category-card-button" onclick="viewCategoryDetails('${category}')">
                            <span>查看详情</span>
                            <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                `;
            });
            
            html += `
                        </div>
                    </div>
                    
                    <!-- 快速操作区 -->
                    <div class="quick-actions">
                        <h3 class="section-heading">
                            <span class="heading-icon">⚡</span>
                            快速操作
                        </h3>
                        <div class="action-cards-grid">
                            <div class="action-card" onclick="switchSection('logs')">
                                <div class="action-card-icon action-icon-blue">📝</div>
                                <h4 class="action-card-title">查看日志</h4>
                                <p class="action-card-desc">实时监控系统运行状态</p>
                            </div>
                            <div class="action-card" onclick="switchSection('api')">
                                <div class="action-card-icon action-icon-green">🔧</div>
                                <h4 class="action-card-title">接口调试</h4>
                                <p class="action-card-desc">测试和调试API接口</p>
                            </div>
                            <div class="action-card" onclick="switchSection('push')">
                                <div class="action-card-icon action-icon-purple">🚀</div>
                                <h4 class="action-card-title">推送弹幕</h4>
                                <p class="action-card-desc">向播放器推送弹幕</p>
                            </div>
                            <div class="action-card" onclick="switchSection('env')">
                                <div class="action-card-icon action-icon-orange">⚙️</div>
                                <h4 class="action-card-title">系统配置</h4>
                                <p class="action-card-desc">管理环境变量设置</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            preview.innerHTML = html;
            
            // 添加现代化样式
            addModernDashboardStyles();
            
            addLog('✅ 主界面加载完成，共 ' + sortedCategories.length + ' 个类别', 'success');
        })
        .catch(error => {
            console.error('Failed to load config for preview:', error);
            preview.innerHTML = `
                <div class="preview-error">
                    <div class="error-icon">⚠️</div>
                    <h3>加载失败</h3>
                    <p>${escapeHtml(error.message)}</p>
                    <button class="btn btn-primary" onclick="renderPreview()">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        重新加载
                    </button>
                </div>
            `;
            addLog('❌ 主界面加载失败: ' + error.message, 'error');
        });
}

/* ========================================
   添加现代化仪表板样式
   ======================================== */
function addModernDashboardStyles() {
    if (document.getElementById('modern-dashboard-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'modern-dashboard-styles';
    style.textContent = `
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
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        .dashboard-container {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-2xl);
        }
        
        /* 欢迎卡片 */
        .welcome-card {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            border-radius: var(--border-radius-xl);
            padding: var(--spacing-2xl);
            display: flex;
            align-items: center;
            gap: var(--spacing-xl);
            box-shadow: var(--shadow-colored);
            color: white;
            position: relative;
            overflow: hidden;
            animation: fadeInUp 0.6s ease-out;
        }
        
        .welcome-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 200%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.2), 
                transparent
            );
            animation: shimmer 3s infinite;
        }
        
        .welcome-icon {
            font-size: 4rem;
            animation: float 3s ease-in-out infinite;
            flex-shrink: 0;
        }
        
        .welcome-content {
            flex: 1;
            position: relative;
            z-index: 1;
        }
        
        .welcome-title {
            font-size: 1.75rem;
            font-weight: 800;
            margin: 0 0 var(--spacing-xs) 0;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .welcome-subtitle {
            font-size: 1rem;
            margin: 0;
            opacity: 0.95;
        }
        
        .welcome-status {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            padding: var(--spacing-sm) var(--spacing-lg);
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            position: relative;
            z-index: 1;
            flex-shrink: 0;
        }
        
        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .status-online {
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
        }
        
        .status-text {
            font-weight: 600;
            font-size: 0.9375rem;
        }
        
        /* 统计卡片网格 */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: var(--spacing-xl);
            animation: fadeInUp 0.6s ease-out 0.1s backwards;
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
            border: 2px solid var(--border-color);
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
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform var(--transition-base);
        }
        
        .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary-color);
        }
        
        .stat-card:hover::before {
            transform: scaleX(1);
        }
        
        .stat-icon-wrapper {
            width: 64px;
            height: 64px;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            position: relative;
        }
        
        .stat-primary .stat-icon-wrapper {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
        }
        
        .stat-success .stat-icon-wrapper {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1));
        }
        
        .stat-info .stat-icon-wrapper {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(96, 165, 250, 0.1));
        }
        
        .stat-warning .stat-icon-wrapper {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1));
        }
        
        .stat-icon {
            font-size: 2rem;
        }
        
        .stat-content {
            flex: 1;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--text-primary);
            line-height: 1.2;
            margin-bottom: var(--spacing-xs);
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            font-weight: 600;
        }
        
        /* 配置类别概览 */
        .categories-overview {
            animation: fadeInUp 0.6s ease-out 0.2s backwards;
        }
        
        .section-heading {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-xl) 0;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .heading-icon {
            font-size: 1.75rem;
        }
        
        .category-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: var(--spacing-xl);
        }
        
        .category-overview-card {
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-xl);
            box-shadow: var(--shadow-md);
            border: 2px solid var(--border-color);
            transition: all var(--transition-base);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
        }
        
        .category-overview-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary-color);
        }
        
        .category-card-header {
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-md);
        }
        
        .category-card-icon {
            width: 56px;
            height: 56px;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.75rem;
            flex-shrink: 0;
            box-shadow: var(--shadow-md);
        }
        
        .category-card-info {
            flex: 1;
            min-width: 0;
        }
        
        .category-card-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-xs) 0;
        }
        
        .category-card-desc {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.5;
        }
        
        .category-card-stats {
            display: flex;
            gap: var(--spacing-xl);
            padding: var(--spacing-md) 0;
            border-top: 1px solid var(--border-color);
            border-bottom: 1px solid var(--border-color);
        }
        
        .category-stat {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            font-size: 0.875rem;
        }
        
        .category-stat-icon {
            font-size: 1rem;
        }
        
        .category-stat-value {
            font-weight: 700;
            color: var(--text-primary);
        }
        
        .category-stat-label {
            color: var(--text-secondary);
        }
        
        .category-card-items {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-xs);
        }
        
        .category-item-chip {
            display: inline-flex;
            align-items: center;
            gap: var(--spacing-xs);
            padding: 4px 12px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            font-size: 0.8125rem;
            color: var(--text-secondary);
            font-weight: 600;
        }
        
        .chip-icon {
            font-size: 0.75rem;
        }
        
        .chip-more {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            color: white;
            border-color: transparent;
        }
        
        .category-card-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-xs);
            padding: var(--spacing-md);
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: var(--border-radius);
            color: var(--text-primary);
            font-weight: 600;
            font-size: 0.9375rem;
            cursor: pointer;
            transition: all var(--transition-fast);
        }
        
        .category-card-button:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            transform: translateX(4px);
        }
        
        .button-icon {
            width: 16px;
            height: 16px;
            stroke-width: 2.5;
            transition: transform var(--transition-fast);
        }
        
        .category-card-button:hover .button-icon {
            transform: translateX(4px);
        }
        
        /* 快速操作区 */
        .quick-actions {
            animation: fadeInUp 0.6s ease-out 0.3s backwards;
        }
        
        .action-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: var(--spacing-xl);
        }
        
        .action-card {
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-xl);
            box-shadow: var(--shadow-md);
            border: 2px solid var(--border-color);
            transition: all var(--transition-base);
            cursor: pointer;
            text-align: center;
        }
        
        .action-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary-color);
        }
        
        .action-card-icon {
            width: 72px;
            height: 72px;
            margin: 0 auto var(--spacing-lg);
            border-radius: var(--border-radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            box-shadow: var(--shadow-md);
        }
        
        .action-icon-blue {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(96, 165, 250, 0.1));
        }
        
        .action-icon-green {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1));
        }
        
        .action-icon-purple {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.1));
        }
        
        .action-icon-orange {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1));
        }
        
        .action-card-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-xs) 0;
        }
        
        .action-card-desc {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.5;
        }
        
        /* 移动端适配 */
        @media (max-width: 768px) {
            .welcome-card {
                flex-direction: column;
                text-align: center;
                padding: var(--spacing-xl);
            }
            
            .welcome-icon {
                font-size: 3rem;
            }
            
            .welcome-title {
                font-size: 1.5rem;
            }
            
            .welcome-subtitle {
                font-size: 0.9375rem;
            }
            
            .stats-grid {
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: var(--spacing-md);
            }
            
            .stat-card {
                flex-direction: column;
                text-align: center;
                padding: var(--spacing-lg);
            }
            
            .stat-icon-wrapper {
                width: 52px;
                height: 52px;
            }
            
            .stat-icon {
                font-size: 1.5rem;
            }
            
            .stat-value {
                font-size: 1.5rem;
            }
            
            .stat-label {
                font-size: 0.75rem;
            }
            
            .category-cards-grid {
                grid-template-columns: 1fr;
            }
            
            .category-card-icon {
                width: 48px;
                height: 48px;
                font-size: 1.5rem;
            }
            
            .action-cards-grid {
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            }
            
            .action-card-icon {
                width: 56px;
                height: 56px;
                font-size: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
}

/* ========================================
   查看类别详情
   ======================================== */
function viewCategoryDetails(category) {
    switchSection('env');
    setTimeout(() => {
        switchCategory(category);
    }, 300);
}

/* ========================================
   获取类别描述
   ======================================== */
function getCategoryDescription(category) {
    const descriptions = {
        api: '管理API端点和认证配置',
        source: '配置弹幕数据源和来源',
        match: '智能匹配规则和算法',
        danmu: '弹幕显示和过滤设置',
        cache: '缓存策略和性能优化',
        system: '系统级配置和部署参数'
    };
    return descriptions[category] || '配置项管理';
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