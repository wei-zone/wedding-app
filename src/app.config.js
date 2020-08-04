export default {
    pages: [
        'pages/Index/index',
        'pages/Photo/index',
        'pages/Location/index',
        'pages/Bless/index',
        'pages/Msg/index',
        'pages/About/index',
    ],
    window: {
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '趣婚礼',
        navigationBarTextStyle: 'black'
    },
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
                text: '祝福',
                iconPath: 'common/tab/bless.png',
                selectedIconPath: 'common/tab/bless-active.png'
            },
            {
                pagePath: 'pages/Msg/index',
                text: '留言',
                iconPath: 'common/tab/msg.png',
                selectedIconPath: 'common/tab/msg-active.png'
            },
        ]
    },
    useExtendedLib: {
        'weui': true
    },
    usingComponents: {
        'mp-loading': '/miniprogram_npm/weui-miniprogram/loading/loading'
    },
    cloud: true
}
