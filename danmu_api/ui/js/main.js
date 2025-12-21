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
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.style.backgroundColor = savedTheme === 'dark' ? '#0A0F1E' : '#ffffff';
    document.documentElement.style.colorScheme = savedTheme;
    
    // 添加主题切换动画
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.opacity = '0';
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            themeToggle.style.opacity = '1';
            themeToggle.style.transform = 'scale(1)';
        }, 300);
    }
    addLog(\`已加载\${savedTheme === 'dark' ? '深色' : '浅色'}主题 ✨\`, 'info');
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // 添加页面过渡效果
    document.body.style.transition = 'background 0.3s ease';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeButton = document.getElementById('theme-toggle');
    themeButton.style.transform = 'scale(0.8) rotate(360deg)';
    
    // 创建主题切换涟漪效果
    const ripple = document.createElement('div');
    ripple.style.cssText = \`
        position: fixed;
        border-radius: 50%;
        background: \${newTheme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
        width: 20px;
        height: 20px;
        left: \${themeButton.offsetLeft + themeButton.offsetWidth / 2}px;
        top: \${themeButton.offsetTop + themeButton.offsetHeight / 2}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        animation: themeRipple 0.6s ease-out;
    \`;
    
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes themeRipple {
            to {
                width: 3000px;
                height: 3000px;
                opacity: 0;
            }
        }
    \`;
    document.head.appendChild(style);
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        themeButton.style.transform = '';
        ripple.remove();
        style.remove();
    }, 600);
    
    addLog(\`已切换到\${newTheme === 'dark' ? '深色' : '浅色'}主题 🎨\`, 'success');
}

/* ========================================
   侧边栏切换
   ======================================== */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isActive = sidebar.classList.contains('active');
    
    sidebar.classList.toggle('active');
    
    // 点击遮罩关闭侧边栏
    if (!isActive) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.style.cssText = \`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            z-index: 999;
            animation: overlayFadeIn 0.3s ease-out;
        \`;
        overlay.onclick = toggleSidebar;
        document.body.appendChild(overlay);
        
        // 添加动画样式
        if (!document.getElementById('overlay-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'overlay-animation-styles';
            style.textContent = \`
                @keyframes overlayFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes overlayFadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            \`;
            document.head.appendChild(style);
        }
    } else {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.style.animation = 'overlayFadeOut 0.3s ease-out';
            setTimeout(() => overlay.remove(), 300);
        }
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
                customAlert('请在URL中配置相应的TOKEN以访问此功能！\\n\\n访问方式：' + protocol + '//' + host + '/{TOKEN}', '🔒 需要认证');
            }, 100);
            return;
        }
        
        if (section === 'env') {
            checkDeployPlatformConfig().then(result => {
                if (!result.success) {
                    setTimeout(() => {
                        customAlert(result.message, '⚙️ 配置提示');
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

function performSectionSwitch(section, isInitialLoad = false) {
    // 移除所有active类
    document.querySelectorAll('.content-section').forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0';
    });
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    
    // 添加active类
    const targetSection = document.getElementById(section + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        // 如果是初始化加载，直接显示，不走淡入动画避免闪烁
        targetSection.style.opacity = isInitialLoad ? '1' : '1'; 
    }
    
    const activeNav = document.querySelector(\`[data-section="\${section}"]\`);
    if (activeNav) activeNav.classList.add('active');
    
    // 更新移动端标题
    const titles = {
        preview: { main: '配置预览', sub: 'Configuration' },
        logs: { main: '日志查看', sub: 'System Logs' },
        api: { main: '接口调试', sub: 'API Testing' },
        push: { main: '推送弹幕', sub: 'Push Danmu' },
        env: { main: '系统配置', sub: 'Settings' }
    };
    const mobileTitle = document.getElementById('mobile-title');
    const mobileSubtitle = document.getElementById('mobile-subtitle');
    if (mobileTitle && titles[section]) {
        mobileTitle.textContent = titles[section].main;
        if (mobileSubtitle) {
            mobileSubtitle.textContent = titles[section].sub;
        }
    }
    
    // 只有在非初始化加载且是移动端时才触发侧边栏切换
    if (!isInitialLoad && window.innerWidth <= 768) {
        toggleSidebar();
    }
    
    // 滚动到顶部
    if (!isInitialLoad) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const sectionTitle = (titles && titles[section] && titles[section].main) ? titles[section].main : section;
    if (!isInitialLoad) {
        addLog(\`切换到\${sectionTitle}模块 📍\`, 'info');
    }
    
    // 保存当前页面到本地存储，以便刷新后恢复
    localStorage.setItem('activeSection', section);
}

/* ========================================
   类别切换
   ======================================== */
function switchCategory(category) {
    currentCategory = category;
    
    // 添加切换动画
    const envList = document.getElementById('env-list');
    envList.style.opacity = '0';
    envList.style.transform = 'translateY(20px)';
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    setTimeout(() => {
        renderEnvList();
        envList.style.transition = 'all 0.3s ease';
        envList.style.opacity = '1';
        envList.style.transform = 'translateY(0)';
    }, 150);
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
            <div class="modal-container" style="max-width: 480px;">
                <div class="modal-header">
                    <h3 class="modal-title" id="custom-alert-title">💡 提示</h3>
                    <button class="modal-close" id="custom-alert-close">×</button>
                </div>
                <div class="modal-body">
                    <p id="custom-alert-message" style="color: var(--text-secondary); margin: 0; line-height: 1.7;"></p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="custom-alert-confirm">
                        <span>确定</span>
                    </button>
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
        setTimeout(() => {
            document.getElementById('custom-alert-title').textContent = '💡 提示';
        }, 300);
    }

    closeBtn.addEventListener('click', closeAlert);
    confirmBtn.addEventListener('click', closeAlert);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeAlert();
        }
    });
}

function customAlert(message, title = '💡 提示') {
    createCustomAlert();
    const overlay = document.getElementById('custom-alert-overlay');
    const titleElement = document.getElementById('custom-alert-title');
    const messageElement = document.getElementById('custom-alert-message');

    titleElement.textContent = title;
    messageElement.textContent = message;
    overlay.classList.add('active');
}

function customConfirm(message, title = '❓ 确认') {
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
    showLoadingIndicator('env-list');
    
    fetch(buildApiUrl('/api/config', true))
        .then(response => response.json())
        .then(config => {
            currentAdminToken = config.originalEnvVars?.ADMIN_TOKEN || '';
            originalToken = config.originalEnvVars?.TOKEN || '87654321';
            
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
            
            hideLoadingIndicator('env-list');
            renderEnvList();
        })
        .catch(error => {
            console.error('Failed to load env variables:', error);
            hideLoadingIndicator('env-list');
            showErrorMessage('env-list', '加载配置失败: ' + error.message);
        });
}

/* ========================================
   显示加载指示器
   ======================================== */
function showLoadingIndicator(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = \`
            <div style="text-align: center; padding: 3rem;">
                <div class="loading-spinner" style="margin: 0 auto;"></div>
                <p style="margin-top: 1rem; color: var(--text-secondary); font-weight: 500;">加载中...</p>
            </div>
        \`;
    }
}

function hideLoadingIndicator(containerId) {
    // 加载指示器会被实际内容替换
}

function showErrorMessage(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = \`
            <div style="text-align: center; padding: 3rem; color: var(--danger-color);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                <p style="font-weight: 600;">\${message}</p>
            </div>
        \`;
    }
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

            originalToken = token;
            currentAdminToken = adminToken || '';

            const urlPath = window.location.pathname;
            const pathParts = urlPath.split('/').filter(part => part !== '');
            const urlToken = pathParts.length > 0 ? pathParts[0] : '';
            
            let apiEndpoint;
            
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
   获取Docker版本并检查更新
   ======================================== */
function getDockerVersion() {
    const url = "https://img.shields.io/docker/v/logvar/danmu-api?sort=semver";

    fetch(url)
        .then(response => response.text())
        .then(svgContent => {
            const versionMatch = svgContent.match(/version<\\/text><text.*?>(v[\\d\\.]+)/);

            if (versionMatch && versionMatch[1]) {
                const latestVersion = versionMatch[1];
                const latestVersionElement = document.getElementById('latest-version');
                
                if (latestVersionElement) {
                    latestVersionElement.textContent = latestVersion;
                    
                    // 添加版本号动画
                    latestVersionElement.style.animation = 'pulse 0.6s ease-out';
                }
                
                // 检查是否有新版本
                checkForUpdate(latestVersion);
            }
        })
        .catch(error => {
            console.error("Error fetching the SVG:", error);
            const latestVersionElement = document.getElementById('latest-version');
            if (latestVersionElement) {
                latestVersionElement.textContent = '获取失败';
            }
        });
}

/* ========================================
   检查版本更新
   ======================================== */
function checkForUpdate(latestVersion) {
    const currentVersionElement = document.getElementById('current-version');
    if (!currentVersionElement) return;
    
    const currentVersion = currentVersionElement.textContent.trim();
    
    // 比较版本号
    if (compareVersions(latestVersion, currentVersion) > 0) {
        showUpdateNotice(currentVersion, latestVersion);
        addLog(\`🎉 发现新版本: \${latestVersion} (当前: \${currentVersion})\`, 'info');
    } else {
        addLog(\`✅ 当前已是最新版本: \${currentVersion}\`, 'success');
    }
}

/* ========================================
   版本号比较函数
   ======================================== */
function compareVersions(v1, v2) {
    // 移除 'v' 前缀
    const cleanV1 = v1.replace(/^v/, '');
    const cleanV2 = v2.replace(/^v/, '');
    
    const parts1 = cleanV1.split('.').map(Number);
    const parts2 = cleanV2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const part1 = parts1[i] || 0;
        const part2 = parts2[i] || 0;
        
        if (part1 > part2) return 1;
        if (part1 < part2) return -1;
    }
    
    return 0;
}

/* ========================================
   显示更新提示
   ======================================== */
function showUpdateNotice(currentVersion, latestVersion) {
    const updateNotice = document.getElementById('version-update-notice');
    const updateDesc = document.getElementById('update-desc');
    
    if (updateNotice && updateDesc) {
        updateDesc.textContent = \`\${currentVersion} → \${latestVersion}\`;
        updateNotice.style.display = 'flex';
    }
}

/* ========================================
   显示更新指南
   ======================================== */
function showUpdateGuide() {
    const currentVersion = document.getElementById('current-version').textContent.trim();
    const latestVersion = document.getElementById('latest-version').textContent.trim();
    
    const guideMessage = \`
📦 版本更新提示

当前版本: \${currentVersion}
最新版本: \${latestVersion}

更新方法：

🐳 Docker 部署：
1. 停止当前容器: docker stop danmu-api
2. 拉取最新镜像: docker pull logvar/danmu-api:latest
3. 重新启动容器

☁️ 云平台部署 (Vercel/Netlify/Cloudflare)：
1. 进入项目仓库
2. 拉取最新代码: git pull origin main
3. 推送到部署分支触发自动部署

💡 提示：更新前请备份重要配置！
    \`.trim();
    
    customAlert(guideMessage, '🔄 更新指南');
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
                
                // 添加复制成功动画
                const card = apiEndpointElement.closest('.api-endpoint-card');
                if (card) {
                    card.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 300);
                }
                
                setTimeout(() => {
                    apiEndpointElement.textContent = originalText;
                    apiEndpointElement.style.color = '';
                }, 2000);
                
                addLog('API端点已复制到剪贴板 📋: ' + apiEndpoint, 'success');
            })
            .catch(err => {
                console.error('复制失败:', err);
                customAlert('复制失败: ' + err, '❌ 复制失败');
                addLog('复制API端点失败: ' + err, 'error');
            });
    }
}

/* ========================================
   初始化
   ======================================== */
async function init() {
    // 立即恢复上次访问的页面状态，避免闪烁
    const savedSection = localStorage.getItem('activeSection');
    if (savedSection && savedSection !== 'preview') {
        // 直接执行切换逻辑，跳过动画和侧边栏触发
        performSectionSwitch(savedSection, true);
    }

    try {
        // 初始化主题
        initTheme();
        
        await updateApiEndpoint();
        updateCurrentModeDisplay();
        getDockerVersion();
        const config = await fetchAndSetConfig();
        setDefaultPushUrl(config);
        checkAndHandleAdminToken();
        loadEnvVariables();
        renderEnvList();
        renderPreview();
        addLog('🎉 系统初始化完成', 'success');
        fetchRealLogs();
    } catch (error) {
        console.error('初始化失败:', error);
        addLog('❌ 系统初始化失败: ' + error.message, 'error');
        fetchRealLogs();
    }
    // 初始化弹幕测试相关功能
        if (document.getElementById('danmu-heatmap-canvas')) {
            // 预加载画布
            const canvas = document.getElementById('danmu-heatmap-canvas');
            canvas.width = canvas.offsetWidth;
            canvas.height = 120;
        }
}

/* ========================================
   页面加载完成后初始化
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    createCustomAlert();
    init();
});

/* ========================================
   添加键盘快捷键
   ======================================== */
document.addEventListener('keydown', function(e) {
    // Alt + T: 切换主题
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Alt + 数字: 快速切换导航
    if (e.altKey && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const sections = ['preview', 'logs', 'api', 'push', 'env'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
            switchSection(sections[index]);
        }
    }
});
/* ========================================
   数字动画函数
   ======================================== */
function animateNumber(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}
`;