import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/',name: 'home',component: Home,meta:{keepAlive:true }},
    {path: '/text',name: 'text',component: () => import('./views/mytext.vue'),meta:{keepAlive:true}},
    {path: '/myvideo',name: 'myvideo',component: () => import('./views/videoList.vue'),meta:{keepAlive:true}},
    {path: '/videodesc',name: 'videodesc',component: () => import('./views/videoDesc.vue'),meta:{keepAlive:false}},
    {path: '/newsList',name: 'newsList',component: () => import('./views/newsList.vue'),meta:{keepAlive:true}},
    {path: '/myweather',name: 'myweather',component: () => import('./views/weatherList.vue'),meta:{keepAlive:true}},
    {path: '/myimages',name: 'myimages',component: () => import('./views/images.vue'),meta:{keepAlive:true}},




















    {path: '/appHome',name: 'app-home',component: () => import('./views/app/home.vue'),meta:{keepAlive:true}},
    {path: '/appVideo',name: 'app-video',component: () => import('./views/app/video.vue'),meta:{keepAlive:true}},
    {path: '/appImg',name: 'app-img',component: () => import('./views/app/image.vue'),meta:{keepAlive:true}},
    {path: '/appText',name: 'app-text',component: () => import('./views/app/text.vue'),meta:{keepAlive:false}},
    {path: '/showContentImg',name: 'showContentImg',component: () => import('./views/app/showContentImg.vue'),meta:{keepAlive:false}},
    {path: '/showContentVideo',name: 'showContentVideo',component: () => import('./views/app/showContentVideo.vue'),meta:{keepAlive:false}},

    {path: '/text3',name: 'text3',component: () => import('./views/app/text3.vue'),meta:{keepAlive:false}},   /* 上拉加载 下拉刷新  ---  true*/
    {path: '/text5',name: 'text5',component: () => import('./views/app/text5.vue'),meta:{keepAlive:false}},   /* 上拉加载 下拉刷新 */
















    {path: '*',name: 'no404',component: () => import('./views/no404.vue'),meta:{keepAlive:true}},
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

