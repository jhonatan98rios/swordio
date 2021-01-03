<template>
  <div id="app">
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
