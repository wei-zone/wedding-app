/**
 * @Description: 微信分享
 * @author: forguo
 * @date: 2020/8/5
*/
// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
const crypto = require('crypto');
const cache = require('memory-cache'); // 缓存

// 公众号配置
const config = {
    APPID: 'wx7d2d87d32bb4497d',
    APPSECRET: 'a4883f79eb6a69017c99ad8b93136c52',
};

cloud.init();

// sha1加密
function sha1(str) {
    let shasum = crypto.createHash("sha1");
    shasum.update(str);
    str = shasum.digest("hex");
    return str
}

/**
 * 生成签名的时间戳
 * @return {string}
 */
function createTimestamp() {
    return (new Date().getTime() / 1000) + ''
}

/**
 * 生成签名的随机串
 * @return {string}
 */
function createNonceStr() {
    return Math.random().toString(36).substr(2, 15)
}

/**
 * 对参数对象进行字典排序
 * @param  {object} args 签名所需参数对象
 * @return {string}    排序后生成字符串
 */
function raw(args) {
    let keys = Object.keys(args);
    keys = keys.sort();
    let newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key]
    });

    let string = '';
    for (let k in newArgs) {
        string += '&' + k + '=' + newArgs[k]
    }
    string = string.substr(1);
    return string
}


// 获取access_token访问令牌
function accessToken () {
    return new Promise((resolve, reject) => {
        // 先判断缓存中是否存在access_token
        if (!cache.get('accessToken')) { // 如果 access_token 不存在则将请求结果保存进缓存
            const {
                APPID,
                APPSECRET
            } = config;
            request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`, function (error, response, data) {
                let result = JSON.parse(data);
                console.log('accessToken', result);
                if (!error && response.statusCode === 200 && result.access_token) {
                    cache.put('accessToken', result.access_token, (result.expires_in - 200) * 1000); // 缓存access_token
                    resolve(result.access_token);
                } else {
                    console.warn(' accessToken ===== >', result.errmsg || response || error);
                    reject(result.errmsg || response || error);
                }
            });
        } else { // 否则直接导出缓存中的 access_token
            resolve(cache.get('accessToken'))
        }
    });
}


// {
// "errcode": 0,
// "errmsg": "ok",
// "ticket": "kgt8ON7yVITDhtdwci0qeewU2G8vmQlDZmo84VyNGCa19S6x9fIJenFTBFh9dCkKegRsaJ8V7_CsttbRoCQiIA",
// "expires_in": 7200
// }

// 获取jsapi_ticket临时票据
function jsapiTicket () {
    return new Promise((resolve, reject) => {
        // 先判断缓存中是否存在ticket
        if (!cache.get('ticket')) { // 如果 ticket 不存在则将请求结果保存进缓存
            accessToken().then(res => {
                request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${res}&type=jsapi`, function (error, response, data) {
                    let result = JSON.parse(data);
                    console.log('jsapiTicket', result);
                    if (!error && response.statusCode === 200 && result.errcode === 0) {
                        cache.put('ticket', result.ticket, (result.expires_in - 200) * 1000); // 缓存access_token
                        resolve(result.ticket);
                    } else {
                        console.warn(' jsapiTicket ===== >', result.errmsg || response || error);
                        reject(result.errmsg || response || error);
                    }
                });
            }, (error) => {
                console.warn(' jsapiTicket ===== >', error);
                reject(error);
            });
        } else {
            resolve(cache.get('ticket'))
        }
    })
}

/**
 * 签名算法
 * 签名生成规则如下：
 * 参与签名的字段包括noncestr（ 随机字符串）,
 * 有效的jsapi_ticket, timestamp（ 时间戳）,
 * url（ 当前网页的URL， 不包含# 及其后面部分）。
 * 对所有待签名参数按照字段名的ASCII 码从小到大排序（ 字典序） 后，
 * 使用URL键值对的格式（ 即key1 = value1 & key2 = value2…） 拼接成字符串string1。
 * 这里需要注意的是所有参数名均为小写字符。 对string1作sha1加密， 字段名和字段值都采用原始值， 不进行URL 转义。
 * @param url
 */

function wxsdk (url) {
    return new Promise((resolve, reject) => {
        jsapiTicket().then(res => {
            let ret = {
                jsapi_ticket: res,
                nonceStr: createNonceStr(),
                timestamp: createTimestamp(),
                url: decodeURIComponent(url)
            };
            let string = raw(ret);
            ret.signature = sha1(string);
            ret.appId = config.APPID;
            console.log('ret', ret);
            resolve(ret)
        }, (error) => {
            console.warn(' wxsdk ===== >', error);
            reject(error);
        });
    });
}

exports.main = async (event) => {
    console.log('start ============================== >');
    console.log('event ===== >', event);
    console.log('end ============================== >');
    console.log(cache.get('accessToken'));
    const url = event.url || event.body.split('=')[1];
    try {
        let res = await wxsdk(url);
        return  {
            code: 200,
            message: 'ok',
            data: res,
        };
    } catch (e) {
        return  {
            code: 10086,
            message: 'error',
            data: e,
            err: JSON.stringify(e)
        };
    }
};
