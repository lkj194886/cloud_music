<template>
  <view class="play_list">
    <view class="play_botton">
      <text
        style="font-size: 45rpx; color: red"
        class="iconfont icon-bofang24gf-playCircle"
      ></text
      >全部播放({{ playList.trackIds.length }})
    </view>
    <view class="play_song_box" ref="play_song_box">
      <view
        class="play_song_box_item"
        v-for="(item, index) in songList"
        :key="index"
        @click="checkPlayItem(item)"
      >
        <view class="play_song_item_index">
          {{ index + 1 }}
        </view>
        <view class="play_song_item_detailed">
          <span class="play_song_item_ar">{{ item.name }}</span>
          <br />
          <span class="play_song_item_al"
            >{{ item.ar[0].name }} - {{ item.al.name }}</span
          >
        </view>
        <view class="play_song_box_video" @click.stop="checkVideIcon(item)">
          <text
            v-if="item.mv != 0"
            style="font-size: 45rpx"
            class="iconfont icon-shipinbofang"
          ></text>
        </view>
        <view class="play_song_box_handle">
          <text
            style="font-size: 45rpx"
            class="iconfont icon-androidgengduo"
          ></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
//将歌曲列表抽取出来封装成公用组件
import { mapState, mapMutations } from "vuex";
export default {
  name: "songList",
  props: {
    playList: Object,
    id: Number,
  },
  watch: {
    playList() {},
    id() {
    },
  },
  data() {
    return {
      play_header_style: {},
      songList: [],
      index: 20, //当前需要显示的条数
      indexs: 0, //上一次开始的条数
      animationStyle: {},
      trackIdsLength: 0,
      songShow: true,
    };
  },
  beforeDestroy() {
    //销毁滚动底部加载事件
    uni.$off("onReachBottom");
  },
  mounted() {
    this.getSongIdSplitList(this.playList.trackIds);
    this.trackIdsLength = this.playList.trackIds.length;
    uni.$on("onReachBottom", () => {
      this.next();
    });
  },
  computed: {
    ...mapState(["src"]),
    ...mapState(["audioPlayIndex"]),
  },
  methods: {
    ...mapMutations(["setSrc"]),
    ...mapMutations(["setAudioShow"]),
    ...mapMutations(["setAudioPicUrl"]),
    ...mapMutations(["setAudioPlayIndex"]),
    /**
     * 处理返回的数据,将ID提取出来获得歌曲url及其详情
     */
    getSongIdSplitList(item) {
      let Ids = "";
      for (let i = this.indexs; i < this.index; i++) {
        if (item[i].id != undefined) {
          Ids += item[i].id + ",";
        }
      }
      Ids = Ids.substring(0, Ids.lastIndexOf(","));
      let opts = {
        url: "/song/detail",
        method: "get",
      };

      let params = {
        ids: Ids,
      };
      this.$request.get(opts, params).then((res) => {
        this.songList = [...this.songList, ...res.data.songs];
        uni.hideLoading();
        //循环添加动画
        let time = 0;
        for (let i = this.indexs; i < this.index; i++) {
          if (item[i].id != undefined) {
            time++;
            let className = "play_song_box_item animation-" + time;
            let _that = this;
            this.$nextTick(() => {
              _that.$refs.play_song_box.$children[i].$el.setAttribute(
                "class",
                className
              );
            });
          }
        }
      });
    },
    //上滑加载更多
    next() {
      console.log(this.trackIdsLength);
      console.log(this.index);
      // this.trackIdsLength = this.playList.trackIds.length
      //当前条数是否等于总条数
      if (this.index === this.trackIdsLength) {
        setTimeout(function () {
          uni.showToast({
            title: "没有更多了噢!",
            duration: 2000,
            icon: "none",
          });
        }, 1000);
        return;
      }
      //累加当前条数
      let is = this.index + 20;
      //判断是否大于总数,(当前需要增加的条数等于总条数减去上一次的总条数),否则继续增加默认的条数
      if (is > this.playList.trackIds.length) {
        this.indexs = this.index;
        this.index += this.playList.trackIds.length - this.indexs;
      } else {
        this.indexs = this.index;
        this.index += 20;
      }
      //调用获取方法
      this.getSongIdSplitList(this.playList.trackIds);
    },
    //歌曲列表点击事件
    checkPlayItem(item) {
      let opts = {
        url: "/song/url",
        method: "get",
      };
      let param = {
        id: item.id,
      };

      this.$api.getAudio(opts, param).then((res) => {
        this.$request.getLyric(item.id).then((ress) => {
          // lyric = ress;
          let audio = {
            id: item.id,
            src: res.data.data[0].url,
            name: item.name,
            picUrl: item.al.picUrl,
            songPlayLycric: ress,
          };
          this.setSrc(audio);
          this.setAudioShow(true);
        });
      });
    },
    //mv图标点击事件
    checkVideIcon(item) {
      uni.showToast({
        title: "该功能暂未开放",
        duration: 2000,
        icon: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.play_list {
  margin-top: 40rpx;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  .play_botton {
    width: 100%;
    height: 70rpx;
    padding-bottom: 20rpx;
    border-bottom: 3rpx solid rgba(170, 165, 165, 0.3);
    display: flex;
    align-items: center;
    font-size: 30rpx;
    font-weight: 600;

    text {
      margin-left: 26rpx;
      margin-right: 5rpx;
    }
  }

  .play_song_box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .play_song_box_item:nth-child(1) {
      margin-top: 30rpx;
    }

    .play_song_box_item {
      margin-bottom: 25rpx;
      width: 95%;
      display: flex;
      align-items: center;
      height: 80rpx;

      .play_song_item_index {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50rpx;
        margin-left: 8rpx;
        font-size: 34rpx;
        color: rgb(170, 165, 165);
      }

      .play_song_item_detailed {
        margin-left: 22rpx;
        font-size: 0;

        .play_song_item_ar {
          font-size: 29rpx;
          width: 500rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-justify: inter-ideograph;
          white-space: pre-line;
          overflow: hidden;
          word-break: keep-all;
          text-overflow: ellipsis;
          font-weight: 700;
        }

        .play_song_item_al {
          width: 300rpx;
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
      }

      .play_song_box_video {
        margin-right: 10rpx;
        width: 70rpx;
      }
    }
    .play_song_box_item:last-child {
      margin-bottom: 150rpx;
    }
  }
}
$grid-columns: 30;

@for $i from 0 through $grid-columns {
  $time: ($i * 100+200) + ms;

  .animation-#{$i} {
    transition: all 0.5s linear;
    animation-duration: 0.5s; // 注释掉 会没有动画 就是帕帕一帧一帧的出来
    animation-fill-mode: both;
    animation-delay: $time;
    // @if $i%2==0 {
    animation-name: toTop;
    // } @else {
    //   animation-name: toBottom;
    // }
  }
}

// 方向 下-->上
@keyframes toTop {
  0% {
    opacity: 0;
    transform: translate3d(100%, 100%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

// 方向 上-->下
@keyframes toBottom {
  0% {
    opacity: 0;
    transform: translate3d(-100%, 100%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>