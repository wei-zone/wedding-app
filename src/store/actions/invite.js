/**
 * @Description: 用户登录相关
 * @author: forguo
 * @date: 2020/7/22
*/
import Taro from "@tarojs/taro";
import { INVITE_INFO, INVITE_STATUS } from '../constants/invite'
import request from '../request';
import cloud from '../../service/cloud';

// 用户授权登录
export const dispatchUserAuth = () => {
    return async () => (
        await request.login()
    );
};

// 获取用户信息
export const dispatchGetInviteInfo = () => {
    return async (dispatch) => {
        Taro.showNavigationBarLoading();
        cloud.get('wedd_invite').then((res) => {
            if (res.errMsg === 'collection.get:ok') {
                if (res.data.length > 0) {
                    let data = res.data[0];
                    const {
                        groomName,
                        brideName,
                        brideMobile,
                        groomMobile,
                        startTime,
                        banner,
                        location
                    } = data;
                    const {
                        address,
                        fullAddress,
                        longitude,
                        latitude
                    } = location;
                    let invite = {
                        groomName,
                        brideName,
                        brideMobile,
                        groomMobile,
                        startTime,
                        banner,
                        address: location.address,
                        location: {
                            address,
                            fullAddress,
                            longitude,
                            latitude
                        }
                    };
                    Taro.showTabBar();
                    dispatch({
                        type: INVITE_INFO,
                        invite
                    });
                    dispatch({
                        type: INVITE_STATUS,
                        statue: 'isMore'
                    })
                } else {
                    dispatch({
                        type: INVITE_STATUS,
                        statue: 'noMore'
                    })
                }
            }
            Taro.hideNavigationBarLoading();
            Taro.stopPullDownRefresh();
        }, (err) => {
            dispatch({
                type: INVITE_STATUS,
                statue: 'noMore'
            });
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            Taro.showToast({
                title: err.errMsg || '请求失败，请重试！',
                icon: 'none',
                duration: 3000
            });
        });
    };
};
