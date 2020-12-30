<template>
  <view class="index">
	  <view class="serach"><search></search></view>
	  
	  <view class="banner"><u-swiper></u-swiper></view>
    
    <!-- <u-button @click="show = true">打开</u-button> -->
  </view>
</template>
<script>

import search from"../../components/search/index.vue"
export default {
  data() {
    return {
	  show:false
    };
  },
  components:{
	  search
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .serach{
	  width: 85%;
  }
  .banner{
	  width: 90%;
	  margin-top: 50rpx;
  }
}

</style>
