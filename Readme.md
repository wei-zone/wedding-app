
<h3 align="center">
  <a href="https://github.com/wforguo/wedding-app" title="趣婚礼">趣婚礼</a>
</h3>

<p align="center">
  <a href="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/qrcode.jpeg" title="趣婚礼 Logo"><img alt="趣婚礼 Logo" src="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/qrcode.jpeg" width="180"></a>
</p>

<p align="center">
    <a href="https://github.com/wforguo/wedding-app" title="趣婚礼">基于Taro + 云开发 打造婚礼邀请函</a>
</p>

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

具体入门和使用，请访问官方文档。

*  [小程序文档](https://developers.weixin.qq.com/miniprogram/dev)
*  [小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

> 开发者可以使用云开发开发微信小程序、小游戏，无需搭建服务器，即可使用云端能力。包含云函数	、数据库、存储和云调用。

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
    }
}
```

## 云开发的使用

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/getting-started.html)

**需要在控制台去开启云开发，并获取DBID（数据库初始化用到）**

* 1. 云开发入口
![云开发入口](https://user-gold-cdn.xitu.io/2019/12/7/16ee0888f00fc2de?w=490&h=233&f=png&s=15990)

* 2. 数据库配置
![云开发](https://user-gold-cdn.xitu.io/2019/12/7/16ee0888f35bdc2a?w=1290&h=343&f=png&s=72422)

### 数据库

可以在项目中的service中去查看数据库的CURD代码。

有数据库基础的很容易就上手了，小程序的数据库其实就是一个`JSON`，类似于`MongoDb`。

> 顾名思义，数据库中的每条记录都是一个 JSON 格式的对象。一个数据库可以有多个集合（相当于关系型数据中的表），集合可看做一个 JSON 数组，数组中的每个对象就是一条记录，记录的格式是 JSON 对象。

#### 操作

- 初始化

在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。

```js
const db = Taro.cloud.database({
    env: 'DBID'
});
```

- 数据库操作

> 要操作一个集合，需先获取它的引用。在获取了数据库的引用后，就可以通过数据库引用上的 collection 方法获取一个集合的引用了

```js
db.collection('wedding_msgs')
   .orderBy('createTime', 'desc') // 时间升序
   .skip(current * 10)
   .limit(pageSize)
   .get()
```
这样每次都比较麻烦，所以我做了统一的处理，都写在`service/cloud/index.js`当中，并export，只需要按需引入，并传入要操作的数据库名称即可。

![云数据库](https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/db_function.png)

**Tips：如果发现数据库有数据，但是拿不到所有数据，那应该就是数据库的权限问题了，改成仅创建者可写，所有人可读就可以了**

### 云函数

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/getting-started.html)

使用云函数去获取用户信息就变得简单多了，具体可翻阅文档！

项目中云函数所在目录，`cloud/functions.js`，项目中使用到了一个云函数，留言的内容过滤功能`msgSecCheck`，
具体使用方法：[security.msgSecCheck](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/sec-check/security.msgSecCheck.html)

- 声明

```js
/**
 * @Description: 文本内容过滤；
*/
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

// 云函数入口函数
exports.main = async function (event, context) {
    console.log(event);
    let opts = {
        content: event.content || ''
    };
    let fun = cloud.openapi.security.msgSecCheck(opts);

    return fun.then(res => {
        return res;
    }).catch(err => {
        return err;
    });
};

```

- 调用

```js
    // 云调用内容安全过滤
    Taro.cloud.callFunction({
      name: 'msgCheck',
      data: { content: data.userMsg },
    }).then(res => {
      if (res && res.result && res.result.errCode === 0) {
          Taro.showLoading({
              title: '发送中...',
              mask: true
          });
          // 数据库插入留言数据
          cloud.add('wedding_msgs', data).then(msgRes => {
              resolve(msgRes);
          }, (err) => {
              console.log(err);
              reject(err);
          });
      } else {
          reject(res.result);
      }
    }).catch(err => {
      console.log(err);
      reject(err);
    });
```

## 表设计

- wedding_invite：婚礼信息

- wedding_msgs：留言祝福

- wedding_photos：相册

- wedding_video：视频

## CMS

> 腾讯云`CloudBase CMS`

[参考文章](https://mp.weixin.qq.com/s/tTjZ0l0NmuBrFa0BEuTMgg)

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
├── cloud                               # 云函数存放
├── dist                                # 打包文件
├── node_modules                        # 依赖的模块包
├── package.json                        # 项目基本信息
├── src                                 # 项目的核心组件
│   ├── service                         # 资源文件（css、image、config）
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
## ToDos

- [x] 弹幕完善
- [x] ...

这次的版本使用了Taro + 云开发，后面打算出一版`Taro + Antd + koa2 + MongoDb`的版本，初步内容已经差不错了，详见下面项目地址

[Taro + Antd + koa2 + MongoDb](https://github.com/wforguo/wedding)

## Taro3的坑

- redux使得下拉刷新和上拉加载冲突

- 无法阻止事件冒泡

- 无法使用 小程序的`selectComponent`，获取组件实例

`const barrageComp = this.selectComponent('.barrage')` 使用 `Taro.createRef();` 代替

## 关于

- [个人主页](http://www.forguo.cn)
- [CSDN](https://blog.csdn.net/WEIGUO19951107/article/details/88411078)
- [掘金](https://juejin.im/post/6844904015793242120)

---

本项目仅供学习和交流，部分素材来源于网络，如有侵权联系删除。
项目有需改进也请留言和Issues，如有合作请在[博客](https://blog.csdn.net/WEIGUO19951107/article/details/88411078)留言或私信q：（`224266461`）。

---

编码不易，感谢各位大佬的吐槽和`⭐`
