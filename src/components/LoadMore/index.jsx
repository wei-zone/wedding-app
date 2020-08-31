import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import './index.scss'

class LoadMore extends Component {
    render() {
        const {
            loadingStatus, // loading 状态显示加载状态，noMore 显示无更多数据
            noMoreText // 没有更多的文案
        } = this.props;
        return (
            <View className='we-load-more'>
                <AtLoadMore
                  status={loadingStatus}
                  noMoreTextStyle='font-size: 14px'
                  loadingText='加载中...'
                  noMoreText={noMoreText}
                />
            </View>
        )
    }
}

LoadMore.defaultProps = {
    loadingStatus: 'loading',
    noMoreText: '- 没有更多了 -',
};

export default LoadMore
