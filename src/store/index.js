import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        src: [

        ], //播放列表
        audioShow: false,
        audioPicUrl: null,
        audioPlayIndex: -1, //当前播放歌曲的下标    
        audioContent: {
            id: "",
            index: "",
            src: "",
            picUrl: "",
            name: "",
            alName: "",
            arName: "",
            songPlayLycric: "",
        }, //当前播放歌曲的信息
        playShow: true, //播放暂停
        songTimeCount: "", //当前歌曲总时长
        songPlayTime: "", //当前歌曲播放时长
        songPlayTimeLycric: "" //当前播放位置

    },
    mutations: {
        /**
         * 插入歌曲到播放列表
         * @param {*} state 
         * @param {*} src 
         */
        setSrc(state, src) {

            // tips 
            // 播放列表不存当前歌曲的话,将歌曲插入上一次播放的后一位

            //插入歌曲信息前,在播放列表中查找是否存在当前歌曲信息(存在则播放已存在的歌曲,否则将新的歌曲插入当前列表第一位)
            let index = state.src.findIndex(item => item.id === src.id);
            if (index != -1) {
                state.audioPlayIndex = index;
            } else {
                state.src.unshift(src)
                state.audioPlayIndex = 0;
            }
            store.commit('replaceAudio')
        },
        /**
         * 显示播放器
         * @param {*} state 
         * @param {*} audioShow 
         */
        setAudioShow(state, audioShow) {
            state.audioShow = audioShow
        },
        /**
         * 自动切换歌曲
         * @param {*} state 
         */
        setAudioPlayIndex(state) {
            //是否是最后一首歌曲,重置为列表第一首

            if (state.audioPlayIndex === state.src.length - 1) {
                console.log(1);
                state.playShow = false;
                state.audioPlayIndex = 0;
            } else {
                state.playShow = true;
                state.audioPlayIndex++
            }
            store.commit('replaceAudio')
        },
        /**
         *  切换歌曲
         * @param {} state 
         * @param {*} index 
         */
        setAudioPlayIndexs(state, type) {
            // store.commit('setPlayShow', false);
            if (type === 'last') {
                console.log("上一首");
                if (state.audioPlayIndex === 0) {
                    state.audioPlayIndex = state.src.length - 1;
                } else {
                    state.audioPlayIndex = state.audioPlayIndex -= 1;
                }
            }
            if (type === 'next') {
                console.log("下一首");
                if (state.audioPlayIndex === state.src.length - 1) {
                    state.audioPlayIndex = 0;
                } else {
                    state.audioPlayIndex = state.audioPlayIndex += 1;
                }
            }
            // console.log(state.playShow);
            store.commit('replaceAudio');
            // store.commit('setPlayShow', true);
        },
        //渲染播放器组件内容
        replaceAudio(state) {
            state.audioContent.id = state.src[state.audioPlayIndex].id;
            state.audioContent.src = state.src[state.audioPlayIndex].src;
            state.audioContent.picUrl = state.src[state.audioPlayIndex].picUrl;
            state.audioContent.name = state.src[state.audioPlayIndex].name;
            state.audioContent.songPlayLycric = state.src[state.audioPlayIndex].songPlayLycric;
            state.audioContent.index = state.audioPlayIndex;
        },
        //播放暂停图标
        setPlayShow(state, flag) {
            state.playShow = flag;
        }
    },
    actions: {}
})
export default store