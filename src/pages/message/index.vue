<template>
    <div class="message">
        <view class="box">
            <p class="place"></p>
            <div class="item" v-for="(item, index) in messageList" :key="index">
                <image class="left" :src="item.avatarUrl"/>
                <div class="right">
                    <div class="top">
                        <span class="top-l">{{item.nickName}}</span>
                        <span class="top-r">{{item.createTime}}</span>
                    </div>
                    <p class="con">{{item.userMsg}}</p>
                </div>
            </div>

            <!-- loading -->
            <view class="load-more">
                <image class="load-icon" v-if="isMore" src="../../static/images/load.gif"></image>
                <text class="load-txt">{{loadTxt}}</text>
            </view>

            <p class="place-end"></p>

        </view>
        <div class="bottom">
            <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="toMessage">说点啥吧</button>
            <button class="right" @tap="toForm">我要出席</button>
        </div>
        <div class="dialog" v-show="isOpen">
            <input focus="true" maxlength="80" class="desc" placeholder="在这里输入您想要说的话" name="textarea" placeholder-style="color:#ccc;" v-model="desc"/>
            <div class="btn">
                <button class="left" @tap="sendMessage">发送留言</button>
                <button class="right" @tap="cancel">取消</button>
            </div>
        </div>
        <div class="video-dialog" @tap="toVideo">
            <image src="../../static/images/video1.png"/>
        </div>
        <div class="form-dialog" @tap="lookList">
            <image src="../../static/images/form.png"/>
        </div>
        <div class="video" v-show="isVideo">
            <h-video @closeVideo="closeVideo"></h-video>
        </div>
<!--        <div class="form" v-show="isForm">-->
<!--            <h-form @closeForm="closeForm" @getFromlist="getFromlist"></h-form>-->
<!--        </div>-->
        <div class="form-list" v-show="isFormlist">
            <h-formlist @closeFormlist="closeFormlist" :formList="formList"></h-formlist>
        </div>
    </div>
</template>

<script>
import HVideo from 'components/video'
import HForm from 'components/form'
import HFormlist from 'components/formlist'
import tools from 'common/js/h_tools'
import cloud from '@/service/cloud'
export default {
  name: 'Message',
  components: {
    HVideo,
    HForm,
    HFormlist
  },
  data () {
    return {
      isOpen: false,
      desc: '',
      messageList: [],
      page: 0,
      loadTxt: '加载中',
      isMore: true,
      openId: '',
      userInfo: '',
      isForm: false,
      isVideo: false,
      isFormlist: false,
      formList: []
    }
  },
  onLoad () {
    const that = this
    that.isVideo = false
    that.isForm = false
    that.isFormlist = false
    that.getMessageList()
  },
  onReachBottom (e) {
    if (!this.isMore) {
      return false
    }
    this.getMessageList()
  },
  methods: {
    toMessage (e) {
      const that = this
      if (e.target.errMsg === 'getUserInfo:ok') {
        // that.isOpen = true
        wx.getUserInfo({
          success: function (res) {
            that.userInfo = res.userInfo
            that.isOpen = true
            that.getOpenId()
          }
        })
      }
    },

    cancel () {
      const that = this
      that.isOpen = false
    },

    sendMessage () {
      const that = this
      if (that.desc) {
        const db = wx.cloud.database()
        const message = db.collection('msg')
        message.add({
          data: {
            userMsg: that.desc,
            type: 'message',
            createTime: that.getNowFormatDate(),
            avatarUrl: that.userInfo.avatarUrl,
            nickName: that.userInfo.nickName
          }
        }).then(res => {
          that.messageList = that.messageList.concat({
            userMsg: that.desc,
            type: 'message',
            createTime: that.getNowFormatDate(),
            avatarUrl: that.userInfo.avatarUrl,
            nickName: that.userInfo.nickName
          })
          that.isOpen = false
          that.desc = ''
          tools.showToast('感谢您的留言~')
        })
      } else {
        tools.showToast('说点什么吧~')
      }
    },

    getNowFormatDate () {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const hh = now.getHours()
      const mm = now.getMinutes()
      const ss = now.getSeconds()
      let clock = year + '-'
      if (month < 10) {
        clock += '0'
      }
      clock += month + '-'
      if (day < 10) {
        clock += '0'
      }
      clock += day + ' '
      if (hh < 10) {
        clock += '0'
      }
      clock += hh + ':'
      if (mm < 10) {
        clock += '0'
      }
      clock += mm + ':'
      if (ss < 10) {
        clock += '0'
      }
      clock += ss
      return clock
    },

    getMessageList () {
      const that = this
      wx.showNavigationBarLoading()
      cloud.get('msg', that.page).then((res) => {
        if (res.errMsg === 'collection.get:ok') {
          if (res.data.length <= 0) {
            that.isMore = false
            that.loadTxt = '没有更多了'
          } else {
            that.messageList = that.messageList.concat(res.data)
            that.page++
            if (res.data.length < 10) {
              that.isMore = false
              that.loadTxt = '没有更多了'
            }
          }
          wx.hideNavigationBarLoading()
        }
      })
    },

    toForm () {
      const that = this
      that.isForm = true
    },

    closeForm () {
      const that = this
      that.isForm = false
    },

    addUser () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('usergreet')
      user.add({
        data: {
          user: that.userInfo
        }
      }).then(res => {
        console.log(res)
      })
    },

    getOpenId () {
      const that = this
      wx.cloud.callFunction({
        name: 'login',
        data: {}
      }).then(res => {
        that.openId = res.result.openid
        that.getIsExist()
      })
    },

    getIsExist () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('usergreet')
      user.where({
        _openid: that.openId
      }).get().then(res => {
        if (res.data.length === 0) {
          that.addUser()
        }
      })
    },

    toVideo () {
      const that = this
      that.isVideo = true
    },

    closeVideo () {
      const that = this
      that.isVideo = false
    },

    lookList () {
      const that = this
      that.isFormlist = true
      that.getFromlist()
    },

    closeFormlist () {
      const that = this
      that.isFormlist = false
    },

    getFromlist () {
      const that = this
      wx.showNavigationBarLoading()
      cloud.get('present').then((res) => {
        if (res.errMsg === 'collection.get:ok') {
          that.formList = res.data
          wx.hideNavigationBarLoading()
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.message
    width 100%
    overflow-y auto
    .box
        background #F9E0D9
        min-height 100%
        width 100%
        .place
            height 20rpx
        .place-end
            height 160rpx
        .item
            width 630rpx
            margin-left 30rpx
            border-radius 16rpx
            background #fff
            display flex
            justify-content center
            align-items flex-start
            padding 30rpx
            margin-bottom 20rpx
            .left
                width 100rpx
                height 100rpx
                border-radius 50rpx
            .right
                display flex
                flex-direction column
                justify-content flex-start
                min-height 100rpx
                align-items flex-start
                width 500rpx
                margin-left 20rpx
                .top
                    height 40rpx
                    width 100%
                    display flex
                    justify-content space-between
                    align-items center
                    .top-l
                        width 95%
                        height 50rpx
                        white-space nowrap
                        overflow hidden
                        text-overflow ellipsis
                        line-height 50rpx
                        color #444
                        font-size 28rpx
                    .top-r
                        height 50rpx
                        line-height 50rpx
                        color #999
                        font-size 24rpx
                .con
                    line-height 50rpx
                    color #666
                    font-size 28rpx
                    white-space pre-wrap
                    width 100%
    .bottom
        position fixed
        bottom 0
        left 0
        height 160rpx
        background rgba(255, 255, 255, 0.75)
        width 100%
        display flex
        justify-content center
        align-items center
        z-index 9
        .left, .right
            height 80rpx
            line-height 80rpx
            font-size 28rpx
            width 300rpx
            color #fff
            background #ED695D
            margin 0 20rpx 0 0
        .right
            margin 0
    .dialog
        position fixed
        bottom 15px
        left 0
        z-index 99
        background #fff
        width 100%
        input
            height 50rpx
            line-height 50rpx
            font-size 30rpx
            color #333
            resize none
            outline none
            padding 30rpx
            width 690rpx
            background #f5f5f5
            &::-webkit-input-placeholder
                font-size 30rpx
                color #999
        .btn
            height 120rpx
            display flex
            justify-content center
            align-items center
            .left, .right
                height 80rpx
                line-height 80rpx
                font-size 28rpx
                flex 2
                color #fff
                background #ED695D
                margin 0 20rpx 0 30rpx
            .right
                flex 1
    .video-dialog
        position fixed
        right 10rpx
        top 200rpx
        width 100rpx
        height 100rpx
        box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
        background #fff
        border-radius 16rpx
        image
            width 100%
            height 100%
    .form-dialog
        position fixed
        right 10rpx
        top 320rpx
        width 100rpx
        height 100rpx
        box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
        background #fff
        border-radius 50rpx
        image
            width 100%
            height 100%
    .video, .form, .form-list
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background #fff
        z-index 99
    .form-list
        background rgba(0, 0, 0, 0.5)
</style>
