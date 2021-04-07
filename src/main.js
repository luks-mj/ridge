// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store/store'
import axios from 'axios'
import api from './api'
import moment from 'moment'


Vue.use(ElementUI);
Vue.prototype.$moment = moment
Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = api;

Vue.filter('time', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  if (value == null || value == '' || typeof value == 'undefined') return "";
  return moment(value).format(formatString);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
