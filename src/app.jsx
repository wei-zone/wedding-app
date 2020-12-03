import Taro, {Component} from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import configStore from './store'
import Index from './pages/Index/index'
import cloudConfig from './service/config'
import './common/css/app.scss'

// eslint-disable-next-line import/no-commonjs
require('./util/mtj-wx-sdk.js');

// 设置全局分享
Component.prototype.onShareAppMessage = function () {
    return {
        title: '诚邀您参加我们的婚礼~',
        path: '/pages/Index/index', // 默认首页
    };
};

const store = configStore();

// app中的生命周期只会执行一次
class App extends Component {
    componentWillMount() {
        Taro.hideTabBar(); // 默认进来先隐藏 tabBar，当首页数据加载完成会显示
        console.log(`%c Env %c ${process.env.NODE_ENV}`, 'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060', 'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e');
        console.log(`%c author %c forguo`, 'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060', 'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #479edf');
        this.getSystemInfo(); // 获取系统信息
        this.checkVersion(); // 版本更新
    }

    componentDidMount() {
        if (process.env.TARO_ENV === 'weapp') {
            Taro.cloud.init({
                env: cloudConfig
            });
        }
    }

    config = {
        pages: [
            'pages/Index/index',
            'pages/Photo/index',
            'pages/Location/index',
            'pages/Bless/index',
            'pages/Msg/index',
            'pages/About/index',
            'pages/Attend/index',
        ],
        window: {
            backgroundTextStyle: 'dark',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '趣婚礼',
            navigationBarTextStyle: 'black'
        },
        "permission": {
            "scope.userLocation": {
                "desc": "您的位置信息将被用来导航"
            }
        },
        "requiredBackgroundModes": [
            "audio"
        ],
        tabBar: {
            color: '#7F8389',
            selectedColor: '#ff4c91',
            borderStyle: 'black',
            backgroundColor: '#ffffff',
            list: [
                {
                    pagePath: 'pages/Index/index',
                    text: '邀请',
                    iconPath: 'common/tab/invite.png',
                    selectedIconPath: 'common/tab/invite-active.png'
                },
                {
                    pagePath: 'pages/Photo/index',
                    text: '相册',
                    iconPath: 'common/tab/photo.png',
                    selectedIconPath: 'common/tab/photo-active.png'
                },
                {
                    pagePath: 'pages/Location/index',
                    text: '导航',
                    iconPath: 'common/tab/location.png',
                    selectedIconPath: 'common/tab/location-active.png'
                },
                {
                    pagePath: 'pages/Bless/index',
                    text: '喜悦',
                    iconPath: 'common/tab/bless.png',
                    selectedIconPath: 'common/tab/bless-active.png'
                },
                {
                    pagePath: 'pages/Msg/index',
                    text: '祝福',
                    iconPath: 'common/tab/msg.png',
                    selectedIconPath: 'common/tab/msg-active.png'
                },
            ]
        },
        cloud: true
    };

    // 获取系统信息
    getSystemInfo = () => {
        // 设备信息
        let systemInfo = Taro.getSystemInfoSync() || {};
        // 胶囊按钮数据
        let menuButtonInfo = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
        if (!systemInfo.statusBarHeight) {
            systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
        }
        Taro.systemInfo = systemInfo;
        Taro.menuButtonInfo = menuButtonInfo || {};
        return systemInfo;
    };

    // 版本更新
    checkVersion = () => {
        if (Taro.canIUse('getUpdateManager')) {
            const updateManager = Taro.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        Taro.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，点击体验最新功能~',
                            showCancel: false,
                            success:  (modalRes) => {
                                // res: {errMsg: 'showModal: ok', cancel: false, confirm: true}
                                if (modalRes.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    });
                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        Taro.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦，请您删除当前小程序，重新搜索打开哟~',
                            showCancel: false,
                        })
                    })
                }
            })
        } else {
            Taro.showModal({
                title: '提示',
                confirmColor: '#5BB53C',
                content: '当前微信版本过低，请升级到最新微信版本后重新打开小程序~',
                showCancel: false,
            })
        }
    };

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        )
    }
}

Taro.render(<App />, document.getElementById('app'));
