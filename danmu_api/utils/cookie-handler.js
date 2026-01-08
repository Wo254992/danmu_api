/**
 * Cookie 管理处理模块
 * 提供 B站 Cookie 的状态查询、二维码登录、保存和清除功能
 */
import { jsonResponse } from './http-util.js';
import { log } from './log-util.js';
import { Globals } from '../configs/globals.js';
import { Envs } from '../configs/envs.js';

// 存储二维码登录会话（内存存储）
const qrLoginSessions = new Map();

/**
 * 保存Cookie到内存和环境变量
 * @param {string} cookie Cookie字符串
 */
function saveCookieToGlobals(cookie) {
    try {
        // 方法1: 直接修改 Globals.envs 对象
        if (Globals.envs) {
            Globals.envs.bilibliCookie = cookie;
            log("info", `Cookie已保存到 Globals.envs.bilibliCookie`);
        }
        
        // 方法2: 同时更新 Envs 类的静态 env 对象
        if (Envs.env) {
            Envs.env.BILIBILI_COOKIE = cookie;
        }
        
        // 方法3: 如果是 Node.js 环境，也更新 process.env
        if (typeof process !== 'undefined' && process.env) {
            process.env.BILIBILI_COOKIE = cookie;
        }
        
        // 更新 Envs 的 accessedEnvVars（用于UI显示）
        if (Envs.accessedEnvVars && typeof Envs.accessedEnvVars.set === 'function') {
            Envs.accessedEnvVars.set('BILIBILI_COOKIE', cookie ? '********' : '');
        }
        
        // 更新 Envs 的 originalEnvVars
        if (Envs.originalEnvVars && typeof Envs.originalEnvVars.set === 'function') {
            Envs.originalEnvVars.set('BILIBILI_COOKIE', cookie);
        }
        
        log("info", `Cookie保存完成，长度: ${cookie ? cookie.length : 0}`);
    } catch (err) {
        log("error", `保存Cookie到Globals失败: ${err.message}`);
    }
}

/**
 * 从多个位置获取Cookie
 * @returns {string} Cookie字符串
 */
function getCookieFromGlobals() {
    // 1. 从 Globals.envs 获取
    if (Globals.envs && Globals.envs.bilibliCookie) {
        return Globals.envs.bilibliCookie;
    }
    // 2. 从 Envs.env 获取
    if (Envs.env && Envs.env.BILIBILI_COOKIE) {
        return Envs.env.BILIBILI_COOKIE;
    }
    // 3. 从 process.env 获取 (Node.js)
    if (typeof process !== 'undefined' && process.env && process.env.BILIBILI_COOKIE) {
        return process.env.BILIBILI_COOKIE;
    }
    // 4. 尝试通过 Globals.getConfig() 获取
    try {
        const config = Globals.getConfig();
        if (config && config.bilibliCookie) {
            return config.bilibliCookie;
        }
    } catch (e) {
        // ignore
    }
    return '';
}

/**
 * 标准化 Cookie 字符串
 * 处理可能的编码问题和格式问题
 * @param {string} cookie 原始Cookie字符串
 * @returns {string} 标准化后的Cookie字符串
 */
function normalizeCookie(cookie) {
    if (!cookie) return '';
    
    try {
        // 去除首尾空白
        let normalized = cookie.trim();
        
        // 如果整个 cookie 被 URL 编码过，先解码
        if (normalized.includes('%3D') || normalized.includes('%3B')) {
            try {
                normalized = decodeURIComponent(normalized);
            } catch (e) {
                // 解码失败，保持原样
            }
        }
        
        // 标准化分号和空格
        // 将多个空格替换为单个空格
        normalized = normalized.replace(/\s+/g, ' ');
        
        // 确保分号后有空格（标准 Cookie 格式）
        normalized = normalized.replace(/;\s*/g, '; ').trim();
        
        // 移除末尾的分号
        if (normalized.endsWith(';')) {
            normalized = normalized.slice(0, -1).trim();
        }
        
        return normalized;
    } catch (e) {
        return cookie;
    }
}

/**
 * 验证 Cookie 有效性（核心验证函数）
 * @param {string} cookie Cookie字符串
 * @returns {Promise<{isValid: boolean, data?: object, error?: string}>}
 */
async function verifyCookieValidity(cookie) {
    if (!cookie) {
        return { isValid: false, error: '缺少Cookie' };
    }
    
    // 标准化 Cookie
    const normalizedCookie = normalizeCookie(cookie);
    
    // 基本格式检查
    if (!normalizedCookie.includes('SESSDATA') || !normalizedCookie.includes('bili_jct')) {
        return { isValid: false, error: 'Cookie格式不完整，需包含SESSDATA和bili_jct' };
    }
    
    try {
        const response = await fetch('https://api.bilibili.com/x/web-interface/nav', {
            method: 'GET',
            headers: {
                'Cookie': normalizedCookie,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.bilibili.com/',
                'Origin': 'https://www.bilibili.com',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
            }
        });
        
        const data = await response.json();
        
        log("info", `Cookie验证响应: code=${data.code}, isLogin=${data.data?.isLogin}`);
        
        if (data.code === 0 && data.data && data.data.isLogin) {
            return {
                isValid: true,
                data: {
                    uname: data.data.uname,
                    mid: data.data.mid,
                    face: data.data.face,
                    level_info: data.data.level_info,
                    vipStatus: data.data.vipStatus,
                    isLogin: true
                }
            };
        } else {
            return {
                isValid: false,
                error: data.message || 'Cookie无效或已过期',
                code: data.code
            };
        }
    } catch (error) {
        log("error", `验证Cookie请求失败: ${error.message}`);
        return { isValid: false, error: '验证请求失败: ' + error.message };
    }
}

/**
 * 获取Cookie状态
 */
export async function handleCookieStatus() {
    try {
        const cookie = getCookieFromGlobals();
        
        log("info", `检查Cookie状态，Cookie长度: ${cookie ? cookie.length : 0}`);
        
        if (!cookie) {
            return jsonResponse({
                success: true,
                data: {
                    isValid: false,
                    uname: null,
                    expiresAt: null
                }
            });
        }

        // 验证Cookie有效性
        const verifyResult = await verifyCookieValidity(cookie);
        
        if (verifyResult.isValid && verifyResult.data) {
            // 解析Cookie获取各个字段
            const sessdataMatch = cookie.match(/SESSDATA=([^;]+)/);
            const biliJctMatch = cookie.match(/bili_jct=([^;]+)/);
            
            return jsonResponse({
                success: true,
                data: {
                    isValid: true,
                    uname: verifyResult.data.uname,
                    face: verifyResult.data.face,
                    mid: verifyResult.data.mid,
                    level_info: verifyResult.data.level_info,
                    vipStatus: verifyResult.data.vipStatus,
                    sessdata: sessdataMatch ? sessdataMatch[1].substring(0, 8) + '****' : null,
                    bili_jct: biliJctMatch ? biliJctMatch[1].substring(0, 8) + '****' : null,
                    fullCookie: cookie.substring(0, 20) + '****',
                    expiresAt: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 预估30天后过期
                }
            });
        } else {
            return jsonResponse({
                success: true,
                data: {
                    isValid: false,
                    uname: null,
                    expiresAt: null,
                    error: verifyResult.error
                }
            });
        }
    } catch (error) {
        log("error", `获取Cookie状态失败: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}

/**
 * 生成登录二维码
 */
export async function handleQRGenerate() {
    try {
        const response = await fetch('https://passport.bilibili.com/x/passport-login/web/qrcode/generate', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.bilibili.com'
            }
        });

        const data = await response.json();
        
        if (data.code !== 0) {
            log("error", `生成二维码失败: ${JSON.stringify(data)}`);
            return jsonResponse({
                success: false,
                message: '生成二维码失败: ' + (data.message || '未知错误')
            }, 400);
        }

        const qrcodeKey = data.data.qrcode_key;
        const qrcodeUrl = data.data.url;

        // 存储session
        qrLoginSessions.set(qrcodeKey, {
            createTime: Date.now(),
            status: 'pending'
        });

        // 清理过期session（超过5分钟）
        const now = Date.now();
        for (const [key, session] of qrLoginSessions.entries()) {
            if (now - session.createTime > 5 * 60 * 1000) {
                qrLoginSessions.delete(key);
            }
        }

        log("info", `生成二维码成功, qrcode_key: ${qrcodeKey}`);

        return jsonResponse({
            success: true,
            data: {
                qrcode_key: qrcodeKey,
                url: qrcodeUrl
            }
        });
    } catch (error) {
        log("error", `生成二维码异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}

/**
 * 检查二维码扫描状态
 */
export async function handleQRCheck(request) {
    try {
        const body = await request.json();
        const qrcodeKey = body.qrcodeKey || body.qrcode_key;

        if (!qrcodeKey) {
            return jsonResponse({ success: false, message: '缺少qrcodeKey参数' }, 400);
        }

        const response = await fetch(
            `https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${qrcodeKey}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com'
                }
            }
        );

        const data = await response.json();
        
        let cookie = null;
        let refresh_token = null;

        if (data.data.code === 0 && data.data.url) {
            try {
                const url = new URL(data.data.url);
                const params = new URLSearchParams(url.search);
                const SESSDATA = params.get('SESSDATA') || '';
                const bili_jct = params.get('bili_jct') || '';
                const DedeUserID = params.get('DedeUserID') || '';
                const DedeUserID__ckMd5 = params.get('DedeUserID__ckMd5') || '';
                
                if (SESSDATA) {
                    // 注意：这里 SESSDATA 可能是 URL 编码的，需要解码
                    const decodedSESSDATA = decodeURIComponent(SESSDATA);
                    const decodedBiliJct = decodeURIComponent(bili_jct);
                    const decodedDedeUserID = decodeURIComponent(DedeUserID);
                    const decodedDedeUserID__ckMd5 = decodeURIComponent(DedeUserID__ckMd5);
                    
                    cookie = `SESSDATA=${decodedSESSDATA}; bili_jct=${decodedBiliJct}; DedeUserID=${decodedDedeUserID}; DedeUserID__ckMd5=${decodedDedeUserID__ckMd5}`;
                    log("info", `从登录响应提取Cookie成功，长度: ${cookie.length}`);
                }
                
                if (data.data.refresh_token) {
                    refresh_token = data.data.refresh_token;
                }
            } catch (urlError) {
                log("error", `解析登录URL失败: ${urlError.message}`);
            }
        }

        if (qrLoginSessions.has(qrcodeKey)) {
            qrLoginSessions.get(qrcodeKey).status = data.data.code === 0 ? 'success' : 'pending';
        }

        const result = {
            success: true,
            data: {
                code: data.data.code,
                message: data.data.message || '',
                url: data.data.url || null,
                refresh_token: refresh_token
            }
        };
        
        if (cookie) {
            result.data.cookie = cookie;
        }

        return jsonResponse(result);
    } catch (error) {
        log("error", `检查二维码状态异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}

/**
 * 验证Cookie有效性（新增的独立验证接口）
 * 用于环境变量配置界面中验证输入的Cookie
 */
export async function handleCookieVerify(request) {
    try {
        const body = await request.json();
        const cookie = body.cookie;
        
        if (!cookie) {
            return jsonResponse({ 
                success: false, 
                message: '缺少cookie参数' 
            }, 400);
        }
        
        log("info", `验证Cookie请求，Cookie长度: ${cookie.length}`);
        
        // 使用统一的验证函数
        const verifyResult = await verifyCookieValidity(cookie);
        
        if (verifyResult.isValid) {
            return jsonResponse({
                success: true,
                data: {
                    isValid: true,
                    uname: verifyResult.data.uname,
                    mid: verifyResult.data.mid,
                    face: verifyResult.data.face,
                    vipStatus: verifyResult.data.vipStatus
                }
            });
        } else {
            return jsonResponse({
                success: true,
                data: {
                    isValid: false,
                    message: verifyResult.error
                }
            });
        }
    } catch (error) {
        log("error", `验证Cookie异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}

/**
 * 保存Cookie
 */
export async function handleCookieSave(request) {
    try {
        const body = await request.json();
        const cookie = body.cookie || body.data?.cookie || '';
        const refresh_token = body.refresh_token || body.data?.refresh_token || '';

        log("info", `收到保存Cookie请求，Cookie长度: ${cookie ? cookie.length : 0}`);

        if (!cookie) {
            return jsonResponse({ success: false, message: '缺少cookie参数' }, 400);
        }

        // 标准化 Cookie
        const normalizedCookie = normalizeCookie(cookie);

        if (!normalizedCookie.includes('SESSDATA') || !normalizedCookie.includes('bili_jct')) {
            return jsonResponse({ 
                success: false, 
                message: 'Cookie格式不正确，需要包含SESSDATA和bili_jct' 
            }, 400);
        }

        // 验证 Cookie
        const verifyResult = await verifyCookieValidity(normalizedCookie);
        
        if (!verifyResult.isValid) {
            return jsonResponse({ 
                success: false, 
                message: 'Cookie验证失败: ' + (verifyResult.error || '无效或已过期')
            }, 400);
        }

        // 保存Cookie
        saveCookieToGlobals(normalizedCookie);

        log("info", `Cookie保存成功，用户: ${verifyResult.data.uname}`);

        return jsonResponse({
            success: true,
            data: {
                uname: verifyResult.data.uname,
                mid: verifyResult.data.mid,
                face: verifyResult.data.face
            },
            message: 'Cookie保存成功'
        });
    } catch (error) {
        log("error", `保存Cookie异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}

/**
 * 清除Cookie
 */
export async function handleCookieClear() {
    try {
        saveCookieToGlobals('');

        log("info", `Cookie已清除`);
        return jsonResponse({ 
            success: true, 
            data: null,
            message: 'Cookie已清除' 
        });
    } catch (error) {
        log("error", `清除Cookie异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}

/**
 * 刷新/验证Cookie
 */
export async function handleCookieRefresh() {
    try {
        const cookie = getCookieFromGlobals();
        
        if (!cookie) {
            return jsonResponse({ 
                success: false, 
                message: '没有已保存的Cookie' 
            }, 400);
        }

        const verifyResult = await verifyCookieValidity(cookie);
        
        if (verifyResult.isValid) {
            return jsonResponse({
                success: true,
                data: {
                    isValid: true,
                    uname: verifyResult.data.uname,
                    mid: verifyResult.data.mid,
                    face: verifyResult.data.face,
                    level_info: verifyResult.data.level_info,
                    vipStatus: verifyResult.data.vipStatus
                },
                message: 'Cookie仍然有效'
            });
        } else {
            return jsonResponse({
                success: false,
                message: 'Cookie已失效: ' + (verifyResult.error || '请重新扫码登录')
            }, 400);
        }
    } catch (error) {
        log("error", `刷新Cookie异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}
