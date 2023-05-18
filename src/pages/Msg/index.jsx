import Taro, {Component} from '@tarojs/taro'
import { Image, View } from '@tarojs/components';
import {connect} from "@tarojs/redux";
import dayjs from "dayjs";
import { dispatchSendMsg} from "@/apis/msg";
import LoadMore from "../../components/LoadMore";
import SendMsg from "./components/SendMsg"
import GetUserInfo from '../../components/GetUserInfo';
import iconWrite from "../../assets/img/icon-write.png";
import iconAttend from "../../assets/img/icon-attend.png";
import './index.scss'

import request from "../../store/request";

@connect(({account, invite}) => ({
    userInfo: account.userInfo,
    invite: invite.invite
}), {
    dispatchSendMsg,
})
class Msg extends Component {
    state = {
        list: [],
        current: 0,
        loadingStatus: 'loading',
        isMore: true,
        msgVisible: false,
        showAttend: false, // 礼金薄展示
    };

    componentWillMount() {
        this.getList();
    }
    config = {
        enablePullDownRefresh: true,
        navigationBarTitleText: '祝福',
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

    onPullDownRefresh () {
        this.setState({
            list: [],
            current: 0,
            loadingStatus: 'loading',
            isMore: true,
        }, () => {
            this.getList();
        });
    };

    onReachBottom () {
        this.getList();
    };

    onHandleAddMsg = (msg) => {
        let {
            list
        } = this.state;
        list.unshift({
            ...msg
        });
        this.setState({
            list
        });
    };

    getList = async () => {
        const {
            isMore,
            current
        } = this.state;
        if (!isMore) {
            return false;
        }
        try {
            const res = await request.request({
                url: '/wedding_msgs',
                data: {
                    skip: current * 10,
                    limit: 10,
                }
            })
            console.log('list', res.data)
            if (res.data.length <= 0) {
                this.setState({
                    isMore: false,
                    loadingStatus: 'noMore'
                });
            } else {
                this.setState({
                    list: [...this.state.list, ...res.data],
                    current: current + 1
                });
                Taro.vibrateShort();
                if (res.data.length < 10) {
                    this.setState({
                        isMore: false,
                        loadingStatus: 'noMore'
                    });
                }
            }
        } catch (e) {
            console.log(e)
        }
    };

    // 列表渲染
    renderList = () => {
        let {
            list
        } = this.state;
        return list.map((item) => {
            return (
                <View className='msg-item' key={Math.random() * Math.random()}>
                    <View className='msg-item__user-avatar'>
                        <Image className='msg-item__user-avatar-img' src={item.avatarUrl} />
                    </View>
                    <View className='msg-item__desc'>
                        <View className='msg-item__user-info'>
                            <View className='msg-item__user-name'>
                                {item.nickName}
                            </View>
                            <View className='msg-item__msg-time'>
                                {dayjs(item._createTime).format('YYYY-MM-DD HH:mm:ss')}
                            </View>
                        </View>
                        <View className='msg-item__msg-text'>{item.userMsg}</View>
                    </View>
                </View>
            )
        });
    };

    render() {
        const {
            loadingStatus,
            msgVisible,
            showAttend,
        } = this.state;
        const {
            invite,
        } = this.props;
        const { msg } = invite;
        return (
            <View className='page msg'>
                <View className='ad-container'>
                    <ad unit-id='adunit-a46f1899f153c651' ad-intervals='33'></ad>
                </View>
                <View className='msg-list' onLongTap={()=> {
                    this.setState({
                        showAttend: true
                    })
                }}
                >
                    {
                        this.renderList()
                    }
                </View>

                <LoadMore loadingStatus={loadingStatus} />

                {
                    msg &&
                    <View className='msg-send'>
                        <GetUserInfo onHandleComplete={() => {
                            this.setState({
                                msgVisible: true
                            })
                        }}
                        />
                        <Image src={iconWrite} className='msg-send-icon' />
                        <View className='msg-send-btn'>
                            留下祝福
                        </View>
                    </View>
                }

                {
                    showAttend &&
                    <View className='attend-send' onClick={() => {
                        Taro.navigateTo({
                            url: '/pages/Attend/index'
                        })
                    }}
                    >
                        <Image src={iconAttend} className='attend-send-icon' />
                        <View className='attend-send-btn'>
                            礼金薄
                        </View>
                    </View>
                }

                {
                    msg &&
                    <SendMsg visible={msgVisible} onHandleAddMsg={(msgT) => {
                        this.onHandleAddMsg(msgT)
                    }} onHandleCloseMsg={() => {
                        this.setState({
                            msgVisible: false
                        })
                    }}
                    />
                }
            </View>
        )
    }
}

export default Msg

