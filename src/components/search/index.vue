<template>
  <view class="search">
      <u-search :show-action="false" input-align="center" placeholder="请输入歌手或者歌曲名" @focus="go"></u-search>
  </view>
</template>

<script>

export default {
    data() {
        return {
         
        }
    },
    components:{
      
    },
    methods: {
        //跳转搜索详情页
        go(){
            uni.navigateTo({
                 url: ''
            });
        }
    },
    onLoad(){
         
    }
};
</script>

<style lang="scss" scoped>
    .search{
        // background-color: red;
       padding-top: 55rpx;
       padding-bottom: 35rpx;
        width:80%;
        // top:0;
        // margin-top: 80rpx;
    }
</style>
