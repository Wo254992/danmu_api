// language=JavaScript
export const mainJsContent = /* javascript */ `
/* ========================================
   全局变量定义
   ======================================== */
let envVariables = {};
let currentCategory = 'api';
let editingKey = null;
let logs = [];
let currentVersion = '';
let latestVersion = '';
let currentToken = 'globals.currentToken';
let currentAdminToken = '';
let originalToken = '87654321';

/* ========================================
   主题切换功能
   ======================================== */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    addLog(\`已加载\${savedTheme === 'dark' ? '深色' : '浅色'}主题\`, 'info');
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeButton = document.getElementById('theme-toggle');
    themeButton.style.transform = 'scale(0.8) rotate(360deg)';
    setTimeout(() => {
        themeButton.style.transform = '';
    }, 300);
    
    addLog(\`已切换到\${newTheme === 'dark' ? '深色' : '浅色'}主题\`, 'info');
}

/* ========================================
   侧边栏切换
   ======================================== */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    
    // 点击遮罩关闭侧边栏
    if (sidebar.classList.contains('active')) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 999;';
        overlay.onclick = toggleSidebar;
        document.body.appendChild(overlay);
    } else {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) overlay.remove();
    }
}

/* ========================================
   导航切换
   ======================================== */
function switchSection(section) {
    // 检查是否尝试访问受token保护的section
    if (section === 'logs' || section === 'api' || section === 'env' || section === 'push') {
        const urlPath = window.location.pathname;
        const pathParts = urlPath.split('/').filter(part => part !== '');
        const urlToken = pathParts.length > 0 ? pathParts[0] : '';
        
        if (!urlToken && originalToken !== "87654321") {
            setTimeout(() => {
                const protocol = window.location.protocol;
                const host = window.location.host;
                customAlert('请在URL中配置相应的TOKEN以访问此功能！\\n\\n访问方式：' + protocol + '//' + host + '/{TOKEN}');
            }, 100);
            return;
        }
        
        if (section === 'env') {
            checkDeployPlatformConfig().then(result => {
                if (!result.success) {
                    setTimeout(() => {
                        customAlert(result.message);
                    }, 100);
                } else {
                    performSectionSwitch(section);
                }
            });
            return;
        }
    }
    
    performSectionSwitch(section);
}

function performSectionSwitch(section) {
    // 移除所有active类
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    
    // 添加active类
    document.getElementById(section + '-section').classList.add('active');
    const activeNav = document.querySelector(\`[data-section="\${section}"]\`);
    if (activeNav) activeNav.classList.add('active');
    
    // 更新移动端标题
    const titles = {
        preview: '配置预览',
        logs: '日志查看',
        api: '接口调试',
        push: '推送弹幕',
        env: '系统配置'
    };
    const mobileTitle = document.getElementById('mobile-title');
    if (mobileTitle) {
        mobileTitle.textContent = titles[section] || '管理平台';
    }
    
    // 关闭移动端侧边栏
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
    if (section === 'logs' && typeof fetchRealLogs === 'function') {
        fetchRealLogs();
    }    
    addLog(\`切换到\${titles[section]}模块\`, 'info');
}

/* ========================================
   类别切换
   ======================================== */
function switchCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderEnvList();
}

/* ========================================
   自定义弹窗组件
   ======================================== */
function createCustomAlert() {
    if (document.getElementById('custom-alert-overlay')) {
        return;
    }

    const alertHTML = \`
        <div class="modal-overlay" id="custom-alert-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h3 class="modal-title" id="custom-alert-title">提示</h3>
                    <button class="modal-close" id="custom-alert-close">×</button>
                </div>
                <div class="modal-body">
                    <p id="custom-alert-message" style="color: var(--text-secondary); margin: 0;"></p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="custom-alert-confirm">确定</button>
                </div>
            </div>
        </div>
    \`;

    document.body.insertAdjacentHTML('beforeend', alertHTML);

    const overlay = document.getElementById('custom-alert-overlay');
    const closeBtn = document.getElementById('custom-alert-close');
    const confirmBtn = document.getElementById('custom-alert-confirm');

    function closeAlert() {
        overlay.classList.remove('active');
        document.getElementById('custom-alert-title').textContent = '提示';
    }

    closeBtn.addEventListener('click', closeAlert);
    confirmBtn.addEventListener('click', closeAlert);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeAlert();
        }
    });
}

function customAlert(message, title = '提示') {
    createCustomAlert();
    const overlay = document.getElementById('custom-alert-overlay');
    const titleElement = document.getElementById('custom-alert-title');
    const messageElement = document.getElementById('custom-alert-message');

    titleElement.textContent = title;
    messageElement.textContent = message;
    overlay.classList.add('active');
}

function customConfirm(message, title = '确认') {
    return new Promise((resolve) => {
        createCustomAlert();
        const overlay = document.getElementById('custom-alert-overlay');
        const titleElement = document.getElementById('custom-alert-title');
        const messageElement = document.getElementById('custom-alert-message');
        const confirmBtn = document.getElementById('custom-alert-confirm');

        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        titleElement.textContent = title;
        messageElement.textContent = message;

        newConfirmBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            resolve(true);
        });

        document.getElementById('custom-alert-close').addEventListener('click', () => {
            overlay.classList.remove('active');
            resolve(false);
        });

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                resolve(false);
            }
        });

        overlay.classList.add('active');
    });
}

/* ========================================
   构建API URL
   ======================================== */
function buildApiUrl(path, isSystemPath = false) {
    if (isSystemPath && currentAdminToken && currentAdminToken.trim() !== '' && currentAdminToken.trim() !== '*'.repeat(currentAdminToken.length)) {
        return '/' + currentAdminToken + path;
    }
    return (currentToken ? '/' + currentToken : "") + path;
}

/* ========================================
   加载环境变量
   ======================================== */
function loadEnvVariables() {
    fetch(buildApiUrl('/api/config', true))
        .then(response => response.json())
        .then(config => {
            currentAdminToken = config.originalEnvVars?.ADMIN_TOKEN || '';
            originalToken = config.originalEnvVars?.TOKEN || '87654321';  // 修改：默认值改为 87654321
            
            const originalEnvVars = config.originalEnvVars || {};
            envVariables = {};
            
            Object.keys(originalEnvVars).forEach(key => {
                const varConfig = config.envVarConfig?.[key] || { category: 'system', type: 'text', description: '未分类配置项' };
                const category = varConfig.category || 'system';
                
                if (!envVariables[category]) {
                    envVariables[category] = [];
                }
                
                envVariables[category].push({
                    key: key,
                    value: originalEnvVars[key],
                    description: varConfig.description || '',
                    type: varConfig.type || 'text',
                    min: varConfig.min,
                    max: varConfig.max,
                    options: varConfig.options || []
                });
            });
            
            renderEnvList();
        })
        .catch(error => {
            console.error('Failed to load env variables:', error);
        });
}

/* ========================================
   更新API端点信息
   ======================================== */
function updateApiEndpoint() {
    return fetch(buildApiUrl('/api/config', true))
        .then(response => response.json())
        .then(config => {
            const protocol = window.location.protocol;
            const host = window.location.host;
            const token = config.originalEnvVars?.TOKEN || '87654321';
            const adminToken = config.originalEnvVars?.ADMIN_TOKEN;

            // 同步更新 originalToken，确保后续判断正确
            originalToken = token;
            currentAdminToken = adminToken || '';

            const urlPath = window.location.pathname;
            const pathParts = urlPath.split('/').filter(part => part !== '');
            const urlToken = pathParts.length > 0 ? pathParts[0] : '';
            
            let apiEndpoint;
            
            // 默认 token 时，不需要带 token
            if (token === '87654321') {
                apiEndpoint = protocol + '//' + host;
            } else {
                let apiToken = '********';
                if (urlToken === token || (adminToken !== "" && urlToken === adminToken)) {
                    apiToken = token;
                }
                apiEndpoint = protocol + '//' + host + '/' + apiToken;
            }
            
            const apiEndpointElement = document.getElementById('api-endpoint');
            if (apiEndpointElement) {
                apiEndpointElement.textContent = apiEndpoint;
            }
            return config;
        })
        .catch(error => {
            console.error('获取配置信息失败:', error);
            const protocol = window.location.protocol;
            const host = window.location.host;
            const apiEndpoint = protocol + '//' + host + '/********';
            const apiEndpointElement = document.getElementById('api-endpoint');
            if (apiEndpointElement) {
                apiEndpointElement.textContent = apiEndpoint;
            }
            throw error;
        });
}

/* ========================================
   获取Docker版本
   ======================================== */
function getDockerVersion() {
    const url = "https://img.shields.io/docker/v/logvar/danmu-api?sort=semver";

    fetch(url)
        .then(response => response.text())
        .then(svgContent => {
            const versionMatch = svgContent.match(/version<\\/text><text.*?>(v[\\d\\.]+)/);

            if (versionMatch && versionMatch[1]) {
                console.log("Version:", versionMatch[1]);
                const latestVersionElement = document.getElementById('latest-version');
                if (latestVersionElement) {
                    latestVersionElement.textContent = versionMatch[1];
                }
            } else {
                console.log("Version not found");
            }
        })
        .catch(error => {
            console.error("Error fetching the SVG:", error);
        });
}

/* ========================================
   复制API端点
   ======================================== */
function copyApiEndpoint() {
    const apiEndpointElement = document.getElementById('api-endpoint');
    if (apiEndpointElement) {
        const apiEndpoint = apiEndpointElement.textContent;
        navigator.clipboard.writeText(apiEndpoint)
            .then(() => {
                const originalText = apiEndpointElement.textContent;
                apiEndpointElement.textContent = '✓ 已复制!';
                apiEndpointElement.style.color = '#10b981';
                
                setTimeout(() => {
                    apiEndpointElement.textContent = originalText;
                    apiEndpointElement.style.color = '';
                }, 2000);
                
                addLog('API端点已复制到剪贴板: ' + apiEndpoint, 'success');
            })
            .catch(err => {
                console.error('复制失败:', err);
                customAlert('复制失败: ' + err);
                addLog('复制API端点失败: ' + err, 'error');
            });
    }
}

/* ========================================
   初始化
   ======================================== */
async function init() {
    try {
        // 初始化主题
        initTheme();
        
        await updateApiEndpoint();
        getDockerVersion();
        const config = await fetchAndSetConfig();
        setDefaultPushUrl(config);
        checkAndHandleAdminToken();
        loadEnvVariables();
        renderEnvList();
        renderPreview();
        addLog('系统初始化完成', 'success');
        fetchRealLogs();
    } catch (error) {
        console.error('初始化失败:', error);
        addLog('系统初始化失败: ' + error.message, 'error');
        fetchRealLogs();
    }
}

/* ========================================
   页面加载完成后初始化
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    createCustomAlert();
    init();
});
`;
