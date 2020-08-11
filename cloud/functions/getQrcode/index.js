/**
 * @Description: 获取小程序码
 * @author: forguo
 * @date: 2020/8/11
*/
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

async function getWXACode(event) {
    try {
        const {
            result
        } = await cloud.openapi.wxacode.getUnlimited({
            scene: 'x=1',
        });
        // 此处返回 Base64 图片仅作为演示用，在实际开发中，
        // 应上传图片至云文件存储，然后在小程序中通过云文件 ID 使用
        return `data:${result.contentType};base64,${result.buffer.toString('base64')}`
    } catch (err) {
        return err
    }
}

// 云函数入口函数
// eslint-disable-next-line
exports.main = async (event) => {
    return getWXACode(event)
};
