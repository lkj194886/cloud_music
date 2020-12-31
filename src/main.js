import Vue from 'vue'
import App from './App'
import request from"./util/request.js"
import uView from "uview-ui";
Vue.use(uView);
Vue.prototype.$request = request
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
