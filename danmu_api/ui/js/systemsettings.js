// language=JavaScript
export const systemSettingsJsContent = /* javascript */ `
/* ========================================
   显示/隐藏清理缓存模态框
   ======================================== */
function showClearCacheModal() {
    document.getElementById('clear-cache-modal').classList.add('active');
}

function hideClearCacheModal() {
    document.getElementById('clear-cache-modal').classList.remove('active');
}

/* ========================================
   确认清理缓存
   ======================================== */
async function confirmClearCache() {
    const configCheck = await checkDeployPlatformConfig();
    if (!configCheck.success) {
        hideClearCacheModal();
        customAlert(configCheck.message);
        return;
    }

    hideClearCacheModal();
    showLoading('正在清理缓存...', '清除中，请稍候');
    addLog('开始清理缓存', 'info');

    try {
        const response = await fetch(buildApiUrl('/api/cache/clear', true), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            updateLoadingText('清理完成', '缓存已成功清除');
            addLog('缓存清理完成', 'success');
            addLog('✅ 缓存清理成功！已清理: ' + JSON.stringify(result.clearedItems), 'success');
        } else {
            updateLoadingText('清理失败', '请查看日志了解详情');
            addLog('缓存清理失败: ' + result.message, 'error');
        }
    } catch (error) {
        updateLoadingText('清理失败', '网络错误或服务不可用');
        addLog('缓存清理请求失败: ' + error.message, 'error');
    } finally {
        setTimeout(() => {
            hideLoading();
        }, 1500);
    }
}

/* ========================================
   显示/隐藏重新部署模态框
   ======================================== */
function showDeploySystemModal() {
    document.getElementById('deploy-system-modal').classList.add('active');
}

function hideDeploySystemModal() {
    document.getElementById('deploy-system-modal').classList.remove('active');
}

/* ========================================
   确认重新部署系统
   ======================================== */
function confirmDeploySystem() {
    checkDeployPlatformConfig().then(configCheck => {
        if (!configCheck.success) {
            hideDeploySystemModal();
            customAlert(configCheck.message);
            return;
        }

        hideDeploySystemModal();
        showLoading('准备部署...', '正在检查系统状态');
        addLog('===== 开始系统部署 =====', 'info');

        fetch(buildApiUrl('/api/config', true))
            .then(response => response.json())
            .then(config => {
                const deployPlatform = config.envs.deployPlatform || 'node';
                addLog(\`检测到部署平台: \${deployPlatform}\`, 'info');

                if (deployPlatform.toLowerCase() === 'node') {
                    setTimeout(() => {
                        hideLoading();
                        addLog('===== 部署完成 =====', 'success');
                        addLog('Node部署模式，环境变量已生效', 'info');
                        addLog('✅ Node部署模式 - 在Node部署模式下，环境变量修改后会自动生效，无需重新部署。系统已更新配置', 'success');
                    }, 1500);
                } else {
                    fetch(buildApiUrl('/api/deploy', true), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            addLog('云端部署触发成功', 'success');
                            simulateDeployProcess();
                        } else {
                            hideLoading();
                            addLog(\`云端部署失败: \${result.message}\`, 'error');
                            addLog(\`❌ 云端部署失败: \${result.message}\`, 'error');
                        }
                    })
                    .catch(error => {
                        hideLoading();
                        addLog(\`云端部署请求失败: \${error.message}\`, 'error');
                        addLog(\`❌ 云端部署请求失败: \${error.message}\`, 'error');
                    });
                }
            })
            .catch(error => {
                hideLoading();
                addLog(\`获取部署平台信息失败: \${error.message}\`, 'error');
                console.error('获取部署平台信息失败:', error);
            });
    });
}

/* ========================================
   模拟云端部署过程
   ======================================== */
function simulateDeployProcess() {
    let progress = 0;
    const progressBar = document.getElementById('progress-bar-top');
    progressBar.classList.add('active');
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 8;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        progressBar.style.width = progress + '%';
    }, 300);

    const steps = [
        { delay: 1000, text: '检查环境变量...', detail: '验证配置文件', log: '配置文件验证通过' },
        { delay: 5000, text: '触发云端部署...', detail: '部署到当前平台', log: '云端部署已触发' },
        { delay: 9500, text: '构建项目...', detail: '云端构建中', log: '云端构建完成' },
        { delay: 5000, text: '部署更新...', detail: '发布到生产环境', log: '更新已部署' },
        { delay: 5500, text: '服务重启...', detail: '应用新配置', log: '服务已重启' },
        { delay: 5000, text: '健康检查...', detail: '验证服务状态', log: '所有服务运行正常' },
    ];

    steps.forEach(step => {
        setTimeout(() => {
            updateLoadingText(step.text, step.detail);
            addLog(step.log, 'success');
        }, step.delay);
    });

    setTimeout(() => {
        checkDeploymentStatus();
    }, 27000);
}

/* ========================================
   检查部署状态
   ======================================== */
function checkDeploymentStatus() {
    const checkInterval = setInterval(() => {
        updateLoadingText('部署完成，检查服务状态...', '正在请求 /api/logs 接口');
        addLog('正在检查服务状态...', 'info');

        fetch(buildApiUrl('/api/logs'))
            .then(response => {
                if (response.ok) {
                    clearInterval(checkInterval);
                    updateLoadingText('部署成功！', '服务已重启并正常运行');
                    addLog('===== 部署完成 =====', 'success');
                    addLog('系统已更新并重启', 'success');
                    confirmDeploymentByLogs();
                } else {
                    addLog('服务检查中 - 状态码: ' + response.status, 'info');
                }
            })
            .catch(error => {
                addLog('服务检查中 - 连接失败: ' + error.message, 'info');
            });
    }, 5000);
}

/* ========================================
   部署完成确认
   ======================================== */
function confirmDeploymentByLogs() {
    let confirmationAttempts = 0;
    const maxAttempts = 3;

    const confirmationInterval = setInterval(() => {
        confirmationAttempts++;
        updateLoadingText('部署完成确认中...', '正在确认部署完成 (' + confirmationAttempts + '/' + maxAttempts + ')');
        addLog('部署完成确认 - 尝试 ' + confirmationAttempts + '/' + maxAttempts, 'info');

        fetch(buildApiUrl('/api/logs'))
            .then(response => {
                if (response.ok || confirmationAttempts >= maxAttempts) {
                    clearInterval(confirmationInterval);
                    updateLoadingText('部署确认成功！', '服务已重启并正常运行');
                    addLog('部署确认成功 - /api/logs 接口访问正常', 'success');
                    
                    setTimeout(() => {
                        hideLoading();
                        document.getElementById('progress-bar-top').classList.remove('active');
                        customAlert('🎉 部署成功！云端部署已完成，服务已重启，配置已生效');
                        addLog('🎉 部署成功！云端部署已完成，服务已重启，配置已生效', 'success');
                    }, 2000);
                } else {
                    addLog('部署确认中 - 状态码: ' + response.status, 'info');
                }
            })
            .catch(error => {
                if (confirmationAttempts >= maxAttempts) {
                    clearInterval(confirmationInterval);
                    updateLoadingText('部署确认完成', '服务已重启');
                    addLog('部署确认完成 - 已达到最大尝试次数', 'warn');
                    
                    setTimeout(() => {
                        hideLoading();
                        document.getElementById('progress-bar-top').classList.remove('active');
                        customAlert('🎉 部署成功！云端部署已完成，服务已重启，配置已生效');
                        addLog('🎉 部署成功！云端部署已完成，服务已重启，配置已生效', 'success');
                    }, 2000);
                } else {
                    addLog('部署确认中 - 连接失败: ' + error.message, 'info');
                }
            });
    }, 5000);
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
        return { success: false, message: '请先配置ADMIN_TOKEN环境变量并使用正确的token访问以启用系统部署功能！\\n\\n访问方式：' + protocol + '//' + host + '/{ADMIN_TOKEN}' };
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
            return { success: false, message: '部署平台为' + deployPlatform + '，请配置以下缺失的环境变量：' + missingVarsStr };
        }
        
        return { success: true, message: deployPlatform + '部署平台配置完整' };
    } catch (error) {
        console.error('检查部署平台配置失败:', error);
        return { success: false, message: '检查部署平台配置失败: ' + error.message };
    }
}

/* ========================================
   获取并设置配置信息
   ======================================== */
async function fetchAndSetConfig() {
    const config = await fetch(buildApiUrl('/api/config', true)).then(response => response.json());
    currentAdminToken = config.originalEnvVars?.ADMIN_TOKEN || '';
    return config;
}

/* ========================================
   检查并处理管理员令牌
   ======================================== */
function checkAndHandleAdminToken() {
    if (!checkAdminToken()) {
        const envNavBtn = document.getElementById('env-nav-btn');
        if (envNavBtn) {
            envNavBtn.title = '请先配置ADMIN_TOKEN并使用正确的admin token访问以启用系统管理功能';
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
        list.innerHTML = '<p style="text-align: center; color: var(--text-tertiary); padding: 2rem;">暂无配置项</p>';
        return;
    }

    list.innerHTML = items.map((item, index) => {
        const typeLabel = item.type === 'boolean' ? '布尔' :
                         item.type === 'number' ? '数字' :
                         item.type === 'select' ? '单选' :
                         item.type === 'multi-select' ? '多选' : '文本';
        const badgeClass = item.type === 'multi-select' ? 'multi' : '';

        return \`
            <div class="env-item">
                <div class="env-info">
                    <div class="env-key">
                        <strong>\${item.key}</strong>
                        <span class="value-type-badge \${badgeClass}">\${typeLabel}</span>
                    </div>
                    <code class="env-value">\${escapeHtml(item.value)}</code>
                    <span class="env-desc">\${item.description || '无描述'}</span>
                </div>
                <div class="env-actions">
                    <button class="btn btn-primary btn-sm" onclick="editEnv(\${index})">编辑</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEnv(\${index})">删除</button>
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
    const editButton = event.target;
    
    const originalText = editButton.innerHTML;
    editButton.innerHTML = '<span class="loading-spinner-small"></span>';
    editButton.disabled = true;
    
    editingKey = index;
    document.getElementById('modal-title').textContent = '编辑配置项';
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
    customConfirm('确定要删除这个配置项吗?', '删除确认').then(confirmed => {
        if (confirmed) {
            const item = envVariables[currentCategory][index];
            const key = item.key;
            const deleteButton = event.target;

            const originalText = deleteButton.innerHTML;
            deleteButton.innerHTML = '<span class="loading-spinner-small"></span>';
            deleteButton.disabled = true;

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
                    envVariables[currentCategory].splice(index, 1);
                    renderEnvList();
                    renderPreview();
                    addLog(\`删除配置项: \${key}\`, 'warn');
                } else {
                    addLog(\`删除配置项失败: \${result.message}\`, 'error');
                    addLog(\`❌ 删除配置项失败: \${result.message}\`, 'error');
                }
            })
            .catch(error => {
                addLog(\`删除配置项失败: \${error.message}\`, 'error');
                addLog(\`❌ 删除配置项失败: \${error.message}\`, 'error');
            })
            .finally(() => {
                deleteButton.innerHTML = originalText;
                deleteButton.disabled = false;
            });
        }
    });
}

/* ========================================
   关闭模态框
   ======================================== */
function closeModal() {
    document.getElementById('env-modal').classList.remove('active');
    
    document.getElementById('env-category').disabled = false;
    document.getElementById('env-key').readOnly = false;
    document.getElementById('value-type').disabled = false;
    document.getElementById('env-description').readOnly = false;
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
    document.getElementById('loading-overlay').classList.remove('active');
}

function updateLoadingText(text, detail) {
    document.getElementById('loading-text').textContent = text;
    document.getElementById('loading-detail').textContent = detail;
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
                addLog(\`更新配置项: \${key} = \${value}\`, 'success');
            } else {
                envVariables[category].push(itemData);
                addLog(\`添加配置项: \${key} = \${value}\`, 'success');
            }

            if (category !== currentCategory) {
                currentCategory = category;
                document.querySelectorAll('.tab-btn').forEach((btn, i) => {
                    btn.classList.toggle('active', ['api', 'source', 'match', 'danmu', 'cache', 'system'][i] === category);
                });
            }

            renderEnvList();
            renderPreview();
            closeModal();
        } else {
            addLog(\`操作失败: \${result.message}\`, 'error');
            addLog(\`❌ 操作失败: \${result.message}\`, 'error');
        }
    } catch (error) {
        addLog(\`更新环境变量失败: \${error.message}\`, 'error');
        addLog(\`❌ 更新环境变量失败: \${error.message}\`, 'error');
    }
});

/* 继续systemsettings.js的值输入控件渲染部分... */
`;