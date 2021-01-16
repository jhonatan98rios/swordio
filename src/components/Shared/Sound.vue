<template>
  <div class="sound-controller">
    <p @click="toggleSound" v-if="soundState"> Desativar som </p>
    <p @click="toggleSound" v-else> Ativar som </p>
  </div>
</template>

<script>
import {sounds, stopSounds} from '../../scripts/sounds'

export default {
  data(){
    return{
      active: false,
      current: 'menu',
    }
  },
  computed: {
    soundTheme: function(){
      return this.$store.state.sound.theme
    },
    soundState: function(){
      return this.$store.state.sound.active
    }
  },
  methods: {
    toggleSound(){      
      if( !this.soundState ){
        this.play(this.soundTheme)

      }else{
        this.stop() 
      }
    },

    play(s){
      this.$store.dispatch('setSoundState', { amount: true })
      sounds[s].play()
    },

    stop(){
      this.$store.dispatch('setSoundState', { amount: false })
      stopSounds()
    }
  }
}
</script>

<style lang="scss" scoped>
.sound-controller{
  p{
    color: #fff;
    cursor: pointer;
  }
}

.hidden{
  display: none;
}
</style>

