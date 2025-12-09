// language=JavaScript
export const apitestJsContent = /* javascript */ `
/* ========================================
   API配置
   ======================================== */
const apiConfigs = {
    searchAnime: {
        name: '搜索动漫',
        method: 'GET',
        path: '/api/v2/search/anime',
        params: [
            { name: 'keyword', label: '关键词', type: 'text', required: true, placeholder: '示例: 生万物' }
        ]
    },
    searchEpisodes: {
        name: '搜索剧集',
        method: 'GET',
        path: '/api/v2/search/episodes',
        params: [
            { name: 'anime', label: '动漫名称', type: 'text', required: true, placeholder: '示例: 生万物' }
        ]
    },
    matchAnime: {
        name: '匹配动漫',
        method: 'POST',
        path: '/api/v2/match',
        params: [
            { name: 'fileName', label: '文件名', type: 'text', required: true, placeholder: '示例: 生万物 S02E08, 无忧渡.S02E08.2160p.WEB-DL.H265.DDP.5.1, 爱情公寓.ipartment.2009.S02E08.H.265.25fps.mkv, 亲爱的X S02E08, 宇宙Marry Me? S02E08' }
        ]
    },
    getBangumi: {
        name: '获取番剧详情',
        method: 'GET',
        path: '/api/v2/bangumi/:animeId',
        params: [
            { name: 'animeId', label: '动漫ID', type: 'text', required: true, placeholder: '示例: 236379' }
        ]
    },
    getComment: {
        name: '获取弹幕',
        method: 'GET',
        path: '/api/v2/comment/:commentId',
        params: [
            { name: 'commentId', label: '弹幕ID', type: 'text', required: true, placeholder: '示例: 10009' },
            { name: 'format', label: '格式', type: 'select', required: false, placeholder: '可选: json或xml', options: ['json', 'xml'] }
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

    if (!apiKey) {
        paramsDiv.style.display = 'none';
        return;
    }

    const config = apiConfigs[apiKey];
    paramsDiv.style.display = 'block';

    // 添加淡入动画
    paramsDiv.style.animation = 'fadeInUp 0.3s ease';

    if (config.params.length === 0) {
        formDiv.innerHTML = '<p style="color: var(--text-tertiary); text-align: center; padding: 2rem;">✨ 此接口无需参数</p>';
        return;
    }

    formDiv.innerHTML = config.params.map(param => {
        if (param.type === 'select') {
            let optionsHtml = '<option value="">-- 请选择 --</option>';
            if (param.options) {
                optionsHtml += param.options.map(opt => \`<option value="\${opt}">\${opt}</option>\`).join('');
            }
            return \`
                <div class="form-group">
                    <label class="form-label \${param.required ? 'required' : ''}">\${param.label}</label>
                    <select class="form-select" id="param-\${param.name}">
                        \${optionsHtml}
                    </select>
                    \${param.placeholder ? \`<small class="form-help">💡 \${param.placeholder}</small>\` : ''}
                </div>
            \`;
        }
        const placeholder = param.placeholder ? param.placeholder : "请输入" + param.label;
        return \`
            <div class="form-group">
                <label class="form-label \${param.required ? 'required' : ''}">\${param.label}</label>
                <input type="\${param.type}" class="form-input" id="param-\${param.name}" placeholder="\${placeholder}" \${param.required ? 'required' : ''}>
                \${param.placeholder ? \`<small class="form-help">💡 \${param.placeholder}</small>\` : ''}
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
        showNotification('请先选择接口', 'warning');
        addLog('❌ 请先选择接口', 'error');
        return;
    }

    const originalText = sendButton.innerHTML;
    sendButton.innerHTML = '<span class="loading-spinner-small"></span> 发送中...';
    sendButton.disabled = true;

    const config = apiConfigs[apiKey];
    const params = {};

    // 验证必填参数
    let hasError = false;
    config.params.forEach(param => {
        const element = document.getElementById(\`param-\${param.name}\`);
        const value = element.value;
        
        if (param.required && !value) {
            element.classList.add('error');
            hasError = true;
            setTimeout(() => element.classList.remove('error'), 2000);
        } else {
            element.classList.remove('error');
            if (value) params[param.name] = value;
        }
    });

    if (hasError) {
        sendButton.innerHTML = originalText;
        sendButton.disabled = false;
        showNotification('请填写所有必填参数', 'error');
        addLog('❌ 请填写所有必填参数', 'error');
        return;
    }

    addLog(\`🚀 调用接口: \${config.name} (\${config.method} \${config.path})\`, 'info');
    addLog(\`📦 请求参数: \${JSON.stringify(params)}\`, 'info');

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

    const startTime = performance.now();

    fetch(buildApiUrl(url), requestOptions)
        .then(response => {
            const endTime = performance.now();
            const duration = (endTime - startTime).toFixed(2);
            
            addLog(\`⏱️ 响应时间: \${duration}ms\`, 'info');
            addLog(\`📊 状态码: \${response.status} \${response.statusText}\`, response.ok ? 'success' : 'error');
            
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            
            const formatParam = params.format || 'json';
            
            if (formatParam.toLowerCase() === 'xml') {
                return response.text().then(text => ({
                    data: text,
                    format: 'xml',
                    duration: duration
                }));
            } else {
                return response.json().then(json => ({
                    data: json,
                    format: 'json',
                    duration: duration
                }));
            }
        })
        .then(result => {
            document.getElementById('api-response-container').style.display = 'block';
            const responseDiv = document.getElementById('api-response');
            
            if (result.format === 'xml') {
                responseDiv.textContent = result.data;
                responseDiv.className = 'response-content xml';
            } else {
                responseDiv.className = 'response-content';
                responseDiv.innerHTML = highlightJSON(result.data);
            }
            
            addLog(\`✅ 接口调用成功 (耗时: \${result.duration}ms)\`, 'success');
            showNotification('✅ 请求成功！', 'success');
            
            // 滚动到响应区域
            setTimeout(() => {
                document.getElementById('api-response-container').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        })
        .catch(error => {
            const errorMessage = \`API请求失败: \${error.message}\`;
            document.getElementById('api-response-container').style.display = 'block';
            document.getElementById('api-response').textContent = errorMessage;
            document.getElementById('api-response').className = 'response-content error';
            addLog(\`❌ \${errorMessage}\`, 'error');
            showNotification('❌ 请求失败: ' + error.message, 'error');
        })
        .finally(() => {
            sendButton.innerHTML = originalText;
            sendButton.disabled = false;
        });
}

/* ========================================
   显示通知
   ======================================== */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = \`notification notification-\${type}\`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = \`
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: var(--bg-glass);
        backdrop-filter: blur(20px);
        border-radius: var(--border-radius-sm);
        box-shadow: var(--shadow-lg);
        border: 2px solid \${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--warning-color)'};
        color: var(--text-primary);
        font-weight: 500;
        z-index: 9999;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        max-width: 400px;
        word-wrap: break-word;
    \`;
    
    document.body.appendChild(notification);
    
    // 3秒后移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 添加通知动画样式
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = \`
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0.7; }
        }
        
        @media (max-width: 768px) {
            .notification {
                top: 1rem !important;
                right: 1rem !important;
                left: 1rem !important;
                max-width: none !important;
            }
        }
    \`;
    document.head.appendChild(style);
}
`;