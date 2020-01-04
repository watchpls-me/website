import Vue from 'vue'
import Vuex from 'vuex'

import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings: settings,
  },
  state: {},
  mutations: {
    initialiseStore (state) {
      // check if the store exists
      if (localStorage.getItem('store')) {
        // replace the state object with the current local storage
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))))
      }
    },
  },
  actions: {},
})
