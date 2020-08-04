<template>
    <div class="box">
        <swiper class="swiper"
            :autoplay="true"
            :circular="true"
            current=0
            :indicator-dots="true"
        >
            <block v-for="(item, index) in list" :key="index">
                <swiper-item class="item">
                    <image mode="aspectFill" lazy-load="true" :src="item" class="slide-image"/>
                </swiper-item>
            </block>
        </swiper>
        <image v-if="isGif" class="img" src="../../static/images/save_the_date_pu.gif"/>
    </div>
</template>

<script>
export default {
  name: 'GoodSwiper',
  props: ['list', 'isGif'],
  watch: {
    isGif (newValue, oldValue) {
      const that = this
      if (newValue) {
        that.isGif = newValue
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
    position relative
    height 100%
    .swiper
        height 100%
        width 100%
        .item
            width 100%
            height 100%
            image
                width 100%
                height 100%
                display block
    .img
        position absolute
        bottom 50rpx
        left 50rpx
        z-index 99
</style>
