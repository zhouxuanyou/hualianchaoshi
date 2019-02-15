import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import '@/conmon/css/conmon.css';
// 引入axios
import axios from 'axios'


Vue.config.productionTip = false;
Vue.use(ElementUI);
// 把axios挂在Vue的原型上 所有vue的实例对象共享
Vue.prototype.axios = axios;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
