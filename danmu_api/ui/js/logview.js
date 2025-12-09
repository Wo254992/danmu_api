// language=JavaScript
export const logviewJsContent = /* javascript */ `
/* ========================================
   添加日志
   ======================================== */
function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('zh-CN', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    logs.push({ timestamp, message, type });
    
    // 限制日志数量，保持最新的200条
    if (logs.length > 200) {
        logs = logs.slice(-200);
    }
    
    renderLogs();
}

/* ========================================
   渲染日志
   ======================================== */
function renderLogs() {
    const container = document.getElementById('log-container');
    if (!container) return;
    
    // 记录滚动位置
    const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
    
    // 获取日志图标
    const getLogIcon = (type) => {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warn: '⚠️',
            error: '❌'
        };
        return icons[type] || 'ℹ️';
    };
    
    container.innerHTML = logs.map((log, index) => \`
        <div class="log-entry \${log.type}" style="animation: logFadeIn 0.3s ease \${index * 0.02}s backwards;">
            <span class="log-icon">\${getLogIcon(log.type)}</span>
            <span class="log-timestamp">[\${log.timestamp}]</span>
            <span class="log-message">\${escapeHtml(log.message)}</span>
        </div>
    \`).join('');
    
    // 如果之前在底部，保持在底部
    if (isScrolledToBottom) {
        container.scrollTop = container.scrollHeight;
    }
}

/* ========================================
   从API获取真实日志
   ======================================== */
async function fetchRealLogs() {
    try {
        showLogLoading(true);
        
        const response = await fetch(buildApiUrl('/api/logs'));
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const logText = await response.text();
        const logLines = logText.split('\\n').filter(line => line.trim() !== '');
        
        logs = logLines.map(line => {
            // 尝试解析日志格式 [时间] 类型: 消息
            const match = line.match(/\\[([^\\]]+)\\]\\s*(\\w+):\\s*(.*)/);
            if (match) {
                return {
                    timestamp: match[1],
                    type: match[2].toLowerCase(),
                    message: match[3]
                };
            }
            // 如果解析失败，返回原始格式
            return {
                timestamp: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
                type: 'info',
                message: line
            };
        });
        
        renderLogs();
        addLog(\`📥 成功加载 \${logs.length} 条日志\`, 'success');
        
    } catch (error) {
        console.error('Failed to fetch logs:', error);
        addLog(\`❌ 获取日志失败: \${error.message}\`, 'error');
        showNotification('获取日志失败: ' + error.message, 'error');
    } finally {
        showLogLoading(false);
    }
}

/* ========================================
   显示/隐藏日志加载状态
   ======================================== */
function showLogLoading(show) {
    const container = document.getElementById('log-container');
    if (!container) return;
    
    if (show) {
        const loadingHTML = \`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 200px;">
                <div class="loading-spinner" style="width: 40px; height: 40px; border-width: 3px;"></div>
                <p style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.875rem;">正在加载日志...</p>
            </div>
        \`;
        container.innerHTML = loadingHTML;
    }
}

/* ========================================
   刷新日志
   ======================================== */
function refreshLogs() {
    const btn = event.target.closest('.btn');
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = '<span class="loading-spinner-small"></span> 刷新中...';
    btn.disabled = true;
    
    // 添加旋转动画
    btn.style.transform = 'rotate(360deg)';
    btn.style.transition = 'transform 0.5s ease';
    
    addLog('🔄 开始刷新日志...', 'info');
    
    fetchRealLogs().finally(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        
        // 重置动画
        setTimeout(() => {
            btn.style.transform = '';
        }, 100);
        
        showNotification('✅ 日志已刷新', 'success');
    });
}

/* ========================================
   清空日志
   ======================================== */
async function clearLogs() {
    const configCheck = await checkDeployPlatformConfig();
    if (!configCheck.success) {
        customAlert(configCheck.message);
        return;
    }

    customConfirm('确定要清空所有日志吗？此操作不可恢复！', '清空确认').then(async confirmed => {
        if (confirmed) {
            try {
                showLoading('正在清空日志...', '请稍候');
                addLog('🗑️ 开始清空日志...', 'warn');
                
                const response = await fetch(buildApiUrl('/api/logs/clear', true), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(\`HTTP error! status: \${response.status}\`);
                }
                
                const result = await response.json();
                
                if (result.success) {
                    logs = [];
                    renderLogs();
                    
                    updateLoadingText('清空成功', '日志已全部清除');
                    addLog('✅ 日志已清空', 'success');
                    
                    setTimeout(() => {
                        hideLoading();
                        showNotification('✅ 日志清空成功', 'success');
                    }, 1000);
                } else {
                    throw new Error(result.message || '清空失败');
                }
            } catch (error) {
                console.error('Failed to clear logs:', error);
                addLog(\`❌ 清空日志失败: \${error.message}\`, 'error');
                hideLoading();
                showNotification('❌ 清空日志失败: ' + error.message, 'error');
            }
        }
    });
}

/* ========================================
   导出日志
   ======================================== */
function exportLogs() {
    if (logs.length === 0) {
        showNotification('⚠️ 没有可导出的日志', 'warning');
        return;
    }
    
    try {
        // 生成日志文本
        const logText = logs.map(log => 
            \`[\${log.timestamp}] \${log.type.toUpperCase()}: \${log.message}\`
        ).join('\\n');
        
        // 创建Blob
        const blob = new Blob([logText], { type: 'text/plain;charset=utf-8' });
        
        // 生成文件名
        const date = new Date();
        const filename = \`danmu-api-logs-\${date.getFullYear()}\${String(date.getMonth() + 1).padStart(2, '0')}\${String(date.getDate()).padStart(2, '0')}-\${String(date.getHours()).padStart(2, '0')}\${String(date.getMinutes()).padStart(2, '0')}.txt\`;
        
        // 创建下载链接
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        addLog(\`📥 导出日志: \${filename}\`, 'success');
        showNotification('✅ 日志已导出', 'success');
        
    } catch (error) {
        console.error('Failed to export logs:', error);
        addLog(\`❌ 导出日志失败: \${error.message}\`, 'error');
        showNotification('❌ 导出失败: ' + error.message, 'error');
    }
}

/* ========================================
   过滤日志
   ======================================== */
let logFilter = 'all';

function filterLogs(type) {
    logFilter = type;
    
    // 更新按钮状态
    document.querySelectorAll('.log-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === type);
    });
    
    const container = document.getElementById('log-container');
    if (!container) return;
    
    const filteredLogs = logFilter === 'all' 
        ? logs 
        : logs.filter(log => log.type === logFilter);
    
    if (filteredLogs.length === 0) {
        container.innerHTML = \`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 200px; color: var(--text-tertiary);">
                <svg style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    <line x1="4" y1="4" x2="20" y2="20" stroke-width="2"/>
                </svg>
                <p style="font-size: 0.875rem;">没有 \${type === 'all' ? '任何' : type} 类型的日志</p>
            </div>
        \`;
        return;
    }
    
    // 获取日志图标
    const getLogIcon = (type) => {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warn: '⚠️',
            error: '❌'
        };
        return icons[type] || 'ℹ️';
    };
    
    container.innerHTML = filteredLogs.map((log, index) => \`
        <div class="log-entry \${log.type}" style="animation: logFadeIn 0.3s ease \${index * 0.02}s backwards;">
            <span class="log-icon">\${getLogIcon(log.type)}</span>
            <span class="log-timestamp">[\${log.timestamp}]</span>
            <span class="log-message">\${escapeHtml(log.message)}</span>
        </div>
    \`).join('');
    
    container.scrollTop = container.scrollHeight;
    
    addLog(\`🔍 过滤日志: \${type === 'all' ? '全部' : type} (\${filteredLogs.length} 条)\`, 'info');
}

/* ========================================
   搜索日志
   ======================================== */
function searchLogs(keyword) {
    const container = document.getElementById('log-container');
    if (!container) return;
    
    if (!keyword || keyword.trim() === '') {
        renderLogs();
        return;
    }
    
    const searchTerm = keyword.toLowerCase();
    const filteredLogs = logs.filter(log => 
        log.message.toLowerCase().includes(searchTerm) ||
        log.type.toLowerCase().includes(searchTerm)
    );
    
    if (filteredLogs.length === 0) {
        container.innerHTML = \`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 200px; color: var(--text-tertiary);">
                <svg style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <p style="font-size: 0.875rem;">未找到包含 "\${escapeHtml(keyword)}" 的日志</p>
            </div>
        \`;
        return;
    }
    
    // 获取日志图标
    const getLogIcon = (type) => {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warn: '⚠️',
            error: '❌'
        };
        return icons[type] || 'ℹ️';
    };
    
    // 高亮搜索关键词
    const highlightKeyword = (text) => {
        const regex = new RegExp(\`(\${escapeHtml(keyword)})\`, 'gi');
        return escapeHtml(text).replace(regex, '<mark style="background: var(--warning-color); color: white; padding: 2px 4px; border-radius: 3px;">$1</mark>');
    };
    
    container.innerHTML = filteredLogs.map((log, index) => \`
        <div class="log-entry \${log.type}" style="animation: logFadeIn 0.3s ease \${index * 0.02}s backwards;">
            <span class="log-icon">\${getLogIcon(log.type)}</span>
            <span class="log-timestamp">[\${log.timestamp}]</span>
            <span class="log-message">\${highlightKeyword(log.message)}</span>
        </div>
    \`).join('');
    
    container.scrollTop = container.scrollHeight;
    
    addLog(\`🔍 搜索日志: "\${keyword}" (找到 \${filteredLogs.length} 条)\`, 'info');
}

/* ========================================
   JSON高亮函数
   ======================================== */
function highlightJSON(obj) {
    let json = JSON.stringify(obj, null, 2);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    return json.replace(/("(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\"])*"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

/* ========================================
   自动刷新日志
   ======================================== */
let autoRefreshInterval = null;

function toggleAutoRefresh(enabled) {
    if (enabled) {
        autoRefreshInterval = setInterval(() => {
            fetchRealLogs();
        }, 5000); // 每5秒刷新一次
        
        addLog('🔄 已启用日志自动刷新 (每5秒)', 'info');
        showNotification('✅ 自动刷新已启用', 'success');
    } else {
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
        addLog('⏸️ 已停止日志自动刷新', 'warn');
        showNotification('⏸️ 自动刷新已停止', 'warning');
    }
}

/* ========================================
   日志统计信息
   ======================================== */
function getLogStats() {
    const stats = {
        total: logs.length,
        info: logs.filter(log => log.type === 'info').length,
        success: logs.filter(log => log.type === 'success').length,
        warn: logs.filter(log => log.type === 'warn').length,
        error: logs.filter(log => log.type === 'error').length
    };
    
    return stats;
}

function displayLogStats() {
    const stats = getLogStats();
    const statsHTML = \`
        <div style="display: flex; gap: 1rem; padding: 1rem; background: var(--bg-glass); backdrop-filter: blur(10px); border-radius: var(--border-radius-sm); margin-bottom: 1rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 80px; text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">\${stats.total}</div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary);">总计</div>
            </div>
            <div style="flex: 1; min-width: 80px; text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--info-color);">\${stats.info}</div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary);">信息</div>
            </div>
            <div style="flex: 1; min-width: 80px; text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--success-color);">\${stats.success}</div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary);">成功</div>
            </div>
            <div style="flex: 1; min-width: 80px; text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning-color);">\${stats.warn}</div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary);">警告</div>
            </div>
            <div style="flex: 1; min-width: 80px; text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--danger-color);">\${stats.error}</div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary);">错误</div>
            </div>
        </div>
    \`;
    
    return statsHTML;
}
`;