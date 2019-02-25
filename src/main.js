import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/css/style.css"
import "@/assets/css/appstyle.css"

// vue-video-player
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);

// cube--ui
import CubeUI from 'cube-ui'
Vue.use(CubeUI)


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
