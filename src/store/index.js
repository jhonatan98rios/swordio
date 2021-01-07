import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    console: 'Olá Mundo',
    warning: null,
    sound: false
  },
  mutations: {
    setWarning(state, newState){
      state.warning = newState
    },
    setSound(state, newState){
      state.sound = newState
    }
  },
  actions: {
    setWarning: ({ commit }, data) => commit('setWarning', data.amount),
    setSound: ({commit}, data) => commit('setSound', data.amount)
  }
})
