<template>
  <view class="search">
      <u-search :show-action="false" :disabled="true" input-align="center" placeholder="请输入歌手或者歌曲名" @click="go"></u-search>
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
            console.log(1);
            uni.navigateTo({
                 url: '/components/search/search'
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
