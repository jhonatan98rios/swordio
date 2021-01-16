import axios from 'axios'
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
    perfil: null,
    oponnent: null
  },

  mutations: {
    setPerfilState(state, newState){
      state.perfil = newState
    },

    setExpState(state, xp){
      state.perfil.xp += xp

      let hasLavelUp = state.perfil.xp >= state.perfil.next 

      // Upgrade nivel
      if(hasLavelUp){
        state.perfil.nv ++
        state.perfil.xp = state.perfil.xp - state.perfil.next
        // Upgrade states
        state.perfil.next = Math.ceil( state.perfil.next * 1.2 )
        state.perfil.hp = Math.ceil( state.perfil.hp * 1.2 )
        state.perfil.attack = Math.ceil( state.perfil.attack * 1.2 )
        state.perfil.defence = Math.ceil( state.perfil.defence * 1.2 )
      }

      axios.post('http://localhost:3000/level_up', { 
        perfil: state.perfil

      }).then((response) => {
        
        if(response.status == 200 && hasLavelUp){
          state.warning = response.data
        }
      }).catch(() => {
        state.warning = 'Falha ao atualizar seu perfil'
      })
    },

    setOponnentState(state, newState){
      state.perfil = newState
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
    setOponnentState: ({commit}, data) => commit('setOponnentState', data.amount),
    setWarning: ({ commit }, data) => commit('setWarning', data.amount),
    setSoundTheme: ({commit}, data) => commit('setSoundTheme', data.amount),
    setSoundState: ({commit}, data) => commit('setSoundState', data.amount)
  }
})
