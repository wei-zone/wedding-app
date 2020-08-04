import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, Image, View, Text } from '@tarojs/components'
import './index.scss'

class Photo extends Component {
    state = {
    };

    componentDidMount() {
    }

    handleContactMe = () => {
        Taro.previewImage({
            urls: ['https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/wechart.jpg'],
            current: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/wechart.jpg'
        })
    };

    render() {
        return (
            <View className='page about'>
                <View className='about-logo'>
                    <Image
                      className='about-logo-img'
                      src='https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/logo.png'
                    />
                </View>

                <View className='about-wedding'>趣婚礼</View>
                <View className='about-version'>Version 2.0.1</View>
                <View className='about-nav' hoverClass='btn-hover' onClick={this.handleContactMe.bind(this)}>
                    联系我
                </View>
                <View className='about-nav' hoverClass='btn-hover'>
                    分享小程序
                    <Button openType='share' className='about-nav-btn' />
                </View>

                <View className='about-tips' style={{marginTop: '50px'}} onClick={this.handleContactMe.bind(this)}>素材大多源于网络，如有侵权联系删除</View>
                <View className='about-tips' onClick={this.handleContactMe.bind(this)}>本小程序由<Text> forguo </Text>提供技术支持和开发</View>
            </View>
        )
    }
}

export default Photo

