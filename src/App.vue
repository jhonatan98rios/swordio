<template>
  <div id="app">
    <Navbar />
    <router-view :socket="socket" />
    <Warning 
      :warning="warning" 
      v-if="warning" 
      @close-warning="setWarning" 
    />
  </div>
</template>

<script>
import Navbar from '@/components/Shared/Navbar.vue'
import Warning from '@/components/Shared/Warning.vue'
import io from 'socket.io-client';

export default {
  components: {
    Navbar,
    Warning
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
    //
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
