<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view :socket="socket" />
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data(){
    return {
      socket: null
    }
  },

  mounted(){

    this.socket = io("https://rpg-socket.herokuapp.com/");

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
