<template>
  <view class="playa">
    <navigation :delta="1"></navigation>
    <view class="play_header">
      <view class="img_header">
        <image :src="playList.coverImgUrl" class="header_img"></image>
      </view>
      <view class="play_name">
        {{playList.name}}
      </view>
      <view class="play_description">
        {{playList.description}}
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
          console.log(res);
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
    // height: 200rpx;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 50rpx;
    .img_header {
      width: 100%;
      display: flex;
    justify-content: center;
      .header_img {
        width: 250rpx;
        height: 250rpx;
        border-radius: 25rpx;
        margin-top: 260rpx;
        // margin-bottom: 120rpx;
      }
    }
    .play_name{
      width: 100%;
      font-size: 35rpx;
      display: flex;
      justify-content: center;
      margin-top: 20rpx;
      color: #fff;
    }
    .play_description{
      margin-top: 20rpx;
    }
  }
}
</style>
