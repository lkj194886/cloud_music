<template>
  <view class="search_details">
    <view class="search_header" >
      <view class="search">
        <u-search
          :show-action="false"
          v-model="searchValue"
          input-align="center"
          :focus="true"
          placeholder="请输入歌手或者歌曲名"
          @change="change_search"
          @search="search"
        ></u-search>
      </view>
    </view>
    <view class="search_body">
      <view class="search_hot_box" v-show="hot_list.length !=0">
        <view class="hot_box">
          <view class="hot_tags">热搜榜</view>
          <view class="hot_list">
            <view style="width:100%;height:30rpx"></view>
            <view class="hot_item" v-for="(item,index) in hot_list.slice(0,hot_length)" :key="index">
              <view class="index">{{index+1}}</view>
              <text class="name">{{item.searchWord}}</text>
            </view>
            <view class="hot_gengduo" v-show="gengduoShow" @click="gengduo">查看更多</view>
            <view style="width:100%;height:30rpx"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    searchValue: "",
    hot_list:[],
    hot_length:0,
    gengduoShow:true,
    headerShow:false,
  }),
  computed: {},
  methods: {
    //当用户触发搜索后的事件
    search() {
      this.getSearch(this.searchValue);
    },
    //输入框的值发生变化的时候触发的事件
    change_search() {},
    //搜索事件
    getSearch(data) {
      let opt = {
        url: "/cloudsearch",
        method: "get",
      };
      let params = {
        keywords: data,
      };
      this.$request.get(opt, params).then((res) => {
        // console.log(res);
        console.table(res.data.result.songs);
      });
    },
    //获取热搜榜
    getHotList() {
      let opt = {
        url: "/search/hot/detail",
        method: "get",
      };
      let params = {};
      this.$request.get(opt, params).then((res) => {
        this.hot_list = res.data.data
        this.hot_length = this.hot_list.length/2;
        console.table(res.data.data);
      });
    },
    gengduo(){
      this.hot_length= this.hot_list.length;
      this.gengduoShow=false;
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getHotList();
    setTimeout(() =>{
      this.headerShow=true;
    },500)
    
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.search_details {
  //页面动画会影响效果
  .search_header {
    height: 110rpx;
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .search {
      margin-top: 40rpx;
      padding-bottom: 40rpx;
      width: 80%;
    }
  }
  .search_body {
    margin-top: 110rpx;
    width: 100%;
    height: 20000rpx;
    display: flex;
    .search_hot_box {
      margin-top: 20rpx;
      width: 100%;
      display: flex;
      justify-content: center;
      .hot_box {
        width: 95%;
        // height: 100%;
        .hot_tags {
          width: 100%;
          height: 50rpx;
          display: flex;
          align-items: center;
        }
        .hot_list{
          margin-top: 20rpx;
          width: 100%;
          background-color: #fff;
          border-radius: 15rpx;
          box-shadow: 0rpx 3rpx 3rpx 3rpx rgb(170, 165, 165);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .hot_item{
            margin: 6rpx;
            flex:38%;
            height: 40rpx;
            display: flex;
              .index{
                margin-left: 15rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                width:30rpx;height:100%;
                  // background-color: red;
              }
              .name{
                margin-left: 20rpx;
              }
          }
          .hot_item:nth-child(1){
              .index{
                color: red;
              }
          }
          .hot_item:nth-child(2){
              .index{
                color: red;
              }
          }
          .hot_item:nth-child(3){
            .index{
                color: red;
              }
          }
          .hot_gengduo{
            margin-top: 10rpx;
            width:100%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>