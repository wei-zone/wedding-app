

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
            // 云调用内容安全过滤
            Taro.cloud.callFunction({
                name: 'msgCheck',
                data: { content: data.userMsg },
            }).then(res => {
                if (res && res.result && res.result.errCode === 0) {
                    Taro.showLoading({
                        title: '发送中...',
                        mask: true
                    });
                    // 数据库插入留言数据
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
