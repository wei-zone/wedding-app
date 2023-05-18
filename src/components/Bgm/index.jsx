import Taro, {Component} from '@tarojs/taro'
import {CoverView } from "@tarojs/components";
import {connect} from "@tarojs/redux";
import './_index.scss';

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
        let dataUrl = this.props.invite.musicUrl || '';
        let coverImgUrl = this.props.invite.coverImgUrl || '';
        let musicTitle = this.props.invite.musicTitle || '';
        Taro.playBackgroundAudio({
            dataUrl,
            title: musicTitle,
            coverImgUrl
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

        let dataUrl = this.props.invite.musicUrl || '';
        let coverImgUrl = this.props.invite.coverImgUrl || '';
        let musicTitle = this.props.invite.musicTitle || '';
        status === 'play' ?
            Taro.pauseBackgroundAudio()
            :
            Taro.playBackgroundAudio({
                dataUrl,
                title: musicTitle,
                coverImgUrl
            });
    };

    render() {
        const {
            status
        } = this.state;
        return (
            <CoverView className='bgm-component' onClick={this.onChangePlayStatus.bind(this)}>
                <CoverView className='music-bg'>
                    <CoverView className={status === 'play' ? 'music-status play' : 'music-status pause'}>
                        <CoverView className='music-dot' />
                        <CoverView className='music-dot' />
                        <CoverView className='music-dot' />
                        <CoverView className='music-dot' />
                        <CoverView className='music-dot' />
                        <CoverView className='music-dot' />
                    </CoverView>
                </CoverView>
            </CoverView>
        )
    }
}
