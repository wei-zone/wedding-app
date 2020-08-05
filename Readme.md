
<h3 align="center">
  <a href="https://github.com/wforguo/wedding-app" title="趣婚礼">趣婚礼</a>
</h3>

<p align="center">
  <a href="https://github.com/wforguo/wedding-app" title="趣婚礼"><img alt="趣婚礼 Logo" src="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/logo.png" width="180"></a>
</p>

<p align="center">
    <a href="https://github.com/wforguo/wedding-app" title="趣婚礼">基于Taro + 云开发 打造婚礼邀请函</a>
</p>

- [GitHub](https://github.com/wforguo/wedding-app)

## 开始

- 使用yarn

安装依赖

```bash
yarn
```
编译和打包

```bash
 yarn dev:weapp
 yarn build:weapp
```

- 使用npm

安装依赖

```bash
 npm install
```
编译和打包

```bash
 npm run dev:weapp
 npm run build:weapp
```

## 技术及框架

### 1.小程序

*  [小程序文档](https://developers.weixin.qq.com/miniprogram/dev)
*  [小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

在这里，使用到了小程序的云开发，提供有：数据库、云存储以及云函数，不再依赖后端就可以搭建自己的一整套项目。

### 2.Taro + Redux

[Taro 3](https://taro-docs.jd.com/taro/docs/README)

> Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发微信/京东/百度/支付宝/字节跳动/ QQ 小程序/H5 等应用。

项目中使用了最新版本`Taro3`

**所以本项目可以作为Taro的学习入门，也可以作为小程序云开发的一个入门Demo**

### 3.WeUi

- [WeUi](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)
- [Demo](https://github.com/wechat-miniprogram/weui-miniprogram/tree/master/tools/demo)

> 这是一套基于样式库weui-wxss开发的小程序扩展组件库，同微信原生视觉体验一致的UI组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。

由于 Taro3 对应的[Taro UI](https://taro-ui.jd.com/#/)还在灰度当中，所以选择使用了 WeUI，小程序仅考虑在微信当中使用了。

**考虑使用WeUI，主要有个好处，不占用包大小。**

官方文档：
> 通过 useExtendedLib 扩展库 的方式引入，这种方式引入的组件将不会计入代码包大小。
```js
// app.config.js中添加
{
    useExtendedLib: {
        'weui': true
    },    
}
```

## 项目结构

- 模块划分

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
│   ├── common                          # 资源文件（css、image、config）
│   ├── components                      # 公共组件
│   ├── store                           # 状态管理（redux）
|   ├── pages                           # 页面文件目录
|   |   ├── Index                       # index页面目录
|   |   |   ├── index.jsx               # index页面逻辑
|   |   |   └── index.scss              # index页面样式
|   |   |   └── index.config.js         # index页面配置（小程序page.json内容）
│   ├── util                            # 公共方法(util.js、globalData.js)
│   ├── app.jsx                         # 入口文件
│   ├── app.scss                        # 公共样式
│   ├── index.html                      # 主页模板
├── static                              # 静态资源(CDN)
├── README.md                           # 项目描述信息

```

<h3 align="center">
  <a href="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/qrcode.jpeg" title="趣婚礼">体验码</a>
</h3>

<p align="center">
  <a href="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/qrcode.jpeg" title="趣婚礼"><img alt="趣婚礼 Logo" src="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/qrcode.jpeg"></a>
</p>

## ToDos

- 弹幕完善
- 分享图生成
- ...

这次的版本使用了Taro + 云开发，后面打算出一版Taro + koa2 + MongoDb的版本，初步框架已经差不错了，见下面这个项目地址

[Taro + Koa2 + MongoDb](https://github.com/wforguo/wedding)

## 关于

- 如果你是一个小白，请转移至[博客](https://blog.csdn.net/WEIGUO19951107/article/details/88411078)去查看项目的详细说明
https://blog.csdn.net/WEIGUO19951107/article/details/88411078

---

本项目仅供学习和交流，部门素材来源于网络，如有侵权联系删除。
项目中有需改进也请留言和Issues，如有合作请在[博客](https://blog.csdn.net/WEIGUO19951107/article/details/88411078)留言或私信。


---

编码不易，感谢留下您的小~`⭐`
