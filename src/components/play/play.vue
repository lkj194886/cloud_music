<template>
  <view class="play" :style="style" v-show="audioShow">
    
    <view class="play_box">
      <navigator :url="'/components/play/play_details'">
      <view class="play_img">
        <image :src="audioContent.picUrl" mode="aspectFit" />
      </view>
      </navigator>
      <!-- <view>{{this.$store.state.src[this.$store.state.audioPlayIndex].name}}</view> -->
      <view class="play_content">
        <view class="play_name">
          <span>{{ audioContent.name }}</span>
        </view>
        <view class="play_time" v-show="songTimeCount!='00:NaN'">{{songPlayTime}}/{{songTimeCount}}</view>
        <view class="play_toolbar">
          <!-- 上一首 -->
          <view class="play_last" @click.stop="last">
              <text style="font-size:55rpx" class="iconfont icon-shangyishou"></text>
          </view>
          <!-- 播放or暂停 -->
          <view class="play_stop">
            <text v-if="playShow" @click.stop="stop"  style="font-size:55rpx" class="iconfont icon-bf24gf-pause2"></text>
            <text  v-else @click.stop="play" style="font-size:55rpx" class="iconfont icon-zt24gf-play"></text>
          </view>
          <!-- 下一首 -->
          <view class="play_next" @click.stop="next">
            <text style="font-size:55rpx" class="iconfont icon-xiayishou"></text>
          </view>
          <!-- 播放列表 -->
          <view class="play_list_btn">
            <text style="font-size:50rpx" class="iconfont icon-gengduo"></text>
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    bottom: Number,
  },
  data: () => ({
    style: {},
  }),
  computed: {
    ...mapState(["src"]),
    ...mapState(["audioShow"]),
    ...mapState(["audioPlayIndex"]),
    ...mapState(["audioContent"]),
    ...mapState(["playShow"]),
    ...mapState(["songTimeCount"]),
    ...mapState(["songPlayTime"]),
  },
  methods: {
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
    }
  },
  watch: {
    src() {
      if (
        this.src[this.audioPlayIndex].src != "" &&
        this.src[this.audioPlayIndex].src != undefined
      ) {
        this.$audio.src = this.audioContent.src;
      }
    },
    audioPlayIndex() {
      this.$audio.src = this.audioContent.src;
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    if (this.bottom === undefined) {
      this.style = {
        width: "100%",
        height: "120rpx",
        "background-color": "#fff",
        position: "fixed",
		"z-index": 99,
        bottom: "0rpx",
      };
    } else {
      this.style = {
        width: "100%",
        height: "120rpx",
        "background-color": "#fff",
        position: "fixed",
		"z-index": 99,
        bottom: this.bottom + "rpx",
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.play {
  // display: none;
  // border-top: 1rpx solid rgb(215, 213, 213);
  .play_box {
    display: flex;
    width: 100%;
    .play_img > image {
      width: 120rpx;
      height: 120rpx;
    }
    .play_content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .play_name {
        margin-top: 25rpx;
        font-weight: 700;
        width: 100%;
        height: 20%;
        text-align: left;
        margin-left: 20rpx;
      }
      .play_name>span{
        display:block;
        width:260rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .play_time{
        width: 100%;
         margin-left: 20rpx;
         margin-top: 10rpx;
         font-size: 10rpx;
         color:rgb(170, 165, 165) ;
      }
      .play_toolbar {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 20rpx;
        .play_next{
          position: absolute;
          right: 110rpx;
          bottom: 35rpx;
        }
        .play_last{
          position: absolute;
          right: 230rpx;
          bottom: 35rpx;
        }
        .play_stop{
          position: absolute;
          right: 171rpx;
          bottom: 35rpx;
        }
        .play_list_btn{
          position: absolute;
          right: 12rpx;
          bottom: 35rpx;
        }
      }
    }
  }
}
</style>
