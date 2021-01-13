<template>
  <div id="app">
    <router-view :socket="socket" />
    <Warning 
      :warning="warning" 
      v-if="warning" 
      @close-warning="setWarning" 
    />
    <Sound />
  </div>
</template>

<script>
import Warning from '@/components/Shared/Warning.vue'
import Sound from '@/components/Shared/Sound.vue'
import io from 'socket.io-client';

export default {
  components: {
    Warning,
    Sound
  },

  computed: {
    warning(){
      return this.$store.state.warning
    }
  },
  
  data(){
    return {
      socket: null,
    }
  },

  methods: {
    setWarning(){
      this.warning = null
    }
  },

  mounted(){

    this.socket = io('https://rpg-socket.herokuapp.com');

    // First event in connection (default)
    this.socket.on('connect', () => {
      console.log('Connected')
    })

  }
}
</script>


<style lang="scss">
@import 'global.scss';

</style>
