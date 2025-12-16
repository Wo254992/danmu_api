// language=JavaScript
export const logviewJsContent = /* javascript */ `
/* ========================================
   全局变量
   ======================================== */
let currentLogFilter = 'all';
let autoRefreshTimer = null;

/* ========================================
   日志图标定义
   ======================================== */
const LOG_ICONS = {
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
};

/* ========================================
   添加日志
   ======================================== */
function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false }); // 24小时制
    logs.push({ timestamp, message, type });
    if (logs.length > 200) logs.shift(); // 增加缓冲区
    renderLogs();
}

/* ========================================
   渲染日志 (核心优化)
   ======================================== */
function renderLogs() {
    const container = document.getElementById('log-container');
    if (!container) return;
    
    // 1. 过滤日志
    const filteredLogs = currentLogFilter === 'all' 
        ? logs 
        : logs.filter(log => log.type === currentLogFilter);

    // 2. 更新统计角标
    updateLogStats();

    // 3. 空状态处理
    if (filteredLogs.length === 0) {
        container.innerHTML = \`
            <div class="log-empty-state" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;opacity:0.5;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <p style="margin-top:10px;">暂无\${currentLogFilter === 'all' ? '' : '此类型'}日志</p>
            </div>\`;
        return;
    }
    
    // 4. 生成HTML (Flex布局优化移动端显示)
    container.innerHTML = filteredLogs.map(log => {
        const icon = LOG_ICONS[log.type] || LOG_ICONS.info;
        // 移动端优化：使用flex-wrap: wrap让长内容自动换行，保持整洁
        return \`
        <div class="log-entry \${log.type}" style="
            display: flex; 
            gap: 12px; 
            padding: 10px 12px; 
            border-bottom: 1px solid rgba(255,255,255,0.05);
            animation: fadeIn 0.3s ease-out;
            align-items: flex-start;
        ">
            <div class="log-icon-wrapper" style="
                flex-shrink: 0; 
                width: 20px; 
                height: 20px; 
                margin-top: 2px;
                opacity: 0.9;
            ">\${icon}</div>
            
            <div class="log-content-wrapper" style="flex: 1; min-width: 0;">
                <div class="log-meta" style="
                    display: flex; 
                    align-items: center; 
                    gap: 8px; 
                    margin-bottom: 4px; 
                    font-size: 0.75rem; 
                    opacity: 0.6;
                ">
                    <span class="log-time" style="font-family: monospace;">\${log.timestamp}</span>
                    <span class="log-badge" style="
                        text-transform: uppercase; 
                        font-size: 0.65rem; 
                        padding: 1px 6px; 
                        border-radius: 4px; 
                        background: rgba(255,255,255,0.1); 
                        letter-spacing: 0.5px;
                    ">\${log.type}</span>
                </div>
                <div class="log-message" style="
                    word-break: break-all; 
                    white-space: pre-wrap; 
                    line-height: 1.5;
                    font-family: 'Monaco', monospace;
                    font-size: 0.85rem;
                ">\${escapeHtml(log.message)}</div>
            </div>
        </div>
    \`}).join('');
    
    // 保持滚动到底部 (除非用户正在向上看)
    const isScrolledToBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 50;
    if (isScrolledToBottom || logs.length === 1) { // 或者是第一条日志
        container.scrollTop = container.scrollHeight;
    }
}

/* ========================================
   更新日志统计角标
   ======================================== */
function updateLogStats() {
    const counts = {
        all: logs.length,
        error: 0,
        warn: 0,
        info: 0,
        success: 0
    };
    
    logs.forEach(log => {
        if (counts.hasOwnProperty(log.type)) {
            counts[log.type]++;
        }
    });

    Object.keys(counts).forEach(type => {
        const btn = document.querySelector(\`.log-filter-btn[data-filter="\${type}"]\`);
        if (btn) {
            const badge = btn.querySelector('.filter-badge');
            if (badge) badge.textContent = counts[type];
        }
    });
}

/* ========================================
   设置日志过滤器
   ======================================== */
function setLogFilter(filterType) {
    currentLogFilter = filterType;
    
    // 更新按钮状态
    document.querySelectorAll('.log-filter-btn').forEach(btn => {
        if (btn.dataset.filter === filterType) {
            btn.classList.add('active');
            // 添加点击反馈动画
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = '', 150);
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderLogs();
    
    // 自动滚动到底部
    const container = document.getElementById('log-container');
    if (container) container.scrollTop = container.scrollHeight;
}

/* ========================================
   自动刷新逻辑
   ======================================== */
function toggleAutoRefresh() {
    const btn = document.getElementById('autoRefreshBtn');
    const isRunning = autoRefreshTimer !== null;
    
    if (isRunning) {
        clearInterval(autoRefreshTimer);
        autoRefreshTimer = null;
        btn.classList.remove('btn-success');
        btn.classList.add('btn-secondary');
        btn.innerHTML = \`<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/></svg> 自动刷新\`;
    } else {
        refreshLogs(); // 立即刷新一次
        autoRefreshTimer = setInterval(refreshLogs, 3000); // 3秒刷新一次
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-success');
        btn.innerHTML = \`<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/><path d="M9 12l2 2 4-4" stroke-width="2"/></svg> 刷新中\`;
    }
}

/* ========================================
   导出日志
   ======================================== */
function exportLogs() {
    if (logs.length === 0) {
        customAlert('当前没有日志可导出');
        return;
    }
    
    const content = logs.map(l => \`[\${l.timestamp}] [\${l.type.toUpperCase()}] \${l.message}\`).join('\\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = \`logvar_logs_\${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.txt\`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    addLog('日志导出成功', 'success');
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
        
        // 智能合并策略：如果新获取的日志包含了旧日志，避免完全重置导致闪烁
        // 这里简单处理：全量替换，后续可优化
        logs = logLines.map(line => {
            // 尝试解析特定格式: [Timestamp] Type: Message
            const match = line.match(/\\[([^\\]]+)\\] (\\w+): (.*)/);
            if (match) {
                return {
                    timestamp: match[1],
                    type: match[2].toLowerCase(),
                    message: match[3]
                };
            }
            // 尝试解析其他常见格式或作为普通文本
            return {
                timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
                type: line.toLowerCase().includes('error') ? 'error' : 'info',
                message: line
            };
        });
        renderLogs();
    } catch (error) {
        console.error('Failed to fetch logs:', error);
        // 不要在fetch循环中addLog避免死循环，除非是单次操作
        if (!autoRefreshTimer) {
             addLog(\`获取日志失败: \${error.message}\`, 'error');
        }
    }
}

/* ========================================
   刷新日志 (手动)
   ======================================== */
function refreshLogs() {
    // 如果是自动刷新调用的，不需要操作按钮UI
    const btn = document.querySelector('button[onclick="refreshLogs()"]');
    let originalHTML = '';
    
    if (btn && !autoRefreshTimer) {
        originalHTML = btn.innerHTML;
        btn.innerHTML = '<span class="loading-spinner-small"></span>';
        btn.disabled = true;
    }
    
    return fetchRealLogs().finally(() => {
        if (btn && !autoRefreshTimer) {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
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
                    updateLogStats(); // 更新计数为0
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
`;
