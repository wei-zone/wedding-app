/**
 * @Description: 用户登录相关
 * @author: forguo
 * @date: 2020/7/22
*/
import Taro from "@tarojs/taro";
import { INVITE_INFO, INVITE_STATUS } from '../constants/invite'
import request from "../request";

// 获取用户信息
// eslint-disable-next-line import/prefer-default-export
export const dispatchGetInviteInfo = () => {
    return async (dispatch) => {
        try {
            const res = await request.request({
                url: '/wedding_invite',
            })
            let data = res.data[0];
            const {
                location,
            } = data;
            const {
                address,
                fullAddress,
                longitude,
                latitude
            } = location;
            let invite = {
                ...data,
                address: location.address,
                location: {
                    address,
                    fullAddress,
                    longitude: Number(longitude),
                    latitude: Number(latitude)
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
                    status: 'isMore'
                })
            }, 300)
        } catch (err) {
            console.log(err)
            dispatch({
                type: INVITE_STATUS,
                status: 'noMore'
            });
        }
    };
};
