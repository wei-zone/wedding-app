/**
 * @Description: 接口请求的封装
 * @author: forguo
 * @date: 2020/7/23
*/
import Taro from '@tarojs/taro';
import {LOGIN, LOGOUT} from "../store/constants/account";
import configStore from "../store/index";
import {clearEmpty} from "../util";
import config from "../common/config";

const store = configStore();
const NODE_ENV = process.env.NODE_ENV;
const baseUrl = NODE_ENV === 'development' ? config[config.env].api : config.prod.api;
/* eslint-enable */
console.log(`%c baseUrl %c ${baseUrl}`, 'padding: 1px; border-radius: 3px 0 0 3px; color: #479edf', 'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #42c02e');

// 错误码
const CODE_MSG = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '请求错误。',
    401: '用户没有权限（用户名或密码错误）。',
    403: '拒绝访问。',
    404: '请求地址出错。',
    406: '请求的格式不可得。',
    408: '请求超时。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器内部错误。',
    502: '网关错误。',
    503: '服务不可用。',
    504: '网关超时。',
    505: 'HTTP版本不受支持。',
};

const request = {
    /***
     * 登录授权操作
     * @returns {Promise}
     */
    login: async function() {
        Taro.showLoading({
            title: '登录中...',
            mask: true
        });
        return await new Promise((resolve, reject) => {
            Taro.login({
                success: (loginRes) => {
                    if (loginRes.code) {
                        const data = {
                            code: loginRes.code
                        };
                        try {
                            let res = this.request({
                                url: '/auth/login',
                                data,
                                method: 'post',
                            });
                            store.dispatch({
                                type: LOGIN,
                                accessToken: res.data.accessToken, // 授权的token
                            });
                            resolve(res);
                        } catch (e) {
                            reject(e);
                            Taro.hideLoading();
                        }
                    } else {
                        reject(loginRes);
                        Taro.hideLoading();
                        setTimeout(() => {
                            Taro.showToast({
                                title: '登录失败，请重试！',
                                icon: 'none',
                                duration: 2000
                            })
                        }, 100);
                    }
                },
                fail: (e) => {
                    reject(e);
                    Taro.hideLoading();
                    setTimeout(() => {
                        Taro.showToast({
                            title: '登录失败，请重试！',
                            icon: 'none',
                            duration: 2000
                        })
                    }, 100);
                }
            });
        });
    },
    /**
     * @desc 封装请求
     * @param params
     *    data: 数据
     *    url: 请求url
     *    header 请求头
     *    method: 请求方式 | 默认get
     * @returns {Promise<unknown>}
     */
    request: async function (params) {
        let accessToken = Taro.getStorageSync('accessToken');
         // 删除空参数
        params.data = clearEmpty(params.data);
        return await new Promise((resolve, reject) => {
            // 做一次参数合并，加入token
            let header = Object.assign(
                {}, {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                params.header
            );
            if (accessToken) {
                header = Object.assign({},header, {
                    'Authorization': `Bearer ${accessToken}`
                });
            }
            header = Object.assign({}, header, params.header);
            Taro.showNavigationBarLoading();
            Taro.request({
                header: header,
                url: `${baseUrl}/weapp${params.url}`,
                method: params.method || 'get',
                data: params.data,
                success: (res) => {
                    this.handlerResolve(res, resolve, reject, async () => {
                        try {
                            let data = await this.request(params);
                            if (data) {
                                resolve(data);
                            }
                        } catch (err) {
                            reject(err);
                        }
                    });
                },
                fail: (err) => {
                    let { ifHandleError } = params;
                    console.warn('requestFail ===>', err);
                    this.handlerReject(err, reject, ifHandleError);
                },
                complete: () => {
                    this.handleComplete();
                }
            })
        });
    },
    // 请求成功的处理
    handlerResolve: function(res, resolve, reject, tokenCallBack) {
        if (res.statusCode === 200) {
            if (typeof res.data === 'string') {
                res.data = JSON.parse(res.data);
            }
            if (!res.data.code) {
                setTimeout(() => {
                    Taro.showToast({
                        duration: 3000,
                        icon: 'none',
                        title: '请求失败，请重试~'
                    });
                }, 0);
                reject(res);
                return false;
            }
            if (res.data.code === 200) {
                resolve(res.data);
            } else {
                console.warn('handlerResolveError ===>', JSON.stringify(res));
                const errMsg = res.data.message || CODE_MSG[res.statusCode] || res.errMsg || '系统异常，请重试~';
                setTimeout(() => {
                    Taro.showToast({
                        duration: 3000,
                        icon: 'none',
                        title: errMsg
                    });
                }, 0);
                reject(res.data);
            }
        } else if (res.statusCode === 401) {
            //  401: '用户没有权限（用户名或密码错误）。',
            if (res.data.code === 457) {
                // 刷新token失败，重新登录
                store.dispatch({
                    type: LOGOUT,
                });
                Taro.clearStorageSync(); // 刷新token也要清空
                // 没有token直接去登录
                setTimeout(() => {
                    Taro.showToast({
                        title: '登录失效，即将重新登录...',
                        icon: 'none'
                    });
                }, 0);

                setTimeout(() => {
                    // 该用户未绑定，先去登录绑定
                    Taro.reLaunch({
                        url: '/pages/Login/Login'
                    });
                }, 1500);
            } else if (res.data.code === 454) {
                // token失效的处理，重新授权一次
                this.login().then(() => {
                    tokenCallBack && tokenCallBack();
                });
            } else {
                // 密码错误的处理
                const errMsg = res.data.message || CODE_MSG[res.statusCode] || res.errMsg;
                setTimeout(() => {
                    Taro.showToast({
                        duration: 3000,
                        icon: 'none',
                        title: errMsg
                    });
                }, 0);
                reject(res.data);
            }
        } else {
            console.warn('handlerResolveError ===>', JSON.stringify(res));
            const errMsg = CODE_MSG[res.statusCode] || res.errMsg;
            setTimeout(() => {
                Taro.showToast({
                    duration: 3000,
                    icon: 'none',
                    title: errMsg
                });
            }, 0);
            reject(res.data);
        }
    },
    // 错误处理，微信小程序只有网络错误会进入到小程序
    handlerReject: function (err, reject, ifHandleError = true) {
        reject(err);
        if (ifHandleError) {
            setTimeout(function() {
                Taro.showToast({
                    title: '您的网络似乎不太好，请稍后再试哦~',
                    icon: 'none',
                    duration: 3000
                });
            },0);
        }
    },
    handleComplete: () => {
        // 请求完成，关闭所有loading
        Taro.hideNavigationBarLoading();
        Taro.hideLoading();
    },
};

export default request
