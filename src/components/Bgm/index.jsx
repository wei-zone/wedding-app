import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import './_index.scss';

let musicUrl = 'https://isure.stream.qqmusic.qq.com/C4000043FXhy2dXGa8.m4a?guid=1473435776&vkey=32F551E35223E04D1A713E3520FAE93846D29F3B6E4F71ED30D7B98FC44E0161C339811FC9C2EEEBE22B50E205DBAA95E8AA362921F1F553&uin=0&fromtag=66';

@connect(({invite}) => {
    return {
        invite: invite.invite,
    }
})

export default class Bgm extends Component {
    state = {
        status: 'play'
    };

    componentDidMount() {
        console.log(this.props.invite);
        Taro.playBackgroundAudio({
            dataUrl: musicUrl,
            title: '只想一生跟你走',
            coverImgUrl: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/logo.png'
        });

        // 监听背景音乐播放状态
        Taro.onBackgroundAudioPlay(() => {
            this.setState({
                status: 'play'
            });
        });

        Taro.onBackgroundAudioPause(() => {
            this.setState({
                status: 'pause'
            });
        });
        Taro.onBackgroundAudioStop(() => {
            this.setState({
                status: 'pause'
            });
        });
    }

    onChangePlayStatus() {
        let {
            status
        } = this.state;
        this.setState({
            status: status === 'play' ? 'pause' : 'play'
        });
        status === 'play' ? Taro.pauseBackgroundAudio() : Taro.playBackgroundAudio({
            dataUrl: musicUrl,
            title: '只想一生跟你走',
            coverImgUrl: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/logo.png'
        });
    };

    render() {
        const {
            status
        } = this.state;
        return (
            <View className='bgm-component' onClick={this.onChangePlayStatus.bind(this)}>
                <View className='music-bg'>
                    <View className={status === 'play' ? 'music-status play' : 'music-status pause'}>
                        <View className='music-dot' />
                        <View className='music-dot' />
                        <View className='music-dot' />
                        <View className='music-dot' />
                        <View className='music-dot' />
                        <View className='music-dot' />
                    </View>
                </View>
            </View>
        )
    }
}
