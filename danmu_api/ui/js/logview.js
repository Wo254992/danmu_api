// language=JavaScript
export const logviewJsContent = /* javascript */ `
/* ========================================
   添加日志
   ======================================== */
function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    logs.push({ timestamp, message, type });
    if (logs.length > 100) logs.shift();
    renderLogs();
}

/* ========================================
   渲染日志
   ======================================== */
function renderLogs() {
    const container = document.getElementById('log-container');
    if (!container) return;
    
    container.innerHTML = logs.map(log => \`
        <div class="log-entry \${log.type} \${currentFilter !== 'all' && currentFilter !== log.type ? 'hidden' : ''}">
            <span class="log-timestamp">[\${log.timestamp}]</span>
            <span class="log-type-badge \${log.type}">\${getLogTypeIcon(log.type)}</span>
            <span class="log-message">\${escapeHtml(log.message)}</span>
        </div>
    \`).join('');
    
    if (autoScroll) {
        container.scrollTop = container.scrollHeight;
    }
    
    updateLogCounts();
}


/* ========================================
   获取日志类型图标
   ======================================== */
function getLogTypeIcon(type) {
    const icons = {
        info: 'ℹ️',
        success: '✅',
        warn: '⚠️',
        error: '❌'
    };
    return icons[type] || 'ℹ️';
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
   过滤日志
   ======================================== */
let currentFilter = 'all';
let autoScroll = true;

function filterLogs(type) {
    currentFilter = type;
    
    // 更新按钮状态
    document.querySelectorAll('.log-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(\`[data-filter="\${type}"]\`).classList.add('active');
    
    // 过滤日志
    const logEntries = document.querySelectorAll('.log-entry');
    logEntries.forEach(entry => {
        if (type === 'all' || entry.classList.contains(type)) {
            entry.classList.remove('hidden');
        } else {
            entry.classList.add('hidden');
        }
    });
    
    updateLogCounts();
}

/* ========================================
   更新日志计数
   ======================================== */
function updateLogCounts() {
    const counts = {
        all: logs.length,
        info: logs.filter(log => log.type === 'info').length,
        success: logs.filter(log => log.type === 'success').length,
        warn: logs.filter(log => log.type === 'warn').length,
        error: logs.filter(log => log.type === 'error').length
    };
    
    Object.keys(counts).forEach(type => {
        const countEl = document.getElementById(\`count-\${type}\`);
        if (countEl) {
            countEl.textContent = counts[type];
        }
    });
}

/* ========================================
   切换自动滚动
   ======================================== */
function toggleAutoScroll() {
    autoScroll = !autoScroll;
    const btn = event.target.closest('.terminal-action-btn');
    if (autoScroll) {
        btn.classList.add('active');
        const container = document.getElementById('log-container');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    } else {
        btn.classList.remove('active');
    }
}
`;