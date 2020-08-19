import Taro, {Component} from '@tarojs/taro'
import {connect} from '@tarojs/redux';
import {Button, Textarea, Video, View} from '@tarojs/components'
import './index.scss'
import {getRandomColor} from "../../util";

import cloud from '../../service/cloud';
import LoadMore from "../../components/LoadMore";
// import GetUserInfo from '../../components/GetUserInfo';

import { dispatchSendMsg } from '../../store/actions/msg';

@connect(({account, invite}) => ({
    userInfo: account.userInfo,
    invite: invite.invite
}), {
    dispatchSendMsg
})

class Bless extends Component {
    constructor(props) {
        super(props);
        this.barrageComp = Taro.createRef();
        this.state = {
            loadingStatus: 'loading',
            video: {
                src: '',
                poster: '',
            }
        };
    }
    componentDidMount() {
        this.initBarrage();
        this.getInfo();
    }
    config = {
        navigationBarTitleText: '祝福',
        disableScroll: true,
        "usingComponents": {
            "barrage": "../../components/miniprogram-barrage",
        }
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

    initBarrage() {
        // 弹幕初始化
        const barrageComp = this.barrageComp.current;
        this.barrage = barrageComp.getBarrageInstance({
            font: 'bold 16px sans-serif',
            duration: 10,
            lineHeight: 2,
            mode: 'separate',
            padding: [10, 0, 10, 0],
            tunnelShow: false
        });
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
                    } = info;
                    this.setState({
                        loadingStatus: 'isMore',
                        video: {
                            src,
                            poster,
                        },
                    });
                    this.handleAddBarrage(info.barrage);
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

    handleAddBarrage (data) {
        let barrage = data.map(item => {
            return {
                content: item,
                color: getRandomColor()
            }
        });
        console.log(barrage);
        this.barrage.open();
        this.barrage.addData(barrage);
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
                this.barrage.addData(); // 添加弹幕数据
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

    handleVideoError = (e) => {
        console.log(e);
        Taro.showToast({
            title: e.detail.errMsg || '播放出错，请重新进入！',
            icon: 'none'
        })
    };

    render() {
        const {
            loadingStatus,
            video,
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
                      onError={this.handleVideoError.bind(this)}
                    >
                        <barrage className='barrage' ref={this.barrageComp} />
                    </Video>
                </View>
                {/* 留言板 */}
                {/* 傻叉不给通过，先隐藏吧*/}
                {/*<View className='bless-msg'>*/}
                {/*    <Textarea*/}
                {/*      value={msg}*/}
                {/*      show-confirm-bar confirm-type='发送'*/}
                {/*      onInput={this.handleInput.bind(this, 'msg')}*/}
                {/*      className='bless-msg-input'*/}
                {/*      maxlength={200}*/}
                {/*      placeholder='请输入弹幕留言，将同步到留言列表~'*/}
                {/*      placeholderClass='placeholder-style'*/}
                {/*    />*/}
                {/*</View>*/}

                <View className='bless-tool'>
                    {/*<Button className='bless-tool__send-msg'>*/}
                    {/*    <GetUserInfo onHandleComplete={this.handleSendBless.bind(this)} />*/}
                    {/*    发送留言*/}
                    {/*</Button>*/}
                    <Button className='bless-tool__share' openType='share'>分享喜悦</Button>
                    <Button className='bless-tool__share' onClick={this.handleAddBarrage.bind(this)}>开启弹幕</Button>
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

