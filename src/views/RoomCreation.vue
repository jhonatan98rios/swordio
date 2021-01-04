<template>
  <form class="form glass m-0-a text-center is-column container" @submit="connectRoom">
    <h2 class="f-white m-t-0"> Seja bem vindo </h2>
    <p class="f-white"> Informe o nome da sala que deseja criar, ou informe o nome de uma sala já existente para se conectar. </p>

    <input type="text" placeholder="Insira o nome da sala" v-model="roomID">
    <button type="submit m-y-16"> confirmar </button>
    <small class="m-t-32 f-white"> Este jogo é uma versão de testes e <br> pode apresentar bugs e limitações </small>
  </form>
</template>

<script>
import { getToken } from '../scripts/token'

export default {
  data(){
    return {
      roomID: null
    }
  },

  props: {
    socket: {
      type: Object,
    }
  },

  methods: {
    connectRoom: function(e){
      e.preventDefault()
      if(this.roomID){
        this.$props.socket.emit('connectRoom', this.roomID)
        this.$router.push('arena')
      }
    }
  },

  mounted(){

    let key = getToken()

    if(!key){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  width: 70%;
  padding: 32px;  
  max-width: 400px;
  border-radius: 8px;
  margin-top: 15vh;

  p{
    max-width: 450px;
  }

  input{
    width: 250px;
  }

  button{
    width: auto;
    height: 25px;
    border-radius: 4px;
    border: none; 
    margin-top: 16px;
    background-color: transparent;
    color: #fff;
    font-size: 14px;
  }
}
</style>
