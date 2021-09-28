import Vue from 'vue'
import App from './App'
import request from "./util/request.js"
import uView from "uview-ui";
import api from './util/api.js';
import audio from './util/audio';
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.use(uView);
Vue.prototype.$request = request
Vue.prototype.$api = api;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store,
    audio
})
app.$mount()