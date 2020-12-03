import Taro, {Component} from '@tarojs/taro'
import { Image, View } from '@tarojs/components';
import {connect} from "@tarojs/redux";
import moment from "moment";
import LoadMore from "../../components/LoadMore";
import SendMsg from "./components/SendMsg"
import GetUserInfo from '../../components/GetUserInfo';
import iconWrite from "../../common/img/icon-write.png";
import iconAttend from "../../common/img/icon-attend.png";
import './index.scss'

import {dispatchGetMsg, dispatchSendMsg} from "../../store/actions/msg";

@connect(({account, invite}) => ({
    userInfo: account.userInfo,
    invite: invite.invite
}), {
    dispatchSendMsg,
    dispatchGetMsg
})
class Msg extends Component {
    state = {
        list: [],
        current: 0,
        loadingStatus: 'loading',
        isMore: true,
        msgVisible: false
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
        const DateFormat = 'YYYY-MM-DD HH:mm:ss';
        let {
            list
        } = this.state;
        list.unshift({
            ...msg,
            "createTime": moment().format(DateFormat)
        });
        this.setState({
            list
        });
    };

    getList = () => {
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
        }, () => {
            this.setState({
                isMore: false,
                loadingStatus: 'noMore'
            });
        });
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
                                {item.createTime}
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
            msgVisible
        } = this.state;
        const {
            invite
        } = this.props;
        const { msg } = invite; // Todo
        return (
            <View className='page msg'>
                <View className='ad-container'>
                    <ad unit-id='adunit-a46f1899f153c651' ad-intervals='33'></ad>
                </View>
                <View className='msg-list'>
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
                    msg &&
                    <View className='attend-send'>
                        <GetUserInfo onHandleComplete={() => {
                            Taro.navigateTo({
                                url: '/pages/Attend/index'
                            })
                        }}
                        />
                        <Image src={iconAttend} className='attend-send-icon' />
                        <View className='attend-send-btn'>
                            我要出席
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

