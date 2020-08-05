
<h1 align="center">
  <a href="https://github.com/wforguo/wedding-app" title="趣婚礼">趣婚礼</a>
</h1>

<p align="center">
  <a href="https://github.com/wforguo/wedding-app" title="趣婚礼"><img alt="趣婚礼 Logo" src="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/logo.png" width="180"></a>
</p>

<p align="center">
    <a href="https://github.com/wforguo/wedding-app" title="趣婚礼">基于Taro + 云开发打造婚礼邀请函</a>
</p>


- [GitHub](https://github.com/wforguo/wedding-app)


# 开始

- 使用 `yarn` 安装依赖
 
 `yarn`

- OR 使用 `npm` 安装依赖

 `npm install`

- `yarn` 编译和打包

```bash
 yarn dev:weapp
 yarn build:weapp
```

- `npm` 编译和打包

```bash
 npm run dev:weapp
 npm run build:weapp
```

# 技术及框架

## 小程序

小程序就不用多说了，上文档

在这里，使用到了小程序的云开发，云开发会提供有：数据库、云存储以及云函数，不再依赖后端就可以搭建自己的一整套项目。

*  [小程序文档](https://developers.weixin.qq.com/miniprogram/dev)
*  [小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

* 1. 云开发入口
![云开发入口](https://imgconvert.csdnimg.cn/aHR0cHM6Ly82NjZmLWZvcmd1by0wOTc5YTEtMTI1MTg4NjI1My50Y2IucWNsb3VkLmxhL3N0YXRpYy9pbWdzL2VudGVyLnBuZw)

* 2. 数据库配置
![云开发](https://imgconvert.csdnimg.cn/aHR0cHM6Ly82NjZmLWZvcmd1by0wOTc5YTEtMTI1MTg4NjI1My50Y2IucWNsb3VkLmxhL3N0YXRpYy9pbWdzL2Nsb3VkLnBuZw)

## Taro + Redux

> Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发微信/京东/百度/支付宝/字节跳动/ QQ 小程序/H5 等应用。

项目中使用了 `Taro3`，对于调试和开发更方便了，开发环境有map文件，所以体积略大了点；不过上线的时候可以去打包压缩下

[Taro 3](https://taro-docs.jd.com/taro/docs/README)

## WeUi

> 这是一套基于样式库weui-wxss开发的小程序扩展组件库，同微信原生视觉体验一致的UI组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。

由于 Taro3 对应的Taro UI还在灰度当中，所以选择使用了 WeUI，小程序就仅考虑微信当中使用了。

**考虑使用WeUI，主要有个好处，不占用包大小。**

官方文档说明：

> 通过 useExtendedLib 扩展库 的方式引入，这种方式引入的组件将不会计入代码包大小。

```js
// app.config.js中添加
{
    useExtendedLib: {
        'weui': true
    },    
}
```

[WeUi](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)

[Demo](https://github.com/wechat-miniprogram/weui-miniprogram/tree/master/tools/demo)

# 项目结构

 -小程序模块

1. 邀请 =》邀请函信息
2. 相册 =》相册展示
3. 导航 =》婚礼举办地
4. 祝福 =》婚礼视频及弹幕留言，留言保存至留言列表
5. 留言 =》好友留言

- 目录结构


```
├── config                              # 配置文件
├── dist                                # 打包文件
├── node_modules                        # 依赖的模块包
├── package.json                        # 项目基本信息
├── src                                 # 项目的核心组件
│   ├── asset                           # 资源文件（css、image）
│   ├── components                      # 公共组件
│   ├── store                           # 状态管理（vuex）
|   ├── pages                           # 页面文件目录
|   |   ├── index                       # index页面目录
|   |   |   ├── index.js                # index页面逻辑
|   |   |   └── index.css               # index页面样式
│   ├── util                            # 公共方法(util.js、request.js、globalData.js)
│   ├── app.jsx                         # 入口文件
│   ├── app.scss                        # 公共样式
│   ├── index.html                      # 主页模板
├── static                              # 静态资源(CDN)
├── README.md                           # 项目描述信息

```


![体验码](https://imgconvert.csdnimg.cn/aHR0cHM6Ly82NjZmLWZvcmd1by0wOTc5YTEtMTI1MTg4NjI1My50Y2IucWNsb3VkLmxhL3N0YXRpYy9pbWdzL3dlZGRpbmcucG5n)

# 遇到的问题
