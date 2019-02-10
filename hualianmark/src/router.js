import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Index from '@/views/Index/Index.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },

      {
          path:'/login',
          name:'Login',
          component:Login
      },
      {
          path:'/',
          name:'Index',
          component:Index,
          children:[
              {path:'',name:'Home',component:()=>import('./views/Home/Home.vue')},
              {path:'/accountmanage',name:'Accountmanage',component:()=>import('./views/Accountmanage/Accountmanage.vue')},
              {path:'/accountadd',name:'AccountAdd',component:()=>import('./views/Accountmanage/AccountAdd.vue')},
              {path:'/goodsmanage',name:'Goodsmanage',component:()=>import('./views/Goodsmanage/Goodsmanage.vue')},
              {path:'/goodsadd',name:'GoodsAdd',component:()=>import('./views/Goodsmanage/GoodsAdd.vue')},
              {path:'/salestatistics',name:'Salestatistics',component:()=>import('./views/Salestatistics/Salestatistics.vue')},
              {path:'/kucunguanli',name:'Jinhuo',component:()=>import('./views/Jinhuo/Jinhuo.vue')},
              {path:'/goodslist',name:'goodslist',component:()=>import('./views/Chuhuoguanli/Chuhuoguanli.vue')},
              {path:'/zhanghguanli',name:'Huiyuan',component:()=>import('./views/Huiyuanguanli/Huiyuanguanli.vue')},
              {path:'/fenleiguanli',name:'Fenlei',component:()=>import('./views/Fenleiguanli/Fenleiguanli.vue')},
          ]
      }
  ]
})
