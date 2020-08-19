import Taro, {Component} from '@tarojs/taro'
import { Swiper, SwiperItem, Image, View } from '@tarojs/components'
import {connect} from '@tarojs/redux';
import './index.scss'

@connect(({account, invite}) => ({
    userInfo: account.userInfo,
    invite: invite.invite,
}))

class Photo extends Component {
    state = {
    };

    componentDidMount() {
    }
    config = {
        navigationBarTitleText: '甜蜜相册',
        navigationStyle: 'custom'
    };
    onShareAppMessage () {
        const {
            invite
        } = this.props;
        return {
            title: `诚邀您参加${invite.groomName}&${invite.brideName}的婚礼`,
            path: '/pages/Index/index',
        }
    }

    render() {
        return (
            <View className='page share'>

            </View>
        )
    }
}

export default Photo

