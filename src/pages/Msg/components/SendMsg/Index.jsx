import Taro, {Component} from '@tarojs/taro'
import { Image, View } from '@tarojs/components';
import { AtTextarea } from 'taro-ui';
import {connect} from '@tarojs/redux';
import iconBack from "../../../../common/img/icon-msg-back.png";
import iconSend from "../../../../common/img/icon-msg-send.png";
import './index.scss'
import { dispatchSendMsg } from '../../../../store/actions/msg';

@connect(({account}) => ({
    userInfo: account.userInfo
}), {
    dispatchSendMsg
})

class SendMsg extends Component {
    state = {
        msg: ''
    };

    componentWillMount() {}

    onMaskClose = () => {
        this.props.onHandleCloseMsg();
    };

    handleInput = (state, value) => {
        this.setState({
            [state]: value
        })
    };

    onSendMsg = () => {
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
                userInfo
            } = this.props;
            const {
                avatarUrl,
                nickName
            } = userInfo;
            const params = {
                userMsg: msg,
                avatarUrl,
                nickName,
                type: 'msg',
                ...userInfo
            };
            this.props.dispatchSendMsg(params).then(() => {
                this.props.onHandleAddMsg(params);
                Taro.hideLoading();
                Taro.showToast({
                    title: '留言成功~',
                });
                this.setState({
                    msg: ''
                });
            }, (err) => {
                Taro.hideLoading();
                console.log(err);
                Taro.showToast({
                    title: err.errMsg || '请求失败，请重试！',
                    icon: 'none',
                    duration: 3000
                });
            })
        }
    };

    // 阻止事件冒泡
    onTouchMove = (e) => {
        e.stopPropagation();
    };

    // 情话服务
    getJoke () {

        // 随机数
        function random(min, max) {
            if(max == null) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
        }

        Taro.showLoading({
            title: '请稍后...',
            mask: true,
        });
        const mode = random(3, 4); // 输入类型编码，1: 冷笑话, 2: 普通笑话, 3: 浪漫情话, 4: 土味情话, 5: 心灵鸡汤
        console.log({
            '3': '浪漫情话',
            '4': '土味情话',
        }[mode]);
        // eslint-disable-next-line no-undef
        wx.serviceMarket.invokeService({
            service: 'wxcae50ba710ca29d3',
            api: 'jokebot',
            data: {
                mode
            },
        }).then(res => {
            Taro.hideLoading();
            if (res.errMsg === "invokeService:ok") {
                console.log(res.data.data_list);
                if (res.data.data_list && res.data.data_list.length > 0) {
                    this.setState({
                        msg: res.data.data_list[0].result || '',
                    });
                }
            } else {
                Taro.showModal({
                    title: '获取失败，请手动输入吧~',
                    content: res.errMsg,
                })
            }
        }).catch(err => {
            Taro.hideLoading();
            Taro.showModal({
                title: '获取失败，请手动输入吧~',
                content: err + '',
            })
        })
    }

    render() {
        const {
            visible,
        } = this.props;
        const {
            msg
        } = this.state;
        return (
            <View>
                {
                    visible &&
                    <View className='send-msg' onTouchMove={this.onTouchMove.bind(this)}>
                        <View className='send-msg-mask'
                          onClick={this.onMaskClose.bind(this)}
                        />
                        <View className='send-msg-inner'>
                            <View className='send-msg-inner__tool-bar'>
                                <View className='send-msg-inner__tool-btn' onClick={this.onMaskClose.bind(this)}>
                                    <Image src={iconBack} className='send-msg-inner__back-icon' />
                                </View>
                                <View className='send-msg-inner__tool-btn' onClick={this.onSendMsg.bind(this)}>
                                    <Image src={iconSend} className='send-msg-inner__send-icon' />
                                </View>
                            </View>
                            <View className='send-msg-inner__input'>
                                <AtTextarea
                                  count
                                  value={msg}
                                  showConfirmBar
                                  onConfirm={this.onSendMsg.bind(this)}
                                  onChange={this.handleInput.bind(this, 'msg')}
                                  placeholder='请留下您的祝福~'
                                  className='send-msg-inner__area'
                                  placeholderClass='placeholder-style'
                                  height={330}
                                  maxlength={200}
                                />
                                <View className='send-msg-random' onClick={this.getJoke.bind(this)}>随机来一条</View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

export default SendMsg

