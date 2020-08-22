

/**
 * @Description: 视频、祝福
 * @author: forguo
 * @date: 2020/7/22
*/

import Taro from "@tarojs/taro";
import cloud from "../../service/cloud";

// 获取留言列表
export const dispatchGetVideo = (current) => {
    return () => {
        return new Promise((resolve, reject) => {
            Taro.showNavigationBarLoading();
            cloud.get('wedding_video', current).then((res) => {
                if (res.errMsg === 'collection.get:ok') {
                    resolve(res);
                } else {
                    reject(res);
                }
                Taro.hideNavigationBarLoading();
                Taro.stopPullDownRefresh();
            }, (err) => {
                console.log(err);
                Taro.stopPullDownRefresh();
                Taro.hideNavigationBarLoading();
                Taro.showToast({
                    title: err.errMsg || '请求失败，请重试！',
                    icon: 'none',
                    duration: 3000
                });
                reject(err);
            });
        });
    }
};
