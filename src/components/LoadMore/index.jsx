import React from 'react'
import {View} from '@tarojs/components'
import './index.scss'

const LoadMore = function (props) {
    const {
        loadingStatus, // loading 状态显示加载状态，noMore 显示无更多数据
        loadingType: type, // dot-white(白点)、dot-gray（黑点）、circle（菊花）
        noMoreText //没有更多的文案
    } = props;
    return (
        <View className='we-load-more'>
            {
                loadingStatus === 'loading' &&
                <View className='weui-loadmore'>
                    <mp-loading type={type || 'dot-gray'} show />
                </View>
            }
            {
                loadingStatus === 'noMore' &&
                <View className='weui-loadmore weui-loadmore_line'>
                    <View className='weui-loadmore__tips weui-loadmore__tips_in-line'>{noMoreText || '- 没有更多了 -'}</View>
                </View>
            }
        </View>
    )
};

export default LoadMore
