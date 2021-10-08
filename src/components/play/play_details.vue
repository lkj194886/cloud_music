<template>
  <view class="play_details">
    <view class="play_navigation">
      <navigation></navigation>
    </view>
    <view class="play_details_body">
      <view class="play_details_body_header">
        <view>{{ audioContent.name }}</view>
      </view>
      <view class="lyric"><binglyric :lyrics="audioContent.songPlayLycric" :curTime="songPlayTimeLycric"></binglyric></view>
      <view class="play_toolbar">
          <view class="play_like" @click="like">
            <text style="font-size:80rpx;color:#fff" class="iconfont icon-xihuan"></text>
          </view>
         <!-- 上一首 -->
          <view class="play_last" @click.stop="last">
            <text style="font-size:90rpx;color:#fff" class="iconfont icon-shangyishou"></text>
          </view>
          <!-- 播放or暂停 -->
          <view class="play_stop">
            <text v-if="playShow" @click.stop="stop"  style="font-size:90rpx;color:#fff" class="iconfont icon-bf24gf-pause2"></text>
            <text  v-else @click.stop="play" style="font-size:90rpx;color:#fff" class="iconfont icon-zt24gf-play"></text>
          </view>
          <!-- 下一首 -->
          <view class="play_next" @click.stop="next">
            <text style="font-size:90rpx;color:#fff" class="iconfont icon-xiayishou"></text>
          </view>
          <!-- 播放列表 -->
          <view class="play_list_btn" @click="playListCheck">
            <text style="font-size:70rpx;color:#fff" class="iconfont icon-gengduo"></text>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
import navigation from "../navigation/indexb.vue";
import binglyric from "../bing-lyric/bing-lyric.vue"
import { mapState, mapMutations } from "vuex";
export default {
  components: { navigation,binglyric },

  directives: {},
  computed: {
    ...mapState(["audioContent"]),
    ...mapState(["songPlayTimeLycric"]),
     ...mapState(["playShow"]),
  },
  data() {
    return {
      lyric: "",
      lyricIndex: "",
    };
  },

  mounted() {},
  onLoad() {
    // this.getLyric();
    this.rollingLyric();
  },
  watch: {
    songPlayTimeLycric() {
      this.rollingLyric()
    },
    audioContent(){
        // console.log(1);
    }
  },
  methods: {
    //滚动歌词
    ...mapMutations(['setAudioPlayIndexs']),
    ...mapMutations(['setPlayShow']),
    //上一首
    last(){
        this.setAudioPlayIndexs('last');
    },
    //下一首
    next(){
        this.setAudioPlayIndexs('next');
    },
    //播放暂停
    play(){
      this.$audio.play();
      this.setPlayShow(true)
    },
    stop(){
      this.$audio.pause()
      this.setPlayShow(false)
    },
    rollingLyric(){
    },
    like(){
      uni.showToast({
        title: '该功能待完善!',
        duration: 2000,
        icon: 'none'
      });
    },
    playListCheck(){
       uni.showToast({
        title: '该功能待完善!',
        duration: 2000,
        icon: 'none'
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.play_details {
  width: 100%;
  height: 100%;
  .play_navigation {
    width: 100%;
    height: 100%;
    background-color: red;
  }
  .play_details_body {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);

    .play_details_body_header {
      width: 100%;
      height: 100rpx;
      font-size: 35rpx;
      font-weight: 900;
      display: flex;
      color: #fff;
      justify-content: center;
      align-items: center;
      view{
        width: 60%;
         overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
        text-align: center;
      }
    }
     .play_toolbar {
        width: 100%;
        height: 200rpx;
        // background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        // padding-bottom: 20rpx;
        position: absolute;
        bottom:0;
        .play_next{
          // position: absolute;
          // right: 110rpx;
          // bottom: 20rpx;
        }
        .play_last{
          // position: absolute;
          // right: 230rpx;
          // bottom: 20rpx;
        }
        .play_stop{
          margin-left: 10rpx;
          margin-right: 10rpx;
          // position: absolute;
          // right: 171rpx;
          // bottom: 20rpx;
        }
        .play_list_btn{
          position: absolute;
          right: 40rpx;
          // bottom: 20rpx;
        }
        .play_like{
           position: absolute;
          left: 40rpx;
        }
      }
  }
}
</style>