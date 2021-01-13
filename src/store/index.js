//import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    warning: null,
    sound: {
      active: false,
      theme: 'default'
    },
    perfil: null
    /* perfil: {
      nv: 1,
      xp: 0,
      next: 10,
      hp: 100,
      attack: 10,
      defence: 1,
      points: 0
    } */
  },

  mutations: {
    setPerfilState(state, newState){
      state.perfil = newState
    },

    setExpState(state, xp){
      state.perfil.xp += xp

      // Upgrade nivel
      if(state.perfil.xp >= state.perfil.next){
        state.perfil.nv ++
        state.perfil.xp = state.perfil.xp - state.perfil.next
        // Upgrade states
        state.perfil.next = Math.ceil( state.perfil.next * 1.2 )
        state.perfil.hp = Math.ceil( state.perfil.hp * 1.2 )
        state.perfil.attack = Math.ceil( state.perfil.attack * 1.2 )
        state.perfil.defence = Math.ceil( state.perfil.defence * 1.2 )
        state.warning = 'Parabéns, você subiu de nível!!'
      }

      /* axios.post('', { perfil: state.perfil }).then((response) => {
        console.log(response)
      }) */
    },

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
    setPerfilState: ({commit}, data) => commit('setPerfilState', data.amount),
    setExpState: ({commit}, data) => commit('setExpState', data.xp),
    setWarning: ({ commit }, data) => commit('setWarning', data.amount),
    setSoundTheme: ({commit}, data) => commit('setSoundTheme', data.amount),
    setSoundState: ({commit}, data) => commit('setSoundState', data.amount)
  }
})
