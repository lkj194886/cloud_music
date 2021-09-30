import Vue from 'vue'
const audio = uni.createInnerAudioContext();
audio.autoplay = true;
Vue.prototype.$audio = audio;
import store from '../store/index';
//监听播放进度
audio.onTimeUpdate(() => {
        var songTimeCount = GetDateTime(audio.duration);
        var songPlayTime = GetDateTime(audio.currentTime);
        var songPlayTimeLycric = audio.currentTime;
        store.state.songTimeCount = songTimeCount;
        store.state.songPlayTime = songPlayTime;
        store.state.songPlayTimeLycric = songPlayTimeLycric;
       
    })
    //监听播放事件
audio.onPlay(()=>{
    console.log(store.state.src[store.state.audioPlayIndex].name + "开始播放");
    store.state.playShow = true;
})
    //监听播放完成
audio.onEnded(() => {
        console.log(store.state.src[store.state.audioPlayIndex].name + "播放完成");
        next();
    })
    //监听播放错误
audio.onError(() => {
        uni.showToast({
            title: '播放失败自动为您切换到下一首',
            duration: 2000,
            icon: "none"
        });
        console.log(store.state.src[store.state.audioPlayIndex].name + '播放错误');
        next()
    })
    //监听停止事件
audio.onPause(() => {
        console.log("停止了");
    })
    //音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
audio.onWaiting(() => {
        console.log(1);
    })
    //切换歌曲
function next() {
    store.commit('setAudioPlayIndex')
    console.log("切换为" + store.state.src[store.state.audioPlayIndex].name);
}
//格式化时间
function GetDateTime(time) {

    if (time >= 60 && time <= 3600) {
        let t = parseInt(time / 60);
        let s = time % 60;
        if (t < 10) {
            if (s < 10) {
                time = "0" + t + ":0" + parseInt(s);
            } else {
                time = "0" + t + ":" + parseInt(s);
            }

        } else {
            if (s < 10) {
                time = t + ":" + parseInt(s);
            } else {
                time = t + ":" + parseInt(s);
            }
        }
    } else {
        let s = time % 60
        if (s < 10) {
            time = "00:0" + parseInt(s);
        } else {
            time = "00:" + parseInt(s);
        }

    }
    return time;
}