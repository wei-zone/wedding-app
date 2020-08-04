

/**
 * @Description: 留言
 * @author: forguo
 * @date: 2020/7/22
*/

import Taro from "@tarojs/taro";
import cloud from "../../service/cloud";

// 获取用户信息
export const dispatchSendMsg = (data) => {
    return () => {
        return new Promise((resolve, reject) => {
            Taro.showLoading({
                title: '发送中...',
                mask: true
            });
            wx.cloud.callFunction({
                name: 'msgCheck',
                data: { content: data.userMsg },
            }).then(res => {
                console.log(res);
                if (res && res.result && res.result.errCode === 0) {
                    Taro.showLoading({
                        title: '发送中...',
                        mask: true
                    });
                    cloud.add('wedd_msgs', data).then(msgRes => {
                        resolve(msgRes);
                    }, (err) => {
                        console.log(err);
                        reject(err);
                    });
                } else {
                    reject(res.result);
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }
};
