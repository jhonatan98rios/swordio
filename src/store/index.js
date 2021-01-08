import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    warning: null,
    sound: {
      active: false,
      theme: 'default'
    }
  },
  mutations: {
    setWarning(state, newState){
      state.warning = newState
    },

    setSoundTheme(state, newState){
      state.sound.theme = newState
    },

    setSoundState(state, newState){
      state.sound.active = newState
    }

  },
  actions: {
    setWarning: ({ commit }, data) => commit('setWarning', data.amount),
    setSoundTheme: ({commit}, data) => commit('setSoundTheme', data.amount),
    setSoundState: ({commit}, data) => commit('setSoundState', data.amount),
  }
})
