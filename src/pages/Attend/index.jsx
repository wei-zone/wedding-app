import Taro, {Component} from '@tarojs/taro'
import { View, Picker} from '@tarojs/components';
import {AtForm, AtInput, AtTextarea, AtButton, AtListItem, AtList} from 'taro-ui'
import {connect} from '@tarojs/redux';
import {
    dispatchSendAttend
} from '@/apis/attend';
import './index.scss'

@connect(({invite}) => ({
    invite: invite.invite,
}), {
    dispatchSendAttend
})

class Attend extends Component {

    state = {
        userTypeIndex: 0,
        userType: 'bridegroom',
        userName: '',
        userPhone: '',
        userRelation: '',
        userGift: '',
        userRemark: '',
        options: [
            { label: '新郎方', value: 'bridegroom' },
            { label: '新娘方', value: 'bride' },
        ]
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
            imageUrl: 'https://forguo.cn/assets/wedding-app/imgs/share.png',
        }
    }

    handleInputChange = (state, value) => {
        this.setState({
            [state]: value
        })
    };
    handleInputChangeType = (state) => {
        this.setState({
            [state]: this.state.options[this.state.userTypeIndex].value
        })
    };
    onSubmit = () => {
        const {
            userType,
            userName,
            userPhone,
            userRelation,
            userGift,
            userRemark
        } = this.state;

        if (!userName) {
            Taro.showToast({
                title: '请输入姓名！',
                icon: 'none'
            });
            return false;
        }
        Taro.showLoading({
            title: '提交中...',
            mask: true,
        });
        this.props.dispatchSendAttend({
            userType,
            userName,
            userPhone,
            userRelation,
            userGift,
            userRemark,
        }).then(() => {
            Taro.showToast({
                title: '提交成功~'
            });
        });
    };

    render() {
        const {
            userName,
            userPhone,
            userRelation,
            userGift,
            userRemark
        } = this.state;

        return (
            <View className='page attend'>
                <View className='attend-form'>
                    <AtForm>
                        <Picker mode='selector' range={this.state.options} value={this.state.userTypeIndex} rangeKey='label' onChange={this.handleInputChangeType.bind(this, 'userType')}>
                            <AtList>
                                <AtListItem
                                  title='礼薄方'
                                  extraText={this.state.options[this.state.userTypeIndex].label}
                                />
                            </AtList>
                        </Picker>
                        <AtInput
                          required
                          name='userName'
                          title='姓名'
                          type='text'
                          maxLength={20}
                          placeholder='请输入姓名'
                          value={userName}
                          onChange={this.handleInputChange.bind(this, 'userName')}
                        />

                        <AtInput
                          required
                          name='userGift'
                          title='礼金(元)'
                          type='number'
                          maxLength={4}
                          placeholder='请输入礼金'
                          value={userGift}
                          onChange={this.handleInputChange.bind(this, 'userGift')}
                        />

                        <AtInput
                          name='userRelation'
                          title='关系'
                          type='text'
                          maxLength={11}
                          placeholder='请输入关系'
                          value={userRelation}
                          onChange={this.handleInputChange.bind(this, 'userRelation')}
                        />

                        <AtInput
                          name='userName'
                          title='手机号'
                          type='phone'
                          maxLength={11}
                          placeholder='请输入手机号'
                          value={userPhone}
                          onChange={this.handleInputChange.bind(this, 'userPhone')}
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

