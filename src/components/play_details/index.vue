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
          <view class="play_util_box_item"
            ><svg
              t="1632722699880"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6523"
              width="22"
              height="18"
            >
              <path
                d="M509.606998 143.114488c9.082866 0 17.327644 4.840238 20.996197 12.331863l97.262184 197.441814c5.613858 11.403724 16.663518 19.358907 29.438473 21.216207l223.738737 32.552393c8.420787 1.215688 15.604396 6.851035 18.23327 14.254655 2.520403 7.18361 0.595564 15.062044-5.084808 20.586874L730.253304 601.611947c-8.949836 8.751315-12.994965 21.171182-10.916631 33.370015l38.011732 222.060515c1.325182 7.737218-2.165316 15.426341-8.905834 19.978007-4.088108 2.741437-8.861832 4.155646-13.812587 4.155646-4.022617 0-7.999185-0.972141-11.425214-2.740414L528.149307 775.671215c-5.768377-3.006474-12.155854-4.552689-18.542308-4.552689-6.364965 0-12.727882 1.547239-18.518772 4.552689L296.254819 878.348736c-3.559059 1.855254-7.602142 2.828418-11.668761 2.828418-4.861728 0-9.723455-1.459235-13.546527-4.022617-6.961552-4.684696-10.475586-12.419867-9.127891-20.155039l38.011732-222.016513c2.078335-12.198833-1.988284-24.619724-10.939143-33.370015L125.02397 441.443038c-5.635347-5.492084-7.55814-13.348006-5.061272-20.453844 2.63092-7.481392 9.812483-13.116739 18.298761-14.332427l223.674269-32.552393c12.839423-1.857301 23.867594-9.813506 29.481452-21.216207l97.194646-197.396789C492.325403 147.965983 500.590648 143.114488 509.606998 143.114488M509.606998 104.904235c-24.043602 0-45.922912 13.226233-56.177464 33.95637L356.189863 336.302419l-223.674269 32.54216c-22.983457 3.304256-42.100864 18.718317-49.481971 39.659255-7.381108 21.048385-1.812275 44.23241 14.431687 60.033281l163.916257 160.125931-38.011732 222.016513c-3.868097 22.408359 6.03239 44.819788 25.458835 57.94676 10.69662 7.116071 23.204491 10.784624 35.757388 10.784624 10.298554 0 20.663622-2.475378 30.055526-7.337105l194.987926-102.7205L704.662463 912.072815c9.369392 4.861728 19.712971 7.337105 29.990035 7.337105 12.57541 0 25.082258-3.668553 35.778878-10.784624 19.426445-13.126972 29.305443-35.538401 25.460882-57.94676l-38.012755-222.016513 163.937746-160.125931c16.22145-15.812127 21.810748-38.984896 14.408151-60.033281-7.402597-20.940938-26.51898-36.353976-49.503461-39.659255L663.04767 336.302419l-97.240695-197.441814C555.619962 118.131491 533.695626 104.904235 509.606998 104.904235L509.606998 104.904235z"
                p-id="6524"
              ></path></svg
            >收藏</view
          >
          <view class="play_util_box_item"
            ><svg
              t="1632722485837"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4420"
              width="22"
              height="18"
            >
              <path
                d="M622.56056 464.834794c0 27.928073 22.73684 50.64854 50.664913 50.64854 27.956725 0 50.693566-22.720468 50.693566-50.64854 0-27.928073-22.73684-50.66389-50.693566-50.66389C645.2974 414.171927 622.56056 436.907745 622.56056 464.834794"
                p-id="4421"
              ></path>
              <path
                d="M931.254178 211.459063c0-40.637536-33.05893-73.698512-73.728188-73.698512L166.471964 137.76055c-40.637536 0-73.727165 33.059953-73.727165 73.698512l0 506.796488c0 40.637536 33.088606 73.696466 73.727165 73.696466l251.16846 0 94.343715 94.28641 94.315062-94.28641 251.226788 0c40.669258 0 73.728188-33.05893 73.728188-73.696466l0-82.560344-0.089028-1.282203L931.254178 211.459063zM875.96699 695.220928c0 22.88522-18.558681 41.444924-41.443901 41.444924L579.446623 736.665853l-67.462484 67.490114-67.430762-67.490114L189.506587 736.665853c-22.88522 0-41.4746-18.559705-41.4746-41.444924L148.031986 234.493685c0-22.88522 18.58938-41.488927 41.4746-41.488927l645.01548 0c22.88522 0 41.443901 18.603707 41.443901 41.488927l0 396.579247 0 36.161594L875.965967 695.220928z"
                p-id="4422"
              ></path>
              <path
                d="M461.321272 464.834794c0 27.928073 22.735817 50.64854 50.662867 50.64854 27.929096 0 50.66389-22.720468 50.66389-50.64854 0-27.928073-22.734794-50.66389-50.66389-50.66389C484.057089 414.171927 461.321272 436.907745 461.321272 464.834794"
                p-id="4423"
              ></path>
              <path
                d="M300.083008 464.834794c0 27.928073 22.735817 50.64854 50.66389 50.64854 27.927049 0 50.662867-22.720468 50.662867-50.64854 0-27.928073-22.735817-50.66389-50.662867-50.66389C322.817802 414.171927 300.083008 436.907745 300.083008 464.834794"
                p-id="4424"
              ></path></svg
            >评论</view
          >
          <view class="play_util_box_item" @click="next"
            ><svg
              t="1632722732436"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2414"
              width="22"
              height="18"
            >
              <path
                d="M763.84 896c-47.128 0-85.333-38.205-85.333-85.333s38.205-85.333 85.333-85.333c47.128 0 85.333 38.205 85.333 85.333 0 47.128-38.205 85.333-85.333 85.333M329.92 558.848c-14.895 26.231-42.641 43.638-74.453 43.638-47.128 0-85.333-38.205-85.333-85.333 0-16.097 4.457-31.152 12.204-44 14.935-24.769 42.098-41.333 73.13-41.333 47.128 0 85.333 38.205 85.333 85.333 0 15.317-4.035 29.691-11.101 42.117M763.84 128c47.128 0 85.333 38.205 85.333 85.333s-38.205 85.333-85.333 85.333c-47.128 0-85.333-38.205-85.333-85.333 0-47.128 38.205-85.333 85.333-85.333M763.84 682.667c-0.021 0-0.047 0-0.072 0-39.16 0-74.203 17.626-97.628 45.378l-289.885-167.063c4.932-13.101 7.787-28.245 7.787-44.055 0-0.105 0-0.209 0-0.314 0-0.072 0-0.177 0-0.281 0-15.81-2.855-30.953-8.077-44.942l295.544-169.566c23.265 24.363 56.001 39.509 92.275 39.509 0.020 0 0.039 0 0.059 0 70.689 0 127.997-57.308 127.997-128 0-70.692-57.308-128-128-128-70.692 0-128 57.308-128 128 0 18.965 4.224 36.907 11.627 53.099l-292.288 168.747c-23.653-28.833-59.285-47.084-99.18-47.084-70.692 0-128 57.308-128 128 0 0.188 0 0.376 0.001 0.564-0.001 0.123-0.001 0.304-0.001 0.484 0 70.692 57.308 128 128 128 39.895 0 75.526-18.251 99.001-46.86l289.373 166.752c-5.397 13.568-8.529 29.29-8.533 45.743 0 70.582 57.308 127.889 128 127.889 70.692 0 128-57.308 128-128 0-70.692-57.308-128-128-128z"
                fill="#3D3D3D"
                p-id="2415"
              ></path></svg
            >分享</view
          >
        </view>
      </view>
      <view class="play_list">
        <view class="play_botton">
          <svg
            t="1632724557885"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7314"
            width="30"
            height="20"
          >
            <path
              d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
              fill="#d81e06"
              p-id="7315"
            ></path>
          </svg>
          全部播放({{ playList.trackIds.length }})
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
              <svg
                v-if="item.mv != 0"
                t="1632733744605"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3356"
                width="30"
                height="25"
              >
                <path
                  d="M374.6 636.5c4.4 0 8.5-1.2 12.1-3.3l171.7-100c8-3.6 13.6-11.9 13.6-21.5 0-8.8-4.8-16.6-11.9-20.7l-167.8-97.8c-4.3-5-10.7-8.1-17.7-8.1-13.1 0-23.6 10.7-23.6 23.8v1.3l-0.3 0.2 0.4 199.8c-0.1 0.8-0.1 1.6-0.1 2.5 0 13.2 10.6 23.8 23.6 23.8z"
                  fill="#4D4D4D"
                  p-id="3357"
                ></path>
                <path
                  d="M64.7 586.3a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z"
                  fill="#4D4D4D"
                  p-id="3358"
                ></path>
                <path
                  d="M960 398.3c0.1-1.6 0.2-3.2 0.2-4.8 0-35-28.5-63.3-63.6-63.3-11.7 0-22.7 3.2-32.2 8.7l-0.5-0.3-31.5 18.2v-64.7c-0.1-73.1-59.9-133-133.1-133H197.4c-73.1 0-133 59.8-133 133v165.8h0.2c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1h0.2V287c0-35.2 28.8-64 64-64h510.2c35.2 0 64 28.8 64 64v448.9c0 35.2-28.8 64-64 64H193.3c-35.2 0-64-28.8-64-64v-21.4c0-17.7-14.4-32.1-32.2-32.1-17.8 0-32.2 14.4-32.2 32.1h-0.4v15.3c0 73.2 59.9 133 133 133h501.9c73.2 0 133-59.8 133-133v-64.1l33.1 19.1 0.1-0.1c9.2 5.1 19.8 8 31 8 35.1 0 63.6-28.4 63.6-63.3 0-1.6-0.1-3.2-0.2-4.8V398.3z m-63.6 205.1c-0.3 7.8-6.9 14.1-15 14.1-2.7 0-5.3-0.7-7.5-2l-41.5-23.7V430.1l40.9-23.2c2.3-1.5 5.1-2.3 8.1-2.3 8.3 0 15 6.6 15 14.6v184.2z"
                  fill="#4D4D4D"
                  p-id="3359"
                ></path>
              </svg>
            </view>
            <view class="play_song_box_handle">
              <svg
                t="1632733868517"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4181"
                width="25"
                height="15"
              >
                <path
                  d="M420.9664 32.8704c-24.576 22.016-36.9664 48.9472-36.9664 80.896 0 32.0512 12.3392 58.9312 36.9664 80.896 24.7296 21.9136 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.248 37.7344-50.5344 36.9664-80.896 0-32-12.288-58.88-36.9664-80.896C578.304 10.9568 547.9424 0 512 0 475.9552 0 445.696 10.9568 420.9664 32.8704z m0 398.2336C396.3904 453.0688 384 480 384 512c0 32 12.3392 58.88 36.9664 80.896 24.7296 21.8624 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.2992 37.7344-50.5856 36.9664-80.896 0-32.0512-12.288-58.9312-36.9664-80.896-24.6784-21.9136-55.04-32.8704-90.9824-32.8704-36.0448 0-66.304 10.9568-91.0336 32.8704z m0 398.1824c-24.576 22.016-36.9664 48.9472-36.9664 80.896 0 32.0512 12.3392 58.9312 36.9664 80.896 24.7296 21.9136 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.248 37.7344-50.5344 36.9664-80.896 0-32-12.288-58.88-36.9664-80.896-24.6784-21.8624-55.04-32.8704-90.9824-32.8704-36.0448 0-66.304 11.008-91.0336 32.8704z"
                  p-id="4182"
                ></path>
              </svg>
            </view>
          </view>
        </view>
      </view>
    </view>
	<play></play>
  </view>
</template>

<script>
import navigation from "../navigation/index.vue";
import play from "../../components/play/play.vue";
export default {
  components: {
    navigation,
	play
  },
  data() {
    return {
      playId: null,
      playList: [],
      playShow: false,
      play_header_style: {},
      songList: [],
      trackIds: [],
      index: 20, //当前需要显示的条数
      indexs: 0, //上一次开始的条数
      animationStyle: {},
    };
  },
  onLoad: function (option) {
    this.playId = option.id;
    this.getPlayDetails();
  },
  onReachBottom() {
    this.next();
  },
  methods: {
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
            height = "740rpx";
          } else {
            height = "670rpx";
          }

          //动态添加顶部背景图
          this.play_header_style = {
            background: "url('" + res.data.playlist.coverImgUrl + "')",
            "background-size": "cover",
            filter: "blur(6px)",
            width: "100%",
            height: height,
            display: "flex",
            "justify-content": "center",
            "flex-wrap": "wrap",
            "padding-bottom": "50rpx",
          };
          this.trackIds = res.data.playlist.trackIds;
          //调用获取歌曲列表方法传入参数 Ids
          this.getSongIdSplitList(res.data.playlist.trackIds);
        },
        (error) => {
          console.log(error);
        }
      );
    },
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
		console.log(res);
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
      //当前条数是否等于总条数
      if (this.index === this.trackIds.length) {
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
      if (is > this.trackIds.length) {
        this.indexs = this.index;
        this.index += this.trackIds.length - this.indexs;
      } else {
        this.indexs = this.index;
        this.index += 20;
      }
      //调用获取方法
      this.getSongIdSplitList(this.trackIds);
    },
	//歌曲列表点击事件
	checkPlayItem(item){
		uni.showToast({
			title: '点击了'+item.name,
			duration: 2000,
			icon:"none"
		});
	}, 
	//mv图标点击事件
	checkVideIcon(item){
		uni.showToast({
			title: '点击了'+item.name+"MV",
			duration: 2000,
			icon:"none"
		});
	}
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
      box-shadow: 6rpx 6rpx 3rpx 0rpx rgb(170, 165, 165);
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

  .play_list {
    margin-top: 40rpx;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .play_botton {
      width: 100%;
      height: 70rpx;
      padding-bottom: 20rpx;
      border-bottom: 3rpx solid rgba(170, 165, 165, 0.3);
      display: flex;
      align-items: center;
      font-size: 30rpx;
      font-weight: 600;

      svg {
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
    }
  }
}

$grid-columns: 30;

@for $i from 0 through $grid-columns {
  $time: ($i * 100+200) + ms;

  .animation-#{$i} {
    transition: all .5s linear;
    animation-duration: .5s; // 注释掉 会没有动画 就是帕帕一帧一帧的出来
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
