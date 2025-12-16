export const logviewJsContent = /* javascript */ `
/* ========================================
   日志过滤器状态
   ======================================== */
let currentLogFilter = 'all'; // 'all', 'error', 'warn', 'info', 'success'
let autoRefreshInterval = null;
let autoRefreshEnabled = false;

/* ========================================
   添加日志
   ======================================== */
function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    logs.push({ timestamp, message, type });
    if (logs.length > 500) logs.shift(); // 增加到500条
    renderLogs();
    updateLogStats();
}

/* ========================================
   渲染日志（支持过滤）
   ======================================== */
function renderLogs() {
    const container = document.getElementById('log-container');
    if (!container) return;
    
    // 根据过滤器筛选日志
    const filteredLogs = currentLogFilter === 'all' 
        ? logs 
        : logs.filter(log => log.type === currentLogFilter);
    
    if (filteredLogs.length === 0) {
        container.innerHTML = \`
            <div class="log-empty-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2"/>
                </svg>
                <p class="empty-text">暂无\${getFilterName(currentLogFilter)}日志</p>
            </div>
        \`;
        return;
    }
    
    container.innerHTML = filteredLogs.map(log => {
        // 清理消息中的图标字符和多余的空格
        let cleanMessage = log.message
            .replace(/^[ℹ️✅❌⚠️👉🔍⚙️]\\s*/g, '')  // 移除开头的图标
            .replace(/[ℹ️✅❌⚠️👉🔍⚙️]/g, '') // 移除文本中间的图标
            .replace(/\\s+/g, ' ')  // 将多个空格替换为单个空格
            .trim();
        
        return \`
            <div class="log-entry log-\${log.type}">
                <span class="log-icon">\${getLogIcon(log.type)}</span>
                <span class="log-time">[\${log.timestamp}]</span>
                <span class="log-message">\${escapeHtml(cleanMessage)}</span>
            </div>
        \`;
    }).join('');
    
    container.scrollTop = container.scrollHeight;
}
/* ========================================
   获取日志图标
   ======================================== */
function getLogIcon(type) {
    const icons = {
        error: '❌',
        warn: '⚠️',
        info: 'ℹ️',
        success: '✅'
    };
    return icons[type] || 'ℹ️';
}

/* ========================================
   获取过滤器名称
   ======================================== */
function getFilterName(filter) {
    const names = {
        all: '全部',
        error: '错误',
        warn: '警告',
        info: '信息',
        success: '成功'
    };
    return names[filter] || '全部';
}

/* ========================================
   更新日志统计
   ======================================== */
function updateLogStats() {
    const stats = {
        total: logs.length,
        error: logs.filter(l => l.type === 'error').length,
        warn: logs.filter(l => l.type === 'warn').length,
        info: logs.filter(l => l.type === 'info').length,
        success: logs.filter(l => l.type === 'success').length
    };
    
    // 更新过滤器按钮的计数
    document.querySelectorAll('.log-filter-btn').forEach(btn => {
        const filter = btn.dataset.filter;
        const badge = btn.querySelector('.filter-badge');
        if (badge && stats[filter] !== undefined) {
            badge.textContent = stats[filter];
            badge.style.display = stats[filter] > 0 ? 'flex' : 'none';
        }
    });
    
    // 更新总数
    const totalBadge = document.querySelector('[data-filter="all"] .filter-badge');
    if (totalBadge) {
        totalBadge.textContent = stats.total;
        totalBadge.style.display = stats.total > 0 ? 'flex' : 'none';
    }
}

/* ========================================
   设置日志过滤器
   ======================================== */
function setLogFilter(filter) {
    currentLogFilter = filter;
    
    // 更新按钮状态
    document.querySelectorAll('.log-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderLogs();
}

/* ========================================
   从API获取真实日志
   ======================================== */
async function fetchRealLogs() {
    try {
        const response = await fetch(buildApiUrl('/api/logs'));
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const logText = await response.text();
        const logLines = logText.split('\\n').filter(line => line.trim() !== '');
        
        logs = logLines.map(line => {
            const match = line.match(/\\[([^\\]]+)\\] (\\w+): (.*)/);
            if (match) {
                return {
                    timestamp: match[1],
                    type: match[2].toLowerCase(),
                    message: match[3]
                };
            }
            return {
                timestamp: new Date().toLocaleTimeString(),
                type: 'info',
                message: line
            };
        });
        renderLogs();
        updateLogStats();
    } catch (error) {
        console.error('Failed to fetch logs:', error);
        addLog(\`获取日志失败: \${error.message}\`, 'error');
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
    
    fetchRealLogs().finally(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    });
}

/* ========================================
   切换自动刷新
   ======================================== */
function toggleAutoRefresh() {
    autoRefreshEnabled = !autoRefreshEnabled;
    const btn = document.getElementById('autoRefreshBtn');
    
    if (autoRefreshEnabled) {
        btn.classList.add('active');
        btn.innerHTML = \`
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/>
            </svg>
            自动刷新已开启
        \`;
        
        // 立即刷新一次
        fetchRealLogs();
        
        // 每5秒自动刷新
        autoRefreshInterval = setInterval(() => {
            fetchRealLogs();
        }, 5000);
    } else {
        btn.classList.remove('active');
        btn.innerHTML = \`
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/>
            </svg>
            自动刷新
        \`;
        
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
            autoRefreshInterval = null;
        }
    }
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

    customConfirm('确定要清空所有日志吗?', '清空确认').then(async confirmed => {
        if (confirmed) {
            try {
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
                    updateLogStats();
                    addLog('日志已清空', 'warn');
                } else {
                    addLog(\`清空日志失败: \${result.message}\`, 'error');
                }
            } catch (error) {
                console.error('Failed to clear logs:', error);
                addLog(\`清空日志失败: \${error.message}\`, 'error');
            }
        }
    });
}

/* ========================================
   导出日志
   ======================================== */
function exportLogs() {
    if (logs.length === 0) {
        customAlert('暂无日志可导出');
        return;
    }
    
    const logText = logs.map(log => \`[\${log.timestamp}] \${log.type.toUpperCase()}: \${log.message}\`).join('\\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`logs_\${new Date().toISOString().slice(0, 10)}.txt\`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addLog('日志已导出', 'success');
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
   初始化日志界面
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 初始化日志统计
    updateLogStats();
});
`;