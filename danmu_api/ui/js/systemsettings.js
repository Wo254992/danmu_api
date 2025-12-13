// language=JavaScript
export const systemSettingsJsContent = /* javascript */ `
/* ========================================
   系统配置状态管理
   ======================================== */
let deploymentInProgress = false;
let cacheClearing = false;

/* ========================================
   显示/隐藏清理缓存模态框
   ======================================== */
function showClearCacheModal() {
    document.getElementById('clear-cache-modal').classList.add('active');
    
    // 添加模态框显示动画
    const modal = document.getElementById('clear-cache-modal');
    const modalContainer = modal.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
}

function hideClearCacheModal() {
    const modal = document.getElementById('clear-cache-modal');
    const modalContainer = modal.querySelector('.modal-container');
    
    if (modalContainer) {
        modalContainer.style.animation = 'modalSlideOut 0.3s ease-out';
        setTimeout(() => {
            modal.classList.remove('active');
        }, 300);
    } else {
        modal.classList.remove('active');
    }
}

/* ========================================
   确认清理缓存
   ======================================== */
async function confirmClearCache() {
    const configCheck = await checkDeployPlatformConfig();
    if (!configCheck.success) {
        hideClearCacheModal();
        customAlert(configCheck.message, '⚙️ 配置提示');
        return;
    }

    if (cacheClearing) {
        customAlert('缓存清理正在进行中，请稍候...', '⏳ 请稍候');
        return;
    }

    hideClearCacheModal();
    cacheClearing = true;
    
    showLoading('🗑️ 正在清理缓存...', '正在清除所有缓存数据');
    addLog('🗑️ 开始清理缓存', 'info');

    try {
        // 添加进度条动画
        const progressBar = document.getElementById('progress-bar-top');
        if (progressBar) {
            progressBar.classList.add('active');
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 90) {
                    clearInterval(progressInterval);
                    progress = 90;
                }
                progressBar.style.width = progress + '%';
            }, 200);
            
            setTimeout(() => clearInterval(progressInterval), 3000);
        }

        const response = await fetch(buildApiUrl('/api/cache/clear', true), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (progressBar) {
            progressBar.style.width = '100%';
            setTimeout(() => {
                progressBar.classList.remove('active');
                progressBar.style.width = '0%';
            }, 500);
        }

        if (result.success) {
            updateLoadingText('✅ 清理完成', '缓存已成功清除');
            
            // 显示清理详情
            const clearedItems = result.clearedItems || {};
            const details = Object.entries(clearedItems)
                .map(([key, value]) => \`  • \${key}: \${value}\`)
                .join('\\n');
            
            addLog('✅ 缓存清理完成！', 'success');
            addLog('清理详情：\\n' + details, 'info');
            
            // 显示成功动画
            showSuccessAnimation('缓存清理成功');
        } else {
            updateLoadingText('❌ 清理失败', '请查看日志了解详情');
            addLog(\`❌ 缓存清理失败: \${result.message}\`, 'error');
            
            setTimeout(() => {
                hideLoading();
                customAlert('缓存清理失败: ' + result.message, '❌ 操作失败');
            }, 1500);
        }
    } catch (error) {
        updateLoadingText('❌ 清理失败', '网络错误或服务不可用');
        addLog(\`❌ 缓存清理请求失败: \${error.message}\`, 'error');
        
        setTimeout(() => {
            hideLoading();
            customAlert('缓存清理失败: ' + error.message, '❌ 网络错误');
        }, 1500);
    } finally {
        setTimeout(() => {
            hideLoading();
            cacheClearing = false;
        }, 2000);
    }
}

/* ========================================
   显示/隐藏重新部署模态框
   ======================================== */
function showDeploySystemModal() {
    document.getElementById('deploy-system-modal').classList.add('active');
    
    // 添加模态框显示动画
    const modal = document.getElementById('deploy-system-modal');
    const modalContainer = modal.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
}

function hideDeploySystemModal() {
    const modal = document.getElementById('deploy-system-modal');
    const modalContainer = modal.querySelector('.modal-container');
    
    if (modalContainer) {
        modalContainer.style.animation = 'modalSlideOut 0.3s ease-out';
        setTimeout(() => {
            modal.classList.remove('active');
        }, 300);
    } else {
        modal.classList.remove('active');
    }
}

/* ========================================
   确认重新部署系统
   ======================================== */
function confirmDeploySystem() {
    if (deploymentInProgress) {
        customAlert('部署正在进行中，请稍候...', '⏳ 请稍候');
        return;
    }

    checkDeployPlatformConfig().then(configCheck => {
        if (!configCheck.success) {
            hideDeploySystemModal();
            customAlert(configCheck.message, '⚙️ 配置提示');
            return;
        }

        hideDeploySystemModal();
        deploymentInProgress = true;
        
        showLoading('🚀 准备部署...', '正在检查系统状态');
        addLog('========================================', 'info');
        addLog('🚀 开始系统部署流程', 'info');
        addLog('========================================', 'info');

        fetch(buildApiUrl('/api/config', true))
            .then(response => response.json())
            .then(config => {
                const deployPlatform = config.envs.deployPlatform || 'node';
                addLog(\`📋 检测到部署平台: \${deployPlatform}\`, 'info');

                if (deployPlatform.toLowerCase() === 'node') {
                    updateLoadingText('⚙️ Node 部署模式', '环境变量自动生效中...');
                    
                    setTimeout(() => {
                        hideLoading();
                        deploymentInProgress = false;
                        
                        addLog('========================================', 'success');
                        addLog('✅ Node部署模式，环境变量已生效', 'success');
                        addLog('========================================', 'success');
                        
                        showSuccessAnimation('配置已生效');
                        
                        customAlert(
                            '✅ Node部署模式\\n\\n在Node部署模式下，环境变量修改后会自动生效，无需重新部署。系统已更新配置！',
                            '🎉 配置成功'
                        );
                    }, 1500);
                } else {
                    updateLoadingText('☁️ 云端部署', '正在触发云端部署...');
                    
                    fetch(buildApiUrl('/api/deploy', true), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            addLog('✅ 云端部署触发成功', 'success');
                            simulateDeployProcess(deployPlatform);
                        } else {
                            hideLoading();
                            deploymentInProgress = false;
                            
                            addLog(\`❌ 云端部署失败: \${result.message}\`, 'error');
                            customAlert('云端部署失败: ' + result.message, '❌ 部署失败');
                        }
                    })
                    .catch(error => {
                        hideLoading();
                        deploymentInProgress = false;
                        
                        addLog(\`❌ 云端部署请求失败: \${error.message}\`, 'error');
                        customAlert('云端部署请求失败: ' + error.message, '❌ 网络错误');
                    });
                }
            })
            .catch(error => {
                hideLoading();
                deploymentInProgress = false;
                
                addLog(\`❌ 获取部署平台信息失败: \${error.message}\`, 'error');
                console.error('获取部署平台信息失败:', error);
                customAlert('获取部署平台信息失败: ' + error.message, '❌ 配置错误');
            });
    });
}

/* ========================================
   模拟云端部署过程
   ======================================== */
function simulateDeployProcess(platform) {
    let progress = 0;
    const progressBar = document.getElementById('progress-bar-top');
    progressBar.classList.add('active');
    progressBar.style.width = '0%';
    
    // 平滑的进度条动画
    const progressInterval = setInterval(() => {
        progress += Math.random() * 3;
        if (progress >= 95) {
            progress = 95;
            clearInterval(progressInterval);
        }
        progressBar.style.width = progress + '%';
    }, 300);

    const steps = [
        { 
            delay: 1000, 
            text: '📋 检查环境变量...', 
            detail: '验证配置文件完整性', 
            log: '✅ 配置文件验证通过',
            progress: 10
        },
        { 
            delay: 3000, 
            text: '☁️ 触发云端部署...', 
            detail: \`部署到 \${platform} 平台\`, 
            log: \`✅ \${platform} 云端部署已触发\`,
            progress: 25
        },
        { 
            delay: 8000, 
            text: '🔨 构建项目...', 
            detail: '编译代码和依赖', 
            log: '✅ 项目构建完成',
            progress: 50
        },
        { 
            delay: 6000, 
            text: '📦 部署更新...', 
            detail: '发布到生产环境', 
            log: '✅ 更新已成功部署',
            progress: 70
        },
        { 
            delay: 5000, 
            text: '🔄 服务重启...', 
            detail: '应用新配置', 
            log: '✅ 服务已成功重启',
            progress: 85
        },
        { 
            delay: 4000, 
            text: '🔍 健康检查...', 
            detail: '验证服务状态', 
            log: '✅ 所有服务运行正常',
            progress: 95
        },
    ];

    let totalDelay = 0;
    steps.forEach((step, index) => {
        totalDelay += step.delay;
        setTimeout(() => {
            updateLoadingText(step.text, step.detail);
            addLog(step.log, 'success');
            progressBar.style.width = step.progress + '%';
            
            // 添加脉冲效果
            const loadingContent = document.querySelector('.loading-content');
            if (loadingContent) {
                loadingContent.style.animation = 'pulse 0.6s ease-out';
                setTimeout(() => {
                    loadingContent.style.animation = '';
                }, 600);
            }
        }, totalDelay);
    });

    setTimeout(() => {
        checkDeploymentStatus();
    }, totalDelay + 2000);
}

/* ========================================
   检查部署状态
   ======================================== */
function checkDeploymentStatus() {
    updateLoadingText('🔍 检查服务状态...', '正在验证部署结果');
    addLog('🔍 正在检查服务状态...', 'info');
    
    let checkCount = 0;
    const maxChecks = 6;
    
    const checkInterval = setInterval(() => {
        checkCount++;
        updateLoadingText('🔍 检查服务状态...', \`第 \${checkCount}/\${maxChecks} 次检查\`);
        addLog(\`📡 服务检查中 - 第 \${checkCount} 次尝试\`, 'info');

        fetch(buildApiUrl('/api/logs'))
            .then(response => {
                if (response.ok || checkCount >= maxChecks) {
                    clearInterval(checkInterval);
                    
                    const progressBar = document.getElementById('progress-bar-top');
                    progressBar.style.width = '100%';
                    
                    updateLoadingText('✅ 部署完成！', '服务已重启并正常运行');
                    addLog('========================================', 'success');
                    addLog('🎉 部署成功！服务已重启，配置已生效', 'success');
                    addLog('========================================', 'success');
                    
                    setTimeout(() => {
                        hideLoading();
                        progressBar.classList.remove('active');
                        progressBar.style.width = '0%';
                        deploymentInProgress = false;
                        
                        showSuccessAnimation('部署成功');
                        
                        customAlert(
                            '🎉 部署成功！\\n\\n云端部署已完成\\n服务已重启\\n配置已生效',
                            '✅ 部署完成'
                        );
                    }, 2000);
                } else {
                    addLog(\`⏳ 服务检查中 - 状态码: \${response.status}\`, 'info');
                }
            })
            .catch(error => {
                if (checkCount >= maxChecks) {
                    clearInterval(checkInterval);
                    
                    const progressBar = document.getElementById('progress-bar-top');
                    progressBar.style.width = '100%';
                    
                    updateLoadingText('✅ 部署确认完成', '服务正在启动中');
                    addLog('========================================', 'warn');
                    addLog('⚠️ 部署已完成，服务可能需要几分钟启动', 'warn');
                    addLog('========================================', 'warn');
                    
                    setTimeout(() => {
                        hideLoading();
                        progressBar.classList.remove('active');
                        progressBar.style.width = '0%';
                        deploymentInProgress = false;
                        
                        showSuccessAnimation('部署已提交');
                        
                        customAlert(
                            '✅ 部署已提交！\\n\\n云端部署已完成\\n服务正在启动中\\n请稍候几分钟后刷新页面',
                            '⏳ 部署完成'
                        );
                    }, 2000);
                } else {
                    addLog(\`⏳ 服务检查中 - 连接失败，继续尝试\`, 'info');
                }
            });
    }, 5000);
}

/* ========================================
   显示成功动画
   ======================================== */
function showSuccessAnimation(message) {
    const successOverlay = document.createElement('div');
    successOverlay.className = 'success-overlay';
    successOverlay.innerHTML = \`
        <div class="success-content">
            <div class="success-icon">✅</div>
            <h3 class="success-message">\${message}</h3>
        </div>
    \`;
    
    const style = document.createElement('style');
    style.textContent = \`
        .success-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: successFadeIn 0.3s ease-out;
        }
        
        @keyframes successFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes successFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .success-content {
            text-align: center;
            animation: successBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes successBounce {
            0% {
                opacity: 0;
                transform: scale(0.3) translateY(100px);
            }
            50% {
                transform: scale(1.1) translateY(-10px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .success-icon {
            font-size: 8rem;
            margin-bottom: 1rem;
            filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.6));
            animation: successPulse 1s ease-in-out infinite;
        }
        
        @keyframes successPulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
        
        .success-message {
            color: white;
            font-size: 2rem;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }
    \`;
    
    document.head.appendChild(style);
    document.body.appendChild(successOverlay);
    
    setTimeout(() => {
        successOverlay.style.animation = 'successFadeOut 0.5s ease-out';
        setTimeout(() => {
            successOverlay.remove();
            style.remove();
        }, 500);
    }, 2000);
}

/* ========================================
   检查管理员令牌
   ======================================== */
function checkAdminToken() {
    const urlPath = window.location.pathname;
    const pathParts = urlPath.split('/').filter(part => part !== '');
    const urlToken = pathParts.length > 0 ? pathParts[0] : currentToken;
    
    return currentAdminToken && currentAdminToken.trim() !== '' && urlToken === currentAdminToken;
}

/* ========================================
   检查部署平台配置
   ======================================== */
async function checkDeployPlatformConfig() {
    if (!checkAdminToken()) {
        const protocol = window.location.protocol;
        const host = window.location.host;
        return { 
            success: false, 
            message: \`🔒 需要管理员权限！\\n\\n请先配置 ADMIN_TOKEN 环境变量并使用正确的 token 访问以启用系统管理功能。\\n\\n访问方式：\${protocol}//\${host}/{ADMIN_TOKEN}\`
        };
    }
    
    try {
        const response = await fetch(buildApiUrl('/api/config', true));
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        
        const config = await response.json();
        const deployPlatform = config.envs.deployPlatform || 'node';
        
        if (deployPlatform.toLowerCase() === 'node') {
            return { success: true, message: 'Node部署平台，仅需配置ADMIN_TOKEN' };
        }
        
        const missingVars = [];
        const deployPlatformProject = config.originalEnvVars.DEPLOY_PLATFROM_PROJECT;
        const deployPlatformToken = config.originalEnvVars.DEPLOY_PLATFROM_TOKEN;
        const deployPlatformAccount = config.originalEnvVars.DEPLOY_PLATFROM_ACCOUNT;
        
        if (!deployPlatformProject || deployPlatformProject.trim() === '') {
            missingVars.push('DEPLOY_PLATFROM_PROJECT');
        }
        
        if (!deployPlatformToken || deployPlatformToken.trim() === '') {
            missingVars.push('DEPLOY_PLATFROM_TOKEN');
        }
        
        if (deployPlatform.toLowerCase() === 'netlify' || deployPlatform.toLowerCase() === 'cloudflare') {
            if (!deployPlatformAccount || deployPlatformAccount.trim() === '') {
                missingVars.push('DEPLOY_PLATFROM_ACCOUNT');
            }
        }
        
        if (missingVars.length > 0) {
            const missingVarsStr = missingVars.join('、');
            return { 
                success: false, 
                message: \`⚙️ 配置不完整！\\n\\n部署平台为 \${deployPlatform}，请配置以下缺失的环境变量：\\n\\n\${missingVars.map(v => '• ' + v).join('\\n')}\`
            };
        }
        
        return { success: true, message: deployPlatform + '部署平台配置完整' };
    } catch (error) {
        console.error('检查部署平台配置失败:', error);
        return { 
            success: false, 
            message: \`❌ 检查配置失败\\n\\n\${error.message}\`
        };
    }
}

/* ========================================
   获取并设置配置信息
   ======================================== */
async function fetchAndSetConfig() {
    const config = await fetch(buildApiUrl('/api/config', true)).then(response => response.json());
    currentAdminToken = config.originalEnvVars?.ADMIN_TOKEN || '';
    
    // 更新模式指示器
    if (typeof updateModeIndicator === 'function') {
        updateModeIndicator();
    }
    
    return config;
}

/* ========================================
   检查并处理管理员令牌
   ======================================== */
function checkAndHandleAdminToken() {
    if (!checkAdminToken()) {
        const envNavBtn = document.getElementById('env-nav-btn');
        if (envNavBtn) {
            envNavBtn.title = '🔒 请先配置ADMIN_TOKEN并使用正确的admin token访问以启用系统管理功能';
        }
    }
}

/* ========================================
   渲染环境变量列表
   ======================================== */
function renderEnvList() {
    const list = document.getElementById('env-list');
    const items = envVariables[currentCategory] || [];

    if (items.length === 0) {
        list.innerHTML = \`
            <div class="env-empty-state">
                <div class="empty-icon">📋</div>
                <h3>暂无配置项</h3>
                <p>该类别下还没有配置项</p>
            </div>
        \`;
        return;
    }

    list.innerHTML = items.map((item, index) => {
        const typeLabel = item.type === 'boolean' ? 'bool' :
                         item.type === 'number' ? 'num' :
                         item.type === 'select' ? 'select' :
                         item.type === 'multi-select' ? 'multi' : 'text';
        const badgeClass = item.type === 'multi-select' ? 'multi' : '';

        return \`
            <div class="env-item" style="animation: fadeInUp 0.3s ease-out \${index * 0.05}s backwards;">
                <div class="env-info">
                    <div class="env-key">
                        <strong>\${item.key}</strong>
                        <span class="value-type-badge \${badgeClass}">\${typeLabel}</span>
                    </div>
                    <code class="env-value">\${escapeHtml(item.value)}</code>
                    <span class="env-desc">\${item.description || ''}</span>
                </div>
                <div class="env-actions">
                    <button class="btn btn-primary btn-sm" onclick="editEnv(\${index})" title="编辑">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        <span>编辑</span>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEnv(\${index})" title="删除">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        <span>删除</span>
                    </button>
                </div>
            </div>
        \`;
    }).join('');
}

/* ========================================
   编辑环境变量
   ======================================== */
function editEnv(index) {
    const item = envVariables[currentCategory][index];
    const editButton = event.target.closest('.btn');
    
    const originalText = editButton.innerHTML;
    editButton.innerHTML = '<span class="loading-spinner-small"></span>';
    editButton.disabled = true;
    
    editingKey = index;
    document.getElementById('modal-title').textContent = '✏️ 编辑配置项';
    document.getElementById('env-category').value = currentCategory;
    document.getElementById('env-key').value = item.key;
    document.getElementById('env-description').value = item.description || '';
    document.getElementById('value-type').value = item.type || 'text';

    document.getElementById('env-category').disabled = true;
    document.getElementById('env-key').readOnly = true;
    document.getElementById('value-type').disabled = true;
    document.getElementById('env-description').readOnly = true;

    renderValueInput(item);

    document.getElementById('env-modal').classList.add('active');
    
    editButton.innerHTML = originalText;
    editButton.disabled = false;
}

/* ========================================
   删除环境变量
   ======================================== */
function deleteEnv(index) {
    const item = envVariables[currentCategory][index];
    const key = item.key;
    
    customConfirm(
        \`确定要删除配置项 "\${key}" 吗？\\n\\n此操作不可恢复！\`,
        '🗑️ 删除确认'
    ).then(confirmed => {
        if (confirmed) {
            const deleteButton = event.target.closest('.btn');
            const originalText = deleteButton.innerHTML;
            deleteButton.innerHTML = '<span class="loading-spinner-small"></span>';
            deleteButton.disabled = true;

            addLog(\`🗑️ 开始删除配置项: \${key}\`, 'info');

            fetch(buildApiUrl('/api/env/del'), {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key })
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // 添加删除动画
                    const envItem = deleteButton.closest('.env-item');
                    envItem.style.animation = 'fadeOutRight 0.4s ease-out';
                    
                    setTimeout(() => {
                        envVariables[currentCategory].splice(index, 1);
                        renderEnvList();
                        renderPreview();
                        addLog(\`✅ 成功删除配置项: \${key}\`, 'success');
                    }, 400);
                } else {
                    deleteButton.innerHTML = originalText;
                    deleteButton.disabled = false;
                    addLog(\`❌ 删除配置项失败: \${result.message}\`, 'error');
                    customAlert('删除配置项失败: ' + result.message, '❌ 删除失败');
                }
            })
            .catch(error => {
                deleteButton.innerHTML = originalText;
                deleteButton.disabled = false;
                addLog(\`❌ 删除配置项失败: \${error.message}\`, 'error');
                customAlert('删除配置项失败: ' + error.message, '❌ 网络错误');
            });
        }
    });
}

/* ========================================
   添加淡出动画样式
   ======================================== */
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = \`
    @keyframes fadeOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes modalSlideOut {
        from {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        to {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
    }
\`;
document.head.appendChild(fadeOutStyle);

/* ========================================
   关闭模态框
   ======================================== */
function closeModal() {
    const modal = document.getElementById('env-modal');
    const modalContainer = modal.querySelector('.modal-container');
    
    if (modalContainer) {
        modalContainer.style.animation = 'modalSlideOut 0.3s ease-out';
        setTimeout(() => {
            modal.classList.remove('active');
            
            // 重置表单状态
            document.getElementById('env-category').disabled = false;
            document.getElementById('env-key').readOnly = false;
            document.getElementById('value-type').disabled = false;
            document.getElementById('env-description').readOnly = false;
        }, 300);
    } else {
        modal.classList.remove('active');
    }
}

/* ========================================
   加载遮罩控制
   ======================================== */
function showLoading(text, detail) {
    document.getElementById('loading-text').textContent = text;
    document.getElementById('loading-detail').textContent = detail;
    document.getElementById('loading-overlay').classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    const loadingContent = overlay.querySelector('.loading-content');
    
    if (loadingContent) {
        loadingContent.style.animation = 'modalSlideOut 0.3s ease-out';
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 300);
    } else {
        overlay.classList.remove('active');
    }
}

function updateLoadingText(text, detail) {
    const textElement = document.getElementById('loading-text');
    const detailElement = document.getElementById('loading-detail');
    
    // 添加更新动画
    textElement.style.animation = 'fadeIn 0.3s ease-out';
    detailElement.style.animation = 'fadeIn 0.3s ease-out';
    
    textElement.textContent = text;
    detailElement.textContent = detail;
}

/* ========================================
   表单提交
   ======================================== */
document.getElementById('env-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const category = document.getElementById('env-category').value;
    const key = document.getElementById('env-key').value.trim();
    const description = document.getElementById('env-description').value.trim();
    const type = document.getElementById('value-type').value;

    let value, itemData;

    if (type === 'boolean') {
        value = document.getElementById('bool-value').checked ? 'true' : 'false';
        itemData = { key, value, description, type };
    } else if (type === 'number') {
        value = document.getElementById('num-value').textContent;
        const min = parseInt(document.getElementById('num-slider').min);
        const max = parseInt(document.getElementById('num-slider').max);
        itemData = { key, value, description, type, min, max };
    } else if (type === 'select') {
        const selected = document.querySelector('.tag-option.selected');
        value = selected ? selected.dataset.value : '';
        const options = Array.from(document.querySelectorAll('.tag-option')).map(el => el.dataset.value);
        itemData = { key, value, description, type, options };
    } else if (type === 'multi-select') {
        const selectedTags = Array.from(document.querySelectorAll('.selected-tag'))
            .map(el => el.dataset.value);
        value = selectedTags.join(',');
        const options = Array.from(document.querySelectorAll('.available-tag')).map(el => el.dataset.value);
        itemData = { key, value, description, type, options };
    } else {
        value = document.getElementById('text-value').value.trim();
        itemData = { key, value, description, type };
    }

    // 显示保存中状态
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading-spinner-small"></span> <span>保存中...</span>';
    submitBtn.disabled = true;

    try {
        let response = await fetch(buildApiUrl('/api/env/set'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key, value })
        });

        let result = await response.json();

        if (!result.success) {
            response = await fetch(buildApiUrl('/api/env/add'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key, value })
            });

            result = await response.json();
        }

        if (result.success) {
            if (!envVariables[category]) {
                envVariables[category] = [];
            }

            if (editingKey !== null) {
                envVariables[currentCategory][editingKey] = itemData;
                addLog(\`✅ 更新配置项: \${key} = \${value}\`, 'success');
            } else {
                envVariables[category].push(itemData);
                addLog(\`✅ 添加配置项: \${key} = \${value}\`, 'success');
            }

            if (category !== currentCategory) {
                currentCategory = category;
                document.querySelectorAll('.tab-btn').forEach((btn, i) => {
                    btn.classList.toggle('active', ['api', 'source', 'match', 'danmu', 'cache', 'system'][i] === category);
                });
            }

            renderEnvList();
            renderPreview();
            
            // 成功动画
            submitBtn.innerHTML = '<span>✅</span> <span>保存成功!</span>';
            submitBtn.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                closeModal();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 1000);
        } else {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            addLog(\`❌ 操作失败: \${result.message}\`, 'error');
            customAlert('操作失败: ' + result.message, '❌ 保存失败');
        }
    } catch (error) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        addLog(\`❌ 更新环境变量失败: \${error.message}\`, 'error');
        customAlert('更新环境变量失败: ' + error.message, '❌ 网络错误');
    }
});

/* 值输入渲染函数保持不变 */
function renderValueInput(item) {
    const container = document.getElementById('value-input-container');
    const type = item ? item.type : document.getElementById('value-type').value;
    const value = item ? item.value : '';

    if (type === 'boolean') {
        const checked = value === 'true' || value === true;
        container.innerHTML = \`
            <label class="form-label">值</label>
            <div class="switch-container">
                <label class="switch">
                    <input type="checkbox" id="bool-value" \${checked ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
                <span class="switch-label" id="bool-label">\${checked ? '✅ 启用' : '⏸️ 禁用'}</span>
            </div>
        \`;

        document.getElementById('bool-value').addEventListener('change', function(e) {
            document.getElementById('bool-label').textContent = e.target.checked ? '✅ 启用' : '⏸️ 禁用';
        });

    } else if (type === 'number') {
        const min = item && item.min !== undefined ? item.min : 1;
        const max = item && item.max !== undefined ? item.max : 100;
        const currentValue = value || min;

        container.innerHTML = \`
            <label class="form-label">值 (\${min}-\${max})</label>
            <div class="number-picker">
                <div class="number-controls">
                    <button type="button" class="number-btn" onclick="adjustNumber(1)">▲</button>
                    <button type="button" class="number-btn" onclick="adjustNumber(-1)">▼</button>
                </div>
                <div class="number-display" id="num-value">\${currentValue}</div>
            </div>
            <div class="number-range">
                <input type="range" id="num-slider" min="\${min}" max="\${max}" value="\${currentValue}"
                       oninput="updateNumberDisplay(this.value)">
            </div>
        \`;

    } else if (type === 'select') {
        const options = item && item.options ? item.options : ['option1', 'option2', 'option3'];
        const optionsInput = item ? '' : \`
            <div class="form-group">
                <label class="form-label">可选项 (逗号分隔)</label>
                <input type="text" class="form-input" id="select-options" placeholder="例如: debug,info,warn,error"
                       value="\${options.join(',')}" onchange="updateTagOptions()">
            </div>
        \`;

        container.innerHTML = \`
            \${optionsInput}
            <label class="form-label">选择值</label>
            <div class="tag-selector" id="tag-selector">
                \${options.map(opt => \`
                    <div class="tag-option \${opt === value ? 'selected' : ''}"
                         data-value="\${opt}" onclick="selectTag(this)">
                        \${opt}
                    </div>
                \`).join('')}
            </div>
        \`;

    } else if (type === 'multi-select') {
        const options = item && item.options ? item.options : ['option1', 'option2', 'option3', 'option4'];
        const stringValue = typeof value === 'string' ? value : String(value || '');
        const selectedValues = stringValue ? stringValue.split(',').map(v => v.trim()).filter(v => v) : [];

        const optionsInput = item ? '' : \`
            <div class="form-group">
                <label class="form-label">可选项 (逗号分隔)</label>
                <input type="text" class="form-input" id="multi-options" placeholder="例如: auth,payment,analytics"
                       value="\${options.join(',')}" onchange="updateMultiOptions()">
            </div>
        \`;

        container.innerHTML = \`
            \${optionsInput}
            <label class="form-label">已选择 (拖动调整顺序)</label>
            <div class="multi-select-container">
                <div class="selected-tags \${selectedValues.length === 0 ? 'empty' : ''}" id="selected-tags">
                    \${selectedValues.map(val => \`
                        <div class="selected-tag" draggable="true" data-value="\${val}">
                            <span class="tag-text">\${val}</span>
                            <button type="button" class="remove-btn" onclick="removeSelectedTag(this)">×</button>
                        </div>
                    \`).join('')}
                </div>
                <label class="form-label">可选项 (点击添加)</label>
                <div class="available-tags" id="available-tags">
                    \${options.map(opt => {
                        const isSelected = selectedValues.includes(opt);
                        return \`
                            <div class="available-tag \${isSelected ? 'disabled' : ''}"
                                 data-value="\${opt}" onclick="addSelectedTag(this)">
                                \${opt}
                            </div>
                        \`;
                    }).join('')}
                </div>
            </div>
        \`;

        setupDragAndDrop();

    } else {
        if (value && value.length > 50) {
            const rows = Math.min(Math.max(Math.ceil(value.length / 50), 3), 10);
            container.innerHTML = \`
                <label class="form-label">变量值 *</label>
                <textarea class="form-textarea" id="text-value" placeholder="例如: localhost" rows="\${rows}">\${escapeHtml(value)}</textarea>
            \`;
        } else {
            container.innerHTML = \`
                <label class="form-label">变量值 *</label>
                <input type="text" class="form-input" id="text-value" placeholder="例如: localhost" value="\${escapeHtml(value)}" required>
            \`;
        }
    }
}

/* ========================================
   数字调整
   ======================================== */
function adjustNumber(delta) {
    const display = document.getElementById('num-value');
    const slider = document.getElementById('num-slider');
    let value = parseInt(display.textContent) + delta;

    value = Math.max(parseInt(slider.min), Math.min(parseInt(slider.max), value));

    display.textContent = value;
    slider.value = value;
}

function updateNumberDisplay(value) {
    document.getElementById('num-value').textContent = value;
}

/* ========================================
   标签选择
   ======================================== */
function selectTag(element) {
    document.querySelectorAll('.tag-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

function updateTagOptions() {
    const input = document.getElementById('select-options');
    const options = input.value.split(',').map(s => s.trim()).filter(s => s);
    const container = document.getElementById('tag-selector');

    container.innerHTML = options.map(opt => \`
        <div class="tag-option" data-value="\${opt}" onclick="selectTag(this)">
            \${opt}
        </div>
    \`).join('');
}

/* ========================================
   多选标签操作
   ======================================== */
function addSelectedTag(element) {
    if (element.classList.contains('disabled')) return;

    const value = element.dataset.value;
    const container = document.getElementById('selected-tags');

    container.classList.remove('empty');

    const tag = document.createElement('div');
    tag.className = 'selected-tag';
    tag.draggable = true;
    tag.dataset.value = value;
    tag.innerHTML = \`
        <span class="tag-text">\${value}</span>
        <button type="button" class="remove-btn" onclick="removeSelectedTag(this)">×</button>
    \`;

    container.appendChild(tag);

    element.classList.add('disabled');

    setupDragAndDrop();
}

function removeSelectedTag(button) {
    const tag = button.parentElement;
    const value = tag.dataset.value;
    const container = document.getElementById('selected-tags');

    tag.remove();

    if (container.children.length === 0) {
        container.classList.add('empty');
    }

    const availableTag = document.querySelector(\`.available-tag[data-value="\${value}"]\`);
    if (availableTag) {
        availableTag.classList.remove('disabled');
    }
}

function updateMultiOptions() {
    const input = document.getElementById('multi-options');
    const options = input.value.split(',').map(s => s.trim()).filter(s => s);
    const selectedValues = Array.from(document.querySelectorAll('.selected-tag'))
        .map(el => el.dataset.value);

    const container = document.getElementById('available-tags');
    container.innerHTML = options.map(opt => {
        const isSelected = selectedValues.includes(opt);
        return \`
            <div class="available-tag \${isSelected ? 'disabled' : ''}"
                 data-value="\${opt}" onclick="addSelectedTag(this)">
                \${opt}
            </div>
        \`;
    }).join('');
}

/* ========================================
   拖放功能
   ======================================== */
let draggedElement = null;

function setupDragAndDrop() {
    const container = document.getElementById('selected-tags');
    if (!container) return;
    
    const tags = container.querySelectorAll('.selected-tag');

    tags.forEach(tag => {
        tag.addEventListener('dragstart', handleDragStart);
        tag.addEventListener('dragend', handleDragEnd);
        tag.addEventListener('dragover', handleDragOver);
        tag.addEventListener('drop', handleDrop);
        tag.addEventListener('dragenter', handleDragEnter);
        tag.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.selected-tag').forEach(tag => {
        tag.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (draggedElement !== this) {
        const container = document.getElementById('selected-tags');
        const allTags = Array.from(container.querySelectorAll('.selected-tag'));
        const draggedIndex = allTags.indexOf(draggedElement);
        const targetIndex = allTags.indexOf(this);

        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
    }

    this.classList.remove('drag-over');
    return false;
}

/* ========================================
   移动端环境变量列表渲染增强
   ======================================== */
const originalRenderEnvList = renderEnvList;
renderEnvList = function() {
    originalRenderEnvList();
    
    // 移动端优化:为长文本添加展开/收起功能
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.env-value').forEach(valueEl => {
            if (valueEl.textContent.length > 100) {
                valueEl.style.maxHeight = '3em';
                valueEl.style.overflow = 'hidden';
                valueEl.style.cursor = 'pointer';
                valueEl.title = '点击查看完整内容';
                
                valueEl.addEventListener('click', function() {
                    if (this.style.maxHeight === '3em') {
                        this.style.maxHeight = 'none';
                        this.style.overflow = 'auto';
                    } else {
                        this.style.maxHeight = '3em';
                        this.style.overflow = 'hidden';
                    }
                });
            }
        });
    }
};
`;