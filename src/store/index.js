import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    console: 'Olá Mundo',
    warning: null
  },
  mutations: {
    setWarning(state, newState){
      state.warning = newState
    }
  },
  actions: {
    setWarning: ({ commit }, data) => commit('setWarning', data.amount)
  }
})
