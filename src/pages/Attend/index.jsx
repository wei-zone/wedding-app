import Taro, {Component} from '@tarojs/taro'
import { View} from '@tarojs/components';
import { AtForm, AtInput, AtTextarea, AtButton, AtAvatar }  from 'taro-ui'
import {connect} from '@tarojs/redux';
import './index.scss'
import {
    dispatchSendAttend
} from '../../store/actions/attend';

@connect(({account, invite}) => ({
    userInfo: account.userInfo,
    invite: invite.invite,
}), {
    dispatchSendAttend
})

class Attend extends Component {

    state = {
        userName: '',
        userPhone: '',
        userAttend: '',
        userRemark: '',
    };

    config = {
        navigationBarTitleText: '我要出席',
        disableScroll: false
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

    handleInputChange = (state, value) => {
        this.setState({
            [state]: value
        })
    };

    onSubmit = () => {
        const {
            userName,
            userPhone,
            userAttend,
            userRemark
        } = this.state;

        if (!userName) {
            Taro.showToast({
                title: '请输入姓名！',
                icon: 'none'
            });
            return false;
        }

        if (!userPhone) {
            Taro.showToast({
                title: '请输入手机号！',
                icon: 'none'
            });
            return false;
        }

        if (!userAttend) {
            Taro.showToast({
                title: '请输入出席人数！',
                icon: 'none'
            });
            return false;
        }

        const {
            userInfo
        } = this.props;
        const {
            avatarUrl,
            nickName
        } = userInfo;

        this.props.dispatchSendAttend({
            userName,
            userPhone,
            userAttend,
            userRemark,
            avatarUrl,
            nickName
        }).then(res => {
            console.log(res);
            Taro.showToast({
                title: '提交成功~'
            });
            setTimeout(() => {
                Taro.navigateBack({
                    delta: 1
                })
            }, 800);
        });
        Taro.showLoading({
            title: '提交中...',
            mask: true,
        });
    };

    render() {
        const {
            userName,
            userPhone,
            userAttend,
            userRemark
        } = this.state;

        const {
            userInfo
        } = this.props;

        return (
            <View className='page attend'>
                <View className='attend-form'>
                    {
                        userInfo && userInfo.avatarUrl &&
                        <View className='avatar'>
                            <AtAvatar circle image={userInfo.avatarUrl} />
                        </View>
                    }

                    <AtForm>

                        {
                            userInfo && userInfo.nickName &&
                            <AtInput
                                required
                                name='userName'
                                title='昵称'
                                type='text'
                                maxLength={20}
                                placeholder='请输入您的姓名'
                                value={userInfo.nickName}
                                disabled
                            />
                        }

                        <AtInput
                          required
                          name='userName'
                          title='姓名'
                          type='text'
                          maxLength={20}
                          placeholder='请输入您的姓名'
                          value={userName}
                          onChange={this.handleInputChange.bind(this, 'userName')}
                        />

                        <AtInput
                          required
                          name='userName'
                          title='手机号'
                          type='phone'
                          maxLength={11}
                          placeholder='请输入您的手机号'
                          value={userPhone}
                          onChange={this.handleInputChange.bind(this, 'userPhone')}
                        />

                        <AtInput
                          required
                          name='userAttend'
                          title='出席人数'
                          type='number'
                          maxLength={3}
                          placeholder='请输入出席人数'
                          value={userAttend}
                          onChange={this.handleInputChange.bind(this, 'userAttend')}
                        />

                        <View className='remark'>
                            <AtTextarea
                              count
                              value={userRemark}
                              showConfirmBar
                              onChange={this.handleInputChange.bind(this, 'userRemark')}
                              placeholder='请填写您的备注需求~'
                              placeholderClass='placeholder-style'
                              height={290}
                              maxlength={200}
                            />
                        </View>

                    </AtForm>

                    <AtButton type='primary' size='normal' className='submit-btn' onClick={this.onSubmit.bind(this)}>提交</AtButton>

                </View>
            </View>
        )
    }
}

export default Attend

