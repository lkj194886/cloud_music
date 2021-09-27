<template>
  <view class="index">
    <view class="serach"><search></search></view>
    <view class="banner">
      <u-swiper
        :list="banner"
        name="imageUrl"
        height="260"
        :effect3d="true"
        img-mode="scaleToFill"
      ></u-swiper>
    </view>
    <view class="banner_divider"></view>
    <view class="recommend_playlist">
      <view class="play_text">
        <view class="play_text">推荐歌单</view>
        <view class="play_divider"></view>
        <view class="play_more"><image src="../../static/more.png" /></view>
      </view>

      <view class="play_list">
        <scroll-view scroll-x="true" class="scroll-view" @scroll="scroll">
          <view
            class="play_item"
            v-for="(item, index) in recommendedPlayList"
            :key="index"
          >
            <view class="imgg">
              <navigator :url="'/components/play_details/index?id=' + item.id"
                ><img :src="item.picUrl" mode="scaleToFill" />
              </navigator>
              <view class="play_title"
                ><p>{{ item.name }}</p></view
              >
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="recommend_divider"></view>
    <view class="recommend_newsong" v-if="newSongList != null">
      <view class="play_text">
        <view class="play_text">新歌推荐</view>
        <view class="play_divider"></view>
        <view class="play_more"><image src="../../static/more.png" /></view>
      </view>
      <view class="play_list">
        <scroll-view
          :scroll-top="scrollTops"
          scroll-y="true"
          class="scrolly-view"
          @scroll="scroll"
        >
          <view
            class="play_item"
            v-for="(item, index) in newSongList"
            :key="index"
          >
          <view class="play_img">
            <img :src="item.picUrl" mode="scaleToFill" />
          </view>
          	<view class="play_song_item_detailed">
							<span class="play_song_item_name">{{item.name}}</span>
							<br />
							<span class="play_song_item_al">{{item.song.artists[0].name}}-{{item.song.album.name}}</span>
						</view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<script>
//搜索组件
import search from "../../components/search/index.vue";
export default {
  data() {
    return {
      banner: [], //轮播图数组
      recommendedPlayList: [], //推荐歌单
      scrollTop: 0,
      scrollTops: 0,
      old: {
        scrollTop: 0,
      },
      newSongList: null, //新歌列表
    };
  },
  components: {
    search,
  },
  onLoad() {
    this.getBanner();
    this.getRecommendedPlayList();
    this.getNewSongList();
  },
  methods: {
    scroll: function (e) {
      // console.log(e);
      this.old.scrollTop = e.detail.scrollTop;
    },
    //获取推荐歌单
    getRecommendedPlayList() {
      let opts = {
        url: "/personalized",
        method: "get",
      };

      let params = {
        limit: "6",
      };
      this.$request.httpRequest(opts, params).then(
        (res) => {
          // console.log(res);
          this.recommendedPlayList = res.data.result;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //获取轮播图
    getBanner() {
      let opts = {
        url: "/banner",
        method: "get",
      };
      let params = {};
      this.$request.httpRequest(opts, params).then(
        (res) => {
          this.banner = res.data.banners;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //获取推荐歌曲
    getNewSongList() {
      let opts = {
        url: "/personalized/newsong",
        method: "get",
      };
      let params = {};
      this.$request.get(opts, params).then(
        (res) => {
          console.log(res);
          this.newSongList = res.data.result;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .serach {
    width: 85%;
  }
  .banner {
    width: 100%;
    margin-top: 50rpx;
  }
  .banner_divider {
    margin-top: 20rpx;
    width: 100%;
    // border: 0.5rpx solid rgb(214, 214, 214);
  }
  .recommend_playlist {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 85%;
    .play_text {
      width: 100%;
      display: flex;
      .play_text {
        width: 20%;
        font-size: 30rpx;
        font-weight: 900;
      }
      .play_divider {
        width: 70%;
      }
      .play_more {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    .play_list {
      width: 100%;
      .scroll-view {
        white-space: nowrap;
        display: flex;
        width: 100%;
        .play_item {
          margin-top: 30rpx;
          margin-right: 30rpx;
          border-radius: 25rpx;
          display: inline-block;
          width: 32%;
          height: 200rpx;
          .imgg {
            width: 100%;
            .play_title {
              width: 100%;
              height: 100rpx;
              overflow: hidden;
              white-space: normal;
              p {
                margin: 0 auto;
                font-size: 24rpx;
                width: 100%;
              }
            }
            img {
              border-radius: 25rpx;
              width: 100%;
              height: 200rpx;
            }
          }
        }

        .play_item:last-child {
          margin-right: 0;
          // border: 2rpx solid red;
        }
      }
    }
  }
  .recommend_divider {
    width: 100%;
    margin-top: 20rpx;
    border: 8rpx solid rgb(241, 234, 234);
  }
  .recommend_newsong {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 85%;
    .play_text {
      width: 100%;
      display: flex;
      .play_text {
        width: 20%;
        font-size: 30rpx;
        font-weight: 900;
      }
      .play_divider {
        width: 70%;
      }
      .play_more {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    .play_list {
      margin-top: 20rpx;
      width: 100%;
      height: 350rpx;
      .scrolly-view {
        margin-top: 20rpx;
        white-space: nowrap;
        display: flex;
        width: 100%;
        height:100%;
        .play_item {
          // background-color: red;
          height: 100rpx;
          flex-wrap: wrap;
          margin-bottom: 20rpx;
          width: 100%;
          display: flex;
          
          .play_img{
            width: 16%;
            height: 16%;
          }
          .play_song_item_detailed{
            // display: flex;
            // align-items: center;
            // flex-wrap: wrap;
            margin-top: 7rpx;
            margin-left: 16rpx;
            width: 80%;
            height: 100%;
            border-bottom: .5rpx solid rgb(170, 165, 165);
            font-size: 0;
           
            .play_song_item_al{
              width: 100%;
              font-size: 15rpx;
              color: rgb(83, 76, 76);
              width: 400rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							text-justify: inter-ideograph;
							white-space: pre-line;
							overflow: hidden;
							word-break: keep-all;
							text-overflow: ellipsis;
							color: rgb(170, 165, 165);
							font-size: 10rpx;
            }

            .play_song_item_name{
              width: 300rpx;
              display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							text-justify: inter-ideograph;
							white-space: pre-line;
							overflow: hidden;
							word-break: keep-all;
							text-overflow: ellipsis;
							font-size: 30rpx;
            }
          }
          .play_img>img{
            width: 100%;
            border-radius: 25rpx;
          }
        }
      }
    }
  }
}
</style>
