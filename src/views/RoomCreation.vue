<template>
  <div class="p-t--15 is-column">
    <form class="form glass m-0-a text-center is-column container" @submit="connectRoom">
      <h2 class="f-white m-t-0 f-fantasy"> Seja bem vindo </h2>
      <p class="f-white f-fantasy"> Informe o nome da sala que deseja criar, ou informe o nome de uma sala já existente para se conectar. </p>

      <input type="text" placeholder="Insira o nome da sala" v-model="roomID">
      <button class="f-fantasy" type="submit"> Confirmar </button>
      <small class="m-t-16 f-white f-12 f-fantasy"> Este jogo é uma versão de testes e pode apresentar bugs e limitações </small>
    </form>

    <button class="f-fantasy" @click="logout"> Logout </button>
  </div>
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
    },
    logout: function(){
      localStorage.removeItem('rpg');
      this.$router.push('/')
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

  p{
    max-width: 450px;
  }

  input{
    width: 250px;
  }
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
  text-align: center;
}
</style>
