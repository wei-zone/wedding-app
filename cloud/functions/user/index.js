/**
 * @Description: 获取用户信息
 * @author: forguo
 * @date: 2020/8/5
*/
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
/**
 *
 * @param event 指的是触发云函数的事件，当小程序端调用云函数时，event 就是小程序端调用云函数时传入的参数，外加后端自动注入的小程序用户的 openid 和小程序的 appid
 * @param context context 对象包含了此处调用的调用信息和运行状态
 * @returns {Promise<{unionid: string, openid: string, appid: string, event: *}>}
 */
exports.main = async (event, context) => {
    const { OPENID, APPID, UNIONID } = cloud.getWXContext();
    return {
        event,
        OPENID,
        APPID,
        UNIONID,
    }
};
