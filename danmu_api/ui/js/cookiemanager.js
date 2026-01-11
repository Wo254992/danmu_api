// language=JavaScript
export const cookieManagerJsContent = /* javascript */ `
/* ========================================
   Bilibili Cookie 管理功能
   ======================================== */

let qrCheckInterval = null;
let currentQRKey = null;
let cookieData = null;

/* ========================================
   检查 Cookie 状态
   ======================================== */
async function checkCookieStatus() {
    try {
        const response = await fetch(buildApiUrl('/api/cookie/status', true));
        const result = await response.json();
        
        if (result.success && result.data) {
            cookieData = result.data;
            updateCookieUI(result.data);
            
            // 如果有有效的 Cookie，显示刷新按钮
            const refreshBtn = document.getElementById('refresh-cookie-btn');
            if (refreshBtn && result.data.isValid) {
                refreshBtn.style.display = 'inline-flex';
            }
        } else {
            updateCookieUI(null);
        }
    } catch (error) {
        console.error('检查 Cookie 状态失败:', error);
        addLog('❌ 检查 Cookie 状态失败: ' + error.message, 'error');
    }
}

/* ========================================
   更新 Cookie UI 显示
   ======================================== */
function updateCookieUI(data) {
    const statusIcon = document.getElementById('cookie-status-icon');
    const statusTitle = document.getElementById('cookie-status-title');
    const statusSubtitle = document.getElementById('cookie-status-subtitle');
    const statusText = document.getElementById('cookie-status-text');
    const unameEl = document.getElementById('bili-uname');
    const expireTimeEl = document.getElementById('cookie-expire-time');
    const detailCard = document.getElementById('cookie-detail-card');
    
    if (data && data.isValid) {
        // 已登录状态
        if (statusIcon) {
            statusIcon.innerHTML = \`
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            \`;
            statusIcon.style.background = 'var(--gradient-success)';
        }
        
        if (statusTitle) statusTitle.textContent = '已登录';
        if (statusSubtitle) statusSubtitle.textContent = '✓ Cookie 有效';
        if (statusText) statusText.textContent = '有效';
        if (unameEl) unameEl.textContent = data.uname || '--';
        
        // 显示过期时间
        if (expireTimeEl && data.expiresAt) {
            const expireDate = new Date(data.expiresAt * 1000);
            const now = new Date();
            const daysLeft = Math.floor((expireDate - now) / (1000 * 60 * 60 * 24));
            expireTimeEl.textContent = daysLeft + ' 天后';
            
            if (daysLeft < 7) {
                expireTimeEl.style.color = 'var(--warning-color)';
            } else if (daysLeft < 3) {
                expireTimeEl.style.color = 'var(--danger-color)';
            } else {
                expireTimeEl.style.color = '';
            }
        }
        
        // 显示详细信息
        if (detailCard) {
            detailCard.style.display = 'block';
            document.getElementById('cookie-sessdata').textContent = data.sessdata || '--';
            document.getElementById('cookie-bili-jct').textContent = data.bili_jct || '--';
            document.getElementById('cookie-full').textContent = data.fullCookie || '--';
        }
        
        addLog('✅ Cookie 状态：有效 (用户: ' + (data.uname || '未知') + ')', 'success');
    } else {
        // 未登录状态
        if (statusIcon) {
            statusIcon.innerHTML = \`
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
            \`;
            statusIcon.style.background = 'var(--gradient-danger)';
        }
        
        if (statusTitle) statusTitle.textContent = '未登录';
        if (statusSubtitle) statusSubtitle.textContent = '请扫码登录获取 Cookie';
        if (statusText) statusText.textContent = '未获取';
        if (unameEl) unameEl.textContent = '--';
        if (expireTimeEl) expireTimeEl.textContent = '--';
        
        if (detailCard) {
            detailCard.style.display = 'none';
        }
        
        addLog('ℹ️ Cookie 状态：未登录', 'info');
    }
}

/* ========================================
   开始二维码登录
   ======================================== */
async function startQRLogin() {
    const modal = document.getElementById('qr-login-modal');
    const qrCode = document.getElementById('qr-code');
    const qrLoading = document.getElementById('qr-loading');
    const qrStatusText = document.getElementById('qr-status-text');
    const qrHint = document.getElementById('qr-hint');
    
    if (!modal) return;
    
    // 显示模态框
    modal.classList.add('active');
    
    // 重置状态
    qrCode.style.display = 'none';
    qrCode.innerHTML = '';
    qrLoading.style.display = 'block';
    qrStatusText.textContent = '正在生成二维码...';
    qrHint.style.display = 'none';
    
    if (qrCheckInterval) {
        clearInterval(qrCheckInterval);
        qrCheckInterval = null;
    }
    
    addLog('🔐 开始获取登录二维码...', 'info');
    
    try {
        // 获取二维码
        const response = await fetch(buildApiUrl('/api/cookie/qr/generate', true), {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
            currentQRKey = result.data.qrcode_key;
            const qrUrl = result.data.url;
            
            // 使用第三方服务生成二维码图片
            qrCode.innerHTML = '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(qrUrl) + '" alt="二维码" style="max-width: 200px;">';
            qrCode.style.display = 'block';
            qrLoading.style.display = 'none';
            qrStatusText.textContent = '请使用 Bilibili APP 扫描二维码';
            qrHint.style.display = 'block';
            
            addLog('✅ 二维码生成成功，等待扫码...', 'success');
            
            // 开始轮询检查扫码状态
            checkQRStatus();
        } else {
            throw new Error(result.message || '生成二维码失败');
        }
    } catch (error) {
        qrLoading.style.display = 'none';
        qrStatusText.textContent = '❌ 生成二维码失败: ' + error.message;
        qrStatusText.style.color = 'var(--danger-color)';
        addLog('❌ 生成二维码失败: ' + error.message, 'error');
    }
}

/* ========================================
   检查二维码扫码状态
   ======================================== */
async function checkQRStatus() {
    if (!currentQRKey) return;
    
    const qrStatusText = document.getElementById('qr-status-text');
    
    // 每隔 2 秒检查一次
    qrCheckInterval = setInterval(async () => {
        try {
            const response = await fetch(buildApiUrl('/api/cookie/qr/check', true), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    qrcode_key: currentQRKey
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                const code = result.data.code;
                
                switch (code) {
                    case 86101:
                        qrStatusText.textContent = '等待扫码...';
                        qrStatusText.style.color = 'var(--text-secondary)';
                        break;
                    case 86090:
                        qrStatusText.textContent = '✓ 已扫码，等待确认...';
                        qrStatusText.style.color = 'var(--warning-color)';
                        addLog('📱 用户已扫码，等待确认...', 'info');
                        break;
                    case 86038:
                        qrStatusText.textContent = '❌ 二维码已过期';
                        qrStatusText.style.color = 'var(--danger-color)';
                        clearInterval(qrCheckInterval);
                        qrCheckInterval = null;
                        addLog('⏱️ 二维码已过期，请重新生成', 'warn');
                        setTimeout(() => {
                            closeQRLoginModal();
                        }, 2000);
                        break;
                    case 0:
                        // 登录成功
                        qrStatusText.textContent = '✅ 登录成功！';
                        qrStatusText.style.color = 'var(--success-color)';
                        clearInterval(qrCheckInterval);
                        qrCheckInterval = null;
                        
                        addLog('🎉 登录成功！正在保存 Cookie...', 'success');
                        
                        // 保存 Cookie
                        await saveCookieData(result.data);
                        
                        setTimeout(() => {
                            closeQRLoginModal();
                            checkCookieStatus();
                            showSuccessAnimation('登录成功');
                        }, 1500);
                        break;
                    default:
                        qrStatusText.textContent = '未知状态: ' + code;
                        qrStatusText.style.color = 'var(--text-secondary)';
                }
            }
        } catch (error) {
            console.error('检查二维码状态失败:', error);
        }
    }, 2000);
}

/* ========================================
   保存 Cookie 数据
   ======================================== */
async function saveCookieData(data) {
    try {
        const response = await fetch(buildApiUrl('/api/cookie/save', true), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            addLog('✅ Cookie 保存成功', 'success');
        } else {
            throw new Error(result.message || 'Cookie 保存失败');
        }
    } catch (error) {
        console.error('保存 Cookie 失败:', error);
        addLog('❌ 保存 Cookie 失败: ' + error.message, 'error');
        customAlert('保存 Cookie 失败: ' + error.message, '❌ 操作失败');
    }
}

/* ========================================
   关闭二维码登录模态框
   ======================================== */
function closeQRLoginModal() {
    const modal = document.getElementById('qr-login-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    if (qrCheckInterval) {
        clearInterval(qrCheckInterval);
        qrCheckInterval = null;
    }
    
    currentQRKey = null;
}

/* ========================================
   刷新 Cookie
   ======================================== */
async function refreshCookie() {
    if (!cookieData || !cookieData.refresh_token) {
        customAlert('没有可刷新的 Cookie 数据', '⚠️ 提示');
        return;
    }
    
    const confirmed = await customConfirm(
        '确定要刷新 Cookie 吗？\\n\\n这将使用 refresh_token 获取新的 Cookie',
        '🔄 确认刷新'
    );
    
    if (!confirmed) return;
    
    showLoading('🔄 刷新 Cookie...', '正在请求新的 Cookie');
    addLog('🔄 开始刷新 Cookie...', 'info');
    
    try {
        const response = await fetch(buildApiUrl('/api/cookie/refresh', true), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh_token: cookieData.refresh_token
            })
        });
        
        const result = await response.json();
        
        hideLoading();
        
        if (result.success) {
            addLog('✅ Cookie 刷新成功', 'success');
            showSuccessAnimation('Cookie 刷新成功');
            checkCookieStatus();
        } else {
            throw new Error(result.message || 'Cookie 刷新失败');
        }
    } catch (error) {
        hideLoading();
        console.error('刷新 Cookie 失败:', error);
        addLog('❌ 刷新 Cookie 失败: ' + error.message, 'error');
        customAlert('刷新 Cookie 失败: ' + error.message, '❌ 操作失败');
    }
}

/* ========================================
   清除 Cookie 数据
   ======================================== */
async function clearCookieData() {
    const confirmed = await customConfirm(
        '确定要清除 Cookie 数据吗？\\n\\n此操作不可恢复，清除后需要重新登录',
        '🗑️ 确认清除'
    );
    
    if (!confirmed) return;
    
    showLoading('🗑️ 清除 Cookie...', '正在删除 Cookie 数据');
    addLog('🗑️ 开始清除 Cookie...', 'info');
    
    try {
        const response = await fetch(buildApiUrl('/api/cookie/clear', true), {
            method: 'POST'
        });
        
        const result = await response.json();
        
        hideLoading();
        
        if (result.success) {
            cookieData = null;
            addLog('✅ Cookie 已清除', 'success');
            showSuccessAnimation('Cookie 已清除');
            updateCookieUI(null);
            
            const refreshBtn = document.getElementById('refresh-cookie-btn');
            if (refreshBtn) {
                refreshBtn.style.display = 'none';
            }
        } else {
            throw new Error(result.message || 'Cookie 清除失败');
        }
    } catch (error) {
        hideLoading();
        console.error('清除 Cookie 失败:', error);
        addLog('❌ 清除 Cookie 失败: ' + error.message, 'error');
        customAlert('清除 Cookie 失败: ' + error.message, '❌ 操作失败');
    }
}

/* ========================================
   复制 Cookie 值
   ======================================== */
function copyCookieValue(type) {
    let value = '';
    let label = '';
    
    switch (type) {
        case 'sessdata':
            value = document.getElementById('cookie-sessdata').textContent;
            label = 'SESSDATA';
            break;
        case 'bili_jct':
            value = document.getElementById('cookie-bili-jct').textContent;
            label = 'bili_jct';
            break;
        case 'full':
            value = document.getElementById('cookie-full').textContent;
            label = '完整 Cookie';
            break;
    }
    
    if (!value || value === '--') {
        customAlert('没有可复制的内容', '⚠️ 提示');
        return;
    }
    
    navigator.clipboard.writeText(value)
        .then(() => {
            addLog('✅ ' + label + ' 已复制到剪贴板', 'success');
            showSuccessAnimation('复制成功');
        })
        .catch(err => {
            console.error('复制失败:', err);
            customAlert('复制失败: ' + err, '❌ 操作失败');
        });
}

/* ========================================
   初始化 Cookie 管理页面
   ======================================== */
function initCookieManager() {
    // 页面加载时检查 Cookie 状态
    checkCookieStatus();
    
    addLog('🍪 Cookie 管理模块已初始化', 'info');
}
`;