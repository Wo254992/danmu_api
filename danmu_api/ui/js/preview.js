/* ========================================
   渲染现代化主界面 - 仪表板风格
   ======================================== */
function renderPreview() {
    const preview = document.getElementById('preview-area');
    
    // 显示加载状态
    showLoadingIndicator('preview-area');
    
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            const categorizedVars = config.categorizedEnvVars || {};
            
            // 计算统计数据
            const stats = calculateStats(categorizedVars);
            
            let html = `
                <!-- 欢迎横幅 -->
                <div class="welcome-banner">
                    <div class="banner-content">
                        <h2 class="banner-title">🎉 欢迎使用 LogVar 弹幕 API</h2>
                        <p class="banner-desc">现代化的弹幕API服务管理平台</p>
                    </div>
                    <div class="banner-decoration">
                        <div class="decoration-circle"></div>
                        <div class="decoration-circle"></div>
                        <div class="decoration-circle"></div>
                    </div>
                </div>

                <!-- 统计卡片 -->
                <div class="stats-grid">
                    <div class="stat-card" style="animation: fadeInUp 0.4s ease-out 0.1s backwards;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            📊
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${stats.total}</div>
                            <div class="stat-label">配置总数</div>
                        </div>
                    </div>
                    
                    <div class="stat-card" style="animation: fadeInUp 0.4s ease-out 0.2s backwards;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            ✅
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${stats.configured}</div>
                            <div class="stat-label">已配置</div>
                        </div>
                    </div>
                    
                    <div class="stat-card" style="animation: fadeInUp 0.4s ease-out 0.3s backwards;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            📂
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${stats.categories}</div>
                            <div class="stat-label">配置类别</div>
                        </div>
                    </div>
                    
                    <div class="stat-card" style="animation: fadeInUp 0.4s ease-out 0.4s backwards;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                            🚀
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${config.envs.deployPlatform || 'Node'}</div>
                            <div class="stat-label">部署平台</div>
                        </div>
                    </div>
                </div>

                <!-- 配置概览 -->
                <div class="config-overview">
                    <div class="overview-header">
                        <h3 class="overview-title">
                            <span class="title-icon">⚙️</span>
                            配置概览
                        </h3>
                        <p class="overview-desc">系统当前生效的环境变量配置</p>
                    </div>
            `;
            
            // 按类别顺序排列
            const categoryOrder = ['api', 'source', 'match', 'danmu', 'cache', 'system'];
            const sortedCategories = categoryOrder.filter(cat => categorizedVars[cat] && categorizedVars[cat].length > 0);
            
            html += '<div class="categories-grid">';
            
            sortedCategories.forEach((category, index) => {
                const items = categorizedVars[category];
                const categoryIcon = getCategoryIcon(category);
                const categoryName = getCategoryName(category);
                const categoryColor = getCategoryColor(category);
                const configuredCount = items.filter(item => item.value && String(item.value).trim() !== '').length;
                
                html += `
                    <div class="category-card" style="animation: fadeInUp 0.4s ease-out ${0.5 + index * 0.1}s backwards;">
                        <div class="category-header">
                            <div class="category-icon" style="background: ${categoryColor};">
                                ${categoryIcon}
                            </div>
                            <div class="category-title-wrapper">
                                <h4 class="category-title">${categoryName}</h4>
                                <div class="category-stats">
                                    <span class="category-count">${items.length} 项配置</span>
                                    <span class="category-status ${configuredCount === items.length ? 'complete' : 'partial'}">
                                        ${configuredCount === items.length ? '✅ 完整' : '⚠️ 部分'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="category-items">
                            ${items.slice(0, 5).map((item, itemIndex) => {
                                const hasValue = item.value && String(item.value).trim() !== '';
                                return `
                                    <div class="config-item" style="animation: fadeInLeft 0.3s ease-out ${0.6 + index * 0.1 + itemIndex * 0.05}s backwards;">
                                        <div class="item-indicator ${hasValue ? 'configured' : 'empty'}">
                                            ${hasValue ? '●' : '○'}
                                        </div>
                                        <div class="item-details">
                                            <div class="item-name">${escapeHtml(item.key)}</div>
                                            <div class="item-desc">${escapeHtml(item.description || '无描述')}</div>
                                        </div>
                                        <div class="item-type-badge">${getTypeBadge(item.type || 'text')}</div>
                                    </div>
                                `;
                            }).join('')}
                            ${items.length > 5 ? `
                                <div class="show-more" onclick="switchSection('preview'); setTimeout(() => { document.querySelector('.category-tabs .tab-btn').click(); }, 100);">
                                    查看全部 ${items.length} 项 →
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            });
            
            html += '</div></div>';
            
            // 快速操作区
            html += `
                <div class="quick-actions">
                    <div class="action-header">
                        <h3 class="action-title">
                            <span class="title-icon">⚡</span>
                            快速操作
                        </h3>
                    </div>
                    <div class="actions-grid">
                        <div class="action-card" onclick="switchSection('logs')" style="animation: fadeInUp 0.4s ease-out 1.2s backwards;">
                            <div class="action-icon">📝</div>
                            <div class="action-name">查看日志</div>
                            <div class="action-desc">实时监控系统运行日志</div>
                        </div>
                        
                        <div class="action-card" onclick="switchSection('api')" style="animation: fadeInUp 0.4s ease-out 1.3s backwards;">
                            <div class="action-icon">🔧</div>
                            <div class="action-name">接口调试</div>
                            <div class="action-desc">测试和调试API接口</div>
                        </div>
                        
                        <div class="action-card" onclick="switchSection('push')" style="animation: fadeInUp 0.4s ease-out 1.4s backwards;">
                            <div class="action-icon">🚀</div>
                            <div class="action-name">推送弹幕</div>
                            <div class="action-desc">推送弹幕到播放器</div>
                        </div>
                        
                        <div class="action-card" onclick="switchSection('env')" style="animation: fadeInUp 0.4s ease-out 1.5s backwards;">
                            <div class="action-icon">⚙️</div>
                            <div class="action-name">系统配置</div>
                            <div class="action-desc">管理环境变量设置</div>
                        </div>
                    </div>
                </div>
            `;
            
            preview.innerHTML = html;
            
            // 添加预览样式
            addModernPreviewStyles();
            
            addLog('✅ 主界面加载完成', 'success');
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
   计算统计数据
   ======================================== */
function calculateStats(categorizedVars) {
    let total = 0;
    let configured = 0;
    const categories = Object.keys(categorizedVars).length;
    
    Object.values(categorizedVars).forEach(items => {
        total += items.length;
        configured += items.filter(item => item.value && String(item.value).trim() !== '').length;
    });
    
    return { total, configured, categories };
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
        /* 欢迎横幅 */
        .welcome-banner {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: var(--border-radius-xl);
            padding: var(--spacing-3xl);
            margin-bottom: var(--spacing-2xl);
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
            animation: fadeInDown 0.6s ease-out;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .banner-content {
            position: relative;
            z-index: 2;
        }
        
        .banner-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: white;
            margin: 0 0 var(--spacing-md) 0;
            text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            letter-spacing: -0.5px;
        }
        
        .banner-desc {
            font-size: 1.125rem;
            color: rgba(255, 255, 255, 0.95);
            margin: 0;
            font-weight: 500;
        }
        
        .banner-decoration {
            position: absolute;
            top: -50px;
            right: -50px;
            z-index: 1;
        }
        
        .decoration-circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            position: absolute;
            animation: float 6s ease-in-out infinite;
        }
        
        .decoration-circle:nth-child(2) {
            width: 150px;
            height: 150px;
            top: 100px;
            right: 50px;
            animation-delay: 1s;
        }
        
        .decoration-circle:nth-child(3) {
            width: 100px;
            height: 100px;
            top: 50px;
            right: 200px;
            animation-delay: 2s;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
            }
        }
        
        /* 统计卡片网格 */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
            box-shadow: var(--shadow-lg);
            border: 2px solid var(--border-color);
            transition: all var(--transition-base);
        }
        
        .stat-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .stat-icon {
            width: 70px;
            height: 70px;
            border-radius: var(--border-radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            flex-shrink: 0;
        }
        
        .stat-info {
            flex: 1;
        }
        
        .stat-value {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--text-primary);
            line-height: 1;
            margin-bottom: var(--spacing-xs);
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .stat-label {
            font-size: 0.9375rem;
            color: var(--text-secondary);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        /* 配置概览 */
        .config-overview {
            margin-bottom: var(--spacing-2xl);
        }
        
        .overview-header {
            margin-bottom: var(--spacing-xl);
        }
        
        .overview-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0 0 var(--spacing-sm) 0;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .title-icon {
            font-size: 2rem;
        }
        
        .overview-desc {
            font-size: 1rem;
            color: var(--text-secondary);
            margin: 0;
        }
        
        /* 类别网格 */
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: var(--spacing-xl);
        }
        
        .category-card {
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-xl);
            padding: var(--spacing-xl);
            box-shadow: var(--shadow-lg);
            border: 2px solid var(--border-color);
            transition: all var(--transition-base);
        }
        
        .category-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-color: var(--primary-color);
        }
        
        .category-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
            padding-bottom: var(--spacing-lg);
            border-bottom: 2px solid var(--border-color);
        }
        
        .category-icon {
            width: 56px;
            height: 56px;
            border-radius: var(--border-radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.75rem;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            flex-shrink: 0;
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
        
        .category-stats {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            flex-wrap: wrap;
        }
        
        .category-count {
            font-size: 0.875rem;
            color: var(--text-secondary);
            font-weight: 600;
        }
        
        .category-status {
            font-size: 0.75rem;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 12px;
            letter-spacing: 0.5px;
        }
        
        .category-status.complete {
            background: var(--success-light);
            color: var(--success-color);
        }
        
        .category-status.partial {
            background: var(--warning-light);
            color: var(--warning-color);
        }
        
        /* 配置项列表 */
        .category-items {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .config-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            background: var(--bg-secondary);
            border-radius: var(--border-radius);
            transition: all var(--transition-fast);
        }
        
        .config-item:hover {
            background: var(--bg-tertiary);
            transform: translateX(4px);
        }
        
        .item-indicator {
            width: 12px;
            height: 12px;
            font-size: 12px;
            flex-shrink: 0;
            font-weight: bold;
        }
        
        .item-indicator.configured {
            color: var(--success-color);
        }
        
        .item-indicator.empty {
            color: var(--text-tertiary);
        }
        
        .item-details {
            flex: 1;
            min-width: 0;
        }
        
        .item-name {
            font-size: 0.9375rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .item-desc {
            font-size: 0.8125rem;
            color: var(--text-tertiary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .item-type-badge {
            font-size: 0.7rem;
            font-weight: 700;
            padding: 3px 8px;
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            border-radius: 8px;
            flex-shrink: 0;
        }
        
        .show-more {
            padding: var(--spacing-md);
            text-align: center;
            color: var(--primary-color);
            font-weight: 600;
            cursor: pointer;
            border-radius: var(--border-radius);
            transition: all var(--transition-fast);
        }
        
        .show-more:hover {
            background: var(--bg-tertiary);
            color: var(--primary-hover);
        }
        
        /* 快速操作区 */
        .quick-actions {
            margin-top: var(--spacing-2xl);
        }
        
        .action-header {
            margin-bottom: var(--spacing-xl);
        }
        
        .action-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: var(--spacing-xl);
        }
        
        .action-card {
            background: var(--bg-card);
            backdrop-filter: var(--blur-md);
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-2xl);
            text-align: center;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            border: 2px solid var(--border-color);
            transition: all var(--transition-base);
        }
        
        .action-card:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: var(--shadow-colored);
            border-color: var(--primary-color);
        }
        
        .action-icon {
            font-size: 3.5rem;
            margin-bottom: var(--spacing-lg);
            animation: bounce 2s ease-in-out infinite;
        }
        
        .action-card:hover .action-icon {
            animation: none;
            transform: scale(1.2);
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .action-name {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .action-desc {
            font-size: 0.9375rem;
            color: var(--text-secondary);
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .banner-title {
                font-size: 1.75rem;
            }
            
            .banner-desc {
                font-size: 1rem;
            }
            
            .stats-grid {
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: var(--spacing-md);
            }
            
            .stat-card {
                flex-direction: column;
                text-align: center;
                padding: var(--spacing-lg);
            }
            
            .stat-icon {
                width: 56px;
                height: 56px;
                font-size: 1.75rem;
            }
            
            .stat-value {
                font-size: 2rem;
            }
            
            .stat-label {
                font-size: 0.8125rem;
            }
            
            .overview-title,
            .action-title {
                font-size: 1.5rem;
            }
            
            .categories-grid {
                grid-template-columns: 1fr;
            }
            
            .actions-grid {
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: var(--spacing-md);
            }
            
            .action-card {
                padding: var(--spacing-lg);
            }
            
            .action-icon {
                font-size: 2.5rem;
                margin-bottom: var(--spacing-md);
            }
            
            .action-name {
                font-size: 1rem;
            }
            
            .action-desc {
                font-size: 0.8125rem;
            }
        }
    `;
    document.head.appendChild(style);
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