import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from './plgins/index'

Vue.use(plugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
