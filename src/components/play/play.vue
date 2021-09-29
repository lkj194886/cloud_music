<template>
  <view class="play" :style="style" v-show="audioShow">
    <view class="play_box">
      <view class="play_img">
        <image :src="audioContent.picUrl" mode="aspectFit" />
      </view>
      <!-- <view>{{this.$store.state.src[this.$store.state.audioPlayIndex].name}}</view> -->
      <view class="play_content">
        <view class="play_name">{{ audioContent.name }}</view>
        <view class="play_time" v-show="songTimeCount!='00:NaN'">{{songPlayTime}}/{{songTimeCount}}</view>
        <view class="play_toolbar">
          <!-- 上一首 -->
          <view class="play_last" @click="last">
            <svg
              t="1632896403114"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2125"
              width="30"
              height="32"
            >
              <path
                d="M803.584 134.592c-18.176-10.048-39.936-10.112-58.112 0L192 443.008l0-282.88c0-17.664-14.336-32-32-32S128 142.464 128 160.128l0 344.896C127.744 507.2 127.104 509.248 127.104 511.488S127.744 515.84 128 518.016l0 346.112c0 17.664 14.336 32 32 32s32-14.336 32-32L192 579.968l553.408 308.352C754.56 893.44 764.48 896 774.528 896s19.968-2.56 29.056-7.616c18.176-10.112 28.992-28.224 28.992-48.576L832.576 183.104C832.576 162.88 821.76 144.768 803.584 134.592zM768.192 829.248 198.016 511.488 771.328 192 768.192 829.248z"
                p-id="2126"
              ></path>
            </svg>
          </view>
          <!-- 播放or暂停 -->
          <view class="play_stop">
            <svg v-if="playShow" @click="stop" t="1632899380165" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6270" width="30" height="32"><path d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z" fill="#5C5C66" p-id="6271"></path></svg>
            <svg v-else @click="play" t="1632899451182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7080" width="30" height="32"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#3D3D3D" p-id="7081"></path></svg>
          </view>
          <!-- 下一首 -->
          <view class="play_next" @click="next">
            <svg
              t="1632896646344"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2781"
              width="30"
              height="32"
            >
              <path
                d="M832 160.128c0-17.664-14.336-32-32-32S768 142.464 768 160.128l0 282.88L214.592 134.592c-18.176-10.112-39.936-10.048-58.112 0C138.24 144.768 127.424 162.88 127.424 183.168l0 656.64c0 20.224 10.816 38.464 29.056 48.576C165.568 893.44 175.488 896 185.472 896s19.968-2.56 29.056-7.616L768 579.968l0 284.096c0 17.664 14.336 32 32 32s32-14.336 32-32L832 160.128zM191.808 829.248 188.672 192l573.312 319.488L191.808 829.248z"
                p-id="2782"
              ></path>
            </svg>
          </view>
          <!-- 播放列表 -->
          <view class="play_list_btn">
          <svg t="1632902436673" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2414" width="25" height="32"><path d="M892.928 128q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0zM892.928 448.512q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0zM892.928 769.024q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0z" p-id="2415"></path></svg>  
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
        bottom: "0rpx",
      };
    } else {
      this.style = {
        width: "100%",
        height: "120rpx",
        "background-color": "#fff",
        position: "fixed",
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
          bottom: 20rpx;
        }
        .play_last{
          position: absolute;
          right: 230rpx;
          bottom: 20rpx;
        }
        .play_stop{
          position: absolute;
          right: 171rpx;
          bottom: 20rpx;
        }
        .play_list_btn{
          position: absolute;
          right: 10rpx;
          bottom: 20rpx;
        }
      }
    }
  }
}
</style>
