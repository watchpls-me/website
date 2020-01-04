import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(require('vue-chat-scroll'))

new Vue({
  router,
  store,
  vuetify,
  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  render: h => h(App)
}).$mount('#app')
