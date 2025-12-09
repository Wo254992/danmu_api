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

    if (config.params.length === 0) {
        formDiv.innerHTML = '<p style="color: var(--text-tertiary);">此接口无需参数</p>';
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
                    <label class="form-label">\${param.label}\${param.required ? ' *' : ''}</label>
                    <select class="form-select" id="param-\${param.name}">
                        \${optionsHtml}
                    </select>
                    \${param.placeholder ? \`<small class="form-help">\${param.placeholder}</small>\` : ''}
                </div>
            \`;
        }
        const placeholder = param.placeholder ? param.placeholder : "请输入" + param.label;
        return \`
            <div class="form-group">
                <label class="form-label">\${param.label}\${param.required ? ' *' : ''}</label>
                <input type="\${param.type}" class="form-input" id="param-\${param.name}" placeholder="\${placeholder}" \${param.required ? 'required' : ''}>
                \${param.placeholder ? \`<small class="form-help">\${param.placeholder}</small>\` : ''}
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
        addLog('请先选择接口', 'error');
        return;
    }

    const originalText = sendButton.innerHTML;
    sendButton.innerHTML = '<span class="loading-spinner-small"></span> 发送中...';
    sendButton.disabled = true;

    const config = apiConfigs[apiKey];
    const params = {};

    config.params.forEach(param => {
        const value = document.getElementById(\`param-\${param.name}\`).value;
        if (value) params[param.name] = value;
    });

    addLog(\`调用接口: \${config.name} (\${config.method} \${config.path})\`, 'info');
    addLog(\`请求参数: \${JSON.stringify(params)}\`, 'info');

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
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            
            const formatParam = params.format || 'json';
            
            if (formatParam.toLowerCase() === 'xml') {
                return response.text().then(text => ({
                    data: text,
                    format: 'xml'
                }));
            } else {
                return response.json().then(json => ({
                    data: json,
                    format: 'json'
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
            
            addLog('接口调用成功', 'success');
            
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
            addLog(errorMessage, 'error');
        })
        .finally(() => {
            sendButton.innerHTML = originalText;
            sendButton.disabled = false;
        });
}
`;