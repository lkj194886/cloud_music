<template>
  <view class="playa">
    <view v-if="playShow">
      <view class="play_header" :style="play_header_style"> </view>
      <view class="play_header_box">
        <navigation :delta="1" :title="playList.name"></navigation>
        <view class="img_header">
          <image :src="playList.coverImgUrl" class="header_img"></image>
        </view>
        <view class="play_name">
          {{ playList.name }}
        </view>
        <view class="play_description" v-if="playList.description != ''">
          <span>简介</span>
          <view class="play_content">
            {{ playList.description }}
          </view>
        </view>
      </view>
      <view class="play_util">
        <view class="play_util_box">
          <view class="play_util_box_item">
           <text style="font-size:38rpx" class="iconfont icon-shoucang"></text>收藏
          </view>
          <view class="play_util_box_item">
            <text style="font-size:38rpx" class="iconfont icon-31pinglun"></text>评论
          </view>
          <view class="play_util_box_item">
            <text style="font-size:42rpx" class="iconfont icon-fenxiang"></text>分享
          </view>
        </view>
      </view>
      <song-list :playList="playList"  v-if="songShow"></song-list>
    </view>
	<play></play>
  </view>
</template>

<script>
import navigation from "../navigation/index.vue";
// import play from "../../components/play/play.vue";
import songList from "../../components/song/songList.vue";
import {	mapState,mapMutations} from "vuex";
export default {
  components: {
    navigation,
	  // play,
    songList
  },
  data() {
    return {
      playId: null,
      playList: [],
      playShow: false,
      play_header_style: {},
      songList: [],
      trackIds: [],
      songShow:false,
      // index: 20, //当前需要显示的条数
      // indexs: 0, //上一次开始的条数
      animationStyle: {},
      lrc:""
    };
  },
  onLoad: function (option) {
    console.time("歌单详情页加载用时")
    this.playId = option.id;
    this.getPlayDetails();
    
  },
  beforeDestroy(){
    this.songShow = false
  },
  mounted(){
  },
  onReachBottom() {
    uni.$emit('onReachBottom');
  },
  computed:{
      ...mapState(["src"]),
      ...mapState(["audioPlayIndex"]),
  },
  methods: {
    	...mapMutations(["setSrc"]),
    	...mapMutations(["setAudioShow"]),
    	...mapMutations(["setAudioPicUrl"]),
    	...mapMutations(["setAudioPlayIndex"]),
    /**
     * 获取歌单详情
     */
    getPlayDetails() {
      let opts = {
        url: "/playlist/detail",
        method: "get",
      };

      let params = {
        id: this.playId,
      };
      uni.showLoading({
        title: "加载中",
      });
      this.$request.get(opts, params).then(
        (res) => {
          this.playShow = true;
          this.playList = res.data.playlist;
          let height = "";
          if (res.data.playlist.description != "") {
            height = "770rpx";
          } else {
            height = "670rpx";
          }

          //动态添加顶部背景图
          this.play_header_style = {
            background: "url('" + res.data.playlist.coverImgUrl + "')",
            "background-size": "cover",
            filter: "blur(15px)",
            width: "100%",
            height: height,
            display: "flex",
            "justify-content": "center",
            "flex-wrap": "wrap",
            "padding-bottom": "60rpx",
          };
          if(this.playList.trackIds.length){
              this.songShow = true;
          }
          console.timeEnd("歌单详情页加载用时")
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
  .play_header {
    position: relative;
    z-index: -1;
  }

  .play_header_box {
    position: absolute;
    top: 0;
    width: 100%;

    .img_header {
      width: 100%;
      display: flex;
      justify-content: center;

      .header_img {
        width: 250rpx;
        height: 250rpx;
        border-radius: 25rpx;
        margin-top: 150rpx;
      }
    }

    .play_name {
      margin-top: 60rpx;
      width: 100%;
      font-size: 35rpx;
      display: flex;
      justify-content: center;
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
        margin-top: 20rpx;
         margin-bottom: 40rpx;
        text-align: center;
        width: 60%;
        color: #fff;
        font-size: 24rpx;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-justify: inter-ideograph;
        white-space: pre-line;
      }
    }
  }

  .play_util {
    width: 100%;
    height: 80rpx;
    margin-top: -40rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .play_util_box {
      width: 480rpx;
      background-color: #fff;
      height: 100%;
      border-radius: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      // box-shadow: 6rpx 6rpx 3rpx 0rpx rgb(170, 165, 165);
      box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      font-weight: 700;
      font-size: 30rpx;

      .play_util_box_item {
        margin: 5rpx;
        padding: 5rpx;
        display: flex;
        align-items: center;
      }

      .play_util_box_item:nth-child(2) {
        height: 40rpx;
        margin: 15rpx;
        padding: 15rpx;
        border-left: 1rpx solid rgb(170, 165, 165);
        border-right: 1rpx solid rgb(170, 165, 165);
      }
    }
  }
}

</style>
