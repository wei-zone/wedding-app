import Vue from 'vue'
import App from './App'
import { CLOUD_CONFIG } from '../src/service/config/index'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: CLOUD_CONFIG.DBID
})

const app = new Vue(App)
app.$mount()
