import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({
  state: {
    chatWindow: true,
    friendSheet: false,
  },
  mutations: {
    toggleChat (state) {
      state.chatWindow = !state.chatWindow
    },
    toggleFriends (state) {
      state.friendSheet = !state.friendSheet
    }
  },
  actions: {
    toggleChat ({ commit }) {
      commit('toggleChat')
    },
    toggleFriends ({ commit }) {
      commit('toggleFriends')
    }
  },
})
