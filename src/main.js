import Vue from 'vue'
import App from './App.vue'
import init from "./assets/init.less"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
