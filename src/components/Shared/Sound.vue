<template>
  <div class="sound-menu">
    <img 
      class="sound-button" 
      src="../../assets/images/sound.png" 
      alt="Tocar audio"
      @click="toggleSound"
    >
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
.sound-menu{
  position: fixed;
  top: 0;
  right: 0;

  .sound-button{
    width: 24px;
    height: 24px;
    filter: invert(1);
    padding: 16px;
  }
}

.hidden{
  display: none;
}
</style>

