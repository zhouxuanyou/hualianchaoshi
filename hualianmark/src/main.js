import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import '@/conmon/css/conmon.css';

// 解构引入组件
import { Message } from 'element-ui';
// 引入request.js
import req from '@/api/request';

// 把axios挂在Vue的原型上 所有vue的实例对象共享
Vue.prototype.req = req;

//路由守卫
router.beforeEach((to, from, next) => {
    //获取token
    let token = window.localStorage.getItem('token');
    if (!token) {
        if (to.path === '/login'){
            next()
        } else {
            Message.error('请登陆后再操作');

            return next({'path':'/login'});
        }
    }else {
        next();
    }
});

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
