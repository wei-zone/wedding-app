import Taro, {Component} from '@tarojs/taro'
import { Image, View } from '@tarojs/components';
import { AtTextarea } from 'taro-ui';
import {connect} from '@tarojs/redux';
import iconBack from "../../../../assets/img/icon-msg-back.png";
import iconSend from "../../../../assets/img/icon-msg-send.png";
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
        console.log(value)
        this.setState({
            [state]: value
        })
    };

    onSendMsg = () => {
        const {
            msg
        } = this.state;
        console.log(msg)
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
                Taro.showToast({
                    title: '留言成功~',
                });
                this.setState({
                    msg: ''
                });
            })
        }
    };

    // 阻止事件冒泡
    onTouchMove = (e) => {
        e.stopPropagation();
    };

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
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

export default SendMsg

