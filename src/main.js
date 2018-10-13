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
    switch (res.status) {
      case 404: $.toptip("404 资源不存在", "error"); break;
      case 504: $.toptip("连接超时", "error"); break;
    }

    let status = res.data.status;
    let desc = "";
    switch (status) {
      case 400: desc = res.data.desc; break;
      case 401:
        desc = res.data.desc;
        router.push({name: 'login'});
        break;
      case 403: desc = res.data.desc; break;
      case 404: desc = res.data.desc; break;
      case 500:
        console.log(res);
        desc = "系统异常，请联系管理员";
        break;
      default: break;
    }
    if (desc !== "") {
      $.toptip(res.data.desc, "error");
    }
    return res;
  }
});
