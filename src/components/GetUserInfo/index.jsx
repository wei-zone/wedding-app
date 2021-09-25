import Taro, {Component} from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import {connect} from '@tarojs/redux';
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
        canIUseGetUserProfile: true
    };

    componentWillMount() {

        // eslint-disable-next-line no-undef
        if (wx.getUserProfile) {
            this.setState({
                canIUseGetUserProfile: true
            })
        } else {
            Taro.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        Taro.getUserInfo({
                            success: (user) => {
                                console.log('getUserInfo', user);
                                if (user.errMsg === 'getUserInfo:ok') {
                                    const userInfo = user.userInfo;
                                    this.props.dispatchGetUserInfo(userInfo);
                                }
                            }
                        })
                    }
                }
            })
            this.setState({
                canIUseGetUserProfile: false
            })
        }
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    /**
     * 获取用户信息
     * 旧版api
     * @param e
     */
    handleGetUserInfo (e) {
        console.log('userInfo', e);
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
    }

    /**
     * 获取用户信息
     * 新版api
     */
    handleGetUserProfile () {
        const StoreUserInfo = this.props.userInfo;
        if (StoreUserInfo) {
            this.props.onHandleComplete(StoreUserInfo);
        } else {
            // eslint-disable-next-line no-undef
            wx.getUserProfile({
                desc: '用于用户信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (e) => {
                    console.log('userInfo', e);
                    if (e.errMsg === 'getUserProfile:ok') {
                        const userInfo = e.userInfo;
                        this.props.onHandleComplete(userInfo);
                        this.props.dispatchGetUserInfo(userInfo);
                    } else {
                        Taro.showToast({
                            title: '取消授权！',
                            icon: 'none'
                        })
                    }
                }
            })
        }
    };

    render() {
        const {
            canIUseGetUserProfile
        } = this.state;
        return (
            <View className='get-user-info'>
                {
                    canIUseGetUserProfile ?
                        <Button className='get-user-info-btn' onClick={this.handleGetUserProfile.bind(this)} />
                        :
                        <Button className='get-user-info-btn' open-type='getUserInfo' onGetUserInfo={this.handleGetUserInfo.bind(this)} />
                }
            </View>
        )
    }
}

export default Photo

