/**
 * @Description: 用户登录相关
 * @author: forguo
 * @date: 2020/7/22
*/
import Taro from "@tarojs/taro";
import { INVITE_INFO, INVITE_STATUS } from '../constants/invite'
import cloud from '../../service/cloud';

// 获取用户信息
export const dispatchGetInviteInfo = () => {
    return async (dispatch) => {
        Taro.showNavigationBarLoading();
        cloud.get('wedding_invite').then((res) => {
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
                        location,
                        msg,
                        musicUrl,
                        musicTitle,
                        coverImgUrl
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
                        msg,
                        musicUrl,
                        musicTitle,
                        coverImgUrl,
                        location: {
                            address,
                            fullAddress,
                            longitude,
                            latitude
                        }
                    };
                    Taro.showTabBar({
                        fail: () => {
                            Taro.showTabBar({
                                fail: () => {
                                    Taro.reLaunch({
                                        url: '/pages/Index/index'
                                    })
                                }
                            })
                        }
                    });
                    dispatch({
                        type: INVITE_INFO,
                        invite
                    });
                    setTimeout(() => {
                        dispatch({
                            type: INVITE_STATUS,
                            statue: 'isMore'
                        })
                    }, 300)
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
