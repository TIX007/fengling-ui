import Vue from 'vue'
import App from './App.vue'
import FengLingUI from '../packages'

Vue.config.productionTip = false
Vue.use(FengLingUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
