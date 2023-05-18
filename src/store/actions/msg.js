/**
 * @Description: 留言
 * @author: forguo
 * @date: 2020/7/22
*/

import Taro from "@tarojs/taro";
import request from "../request";

// 获取留言列表
export const dispatchGetMsg = (current) => {
    return () => request.request({
        url: '/wedding_msgs',
        data: {
            skip: current * 10,
            limit: 10,
        }
    })
};

// 发送留言
export const dispatchSendMsg = (data) => {
    return () => {
        return new Promise(async (resolve, reject) => {
            Taro.showLoading({
                title: '发送中...',
                mask: true
            });
            // 数据库插入留言数据
            try {
                // 插入留言数据
                const msg = await request.request({
                    url: '/wedding_msgs',
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
