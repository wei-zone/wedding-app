/**
 * @Description: 留言
 * @author: forguo
 * @date: 2020/7/22
*/

import Taro from "@tarojs/taro";
import request from "../request";

// 发送留言
// eslint-disable-next-line import/prefer-default-export
export const dispatchSendAttend = (data) => {
    return () => {
        return new Promise(async (resolve, reject) => {
            Taro.showLoading({
                title: '提交中...',
                mask: true
            });
            // 数据库插入出席数据
            try {
                // 插入留言数据
                const msg = await request.request({
                    url: '/wedding_attend',
                    method: 'post',
                    data: {
                        data: {
                            ...data,
                            _createTime: Date.now(),
                            _updateTime: Date.now(),
                        }
                    },
                })
                resolve(msg);
            } catch (e) {
                console.log(e)
                reject(e);
            }
        });
    }
};
