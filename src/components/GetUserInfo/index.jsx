import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, View } from '@tarojs/components'
import {connect} from "react-redux";
import './index.scss'
import {
    dispatchGetUserInfo
} from "../../store/actions/account";

@connect(({account}) => ({
    userInfo: account.userInfo
}), {
    dispatchGetUserInfo,
})

class Photo extends Component {
    state = {
        canIUse: Taro.canIUse('button.open-type.getUserInfo')
    };

    componentWillMount() {
        // 查看是否授权
        Taro.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    Taro.getUserInfo({
                        success: (user) => {
                            if (user.errMsg === 'getUserInfo:ok') {
                                const userInfo = user.userInfo;
                                this.props.dispatchGetUserInfo(userInfo);
                            }
                        }
                    })
                }
            }
        })
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    // 获取用户信息
    onGetUserInfo = (e) => {
        const StoreUserInfo = this.props.userInfo;
        if (StoreUserInfo) {
            this.props.onHandleComplete(StoreUserInfo);
        } else {
            if (e.detail.errMsg === 'getUserInfo:ok') {
                const userInfo = e.detail.userInfo;
                this.props.onHandleComplete(userInfo);
                this.props.dispatchGetUserInfo(userInfo);
            } else {
                Taro.showToast({
                    title: '取消授权！',
                    icon: 'none'
                })
            }
        }
    };

    render() {
        const {
            canIUse
        } = this.state;
        return (
            <View className='get-user-info'>
                {
                    canIUse ?
                    <Button className='get-user-info-btn' open-type='getUserInfo' onGetUserInfo={this.onGetUserInfo.bind(this)} />
                        :
                    <View>请升级微信版本</View>
                }
            </View>
        )
    }
}

export default Photo

