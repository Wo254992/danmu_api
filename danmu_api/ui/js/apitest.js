// language=JavaScript
export const apitestJsContent = /* javascript */ `
/* ========================================
   API配置
   ======================================== */
const apiConfigs = {
    searchAnime: {
        name: '搜索动漫',
        icon: '🔍',
        method: 'GET',
        path: '/api/v2/search/anime',
        description: '根据关键词搜索动漫',
        params: [
            { 
                name: 'keyword', 
                label: '关键词', 
                type: 'text', 
                required: true, 
                placeholder: '示例: 生万物',
                description: '输入动漫名称进行搜索'
            }
        ]
    },
    searchEpisodes: {
        name: '搜索剧集',
        icon: '📺',
        method: 'GET',
        path: '/api/v2/search/episodes',
        description: '搜索指定动漫的剧集列表',
        params: [
            { 
                name: 'anime', 
                label: '动漫名称', 
                type: 'text', 
                required: true, 
                placeholder: '示例: 生万物',
                description: '输入完整的动漫名称'
            }
        ]
    },
    matchAnime: {
        name: '匹配动漫',
        icon: '🎯',
        method: 'POST',
        path: '/api/v2/match',
        description: '根据文件名智能匹配动漫',
        params: [
            { 
                name: 'fileName', 
                label: '文件名', 
                type: 'text', 
                required: true, 
                placeholder: '示例: 生万物 S02E08',
                description: '支持多种命名格式，如: 无忧渡.S02E08.2160p.WEB-DL.H265.DDP.5.1'
            }
        ]
    },
    getBangumi: {
        name: '获取番剧详情',
        icon: '📋',
        method: 'GET',
        path: '/api/v2/bangumi/:animeId',
        description: '获取指定番剧的详细信息',
        params: [
            { 
                name: 'animeId', 
                label: '动漫ID', 
                type: 'text', 
                required: true, 
                placeholder: '示例: 236379',
                description: '从搜索结果中获取的动漫ID'
            }
        ]
    },
    getComment: {
        name: '获取弹幕',
        icon: '💬',
        method: 'GET',
        path: '/api/v2/comment/:commentId',
        description: '获取指定剧集的弹幕数据',
        params: [
            { 
                name: 'commentId', 
                label: '弹幕ID', 
                type: 'text', 
                required: true, 
                placeholder: '示例: 10009',
                description: '从剧集列表中获取的弹幕ID'
            },
            { 
                name: 'format', 
                label: '格式', 
                type: 'select', 
                required: false, 
                placeholder: '可选: json或xml', 
                options: ['json', 'xml'],
                description: '选择返回数据的格式'
            }
        ]
    }
};

/* ========================================
   加载API参数
   ======================================== */
function loadApiParams() {
    const select = document.getElementById('api-select');
    const apiKey = select.value;
    const paramsDiv = document.getElementById('api-params');
    const formDiv = document.getElementById('params-form');
    const responseContainer = document.getElementById('api-response-container');

    if (!apiKey) {
        paramsDiv.style.display = 'none';
        responseContainer.style.display = 'none';
        return;
    }

    const config = apiConfigs[apiKey];
    paramsDiv.style.display = 'block';
    
    // 显示API信息卡片
    const apiInfoHTML = \`
        <div class="api-info-card">
            <div class="api-info-header">
                <span class="api-icon">\${config.icon}</span>
                <div class="api-info-content">
                    <h4 class="api-name">\${config.name}</h4>
                    <p class="api-description">\${config.description}</p>
                </div>
            </div>
            <div class="api-info-details">
                <div class="api-detail-item">
                    <span class="detail-label">请求方法</span>
                    <span class="method-badge method-\${config.method.toLowerCase()}">\${config.method}</span>
                </div>
                <div class="api-detail-item">
                    <span class="detail-label">接口路径</span>
                    <code class="api-path">\${config.path}</code>
                </div>
            </div>
        </div>
    \`;

    if (config.params.length === 0) {
        formDiv.innerHTML = apiInfoHTML + \`
            <div class="no-params-message">
                <span class="message-icon">ℹ️</span>
                <p>此接口无需参数</p>
            </div>
        \`;
        return;
    }

    formDiv.innerHTML = apiInfoHTML + config.params.map((param, index) => {
        let inputHTML = '';
        
        if (param.type === 'select') {
            let optionsHtml = '<option value="">-- 请选择 --</option>';
            if (param.options) {
                optionsHtml += param.options.map(opt => 
                    \`<option value="\${opt}">\${opt}</option>\`
                ).join('');
            }
            inputHTML = \`
                <select class="form-select" id="param-\${param.name}" \${param.required ? 'required' : ''}>
                    \${optionsHtml}
                </select>
            \`;
        } else {
            const placeholder = param.placeholder || "请输入" + param.label;
            inputHTML = \`
                <input 
                    type="\${param.type}" 
                    class="form-input" 
                    id="param-\${param.name}" 
                    placeholder="\${placeholder}" 
                    \${param.required ? 'required' : ''}
                >
            \`;
        }
        
        return \`
            <div class="form-group" style="animation: fadeInUp 0.3s ease-out \${index * 0.1}s backwards;">
                <label class="form-label \${param.required ? 'required' : ''}">
                    <span class="param-icon">🔸</span>
                    \${param.label}
                </label>
                \${inputHTML}
                \${param.description ? \`
                    <small class="form-help">
                        <span class="help-icon">💡</span>
                        \${param.description}
                    </small>
                \` : ''}
            </div>
        \`;
    }).join('');
}

/* ========================================
   测试API
   ======================================== */
function testApi() {
    const select = document.getElementById('api-select');
    const apiKey = select.value;
    const sendButton = event.target;

    if (!apiKey) {
        customAlert('请先选择接口', '⚠️ 提示');
        return;
    }

    const originalText = sendButton.innerHTML;
    sendButton.innerHTML = '<span class="loading-spinner-small"></span> <span>发送中...</span>';
    sendButton.disabled = true;

    const config = apiConfigs[apiKey];
    const params = {};

    // 验证必填参数
    let hasError = false;
    config.params.forEach(param => {
        const input = document.getElementById(\`param-\${param.name}\`);
        const value = input.value.trim();
        
        if (param.required && !value) {
            input.classList.add('error');
            input.focus();
            hasError = true;
        } else {
            input.classList.remove('error');
            if (value) params[param.name] = value;
        }
    });

    if (hasError) {
        sendButton.innerHTML = originalText;
        sendButton.disabled = false;
        customAlert('请填写所有必填参数', '⚠️ 参数错误');
        return;
    }

    addLog(\`🚀 调用接口: \${config.name} (\${config.method} \${config.path})\`, 'info');
    addLog(\`📤 请求参数: \${JSON.stringify(params)}\`, 'info');

    const startTime = performance.now();
    let url = config.path;
    const isPathParameterApi = config.path.includes(':');
    
    if (isPathParameterApi) {
        const pathParams = {};
        const queryParams = {};
        
        for (const [key, value] of Object.entries(params)) {
            if (config.path.includes(':' + key)) {
                pathParams[key] = value;
            } else {
                queryParams[key] = value;
            }
        }
        
        for (const [key, value] of Object.entries(pathParams)) {
            url = url.replace(':' + key, encodeURIComponent(value));
        }
        
        if (config.method === 'GET' && Object.keys(queryParams).length > 0) {
            const queryString = new URLSearchParams(queryParams).toString();
            url = url + '?' + queryString;
        }
    } else {
        if (config.method === 'GET') {
            const queryString = new URLSearchParams(params).toString();
            url = url + '?' + queryString;
        }
    }

    const requestOptions = {
        method: config.method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (config.method === 'POST') {
        requestOptions.body = JSON.stringify(params);
    }

    fetch(buildApiUrl(url), requestOptions)
        .then(response => {
            const endTime = performance.now();
            const responseTime = Math.round(endTime - startTime);
            
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            
            const formatParam = params.format || 'json';
            
            if (formatParam.toLowerCase() === 'xml') {
                return response.text().then(text => ({
                    data: text,
                    format: 'xml',
                    responseTime: responseTime,
                    status: response.status
                }));
            } else {
                return response.json().then(json => ({
                    data: json,
                    format: 'json',
                    responseTime: responseTime,
                    status: response.status
                }));
            }
        })
        .then(result => {
            const responseContainer = document.getElementById('api-response-container');
            const responseDiv = document.getElementById('api-response');
            
            responseContainer.style.display = 'block';
            
            // 创建响应头部
            const responseHeaderDiv = document.createElement('div');
            responseHeaderDiv.className = 'response-header';
            responseHeaderDiv.innerHTML = \`
                <span class="response-status success">
                    <span>✅</span>
                    <span>成功 (\${result.status})</span>
                </span>
                <span class="response-time">
                    <span>⏱️</span>
                    <span>\${result.responseTime}ms</span>
                </span>
            \`;
            
            // 创建复制按钮
            const copyBtn = document.createElement('button');
            copyBtn.className = 'btn btn-secondary btn-sm copy-response-btn';
            copyBtn.innerHTML = \`
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>复制响应</span>
            \`;
            copyBtn.onclick = function() {
                copyApiResponse(result.data, result.format, this);
            };
            responseHeaderDiv.appendChild(copyBtn);
            
            // 清空并添加新内容
            responseDiv.innerHTML = '';
            responseDiv.appendChild(responseHeaderDiv);
            
            // 创建响应内容
            const codeBlock = document.createElement('div');
            codeBlock.className = 'response-content';
            
            if (result.format === 'xml') {
                codeBlock.classList.add('xml');
                codeBlock.textContent = result.data;
            } else {
                codeBlock.innerHTML = highlightJSON(result.data);
            }
            
            responseDiv.appendChild(codeBlock);
            
            addLog(\`✅ 接口调用成功 - 耗时 \${result.responseTime}ms\`, 'success');
            
            // 滚动到响应区域
            setTimeout(() => {
                responseContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        })
        .catch(error => {
            const endTime = performance.now();
            const responseTime = Math.round(endTime - startTime);
            
            const errorMessage = \`❌ API请求失败: \${error.message}\`;
            const responseContainer = document.getElementById('api-response-container');
            const responseDiv = document.getElementById('api-response');
            
            responseContainer.style.display = 'block';
            responseDiv.innerHTML = \`
                <div class="response-header">
                    <span class="response-status error">
                        <span>❌</span>
                        <span>失败</span>
                    </span>
                    <span class="response-time">
                        <span>⏱️</span>
                        <span>\${responseTime}ms</span>
                    </span>
                </div>
                <div class="response-content error">\${escapeHtml(errorMessage)}</div>
            \`;
            
            addLog(errorMessage, 'error');
        })
        .finally(() => {
            sendButton.innerHTML = originalText;
            sendButton.disabled = false;
        });
}

/* ========================================
   复制API响应
   ======================================== */
function copyApiResponse(data, format, buttonElement) {
    const text = format === 'xml' ? data : JSON.stringify(data, null, 2);
    
    navigator.clipboard.writeText(text)
        .then(() => {
            const btn = buttonElement;
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = \`
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>已复制!</span>
            \`;
            btn.classList.add('copied');
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('copied');
                btn.disabled = false;
            }, 2000);
            
            addLog('📋 响应内容已复制到剪贴板', 'success');
        })
        .catch(err => {
            console.error('复制失败:', err);
            customAlert('复制失败: ' + err.message, '❌ 复制失败');
            addLog('❌ 复制失败: ' + err.message, 'error');
        });
}
`;