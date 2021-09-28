<template>
  <div class="play" :style="style">play</div>
</template>

<script>

export default {
  props: {
    bottom:Number,
  },
  data: () => ({
    style:{}
  }),
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    if(this.bottom===undefined){
      this.style={
          "width": "100%",
          "height": "100rpx",
          "background-color": "red",
          "position": "fixed",
          "bottom":"0rpx",
      }
    }else{
       this.style={
          "width": "100%",
          "height": "100rpx",
          "background-color": "red",
          "position": "fixed",
          "bottom":this.bottom+"rpx",
      }
    }
      console.log(this.bottom);
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.play{
  display: none;
}
</style>
