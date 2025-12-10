/* ========================================
   渲染配置预览 - 现代化主界面
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
                <!-- 欢迎横幅 -->
                <div class="welcome-banner">
                    <div class="banner-content">
                        <div class="banner-icon">🚀</div>
                        <div class="banner-text">
                            <h1 class="banner-title">LogVar 弹幕API 管理平台</h1>
                            <p class="banner-subtitle">现代化的配置管理，强大的功能支持</p>
                        </div>
                    </div>
                    <div class="banner-wave"></div>
                </div>

                <!-- 统计卡片 -->
                <div class="stats-grid">
                    <div class="stat-card" style="animation-delay: 0.1s;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            📊
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.total}</div>
                            <div class="stat-label">配置项总数</div>
                        </div>
                    </div>
                    
                    <div class="stat-card" style="animation-delay: 0.2s;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            📁
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.categories}</div>
                            <div class="stat-label">配置类别</div>
                        </div>
                    </div>
                    
                    <div class="stat-card" style="animation-delay: 0.3s;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            ✅
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.configured}</div>
                            <div class="stat-label">已配置项</div>
                        </div>
                    </div>
                    
                    <div class="stat-card" style="animation-delay: 0.4s;">
                        <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                            🎯
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.active}</div>
                            <div class="stat-label">生效中</div>
                        </div>
                    </div>
                </div>

                <!-- 配置概览 -->
                <div class="config-overview">
                    <h2 class="section-heading">
                        <span class="heading-icon">⚙️</span>
                        配置概览
                        <span class="heading-badge">实时状态</span>
                    </h2>
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
                    <div class="config-category-card" style="animation: fadeInUp 0.4s ease-out ${index * 0.1}s backwards;">
                        <div class="category-card-header">
                            <div class="category-header-left">
                                <div class="category-card-icon" style="background: ${categoryColor};">
                                    ${categoryIcon}
                                </div>
                                <div class="category-card-info">
                                    <h3 class="category-card-title">${categoryName}</h3>
                                    <p class="category-card-desc">${categoryDesc}</p>
                                </div>
                            </div>
                            <div class="category-card-badge">
                                <span class="badge-icon">📋</span>
                                <span>${items.length} 项</span>
                            </div>
                        </div>
                        
                        <div class="config-items-grid">
                            ${items.map((item, itemIndex) => `
                                <div class="config-item-card" style="animation: fadeInUp 0.3s ease-out ${(index * 0.1) + (itemIndex * 0.03)}s backwards;">
                                    <div class="item-card-header">
                                        <div class="item-status ${getItemStatus(item.value)}">
                                            <span class="status-dot"></span>
                                            <span class="status-text">${getStatusText(item.value)}</span>
                                        </div>
                                        <div class="item-type-badge">${getTypeBadge(item.type || 'text')}</div>
                                    </div>
                                    
                                    <div class="item-card-body">
                                        <h4 class="item-card-title">
                                            <span class="item-icon">🔑</span>
                                            ${escapeHtml(item.key)}
                                        </h4>
                                        
                                        <div class="item-card-desc">
                                            ${item.description ? escapeHtml(item.description) : '<span class="text-muted">暂无描述</span>'}
                                        </div>
                                        
                                        <div class="item-card-value-preview">
                                            ${getValuePreview(item)}
                                        </div>
                                    </div>
                                    
                                    <div class="item-card-footer">
                                        <button class="item-action-btn" onclick="viewFullValue('${escapeHtml(String(item.value)).replace(/'/g, "\\'")}', '${escapeHtml(item.key).replace(/'/g, "\\'")}')">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg>
                                            <span>查看详情</span>
                                        </button>
                                        <button class="item-action-btn secondary" onclick="copyItemValue('${escapeHtml(String(item.value)).replace(/'/g, "\\'")}')">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                            <span>复制</span>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            
            if (sortedCategories.length === 0) {
                html = `
                    <div class="preview-empty-state">
                        <div class="empty-illustration">🎨</div>
                        <h3 class="empty-title">还没有配置</h3>
                        <p class="empty-desc">开始添加你的第一个环境变量配置吧</p>
                        <button class="btn btn-primary" onclick="switchSection('env')">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 4v16m8-8H4"/>
                            </svg>
                            <span>添加配置</span>
                        </button>
                    </div>
                `;
            }
            
            preview.innerHTML = html;
            
            // 添加预览样式
            addModernPreviewStyles();
            
            addLog('✅ 主界面加载完成，共 ' + sortedCategories.length + ' 个类别', 'success');
        })
        .catch(error => {
            console.error('Failed to load config for preview:', error);
            preview.innerHTML = `
                <div class="preview-error-state">
                    <div class="error-illustration">⚠️</div>
                    <h3 class="error-title">加载失败</h3>
                    <p class="error-desc">${escapeHtml(error.message)}</p>
                    <button class="btn btn-primary" onclick="renderPreview()">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <span>重新加载</span>
                    </button>
                </div>
            `;
            addLog('❌ 主界面加载失败: ' + error.message, 'error');
        });
}

/* ========================================
   统计数据计算
   ======================================== */
function calculateStats(categorizedVars) {
    let total = 0;
    let configured = 0;
    let active = 0;
    
    Object.values(categorizedVars).forEach(items => {
        total += items.length;
        items.forEach(item => {
            if (item.value && String(item.value).trim() !== '') {
                configured++;
                if (isValueActive(item.value)) {
                    active++;
                }
            }
        });
    });
    
    return {
        total,
        categories: Object.keys(categorizedVars).length,
        configured,
        active
    };
}

/* ========================================
   判断值是否激活
   ======================================== */
function isValueActive(value) {
    const strValue = String(value).trim().toLowerCase();
    // 认为非空、非false、非0的值为激活状态
    return strValue !== '' && strValue !== 'false' && strValue !== '0';
}

/* ========================================
   获取配置项状态
   ======================================== */
function getItemStatus(value) {
    if (!value || String(value).trim() === '') {
        return 'status-empty';
    }
    if (isValueActive(value)) {
        return 'status-active';
    }
    return 'status-inactive';
}

/* ========================================
   获取状态文本
   ======================================== */
function getStatusText(value) {
    if (!value || String(value).trim() === '') {
        return '未配置';
    }
    if (isValueActive(value)) {
        return '生效中';
    }
    return '已禁用';
}

/* ========================================
   获取值预览
   ======================================== */
function getValuePreview(item) {
    const value = String(item.value || '');
    const type = item.type || 'text';
    
    if (!value || value.trim() === '') {
        return '<span class="value-empty">暂未设置</span>';
    }
    
    if (type === 'boolean') {
        const isTrue = value.toLowerCase() === 'true';
        return `<span class="value-boolean ${isTrue ? 'true' : 'false'}">
            <span class="boolean-icon">${isTrue ? '✅' : '❌'}</span>
            <span>${isTrue ? '已启用' : '已禁用'}</span>
        </span>`;
    }
    
    if (type === 'number') {
        return `<span class="value-number">
            <span class="number-icon">🔢</span>
            <span>${value}</span>
        </span>`;
    }
    
    if (type === 'multi-select') {
        const items = value.split(',').filter(v => v.trim());
        return `<span class="value-multi">
            <span class="multi-icon">📋</span>
            <span>${items.length} 项已选择</span>
        </span>`;
    }
    
    // 普通文本，显示类型和长度
    const length = value.length;
    return `<span class="value-text">
        <span class="text-icon">📝</span>
        <span>${length > 50 ? '长文本' : '短文本'} (${length} 字符)</span>
    </span>`;
}

/* ========================================
   查看完整值
   ======================================== */
function viewFullValue(value, key) {
    const modal = document.createElement('div');
    modal.className = 'value-detail-modal active';
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 700px;">
            <div class="modal-header">
                <h3 class="modal-title">
                    <span>🔍</span>
                    <span>${escapeHtml(key)}</span>
                </h3>
                <button class="modal-close" onclick="this.closest('.value-detail-modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="value-detail-content">
                    <div class="value-detail-label">配置值</div>
                    <pre class="value-detail-code">${escapeHtml(value)}</pre>
                </div>
                <div class="value-detail-actions">
                    <button class="btn btn-primary" onclick="copyDetailValue('${escapeHtml(value).replace(/'/g, "\\'")}', this)">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>复制值</span>
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.value-detail-modal').remove()">
                        <span>关闭</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/* ========================================
   复制配置项值
   ======================================== */
function copyItemValue(value) {
    navigator.clipboard.writeText(value)
        .then(() => {
            addLog('📋 已复制配置值到剪贴板', 'success');
            
            // 显示临时提示
            const toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.innerHTML = '<span>✅</span><span>已复制到剪贴板</span>';
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        })
        .catch(err => {
            console.error('复制失败:', err);
            addLog('❌ 复制失败: ' + err.message, 'error');
        });
}

/* ========================================
   复制详情值
   ======================================== */
function copyDetailValue(value, button) {
    navigator.clipboard.writeText(value)
        .then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>已复制!</span>
            `;
            button.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
            }, 2000);
            
            addLog('📋 已复制配置值到剪贴板', 'success');
        })
        .catch(err => {
            console.error('复制失败:', err);
            addLog('❌ 复制失败: ' + err.message, 'error');
        });
}

/* ========================================
   获取类别描述
   ======================================== */
function getCategoryDescription(category) {
    const descriptions = {
        api: 'API接口相关配置，控制服务端点和认证',
        source: '数据源配置，管理弹幕来源和平台',
        match: '匹配规则配置，优化内容识别准确度',
        danmu: '弹幕处理配置，控制弹幕获取和格式化',
        cache: '缓存策略配置，提升系统响应速度',
        system: '系统级配置，管理部署和运行环境'
    };
    return descriptions[category] || '配置项管理';
}

/* ========================================
   格式化值显示
   ======================================== */
function formatValue(value) {
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
        /* 继续部分在下一个回复 */
    `;
    document.head.appendChild(style);
}