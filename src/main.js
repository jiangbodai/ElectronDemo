import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import VueI18n from 'vue-i18n'


Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.lang || 'zh-CN',
  messages: {
    'zh-CN': require('./common/lang/zh.js'),
    'en-EN': require('./common/lang/en.js')
  }
})

Vue.prototype.$electron = window.require('electron')

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')