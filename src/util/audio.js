import Vue from 'vue'
const audio = uni.createInnerAudioContext();
audio.autoplay = true;
Vue.prototype.$audio = audio;