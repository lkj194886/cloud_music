<template>
  <view class="navigation" :style="styles">
    <view :style="{height:iStatusBarHeight + 'px;width:100%'}"></view>

    <view @click="back" class="back">
        <svg t="1632979484562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3904" width="30" height="42"><path d="M142.805333 265.173333A58.666667 58.666667 0 1 0 59.861333 348.16l410.666667 410.666667a58.666667 58.666667 0 0 0 82.944 0l410.666667-410.666667a58.666667 58.666667 0 1 0-82.944-82.986667L512 634.368 142.805333 265.173333z" p-id="3905" fill="#ffffff"></path></svg>
    </view>
     <view class="title" v-if="show">
       <view>{{title}}</view>
     </view>
    </view
  >
</template>

<script>
export default {
  props: {
    delta: Number,
    title: String
  },
  data() {
    return {
      iStatusBarHeight:0,
      styles:{},
      show:false,
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
  watch:{
  }
};
</script>

<style lang="scss" scoped>
.bg{
  background-color:rgba(105, 99, 99, 0.3)
}
.navigation {
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 99;
  height:100rpx;
  flex-wrap: wrap;
  width: 100%;
  top: 0;
  .back {
    // width: 20%;
    position:relative;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40rpx;
    color: #ffffff;
    span {
      font-size: 50rpx;
    }
  }
  .title{
    color: #fff;
    display: flex;
    position:absolute;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    width: 100%;
  }
}
</style>
