import Taro, {Component} from '@tarojs/taro'
import {connect} from '@tarojs/redux';
import { Button, Text, Image, View, Map } from '@tarojs/components'
import './index.scss'
import callHe from '../../assets/img/icon-call-he.png';
import callShe from '../../assets/img/icon-call-she.png';

@connect(({invite}) => {
    return {
        invite: invite.invite,
        brideMobile: invite.invite.brideMobile,
        groomMobile: invite.invite.groomMobile,
        location: invite.invite.location,
    }
})

class Location extends Component {
    state = {
        navBarTop: 44 + 36 + 6 + 45,
    };
    componentDidMount() {
        this.getSystemInfo()
    }
    config = {
        navigationBarTitleText: '导航',
        navigationStyle: 'custom'
    };
    onShareAppMessage () {
        const {
            invite
        } = this.props;
        return {
            title: `诚邀您参加${invite.groomName}&${invite.brideName}的婚礼`,
            path: '/pages/Location/index',
            imageUrl: 'https://forguo.cn/assets/wedding-app/imgs/share.png',
        }
    }

    getSystemInfo = () => {
        let systemInfo = Taro.systemInfo;
        let menuButtonInfo = Taro.menuButtonInfo;
        this.setState({
            navBarTop: (systemInfo.statusBarHeight || 44) + (menuButtonInfo.height || 32) + 6 + 20
        });
    };

    // 一键导航
    handleMapNav = () => {
        const {
            location,
        } = this.props;
        const {
            latitude,
            longitude,
            fullAddress: address,
        } = location;
        Taro.openLocation({
            latitude,
            longitude,
            address,
            scale: 13,
            fail: (e) => {
                Taro.showToast({
                    title: e.errMsg || '导航打开失败，请检查经纬度',
                    icon: 'none',
                    duration: 3000
                })
            }
        })
    };

    // 电话联系新娘、新郎
    handlePhoneCall = (phone) => {
        Taro.makePhoneCall({
            phoneNumber: phone
        })
    };

    render() {
        const {
            navBarTop,
        } = this.state;
        const {
            location,
            brideMobile,
            groomMobile
        } = this.props;
        const {
            latitude,
            longitude,
            address,
        } = location;
        return (
            <View className='page location'>
                <Map id='map'
                  className='location-map'
                  longitude={longitude}
                  latitude={latitude}
                  scale='14'
                  setting={{}}
                  markers={[{
                         id: 0,
                         longitude: longitude,
                         latitude: latitude,
                         callout: {
                             content: address,
                             color: '#fff',
                             bgColor: '#ff4c91',
                             fontSize: 14,
                             textAlign: 'center',
                             padding: 6,
                             borderRadius: 6,
                             display: 'ALWAYS',
                         },
                         width: 28,
                         height: 28,
                         iconPath: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/icon-nav.png'
                     }]}
                  show-location
                  style='width: 100%; height: 100%;'
                />
                <Button className='location__nav-btn' style={{
                    top: `${navBarTop}px`
                }} onClick={this.handleMapNav.bind(this)}
                >导航</Button>
                <View className='location__tool'>
                    <View className='location__tool-btn'>
                        <View className='location__tool-call' onClick={this.handlePhoneCall.bind(this, groomMobile)}>
                            <Image src={callHe} className='location__tool-call-img' />
                            <Text className='location__tool-call-txt'>呼叫新郎</Text>
                        </View>
                        <View className='location__tool-call' onClick={this.handlePhoneCall.bind(this, brideMobile)}>
                            <Image src={callShe} className='location__tool-call-img' />
                            <Text className='location__tool-call-txt'>呼叫新娘</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Location

