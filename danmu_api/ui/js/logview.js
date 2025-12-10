// language=JavaScript
export const logviewJsContent = /* javascript */ `
/* ========================================
   日志数组和配置
   ======================================== */
let maxLogs = 500; // 最大日志条数
let autoScroll = true; // 自动滚动到底部

/* ========================================
   添加日志
   ======================================== */
function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('zh-CN', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    });
    
    logs.push({ timestamp, message, type });
    
    // 限制日志数量
    if (logs.length > maxLogs) {
        logs.shift();
    }
    
    renderLogs();
}

/* ========================================
   渲染日志
   ======================================== */
function renderLogs() {
    const container = document.getElementById('log-container');
    if (!container) return;
    
    const wasAtBottom = isScrolledToBottom(container);
    
    if (logs.length === 0) {
        container.innerHTML = \`
            <div class="log-empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>暂无日志</h3>
                <p>日志将在这里显示</p>
            </div>
        \`;
        return;
    }
    
    // 渲染日志条目
    container.innerHTML = logs.map((log, index) => {
        const icon = getLogIcon(log.type);
        const animated = index === logs.length - 1 ? 'log-entry-new' : '';
        
        return \`
            <div class="log-entry \${log.type} \${animated}" data-index="\${index}">
                <span class="log-time">\${log.timestamp}</span>
                <span class="log-icon">\${icon}</span>
                <span class="log-type-badge \${log.type}">\${getLogTypeName(log.type)}</span>
                <span class="log-message">\${escapeHtml(log.message)}</span>
            </div>
        \`;
    }).join('');
    
    // 自动滚动到底部
    if (autoScroll && wasAtBottom) {
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 50);
    }
    
    // 添加日志统计
    updateLogStats();
    
    // 添加日志动画样式
    addLogAnimationStyles();
}

/* ========================================
   检查是否滚动到底部
   ======================================== */
function isScrolledToBottom(element) {
    return element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
}

/* ========================================
   获取日志图标
   ======================================== */
function getLogIcon(type) {
    const icons = {
        info: '💬',
        success: '✅',
        warn: '⚠️',
        error: '❌'
    };
    return icons[type] || '💬';
}

/* ========================================
   获取日志类型名称
   ======================================== */
function getLogTypeName(type) {
    const names = {
        info: 'INFO',
        success: 'SUCCESS',
        warn: 'WARN',
        error: 'ERROR'
    };
    return names[type] || 'INFO';
}

/* ========================================
   更新日志统计
   ======================================== */
function updateLogStats() {
    const stats = {
        total: logs.length,
        info: logs.filter(l => l.type === 'info').length,
        success: logs.filter(l => l.type === 'success').length,
        warn: logs.filter(l => l.type === 'warn').length,
        error: logs.filter(l => l.type === 'error').length
    };
    
    // 更新统计显示（如果存在统计区域）
    const statsElement = document.getElementById('log-stats');
    if (statsElement) {
        statsElement.innerHTML = \`
            <div class="stat-item">
                <span class="stat-label">总计</span>
                <span class="stat-value">\${stats.total}</span>
            </div>
            <div class="stat-item stat-info">
                <span class="stat-icon">💬</span>
                <span class="stat-value">\${stats.info}</span>
            </div>
            <div class="stat-item stat-success">
                <span class="stat-icon">✅</span>
                <span class="stat-value">\${stats.success}</span>
            </div>
            <div class="stat-item stat-warn">
                <span class="stat-icon">⚠️</span>
                <span class="stat-value">\${stats.warn}</span>
            </div>
            <div class="stat-item stat-error">
                <span class="stat-icon">❌</span>
                <span class="stat-value">\${stats.error}</span>
            </div>
        \`;
    }
}

/* ========================================
   添加日志动画样式
   ======================================== */
function addLogAnimationStyles() {
    if (document.getElementById('log-animation-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'log-animation-styles';
    style.textContent = \`
        @keyframes logSlideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes logGlow {
            0%, 100% {
                box-shadow: 0 0 5px currentColor;
            }
            50% {
                box-shadow: 0 0 20px currentColor;
            }
        }
        
        .log-entry {
            display: grid;
            grid-template-columns: auto auto auto 1fr;
            gap: var(--spacing-md);
            align-items: center;
            padding: var(--spacing-md) var(--spacing-lg);
            border-left: 3px solid transparent;
            margin-bottom: 2px;
            border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
            transition: all var(--transition-fast);
            font-size: 0.875rem;
            line-height: 1.6;
        }
        
        .log-entry-new {
            animation: logSlideIn 0.4s ease-out;
        }
        
        .log-entry:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateX(4px);
        }
        
        .log-time {
            font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
            font-size: 0.75rem;
            opacity: 0.6;
            white-space: nowrap;
            font-weight: 600;
        }
        
        .log-icon {
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .log-type-badge {
            display: inline-flex;
            align-items: center;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            white-space: nowrap;
        }
        
        .log-type-badge.info {
            background: rgba(88, 166, 255, 0.2);
            color: #58a6ff;
            border: 1px solid rgba(88, 166, 255, 0.3);
        }
        
        .log-type-badge.success {
            background: rgba(63, 185, 80, 0.2);
            color: #3fb950;
            border: 1px solid rgba(63, 185, 80, 0.3);
        }
        
        .log-type-badge.warn {
            background: rgba(210, 153, 34, 0.2);
            color: #d29922;
            border: 1px solid rgba(210, 153, 34, 0.3);
        }
        
        .log-type-badge.error {
            background: rgba(248, 81, 73, 0.2);
            color: #f85149;
            border: 1px solid rgba(248, 81, 73, 0.3);
        }
        
        .log-message {
            word-break: break-word;
            color: #c9d1d9;
        }
        
        .log-entry.info {
            border-left-color: #58a6ff;
        }
        
        .log-entry.success {
            border-left-color: #3fb950;
        }
        
        .log-entry.warn {
            border-left-color: #d29922;
        }
        
        .log-entry.error {
            border-left-color: #f85149;
            background: rgba(248, 81, 73, 0.08);
        }
        
        .log-entry.error:hover {
            background: rgba(248, 81, 73, 0.12);
        }
        
        .log-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            color: #8b949e;
        }
        
        .empty-state-icon {
            font-size: 4rem;
            margin-bottom: var(--spacing-lg);
            opacity: 0.5;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .log-empty-state h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 var(--spacing-sm) 0;
            color: #c9d1d9;
        }
        
        .log-empty-state p {
            margin: 0;
            opacity: 0.7;
        }
        
        /* 日志统计样式 */
        #log-stats {
            display: flex;
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            background: rgba(255, 255, 255, 0.05);
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-md);
            flex-wrap: wrap;
        }
        
        .stat-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            padding: var(--spacing-sm) var(--spacing-md);
            background: rgba(255, 255, 255, 0.05);
            border-radius: var(--border-radius-sm);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all var(--transition-fast);
        }
        
        .stat-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }
        
        .stat-label {
            font-size: 0.75rem;
            color: #8b949e;
            font-weight: 600;
        }
        
        .stat-icon {
            font-size: 1rem;
        }
        
        .stat-value {
            font-size: 0.875rem;
            font-weight: 700;
            color: #c9d1d9;
        }
        
        .stat-item.stat-info .stat-value {
            color: #58a6ff;
        }
        
        .stat-item.stat-success .stat-value {
            color: #3fb950;
        }
        
        .stat-item.stat-warn .stat-value {
            color: #d29922;
        }
        
        .stat-item.stat-error .stat-value {
            color: #f85149;
        }
        
        @media (max-width: 768px) {
            .log-entry {
                grid-template-columns: auto auto 1fr;
                gap: var(--spacing-sm);
                padding: var(--spacing-sm) var(--spacing-md);
            }
            
            .log-type-badge {
                display: none;
            }
            
            .log-time {
                font-size: 0.7rem;
            }
            
            .log-message {
                font-size: 0.8125rem;
            }
            
            #log-stats {
                gap: var(--spacing-sm);
            }
            
            .stat-item {
                padding: var(--spacing-xs) var(--spacing-sm);
            }
            
            .stat-label {
                display: none;
            }
        }
    \`;
    document.head.appendChild(style);
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
                timestamp: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
                type: 'info',
                message: line
            };
        });
        
        renderLogs();
        addLog('📥 日志加载完成，共 ' + logs.length + ' 条', 'success');
    } catch (error) {
        console.error('Failed to fetch logs:', error);
        addLog(\`❌ 获取日志失败: \${error.message}\`, 'error');
    }
}

/* ========================================
   刷新日志
   ======================================== */
function refreshLogs() {
    const btn = event.target.closest('.btn');
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = \`
        <span class="loading-spinner-small"></span>
        <span>刷新中...</span>
    \`;
    btn.disabled = true;
    
    // 添加刷新动画
    const logContainer = document.getElementById('log-container');
    if (logContainer) {
        logContainer.style.opacity = '0.5';
        logContainer.style.transform = 'scale(0.98)';
    }
    
    fetchRealLogs().finally(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        
        if (logContainer) {
            logContainer.style.transition = 'all 0.3s ease';
            logContainer.style.opacity = '1';
            logContainer.style.transform = 'scale(1)';
        }
        
        // 按钮成功反馈
        btn.style.animation = 'pulse 0.4s ease-out';
        setTimeout(() => {
            btn.style.animation = '';
        }, 400);
    });
}

/* ========================================
   清空日志
   ======================================== */
async function clearLogs() {
    const configCheck = await checkDeployPlatformConfig();
    if (!configCheck.success) {
        customAlert(configCheck.message, '⚠️ 配置提示');
        return;
    }

    customConfirm('确定要清空所有日志吗？此操作不可恢复！', '🗑️ 清空确认').then(async confirmed => {
        if (confirmed) {
            const clearBtn = event.target.closest('.btn');
            const originalHTML = clearBtn.innerHTML;
            
            clearBtn.innerHTML = \`
                <span class="loading-spinner-small"></span>
                <span>清空中...</span>
            \`;
            clearBtn.disabled = true;
            
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
                    // 清空动画
                    const logContainer = document.getElementById('log-container');
                    if (logContainer) {
                        logContainer.style.opacity = '0';
                        logContainer.style.transform = 'scale(0.9)';
                    }
                    
                    setTimeout(() => {
                        logs = [];
                        renderLogs();
                        
                        if (logContainer) {
                            logContainer.style.transition = 'all 0.4s ease';
                            logContainer.style.opacity = '1';
                            logContainer.style.transform = 'scale(1)';
                        }
                        
                        addLog('🗑️ 日志已清空', 'warn');
                    }, 300);
                } else {
                    addLog(\`❌ 清空日志失败: \${result.message}\`, 'error');
                    customAlert('清空日志失败: ' + result.message, '❌ 操作失败');
                }
            } catch (error) {
                console.error('Failed to clear logs:', error);
                addLog(\`❌ 清空日志失败: \${error.message}\`, 'error');
                customAlert('清空日志失败: ' + error.message, '❌ 操作失败');
            } finally {
                clearBtn.innerHTML = originalHTML;
                clearBtn.disabled = false;
            }
        }
    });
}

/* ========================================
   切换自动滚动
   ======================================== */
function toggleAutoScroll() {
    autoScroll = !autoScroll;
    const btn = event.target.closest('.btn');
    
    if (btn) {
        btn.innerHTML = \`
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14m-7-7l7 7 7-7"/>
            </svg>
            <span>\${autoScroll ? '自动滚动: 开' : '自动滚动: 关'}</span>
        \`;
        
        btn.style.background = autoScroll 
            ? 'linear-gradient(135deg, var(--success-color), #34d399)' 
            : 'var(--gray-200)';
        btn.style.color = autoScroll ? 'white' : 'var(--text-primary)';
    }
    
    addLog(\`\${autoScroll ? '✅ 已开启' : '⏸️ 已关闭'}自动滚动\`, autoScroll ? 'success' : 'warn');
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
   导出日志
   ======================================== */
function exportLogs() {
    if (logs.length === 0) {
        customAlert('暂无日志可导出', '💾 导出日志');
        return;
    }
    
    const logText = logs.map(log => 
        \`[\${log.timestamp}] \${log.type.toUpperCase()}: \${log.message}\`
    ).join('\\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`logs_\${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt\`;
    a.click();
    URL.revokeObjectURL(url);
    
    addLog('💾 日志已导出', 'success');
}
`;