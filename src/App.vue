<template>
  <div id="app">
    <router-view :socket="socket" />
    <Warning 
      :warning="warning" 
      v-if="warning" 
      @close-warning="setWarning" 
    />
  </div>
</template>

<script>
import Warning from '@/components/Welcome/Warning.vue'
import io from 'socket.io-client';

export default {
  components: {
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

/* #app{
  background-image: url(./assets/images/wallpaper.jpg);
  background-size: cover;
  height: 100vh;
  background-position: top right;
  margin: 0px;
  display: inline-block;
} */

</style>
