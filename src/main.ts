import Vue from 'vue'
import { CreateElement } from 'vue/types'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h: CreateElement) => h(App),
}).$mount('#app')
