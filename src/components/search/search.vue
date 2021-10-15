<template>
  <view class="search_details">
    <view class="search_header">
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
      <view class="search_hot_box" v-show="hotShow">
        <view class="hot_box">
          <view class="hot_tags">热搜榜</view>
          <view class="hot_list">
            <view style="width: 100%; height: 30rpx"></view>
            <view
              class="hot_item"
              v-for="(item, index) in hot_list.slice(0, hot_length)"
              :key="index"
              @click="hot_search(item.searchWord)"
            >
              <view class="index">{{ index + 1 }}</view>
              <text class="name">{{ item.searchWord }}</text>
            </view>
            <view class="hot_gengduo" v-show="gengduoShow" @click="gengduo"
              >查看更多</view
            >
            <view style="width: 100%; height: 30rpx"></view>
          </view>
        </view>
      </view>
      <view class="search_hot_tabs" v-if="tabsShow">
        <u-tabs
          :list="list"
          :is-scroll="true"
          :current="current"
          @change="change_tabs"
          active-color="rgb(236,65,65)"
        ></u-tabs>
      </view>
      <view
        class="search_content"
        @touchstart="handeltouchstart"
        @touchend="handeltouchend"
        v-if="tabsShow"
      >
        <view v-if="current == 0" class="search_synthesis">
          <view class="synthesis_single">
            <view class="single_header">
              <view class="title">单曲</view>
            </view>
            <view class="single_list">
                <view class="single_item" v-for="(item,index) in synthesis.song.songs" :key="index">
                    {{item.name}}
                </view>
            </view>
          </view>
          <view class="synthesis_songs">歌单</view>
          <view class="synthesis_video">视频</view>
          <view class="synthesis_singer">歌手</view>
          <view class="synthesis_albums">专辑</view>
          <view class="synthesis_users">用户</view>
        </view>
        <view v-if="current == 1" class="search_">单曲</view>
        <view v-if="current == 2" class="search_">歌单</view>
        <view v-if="current == 3" class="search_">视频</view>
        <view v-if="current == 4" class="search_">歌手</view>
        <view v-if="current == 5" class="search_">专辑</view>
        <view v-if="current == 6" class="search_">用户</view>
      </view>
    </view>
    <play></play>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    searchValue: "溯",
    hot_list: [],
    hotShow: false,
    tabsShow: true,
    hot_length: 0,
    gengduoShow: true,
    headerShow: false,
    list: [
      {
        name: "综合",
        type: 1018,
      },
      {
        name: "单曲",
        type: 1,
      },
      {
        name: "歌单",
        type: 1000,
      },
      {
        name: "视频",
        type: 1014,
      },
      {
        name: "歌手",
        type: 100,
      },
      {
        name: "专辑",
        type: 10,
      },
      {
        name: "用户",
        type: 1002,
      },
    ],
    current: 0,
    //按下的时间
    startTime: 0,
    //按下的坐标
    startX: 0,
    startY: 0,
    //离开的时间
    endTime: 0,
    //滑动方向
    direction: "",
    //综合数据
    synthesis:{
        song:{}
    }
  }),
  computed: {},
  methods: {
    //当用户触发搜索后的事件
    search() {
      this.getSearch(this.searchValue);
      this.hotShow = false;
      this.tabsShow = true;
    },
    //输入框的值发生变化的时候触发的事件
    change_search() {},
    //搜索事件
    getSearch(data) {
      uni.showLoading({
        title: "加载中",
        icon: "none",
      });
      let opt = {
        url: "/search",
        method: "get",
      };
      let params = {
        keywords: data,
        type: this.list[this.current].type,
      };
      this.$request.get(opt, params).then((res) => {
        if (res.statusCode === 200) {
          uni.hideLoading();
          // console.log(res.data.result);
          this.synthesis.song = res.data.result.song;
          console.log(this.synthesis.song);
        } else {
          uni.hideLoading();
          uni.showToast({
            title: "搜索失败,请稍后重试!",
            duration: 2000,
            icon: "none",
          });
        }

        // console.table(res.data.result.songs);
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
        this.hot_list = res.data.data;
        this.hot_length = this.hot_list.length / 2;
        // console.table(res.data.data);
        // this.hotShow = true;
      });
    },
    gengduo() {
      this.hot_length = this.hot_list.length;
      this.gengduoShow = false;
    },
    //热搜榜hot_item点击事件
    hot_search(value) {
      this.searchValue = value;
      this.search();
    },
    change_tabs(index) {
      this.current = index;
    },
    //按下屏幕事件
    handeltouchstart(event) {
      this.startTime = Date.now();
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientX;
    },
    //离开屏幕事件
    handeltouchend(event) {
      const endTime = Date.now();
      const endstarX = event.changedTouches[0].clientX;
      const endstarY = event.changedTouches[0].clientY;
      //判断时间
      if (endTime - this.startTime > 4000) {
        return;
      }
      //滑动方向
      let direction = "";
      //判断方向
      if (Math.abs(endstarX - this.startX) > 50) {
        direction = endstarX - this.startX > 0 ? "right" : "left";
      } else {
        return;
      }
      this.direction = direction;
      this.endTime = endTime;
      // console.log(direction)
    },
  },
  watch: {
    searchValue() {
      if (this.searchValue.length === 0) {
        this.hotShow = true;
        this.tabsShow = false;
      }
    },
    //监听滑动方向
    endTime() {
      if (this.direction === "left") {
        this.current === this.list.length - 1
          ? (this.current = this.list.length - 1)
          : this.current++;
        return;
      }
      if (this.direction === "right") {
        this.current === 0 ? (this.current = 0) : this.current--;
        return;
      }
    },
    current() {
      this.search();
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getHotList();
    setTimeout(() => {
      this.headerShow = true;
    }, 500);
    this.search();
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
  width: 100%;
  height: 100vh;
  //页面动画会影响效果
  .search_header {
    background: #fff;
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
    // height: 20000rpx;
    display: flex;
    flex-wrap: wrap;
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
        .hot_list {
          margin-top: 20rpx;
          width: 100%;
          background-color: #fff;
          border-radius: 15rpx;
          // box-shadow: 0rpx 3rpx 3rpx 3rpx rgb(170, 165, 165);
          box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
            rgba(0, 0, 0, 0.05) 0px 5px 10px;

          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .hot_item {
            margin: 6rpx;
            flex: 38%;
            height: 40rpx;
            display: flex;
            .index {
              margin-left: 15rpx;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 30rpx;
              height: 100%;
            }
            .name {
              width: 250rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-left: 20rpx;
            }
          }
          .hot_item:nth-child(2) {
            .index {
              color: red;
            }
          }
          .hot_item:nth-child(3) {
            .index {
              color: red;
            }
          }
          .hot_item:nth-child(4) {
            .index {
              color: red;
            }
          }
          .hot_gengduo {
            margin-top: 10rpx;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    .search_hot_tabs {
      width: 100%;
      position: fixed;
    }
    .search_content {
      width: 100%;
      height:100vh;
      .search_synthesis {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
     
        .synthesis_single {
          height: 620rpx;
          margin-top: 100rpx;
          background-color: #fff;
          display: flex;
          align-content: flex-start;//侧轴
          justify-content: center;
          flex-wrap: wrap;
          .single_header{
            width: 92%;
            height:80rpx;
            border-bottom: 1rpx solid rgb(202,202,202);
            .title{
              margin-top: 25rpx;
              font-size: 30rpx;
              font-weight: 900;
            }
          }
          .single_list{
            width: 92%;
            .single_item{
              display: flex;
              align-items: center;
              width: 100%;
              font-size: 20rpx;
              // background-color: red;
              height:95rpx;
              margin-bottom: 5rpx;
              border-bottom: 1rpx solid rgb(202,202,202);
            }
          }
        }
        .synthesis_songs {
        }
        .synthesis_video {
        }
        .synthesis_singer{

        }
        .synthesis_albums{

        }
        .synthesis_users{

        }
      }
      .search_synthesis>view {
        margin-top: 30rpx;
        width: 95%;
        height: 500rpx;
        background-color: #fff;
        border-radius: 25rpx;
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
          rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
          rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px,
          rgba(0, 0, 0, 0.07) 0px 32px 64px;
      }
      // background-color: red;
    }
  }
}
</style>