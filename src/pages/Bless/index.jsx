import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, Textarea, Video, View} from '@tarojs/components'
import './index.scss'
import {getRandomColor} from "../../util";

import cloud from '../../service/cloud';
import LoadMore from "../../components/LoadMore";
import GetUserInfo from '../../components/GetUserInfo';

import { dispatchSendMsg } from '../../store/actions/msg';

let videoContext = null;

@connect(({account, invite}) => ({
    userInfo: account.userInfo,
    invite: invite.invite
}), {
    dispatchSendMsg
})
class Bless extends Component {
    state = {
        loadingStatus: 'loading',
        video: {
            src: '',
            poster: '',
            danmuList: []
        },
        showShare: false,
    };

    componentWillMount() {
        this.getInfo();
    }
    componentDidMount() {
        videoContext = Taro.createVideoContext('video')
    }

    componentWillUnmount() {
        videoContext = null;
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

    getInfo = () => {
        Taro.showNavigationBarLoading();
        cloud.get(
            'wedding_video'
        ).then((res) => {
            if (res.errMsg === 'collection.get:ok') {
                if (res.data.length <= 0) {
                    this.setState({
                        loadingStatus: 'noMore'
                    });
                } else {
                    let info = res.data[0];
                    const {
                        src,
                        poster,
                        danmuList
                    } = info;
                    this.setState({
                        loadingStatus: 'isMore',
                        video: {
                            src,
                            poster,
                            danmuList
                        },
                    });
                }
            }
            Taro.hideNavigationBarLoading();
            Taro.stopPullDownRefresh();
        }, (err) => {
            console.log(err);
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            this.setState({
                loadingStatus: 'noMore'
            });
            Taro.showToast({
                title: err.errMsg || '请求失败，请重试！',
                icon: 'none',
                duration: 3000
            });
        });
    };

    handleInput = (state, e) => {
        this.setState({
            [state]: e.detail.value
        })
    };

    // 送上留言祝福
    handleSendBless = (userInfo) => {
        const {
            msg
        } = this.state;
        if (!msg) {
            Taro.showToast({
                title: '请输入留言内容!',
                icon: 'none'
            });
        } else {
            const {
                avatarUrl,
                nickName
            } = userInfo;
            this.props.dispatchSendMsg({
                userMsg: msg,
                avatarUrl,
                nickName,
                type: 'danmu'
            }).then(() => {
                // 发送弹幕
                videoContext.sendDanmu({
                    text: msg,
                    color: getRandomColor()
                });
                Taro.hideLoading();
                Taro.showToast({
                    title: '留言成功~',
                });
                this.setState({
                    msg: ''
                })
            }, (err) => {
                Taro.showToast({
                    title: err.errMsg || '请求失败，请重试！',
                    icon: 'none',
                    duration: 3000
                });
            })
        }
    };

    // 打开分享
    handleOpenShare = () => {
        this.setState({
            showShare: true
        })
    };

    // 关闭分享
    handleCloseShare = (e) => {
        this.setState({
            showShare: false
        })
    };

    handleVideoError = (e) => {
        console.log(e);
        Taro.showToast({
            title: e.detail.errMsg || '播放出错，请重新进入！',
            icon: 'none'
        })
    };

    onTimeUpdate = () => {
    };

    handleShareClick = (e) => {
        console.log(e);
        Taro.showShareMenu();
    };

    render() {
        const {
            loadingStatus,
            video,
            msg,
            showShare
        } = this.state;

        return (
            <View className='page bless'>
                <View className='bless-media'>
                    <Video
                      className='bless-media__video'
                      src={video.src}
                      controls
                      autoplay={false}
                      poster={video.poster}
                      initialTime='0'
                      id='video'
                      loop={false}
                      muted={false}
                      danmuList={video.danmuList}
                      enableDanmu
                      danmuBtn
                      onError={this.handleVideoError.bind(this)}
                      onTimeUpdate={this.onTimeUpdate.bind(this)}
                    />
                </View>
                {/* 留言板 */}
                <View className='bless-msg'>
                    <Textarea
                      value={msg}
                      show-confirm-bar confirm-type='发送'
                      onInput={this.handleInput.bind(this, 'msg')}
                      className='bless-msg-input'
                      maxlength={200}
                      placeholder='请输入弹幕留言，将同步到留言列表~'
                      placeholderClass='placeholder-style'
                    />
                </View>

                <View className='bless-tool'>
                    <Button className='bless-tool__send-msg'>
                        <GetUserInfo onHandleComplete={this.handleSendBless.bind(this)} />
                        发送留言
                    </Button>
                    <Button className='bless-tool__share' openType='share'>分享喜悦</Button>
                </View>

                <View className='bless-share'>
                    <mp-halfScreenDialog
                      onbuttontap={this.handleShareClick.bind(this)}
                      onClose={this.handleCloseShare.bind(this)}
                      show={showShare}
                      maskClosable
                      title='分享喜悦'
                      desc='分享给好友，将直接发送给好友~'
                      tips='分享朋友圈，将会生产一张海报~'
                      buttons={[
                            {
                                type: 'default',
                                className: 'bless-share-moment',
                                text: '辅助操作',
                                value: 0,
                            },
                            {
                                type: 'default',
                                className: 'bless-share-partner',
                                text: '主操作',
                                value: 1
                            }
                        ]}
                    />
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

export default Bless

