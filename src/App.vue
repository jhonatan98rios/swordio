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

    this.socket = io(process.env.VUE_APP_SOCKET);

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
