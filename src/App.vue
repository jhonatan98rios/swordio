<template>
  <div id="app">
    <img class="beta" src="./assets/images/beta.png" alt="Beta Application">
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

.beta{
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100px;
  width: 100px;
  z-index: 999999;
}

</style>
