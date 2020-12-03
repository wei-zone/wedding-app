import Taro, {Component} from '@tarojs/taro'
import {connect} from '@tarojs/redux';
import { Navigator, Image, Button, View } from '@tarojs/components'
import './index.scss'

import Bgm from '../../components/Bgm';

import inviteTips from '../../common/img/invite-tips.png';
import inviteLetter from '../../common/img/invite-letter.png';
import iconAbout from '../../common/img/icon-about.png';
import iconShare from '../../common/img/icon-share.png';

import LoadMore from "../../components/LoadMore";

import {
    dispatchGetInviteInfo
} from "../../store/actions/invite";

@connect(({account, invite}) => {
    return {
        invite: invite.invite,
        loadingStatus: invite.statue,
        userInfo: account.userInfo
    }
}, {
    dispatchGetInviteInfo
})

class Index extends Component {

    componentWillMount() {
        this.getInviteInfo();
    }
    config = {
        navigationBarTitleText: '邀请函',
        disableScroll: true,
        backgroundColor: '#fff',
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

    // 获取邀请函信息
    getInviteInfo = () => {
        this.props.dispatchGetInviteInfo();
    };

    render() {
        const {
            invite,
            loadingStatus
        } = this.props;
        return (
            <View className='page invite' style={{backgroundImage: 'url(' +  invite.banner + ')'}}>
                <View className='invite-info'>
                    <Image className='invite-letter' src={inviteLetter} />
                    <View className='invite-couple'>
                        <View className='invite-groom'>Mr.{invite.groomName}</View>
                        <View className='invite-bride'>Miss.{invite.brideName}</View>
                    </View>
                    <View className='invite-date'>{invite.startTime}</View>
                    <View className='invite-address'>{invite.address}</View>
                    <View className='invite-address-tips'>
                        诚/挚/邀/请/您/参/加/我/们/的/婚/礼
                    </View>
                    <Image src={inviteTips} className='invite-tips' />
                </View>
                <View className='invite-tool'>
                    {/* Bgm */}
                    {
                        invite.musicUrl &&
                        <Bgm />
                    }
                    {/* 关于 */}
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

