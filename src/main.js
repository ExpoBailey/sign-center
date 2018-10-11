// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import weui from 'weui'
import $ from 'jquery'
import 'jquery-weui/dist/css/jquery-weui.css'
import 'jquery-weui/dist/js/jquery-weui.js'
import axios from 'axios'

Vue.config.productionTip = false

$.toast.prototype.defaults.duration = 1000

Vue.use(weui)
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

axios.interceptors.response.use(res => {
  if (res.data != null) {
    let status = res.data.status;
    switch (status) {
      case 400:
        $.toptip(res.data.desc, "error");
        break;
      case 401:
        $.toptip(res.data.desc, "error");
        break;
      case 403:
        router.push({name: 'login'});
        break;
      case 404:
        $.toptip(res.data.desc, "error");
        break;
      case 500:
        console.log(res);
        $.toptip("系统异常，请联系管理员", "error");
        break;
      default:
        break;
    }
    return res;
  }
});
