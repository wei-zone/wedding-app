import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Swiper, SwiperItem, Image, View } from '@tarojs/components'
import {connect} from "react-redux";
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

