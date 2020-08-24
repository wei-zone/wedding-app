
<h3 align="center">
  <a href="https://github.com/wforguo/wedding-app" title="趣婚礼">趣婚礼</a>
</h3>

<p align="center">
  <a href="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/qrcode.jpeg" title="趣婚礼 Logo"><img alt="趣婚礼 Logo" src="https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/qrcode.jpeg" width="180"></a>
</p>

<p align="center">
    <a href="https://github.com/wforguo/wedding-app" title="趣婚礼">基于Taro2 + 云开发 打造婚礼邀请函</a>
</p>

## 项目名称

- 趣婚礼

- 基于`Taro2` + 云开发 打造婚礼邀请函

> [Taro2](https://taro-docs.jd.com/taro/docs/2.2.11/README)

> [云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 项目介绍

- 结婚的时候婚礼邀请函是一道必不可少的程序，但是没法去很好的留存我们的数据和回忆（除非有后端支持）。
最近刚好在学习`Taro`，所有就尝试基于`Taro` + 云开发快速的搭建一个婚礼邀请函小程序。

- 也有人会问，使用了云开发，怎么去管理数据呢，不用担心，云开发`CMS`帮你搞定，支持文本、富文本、图片、文件、关联类型等多种类型的可视化编辑。

[CMS GitHub](https://github.com/TencentCloudBase/cloudbase-extension-cms)

> 具体使用方法参考**腾讯云云开发**专题：[云开发CMS内容管理系统专题](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3NTA1NjcyNQ==&action=getalbum&album_id=1457486076368715776&subscene=159&subscene=21&scenenote=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NTA1NjcyNQ%3D%3D%26mid%3D2247487706%26idx%3D1%26sn%3Dc17f1dad0ecb4a71c710d53916f1e737%26chksm%3Dcec60be0f9b182f6ebb4e7c52d99723235f3498fd8ca743dbd6483ad3fc39c04b6432c2aff13%26scene%3D21%23wechat_redirect#wechat_redirect)

## 项目效果截图

#### 模块划分

1. 邀请 =》邀请函信息
2. 相册 =》相册展示
3. 导航 =》婚礼举办地
4. 祝福 =》婚礼视频及弹幕留言，留言保存至留言列表
5. 留言 =》好友留言

#### 目录结构

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

#### 效果预览

![云开发入口](https://7765-wedding-wxapp-1302175274.tcb.qcloud.la/wedding/imgs/preview.jpg)

#### 视频演示

[视频演示](https://7765-wedding-wxapp-1302175274.tcb.qcloud.la/wedding/imgs/show.mp4)

## 部署

#### clone

`clone`该项目，并在`project.config.json`下修改自己的小程序`appid`

#### 开通云开发

![环境名称](https://7765-wedding-wxapp-1302175274.tcb.qcloud.la/wedding/imgs/db-id.png)

首先需要你在小程序的控制台去开通云开发，并拿到环境名称

在`src/service/config`下修改`DBID`为你自己申请的环境名城`；

#### 新建数据库并导入

##### 

表的设计

- wedding_invite：婚礼信息

- wedding_msgs：留言祝福

- wedding_photos：相册

- wedding_video：视频

数据库文件存放在`static/db`下，按照文件名新建数据库集合，并导入数据文件即可完成数据库创建。

#### 项目启动

- 使用`yarn`

安装依赖

```bash
yarn
```
编译和打包

```bash
 yarn dev:weapp
 yarn build:weapp
```

- 使用`npm`

安装依赖

```bash
 npm install
```
编译和打包

```bash
 npm run dev:weapp
 npm run build:weapp
```

具体可查看`Taro`教程

到此你就可以看到效果了...

#### 云开发CMS的使用

- 具体开通步骤就省略了，
> 使用方法参考**腾讯云云开发**专题：[云开发CMS内容管理系统专题](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3NTA1NjcyNQ==&action=getalbum&album_id=1457486076368715776&subscene=159&subscene=21&scenenote=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NTA1NjcyNQ%3D%3D%26mid%3D2247487706%26idx%3D1%26sn%3Dc17f1dad0ecb4a71c710d53916f1e737%26chksm%3Dcec60be0f9b182f6ebb4e7c52d99723235f3498fd8ca743dbd6483ad3fc39c04b6432c2aff13%26scene%3D21%23wechat_redirect#wechat_redirect)

##### 看个效果图

- CMS端
![CMS](https://7765-wedding-wxapp-1302175274.tcb.qcloud.la/wedding/imgs/cms.png)

- 小程序端
![云开发](https://7765-wedding-wxapp-1302175274.tcb.qcloud.la/wedding/imgs/cloud.png)

圈出来的部分适合小程序云开发控制台数据库所对应的.

## 技术及框架

### 1.小程序

具体入门和使用，请访问官方文档。

*  [小程序文档](https://developers.weixin.qq.com/miniprogram/dev)
*  [小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

> 开发者可以使用云开发开发微信小程序、小游戏，无需搭建服务器，即可使用云端能力。包含云函数	、数据库、存储和云调用。

### 2.Taro2 + Redux

[Taro2](https://taro-docs.jd.com/taro/docs/2.2.11/README)

> Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发微信/京东/百度/支付宝/字节跳动/ QQ 小程序/H5 等应用。

项目中使用了最新版本`Taro2`，由于`Taro3`使用期间不是很丝滑，所以选择了`Taro2`

**所以本项目可以作为Taro的学习入门，也可以作为小程序云开发的一个入门Demo**

### 3.TaroUI

基于Taro2的UI框架

[TaroUI](https://taro-ui.jd.com/#/docs/introduction)

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

## ToDos

- [x] 朋友圈海报生成...
- [x] ...

这次的版本使用了Taro + 云开发，后面打算出一版`Taro + Antd + koa2 + MongoDb`的版本，初步内容已经差不错了，详见下面项目地址

[Taro + Antd + koa2 + MongoDb](https://github.com/wforguo/wedding)

## Taro3的坑

- redux使得下拉刷新和上拉加载冲突

- 无法阻止事件冒泡

- 无法使用 小程序的`selectComponent`，获取组件实例

`const barrageComp = this.selectComponent('.barrage')` 使用 `Taro.createRef();` 代替

## 关于

- [个人主页](https://www.forguo.cn)
- [CSDN](https://blog.csdn.net/WEIGUO19951107/article/details/88411078)
- [掘金](https://juejin.im/post/6844904015793242120)

---

本项目仅供学习和交流，部分素材来源于网络，如有侵权联系删除。
项目有需改进也请留言和Issues，如有合作请在[博客](https://blog.csdn.net/WEIGUO19951107/article/details/88411078)留言或私信q：（`224266461`）。

---

编码不易，感谢各位大佬的吐槽和[GitHub](https://github.com/wforguo/wedding-app)的Star
