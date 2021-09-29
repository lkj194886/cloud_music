<template>
  <view class="play_details">
    <view class="play_navigation">
      <!-- <navigation
        :delta="1"
        
      ></navigation> -->
    </view>
    <view class="play_details_body">
      <view class="play_details_body_header">
        {{ audioContent.name }}
      </view>
      <ul class="lyric" ref="lyric">
        <li
          :class="{ each: true, choose: index == lyricIndex }"
          v-for="(item, key, index) in audioContent.songPlayLycric"
          :index="index"
          :key="key"
        >
          {{ item }}
        </li>
      </ul>
    </view>
  </view>
</template>

<script>
import navigation from "../navigation/index.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: { navigation },

  directives: {},
  computed: {
    ...mapState(["audioContent"]),
    ...mapState(["songPlayTimeLycric"]),
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
        console.log(1);
    }
  },
  methods: {
    //滚动歌词
    rollingLyric(){
        let i = 0;
      // 循环歌词对象
      for (let key in this.audioContent.songPlayLycric) {
        // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
        if (+key == this.songPlayTimeLycric) {
          this.lyricIndex = i;
          // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
          if (i > 6) {
            console.log(i);
            
            if(this.$refs.lyric.scrollTop>320){
                this.$refs.lyric.scrollTop +=40 ;
            }else{
                this.$refs.lyric.scrollTop +=30 ;
            }
            console.log(this.$refs.lyric.scrollTop);
          }
        }
        i++;
      }
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
    // background-color: yellow;
    .play_details_body_header {
      width: 100%;
      height: 100rpx;
      font-size: 35rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .lyric {
      width:100%;
      height: 500rpx;
      position: absolute;
      margin-top: 400rpx;
    //   background-color: #333;
      overflow: auto;
      color: #000;
      font-size: 10px;
      font-weight: normal;
      padding: 5rpx 5rpx;
    //   border: 1px solid #000;
      border-left: none;
      .each {
        height: 50rpx;
        line-height: 30px;
        text-align: center;
        font-size: 25rpx;
      }
      .choose {
        height: 30px;
        line-height: 30px;
        font-size: 45rpx;
        font-weight: 700;
      }
      // 修改滚动条样式
      &::-webkit-scrollbar {
        width: 3px;
        height: 1px;
      }
      // 滑块部分
      &::-webkit-scrollbar-thumb {
        background-color: #eee;
      }
      // 轨道部分
      &::-webkit-scrollbar-track {
        background-color: #333;
      }
    }
  }
}
</style>