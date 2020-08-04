# 婚礼邀请函小程序

> 基于微信小程序的婚礼邀请函

---
## 基础
*  [小程序文档](https://developers.weixin.qq.com/miniprogram/dev)
*  [mpvue框架](http://mpvue.com)
*  [小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
---
## 技术点

小程序使用了云开发和云函数，所以就没有后台的什么事了
相册、留言等数据都是使用云开发，云数据库来存储，
所以在开发前务必学习和掌握小程序的云开发，
在clone项目之后需要开通小程序的云开发功能，
并且去开发者工具的云开发去创建属于自己的数据库，
然后创建对应的表并赋予对应的权限（学过数据库的很好懂的）

* 1. 云开发入口
![云开发入口](https://666f-forguo-0979a1-1251886253.tcb.qcloud.la/static/imgs/enter.png)

* 2. 数据库配置
![云开发](https://666f-forguo-0979a1-1251886253.tcb.qcloud.la/static/imgs/cloud.png)

---

## 说明

小程序分为五个模块
1. 邀请函
2. 相册
3. 地图
4. 祝福
5. 留言

---
##### 体验码如下：

![体验码](https://666f-forguo-0979a1-1251886253.tcb.qcloud.la/static/imgs/wedding.png)

---

##  github地址

github：https://github.com/forguos/wedding

个人博客：https://blog.csdn.net/WEIGUO19951107

个人站点：https://www.forguo.com

---

## 数据库json文件

在`data`文件夹下，导入即可

文件名即表名

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
