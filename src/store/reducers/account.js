import Taro from '@tarojs/taro'
import {USER_INFO, LOGIN} from '../constants/account'

let defaultState = {
    userInfo: null,
    accessToken: null,
    tokenExpireTime: null
};

// 获取本地缓存数据，并更新
try {
    const accessToken = Taro.getStorageSync('accessToken');
    if (accessToken) {
        defaultState.accessToken = accessToken;
    }

    const tokenExpireTime = Taro.getStorageSync('tokenExpireTime');
    if (tokenExpireTime) {
        defaultState.tokenExpireTime = tokenExpireTime;
    }
} catch {

}

export default function counter(state = defaultState, action) {
    switch (action.type) {
        case USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            };
        case LOGIN:
            // 将获得的token缓存下来,并更新token失效时间
            const now = new Date().getTime();
            return {
                ...state,
                accessToken: action.accessToken,
                tokenExpireTime: now
            };
        default:
            return state
    }
}
