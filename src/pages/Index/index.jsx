import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {connect} from "react-redux";
import { Navigator, Image, Button, View } from '@tarojs/components'
import './index.scss'
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
    state = {
        navBarTop: 44 + 36 + 6 + 45,
    };


    componentWillMount() {
        this.getSystemInfo();
        this.getInviteInfo();
    }
    onShareAppMessage () {
        const {
            invite
        } = this.props;
        return {
            title: `诚邀您参加${invite.groomName}&${invite.brideName}的婚礼`,
        }
    }

    getInviteInfo = () => {
        this.props.dispatchGetInviteInfo();
    };

    getSystemInfo = () => {
        let systemInfo = Taro.systemInfo;
        let menuButtonInfo = Taro.menuButtonInfo;
        this.setState({
            navBarTop: (systemInfo.statusBarHeight || 44) + (menuButtonInfo.height || 32) + 6 + 20
        });
    };

    render() {
        const {
            navBarTop,
        } = this.state;
        const {
            invite,
            loadingStatus
        } = this.props;
        console.log(loadingStatus);
        return (
            <View className='page invite'>
                <Image className='invite-banner' src={invite.banner} />
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
                <View className='invite-tool' style={{
                    top: `${navBarTop}px`
                }}
                >
                    <Navigator url='/pages/About/index' className='invite-tool-btn invite-tool-about'>
                        <Image src={iconAbout} className='invite-tool-icon invite-tool-about-icon' />
                    </Navigator>
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

