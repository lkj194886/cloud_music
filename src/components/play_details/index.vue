<template>
  <view class="playa">
    <navigation :delta="1"></navigation>
    <view v-if="playShow">
      <view class="play_header">
        <view class="img_header">
          <image :src="playList.coverImgUrl" class="header_img"></image>
        </view>
        <view class="play_name">
          {{ playList.name }}
        </view>
        <view class="play_description">
          <span>简介</span>
          <view class="play_content">
            {{ playList.description }}
          </view>
        </view>
      </view>
      <view class="play_list">
        <view class="play_botton"><span class="iconfont icon-bofang"></span>全部播放</view>
      </view>
    </view>
  </view>
</template>

<script>
import navigation from "../navigation/index.vue";
export default {
  components: {
    navigation,
  },
  data() {
    return {
      playId: null,
      playList: [],
      playShow: false,
    };
  },
  onLoad: function (option) {
    this.playId = option.id;
    this.getPlayDetails();
  },
  methods: {
    getPlayDetails() {
      let opts = {
        url: "/playlist/detail",
        method: "get",
      };

      let params = {
        id: this.playId,
      };
      this.$request.httpRequest(opts, params).then(
        (res) => {
          // console.log(res);
          this.playShow = true;
          this.playList = res.data.playlist;
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
.playa {
  //    display: flex;
  //   // flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   flex-wrap: wrap;

  .play_header {
    background-color: rgba(57, 57, 57, 0.3);
    width: 100%;
    height: 800rpx;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 50rpx;
    border-bottom-left-radius: 20%;
    border-bottom-right-radius: 20%;
    .img_header {
      width: 100%;
      display: flex;
      justify-content: center;
      .header_img {
        width: 250rpx;
        height: 250rpx;
        border-radius: 25rpx;
        margin-top: 230rpx;
        // margin-bottom: 120rpx;
      }
    }
    .play_name {
      width: 100%;
      font-size: 35rpx;
      display: flex;
      justify-content: center;
      margin-top: 30rpx;
      color: #fff;
    }
    .play_description {
      margin-top: 20rpx;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      span {
        text-align: center;
        color: #fff;
        font-size: 35rpx;
        margin-top: 15rpx;
        width: 100%;
      }
      .play_content {
        margin-top: 24rpx;
        // display: flex;
        // justify-content: center;
        // flex-wrap: wrap;
        // border: 1px solid red;
        text-align: center;
        width: 60%;
        color: #fff;
        font-size: 28rpx;
        // text-indent: 60rpx;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        // text-align: justify;
        text-justify: inter-ideograph;
        white-space: pre-line;
      }
    }
  }
  .play_list{
    
  }
}
</style>
