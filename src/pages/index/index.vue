<template>
  <view class="index">
    <view class="serach" ><search></search></view>
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
              <view class="play_song_item_detailed_box">
                <span class="play_song_item_name">{{ item.name }}</span>
                <br />
                <span class="play_song_item_al"
                  >{{ item.song.artists[0].name }}-{{
                    item.song.album.name
                  }}</span
                >
                <view class="play_video" v-if="item.song.mvid!=0">

                   <svg
                v-if="item.mv != 0"
                t="1632733744605"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3356"
                width="30"
                height="25"
              >
                <path
                  d="M374.6 636.5c4.4 0 8.5-1.2 12.1-3.3l171.7-100c8-3.6 13.6-11.9 13.6-21.5 0-8.8-4.8-16.6-11.9-20.7l-167.8-97.8c-4.3-5-10.7-8.1-17.7-8.1-13.1 0-23.6 10.7-23.6 23.8v1.3l-0.3 0.2 0.4 199.8c-0.1 0.8-0.1 1.6-0.1 2.5 0 13.2 10.6 23.8 23.6 23.8z"
                  fill="#4D4D4D"
                  p-id="3357"
                ></path>
                <path
                  d="M64.7 586.3a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z"
                  fill="#4D4D4D"
                  p-id="3358"
                ></path>
                <path
                  d="M960 398.3c0.1-1.6 0.2-3.2 0.2-4.8 0-35-28.5-63.3-63.6-63.3-11.7 0-22.7 3.2-32.2 8.7l-0.5-0.3-31.5 18.2v-64.7c-0.1-73.1-59.9-133-133.1-133H197.4c-73.1 0-133 59.8-133 133v165.8h0.2c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1h0.2V287c0-35.2 28.8-64 64-64h510.2c35.2 0 64 28.8 64 64v448.9c0 35.2-28.8 64-64 64H193.3c-35.2 0-64-28.8-64-64v-21.4c0-17.7-14.4-32.1-32.2-32.1-17.8 0-32.2 14.4-32.2 32.1h-0.4v15.3c0 73.2 59.9 133 133 133h501.9c73.2 0 133-59.8 133-133v-64.1l33.1 19.1 0.1-0.1c9.2 5.1 19.8 8 31 8 35.1 0 63.6-28.4 63.6-63.3 0-1.6-0.1-3.2-0.2-4.8V398.3z m-63.6 205.1c-0.3 7.8-6.9 14.1-15 14.1-2.7 0-5.3-0.7-7.5-2l-41.5-23.7V430.1l40.9-23.2c2.3-1.5 5.1-2.3 8.1-2.3 8.3 0 15 6.6 15 14.6v184.2z"
                  fill="#4D4D4D"
                  p-id="3359"
                ></path>
              </svg>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
     <view class="recommend_divider"></view>
     <play :bottom="100"></play>
  </view>
</template>
<script>
//搜索组件
import search from "../../components/search/index.vue";
import play from "../../components/play/play.vue";
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
      newSongList: null, //新歌列表,
      styles:{}
    };
  },
  components: {
    search,
    play
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
        limit: "12",
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
  width:100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 500rpx;
  .serach {
    width: 100%;
    display: flex;justify-content: center;
    position:fixed;
    z-index: 99;
    top: 0rpx;
    background-color: #fff;
  }
  .banner {
    width: 100%;
    margin-top: 150rpx;
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
    padding-bottom: 50rpx;
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
        height: 100%;
        .play_item {
          height: 100rpx;
          flex-wrap: wrap;
          margin-bottom: 20rpx;
          width: 100%;
          display: flex;

          .play_img {
            width: 16%;
            height: 16%;
          }
          .play_song_item_detailed {
            margin-top: 7rpx;
            margin-left: 16rpx;
            width: 81%;
            height: 100%;
            border-bottom: 0.5rpx solid rgb(170, 165, 165);
            font-size: 0;
          }
          .play_song_item_detailed_box {
            width: 80%;
            .play_song_item_al {
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

            .play_song_item_name {
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
          .play_video {
            font-size: 15px;
            position: absolute;
            margin-top: -55rpx;
            z-index: 2;
            right: 5rpx;
          }
          .play_img > img {
            width: 100%;
            border-radius: 25rpx;
          }
        }
      }
    }
  }
}
</style>
