/**
 * @Description: 文本内容过滤；
 * @author: forguo
 * @date: 2020/8/5
*/
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async function (event, context) {
    console.log(event);
    let opts = {
        content: event.content || ''
    };
    let fun = cloud.openapi.security.msgSecCheck(opts);

    return fun.then(res => {
        return res;
    }).catch(err => {
        return err;
    });
};
