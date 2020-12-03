import Taro, {Component} from '@tarojs/taro'
import {connect} from '@tarojs/redux';
import {Button, Textarea, Video, View} from '@tarojs/components'
import './index.scss'
import {getRandomColor} from "../../util";

import LoadMore from "../../components/LoadMore";
import GetUserInfo from '../../components/GetUserInfo';

import { dispatchSendMsg, dispatchGetMsg } from '../../store/actions/msg';
import {
    dispatchGetVideo
} from '../../store/actions/video';

let barrageLoop = null;

@connect(({account, invite}) => ({
    userInfo: account.userInfo,
    invite: invite.invite
}), {
    dispatchGetMsg,
    dispatchSendMsg,
    dispatchGetVideo
})

class Bless extends Component {
    constructor(props) {
        super(props);
        this.barrageComp = Taro.createRef();
        this.state = {
            msg: '',
            loadingStatus: 'loading',
            current: 0,
            isMore: true,
            videoVisible: true,
            barrageVisible: true,
            video: {
                src: '',
                poster: '',
            }
        };
    }
    componentDidMount() {
        this.getInfo();
        this.initBarrage();
    }
    componentWillUnmount() {
        clearTimeout(barrageLoop);
    }
    config = {
        navigationBarTitleText: '喜悦',
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
            duration: 60,
            lineHeight: 2,
            mode: 'separate',
            padding: [10, 0, 10, 0],
            tunnelShow: false,
            animationend: () => {
                console.log('animationend');
                setTimeout(() => {
                    this.setState({
                        barrageVisible: false
                    });
                    clearTimeout(barrageLoop);
                }, 500);
            }
        })
    }

    getInfo = () => {
        this.props.dispatchGetVideo().then((res) => {
            if (res.data.length <= 0) {
                this.setState({
                    loadingStatus: 'noMore'
                });
            } else {
                let info = res.data[0];
                const {
                    src,
                    poster,
                    videoVisible
                } = info;
                if (!videoVisible) {
                    Taro.showModal({
                        title: '提示',
                        content: '敬请期待~'
                    })
                }
                this.setState({
                    videoVisible,
                    video: {
                        src,
                        poster,
                    },
                });
                this.handleAddBarrage();
                setTimeout(() => {
                    this.setState({
                        loadingStatus: 'isMore',
                    })
                }, 150)
            }
        }, () => {
            this.setState({
                loadingStatus: 'noMore'
            });
        });
    };

    handleAddBarrage () {
        const {
            isMore,
            current
        } = this.state;
        if (!isMore) {
            return false;
        }
        this.props.dispatchGetMsg(current).then(res => {
            if (res.data.length <= 0) {
                this.setState({
                    isMore: false,
                });
            } else {
                this.setState({
                    current: current + 1
                });
                let barrage = res.data.map(item => {
                    return {
                        content: item.userMsg,
                        color: getRandomColor()
                    }
                });
                this.barrage.open();
                this.barrage.addData(barrage);
                barrageLoop = setTimeout(() => {
                    this.handleAddBarrage();
                }, 10000);
                if (res.data.length < 10) {
                    this.setState({
                        isMore: false,
                    });
                }
            }
        }, () => {
            this.setState({
                isMore: false,
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
                type: 'barrage'
            }).then(() => {
                // 发送弹幕
                this.barrage.addData([
                    {
                        content: msg,
                        color: getRandomColor()
                    }
                ]);
                // 添加弹幕数据
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
            msg,
            videoVisible,
            barrageVisible
        } = this.state;

        return (
            <View className='page bless'>
                <View className='bless-media' style={{
                    display: videoVisible ? 'block' : 'none'
                }}
                >
                    <Video
                      className='bless-media__video'
                      src={video.src}
                      loop controls
                      poster={video.poster}
                      initialTime='0'
                      id='video'
                      vslide-gesture
                      vslide-gesture-in-fullscreen
                      autoplay={false}
                      enable-play-gesture
                      onPlay={() => {
                          // bgm暂停
                          Taro.pauseBackgroundAudio()
                      }}
                      onError={this.handleVideoError.bind(this)}
                    >
                        {
                            barrageVisible &&
                            <barrage className='barrage' ref={this.barrageComp} />
                        }
                    </Video>
                </View>

                <View className='ad-container'>
                    <ad unit-id='adunit-a46f1899f153c651' ad-intervals='33'></ad>
                </View>

                {/*留言板 */}
                {/*傻叉不给通过，先隐藏吧*/}
                {
                    videoVisible &&
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
                }

                <View className='bless-tool'>
                    {
                        videoVisible &&
                        <Button className='bless-tool__send-msg'>
                            <GetUserInfo onHandleComplete={this.handleSendBless.bind(this)} />
                            发送留言
                        </Button>
                    }

                    <Button className='bless-tool__share' openType='share'>分享喜悦</Button>
                    {/*<Button className='bless-tool__share' onClick={this.handleAddBarrage.bind(this)}>开启弹幕</Button>*/}
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

