/**
 * @Description: 留言
 * @author: forguo
 * @date: 2020/7/22
*/

import Taro from "@tarojs/taro";
import cloud from "../../service/cloud";

// 发送留言
export const dispatchSendAttend = (data) => {
    return () => {
        return new Promise((resolve, reject) => {
            Taro.showLoading({
                title: '提交中...',
                mask: true
            });
            // 数据库插入留言数据
            cloud.add('wedding_attend', data).then(res => {
                Taro.hideLoading();
                resolve(res);
            }, (err) => {
                Taro.hideLoading();
                console.log(err);
                reject(err);
            });
        });
    }
};
