import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Swiper, SwiperItem, Image, View} from '@tarojs/components'
import './index.scss'

import cloud from '../../service/cloud';
import LoadMore from "../../components/LoadMore";

class Photo extends Component {
    state = {
        list: [],
        loadingStatus: 'loading'
    };

    componentWillMount() {
        this.getList();
    }

    getList = () => {
        Taro.showNavigationBarLoading();
        cloud.get('wedd_photos' ).then((res) => {
            if (res.errMsg === 'collection.get:ok') {
                if (res.data.length <= 0) {
                    this.setState({
                        loadingStatus: 'noMore'
                    });
                } else {
                    this.setState({
                        list: [ ...res.data],
                        loadingStatus: 'isMore'
                    });
                }
            }
            Taro.hideNavigationBarLoading();
            Taro.stopPullDownRefresh();
        }, (err) => {
            console.log(err);
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            this.setState({
                loadingStatus: 'noMore'
            });
            Taro.showToast({
                title: err.errMsg || '请求失败，请重试！',
                icon: 'none',
                duration: 3000
            });
        });
    };

    handleImgSave = (src) => {
        console.log(src);
        Taro.getImageInfo({
            src,
            success: (res) => {
                Taro.saveImageToPhotosAlbum({
                    filePath: res.path,
                    success: () => {
                        Taro.showToast({
                            title: '保存成功~'
                        })
                    },
                    fail: (e) => {
                        if (e.errMsg.indexOf('auth') > 0) {
                            Taro.showModal({
                                title: "提示",
                                content: "打开相册权限才能保存图片哦！",
                                success(mres) {
                                    if (mres.confirm) {
                                        // console.log("confirm, continued");
                                        console.log('start.Taro.openSetting');
                                        // 取消过授权需要打开设置页面
                                        Taro.openSetting({
                                            success: function (rrres) {
                                                console.log(rrres);
                                                if (rrres.authSetting['scope.writePhotosAlbum']) {
                                                    Taro.showToast({
                                                        title: '权限已打开，请重新保存~',
                                                        icon: 'none'
                                                    })
                                                }
                                            },
                                            fail: function (error) {
                                                console.log('tt.openSetting.fail', error);
                                            },
                                        });
                                    } else if (mres.cancel) {
                                        // console.log("cancel, cold");
                                        //成功提示
                                        Taro.showToast({
                                            title: "取消保存",
                                            icon: 'none',
                                        });
                                    }
                                }
                            })
                        } else if (e.errMsg.indexOf('cancel') > 0) {
                            Taro.showToast({
                                title: '取消保存!',
                                icon: 'none'
                            })
                        } else {
                            Taro.showToast({
                                title: '保存失败!',
                                icon: 'none'
                            })
                        }
                    }
                });
            },
            fail: (e) => {
                console.log(e);
                Taro.showToast({
                    title: '保存失败，请重试~',
                    icon: 'none'
                })
            }
        });
    };

    render() {
        const {
            list,
            loadingStatus
        } = this.state;
        const renderList = (photoList) => {
            return photoList.map((item) => {
                return (
                    <SwiperItem key={Math.random() * Math.random()}>
                        <View className='photo-swiper-item'>
                            <Image mode='scaleToFill' className='photo-swiper-photo' src={item.src} lazyLoad onClick={this.handleImgSave.bind(this, item.src)} />
                        </View>
                    </SwiperItem>
                )
            });
        };
        return (
            <View className='page photo'>
                <Swiper
                  className='photo-swiper'
                  indicatorColor='#999'
                  indicatorActiveColor='#ff4c91'
                  vertical
                  circular
                  indicatorDots
                  autoplay
                >
                    {
                        renderList(list)
                    }
                </Swiper>
                <View className='photo-save-tips'>点击图片保存至相册</View>

                {
                    loadingStatus === 'loading' &&
                    <View className='spin-loading'>
                        <LoadMore noMoreText='暂无数据，请重试！' loadingStatus={loadingStatus} />
                    </View>
                }
            </View>
        )
    }
}

export default Photo

