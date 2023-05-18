import Taro, {Component} from '@tarojs/taro'
import {connect} from '@tarojs/redux';
import {Image, Button, View, Navigator,} from '@tarojs/components'

import {
    dispatchGetInviteInfo
} from "@/apis/invite";

import Bgm from '@/components/Bgm';
import LoadMore from "@/components/LoadMore";
// import inviteTips from '../../assets/img/invite-tips.png';
// import inviteLetter from '../../assets/img/invite-letter.png';
import iconAbout from '../../assets/img/icon-about.png';
import iconShare from '../../assets/img/icon-share.png';
import './index.scss'

// 在页面中定义插屏广告
let interstitialAd = null

@connect(({invite}) => {
    return {
        invite: invite.invite,
        loadingStatus: invite.status,
    }
}, {
    dispatchGetInviteInfo
})

class Index extends Component {
    config = {
        navigationBarTitleText: '请柬',
        navigationStyle: 'custom',
        backgroundColor: '#fff',
        disableScroll: true,
    };

    // tab 点击时执行
    onTabItemTap(item) {
        console.log(item);
        // 在适合的场景显示插屏广告
        if (interstitialAd) {
            interstitialAd.show().catch((err) => {
                console.error(err)
            })
        }
    }

    onShareAppMessage() {
        const {
            invite
        } = this.props;
        return {
            title: `诚邀您参加${invite.groomName}&${invite.brideName}的婚礼`,
            path: '/pages/Index/index',
            imageUrl: 'https://forguo.cn/assets/wedding-app/imgs/share.png',
        }
    }

    render() {
        const {
            invite,
            loadingStatus
        } = this.props;
        return (
            <View className='page invite' style={{backgroundImage: 'url(' +  invite.backgroundImage + ')', backgroundColor: invite.backgroundColor}}>
                {/*<View className='invite-info'>*/}
                {/*    <Image className='invite-letter' src={inviteLetter} />*/}
                {/*    <View className='invite-couple'>*/}
                {/*        <View className='invite-groom'>新郎：{invite.groomName}</View>*/}
                {/*        <View className='invite-bride'>新娘：{invite.brideName}</View>*/}
                {/*    </View>*/}
                {/*    <View className='invite-date'>{invite.startTime}</View>*/}
                {/*    <View className='invite-address'>{invite.address}</View>*/}
                {/*    <View className='invite-address-tips'>*/}
                {/*        诚/挚/邀/请/您/参/加/我/们/的/婚/礼*/}
                {/*    </View>*/}
                {/*    <Image src={inviteTips} className='invite-tips' />*/}
                {/*</View>*/}
                <View className='invite-tool'>
                    {/* Bgm */}
                    {
                        invite.musicUrl &&
                        <Bgm />
                    }
                     {/*关于 */}
                    <Navigator url='/pages/About/index' className='invite-tool-btn invite-tool-about'>
                        <Image src={iconAbout} className='invite-tool-icon invite-tool-about-icon' />
                    </Navigator>
                    {/* 分享 */}
                    <Button openType='share' className='invite-tool-btn invite-tool-share'>
                        <Image src={iconShare} className='invite-tool-icon invite-tool-share-icon' />
                    </Button>
                </View>
                {
                    loadingStatus === 'loading' &&
                    <View className='spin-loading'>
                        <LoadMore noMoreText='暂无数据，请重试！' loadingStatus={loadingStatus} />
                    </View>
                }
            </View>
        )
    }
}

export default Index

