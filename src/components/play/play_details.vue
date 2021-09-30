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
            <svg t="1632977926052" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2421" width="35" height="42"><path d="M523.733333 841.024l33.173334-32.576 99.690666-97.813333c70.976-69.632 120.32-117.973333 138.709334-135.893334 59.008-57.514667 93.248-121.28 99.626666-184.234666 6.250667-61.44-15.488-119.744-61.589333-164.672-44.992-43.84-98.88-61.909333-157.034667-52.906667-49.365333 7.616-101.034667 34.624-150.016 78.848a21.333333 21.333333 0 0 1-28.586666 0c-48.981333-44.224-100.650667-71.232-150.016-78.869333-58.154667-8.96-112.042667 9.088-157.034667 52.928-46.101333 44.928-67.84 103.210667-61.610667 164.693333 6.4 62.933333 40.64 126.72 99.648 184.213333a100207.573333 100207.573333 0 0 1 145.92 142.826667l24.256 23.765333L512 852.522667l11.733333-11.498667z m-11.733333 11.52l-1.493333 1.429333A2.133333 2.133333 0 0 1 512 853.333333c0.512 0 1.045333 0.213333 1.493333 0.64l-1.493333-1.450666z m157.781333-721.792c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z" fill="#ffffff" p-id="2422"></path></svg>
          </view>
         <!-- 上一首 -->
          <view class="play_last" @click.stop="last">
            <svg t="1632978055206" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2977" width="70" height="52"><path d="M206 865h-38c-30.928 0-56-25.072-56-56V216c0-30.928 25.072-56 56-56h38c30.928 0 56 25.072 56 56v593c0 30.928-25.072 56-56 56z m168.686-386.191l422.304-303.4c32.294-23.201 77.282-15.83 100.484 16.464A72 72 0 0 1 911 233.883v559.053c0 39.764-32.235 72-72 72a72 72 0 0 1-39.95-12.1L376.288 570.877c-25.73-17.16-32.677-51.93-15.517-77.66a56 56 0 0 1 13.915-14.408z" p-id="2978" fill="#ffffff"></path></svg>
          </view>
          <!-- 播放or暂停 -->
          <view class="play_stop">
            <svg v-if="playShow" @click.stop="stop" t="1632978151422" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1208" width="40" height="42"><path d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z" fill="#ffffff" p-id="1209"></path></svg>
            <svg v-else @click.stop="play" t="1632978165734" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2206" width="40" height="42"><path d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z" fill="#ffffff" p-id="2207"></path></svg>
          </view>
          <!-- 下一首 -->
          <view class="play_next" @click.stop="next">
           <svg t="1632978097825" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3677" width="70" height="52"><path d="M817 160h38c30.928 0 56 25.072 56 56v593c0 30.928-25.072 56-56 56h-38c-30.928 0-56-25.072-56-56V216c0-30.928 25.072-56 56-56zM648.314 546.191l-422.304 303.4c-32.294 23.201-77.282 15.83-100.484-16.464A72 72 0 0 1 112 791.117V232.064c0-39.764 32.235-72 72-72a72 72 0 0 1 39.95 12.1l422.762 281.959c25.73 17.16 32.677 51.93 15.517 77.66a56 56 0 0 1-13.915 14.408z" p-id="3678" fill="#ffffff"></path></svg>
          </view>
          <!-- 播放列表 -->
          <view class="play_list_btn" @click="playListCheck">
          <svg t="1632978479068" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3064" width="35" height="42"><path d="M66.488889 211.781818h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485 0-27.397172-22.768485-49.648485-50.980202-49.648485H66.488889C38.341818 112.484848 15.508687 134.723232 15.508687 162.133333s22.833131 49.648485 50.980202 49.648485z m891.009293 248.242424H66.488889C38.277172 460.024242 15.508687 482.262626 15.508687 509.672727s22.768485 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.410101-22.923636-49.648485-50.993131-49.648485z m0 351.63798H66.488889c-28.134141 0-50.980202 22.238384-50.980202 49.648485s22.833131 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.397172-22.781414-49.648485-50.993131-49.648485z m0 0" p-id="3065" fill="#ffffff"></path></svg> 
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