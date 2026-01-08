// danmu_api/utils/cookie-handler.js
import { jsonResponse } from './http-util.js';
import { log } from './log-util.js';
import { Globals } from '../configs/globals.js';

// 存储二维码登录会话（内存存储）
const qrLoginSessions = new Map();

/**
 * 获取Cookie状态
 */
export async function handleCookieStatus() {
    try {
        const globals = Globals.getInstance();
        const cookie = globals.bilibiliCookie || Globals.envs.BILIBILI_COOKIE || '';
        
        if (!cookie) {
            return jsonResponse({
                success: true,
                hasLogin: false,
                message: '未配置Cookie'
            });
        }

        // 验证Cookie有效性
        try {
            const response = await fetch('https://api.bilibili.com/x/web-interface/nav', {
                headers: {
                    'Cookie': cookie,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com'
                }
            });

            const data = await response.json();
            
            if (data.code === 0 && data.data && data.data.isLogin) {
                return jsonResponse({
                    success: true,
                    hasLogin: true,
                    userInfo: {
                        uname: data.data.uname,
                        face: data.data.face,
                        mid: data.data.mid,
                        level_info: data.data.level_info,
                        vipStatus: data.data.vipStatus
                    },
                    message: 'Cookie有效'
                });
            } else {
                return jsonResponse({
                    success: true,
                    hasLogin: false,
                    message: 'Cookie已失效'
                });
            }
        } catch (apiError) {
            log("error", `验证Cookie失败: ${apiError.message}`);
            return jsonResponse({
                success: true,
                hasLogin: false,
                message: '验证Cookie失败: ' + apiError.message
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
            qrcodeKey: qrcodeKey,
            qrcodeUrl: qrcodeUrl,
            message: '二维码生成成功'
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
        const { qrcodeKey } = body;

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
        
        /*
         * B站返回的code含义：
         * 0: 登录成功
         * 86038: 二维码已失效
         * 86090: 已扫码未确认
         * 86101: 未扫码
         */
        
        let status = 'pending';
        let cookie = null;
        let message = '';

        switch (data.data.code) {
            case 0:
                status = 'success';
                message = '登录成功';
                // 从响应URL中提取Cookie参数
                if (data.data.url) {
                    try {
                        const url = new URL(data.data.url);
                        const params = new URLSearchParams(url.search);
                        const SESSDATA = params.get('SESSDATA') || '';
                        const bili_jct = params.get('bili_jct') || '';
                        const DedeUserID = params.get('DedeUserID') || '';
                        const DedeUserID__ckMd5 = params.get('DedeUserID__ckMd5') || '';
                        
                        if (SESSDATA) {
                            cookie = `SESSDATA=${SESSDATA}; bili_jct=${bili_jct}; DedeUserID=${DedeUserID}; DedeUserID__ckMd5=${DedeUserID__ckMd5}`;
                            log("info", `从URL参数构建Cookie成功`);
                        }
                    } catch (urlError) {
                        log("error", `解析登录URL失败: ${urlError.message}`);
                    }
                }
                break;
            case 86038:
                status = 'expired';
                message = '二维码已失效';
                break;
            case 86090:
                status = 'scanned';
                message = '已扫码，请在手机上确认';
                break;
            case 86101:
                status = 'pending';
                message = '等待扫码';
                break;
            default:
                status = 'error';
                message = data.data.message || '未知状态';
        }

        // 更新session状态
        if (qrLoginSessions.has(qrcodeKey)) {
            qrLoginSessions.get(qrcodeKey).status = status;
        }

        const result = { success: true, status, message, code: data.data.code };
        if (cookie) result.cookie = cookie;

        return jsonResponse(result);
    } catch (error) {
        log("error", `检查二维码状态异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}

/**
 * 保存Cookie
 */
export async function handleCookieSave(request) {
    try {
        const body = await request.json();
        const { cookie } = body;

        if (!cookie) {
            return jsonResponse({ success: false, message: '缺少cookie参数' }, 400);
        }

        if (!cookie.includes('SESSDATA') || !cookie.includes('bili_jct')) {
            return jsonResponse({ 
                success: false, 
                message: 'Cookie格式不正确，需要包含SESSDATA和bili_jct' 
            }, 400);
        }

        // 验证Cookie
        try {
            const verifyResponse = await fetch('https://api.bilibili.com/x/web-interface/nav', {
                headers: {
                    'Cookie': cookie,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com'
                }
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.code !== 0 || !verifyData.data?.isLogin) {
                return jsonResponse({ 
                    success: false, 
                    message: 'Cookie验证失败，请确保Cookie有效' 
                }, 400);
            }

            // 保存到全局变量
            const globals = Globals.getInstance();
            globals.bilibiliCookie = cookie;
            Globals.envs.BILIBILI_COOKIE = cookie;

            log("info", `Cookie保存成功，用户: ${verifyData.data.uname}`);

            return jsonResponse({
                success: true,
                message: 'Cookie保存成功',
                userInfo: {
                    uname: verifyData.data.uname,
                    mid: verifyData.data.mid
                }
            });
        } catch (verifyError) {
            log("error", `验证Cookie时发生错误: ${verifyError.message}`);
            return jsonResponse({ 
                success: false, 
                message: '验证Cookie失败: ' + verifyError.message 
            }, 400);
        }
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
        const globals = Globals.getInstance();
        globals.bilibiliCookie = '';
        Globals.envs.BILIBILI_COOKIE = '';

        log("info", `Cookie已清除`);
        return jsonResponse({ success: true, message: 'Cookie已清除' });
    } catch (error) {
        log("error", `清除Cookie异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}

/**
 * 刷新Cookie（验证当前Cookie是否有效）
 */
export async function handleCookieRefresh() {
    try {
        const globals = Globals.getInstance();
        const cookie = globals.bilibiliCookie || Globals.envs.BILIBILI_COOKIE || '';
        
        if (!cookie) {
            return jsonResponse({ 
                success: false, 
                message: '当前没有已保存的Cookie' 
            }, 400);
        }

        // 验证当前Cookie是否有效
        try {
            const verifyResponse = await fetch('https://api.bilibili.com/x/web-interface/nav', {
                headers: {
                    'Cookie': cookie,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com'
                }
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.code === 0 && verifyData.data?.isLogin) {
                return jsonResponse({
                    success: true,
                    message: 'Cookie仍然有效，无需刷新',
                    userInfo: {
                        uname: verifyData.data.uname,
                        mid: verifyData.data.mid,
                        face: verifyData.data.face
                    }
                });
            } else {
                return jsonResponse({
                    success: false,
                    message: 'Cookie已失效，请重新扫码登录'
                }, 400);
            }
        } catch (verifyError) {
            log("error", `验证Cookie时发生错误: ${verifyError.message}`);
            return jsonResponse({
                success: false,
                message: '验证失败: ' + verifyError.message
            }, 500);
        }
    } catch (error) {
        log("error", `刷新Cookie异常: ${error.message}`);
        return jsonResponse({ success: false, message: error.message }, 500);
    }
}
