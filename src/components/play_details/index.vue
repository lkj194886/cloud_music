<template>
  <view class="playa">
    <u-navbar
      back-text="返回"
      title="歌单详情"
      :background="background"
      :border-bottom="false"
    ></u-navbar>
    <view class="play_header">
        <image :src="playList.coverImgUrl"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      playId: null,
      background: {
        backgroundColor: "rgba(255,255,255,0.1)",
        // background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
        // backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
      },
      playList:[]
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
          this.playList = res.data.playlist
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
    background-color: rgba(81, 16, 212, 0.3);
    width: 100%;
    height: 200rpx;
  }
}
</style>
