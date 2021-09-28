import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        src: null,
        audioShow: false
    },
    mutations: {
        setSrc(state, src) {
            state.src = src
        },
        setAudioShow(state, audioShow) {
            state.audioShow = audioShow
        }
    },
    actions: {}
})
export default store