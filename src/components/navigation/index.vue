<template>
  <view class="navigation">
    <view :style="{ height: iStatusBarHeight + 'px;width:100%'}"></view>
    <view @click="back" class="back"><span class="iconfont icon-fanhui"></span>
    </view>
    </view
  >
</template>

<script>
export default {
  props: {
    delta: Number,

  },
  data() {
    return {
      iStatusBarHeight:0
    };
  },
  mounted() {
    this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: this.delta,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  // z-index: 100;
  width: 100%;
  top: 0;
  .back {
    margin-top: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    height: 100%;
    color: #ffffff;

    span {
      font-size: 50rpx;
    }
  }
  .title{
    //   text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
      font-size: 40rpx;
  }
}
</style>
