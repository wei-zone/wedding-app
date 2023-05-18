import Taro, {Component} from '@tarojs/taro'
import { Button, Image, View, Text } from '@tarojs/components'
import {connect} from '@tarojs/redux';
import './index.scss'

@connect(({ invite}) => ({
    invite: invite.invite,
}))

class About extends Component {

    state = {
        qrcode: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/qrcode.jpeg',
        logo: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/logo.png',
        wxcode: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/wechart.jpg'
    };

    config = {
        navigationBarTitleText: '关于',
        disableScroll: true
    };
    onShareAppMessage () {
        const {
            invite
        } = this.props;
        return {
            title: `诚邀您参加${invite.groomName}&${invite.brideName}的婚礼`,
            path: '/pages/Index/index',
            imageUrl: 'https://forguo.cn/assets/wedding-app/imgs/share.png',

        }
    }

    previewImage = (url) => {
        Taro.previewImage({
            urls: [url],
            current: url
        })
    };

    render() {
        const {
            logo,
            wxcode,
            qrcode
        } = this.state;
        return (
            <View className='page about'>
                <View className='about-logo'>
                    <Image
                      className='about-logo-img'
                      src={logo}
                    />
                </View>
                <View className='about-wedding'>趣婚礼</View>
                <View className='about-version'>Version 2.0</View>
                <View className='about-nav' hoverClass='btn-hover' onClick={this.previewImage.bind(this, wxcode)}>
                    联系我
                </View>
                <View className='about-nav' hoverClass='btn-hover' onClick={this.previewImage.bind(this, qrcode)}>
                    小程序码
                </View>
                <View className='about-nav' hoverClass='btn-hover'>
                    分享小程序
                    <Button openType='share' className='about-nav-btn' />
                </View>

                <View className='about-tips' style={{marginTop: '50px'}} onClick={this.previewImage.bind(this, wxcode)}>素材大多源于网络，如有侵权联系删除</View>
                <View className='about-tips' onClick={this.previewImage.bind(this, wxcode)}>本小程序由<Text> forguo </Text>提供技术支持和开发</View>
            </View>
        )
    }
}

export default About

