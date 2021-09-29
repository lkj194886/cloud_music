<template>
  <view class="navigation" :style="styles">
    <view :style="{height:iStatusBarHeight + 'px;width:100%'}"></view>

    <view @click="back" class="back"><span class="iconfont icon-fanhui"></span></view>
     <view class="title" v-if="show">{{title}}</view>
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
     window.onscroll = () => {
      if (window.pageYOffset > 140) {
          this.styles = {
            "background-color":"rgba(105, 99, 99,.8)",
        };
        this.show = true;
      } else {
        this.styles = {
        };
        this.show = false;
      }
    };

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
    margin-left: 10px;
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
