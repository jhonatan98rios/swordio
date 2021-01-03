<template>
  <form class="form m-0-a text-center m-t-64 is-column container" @submit="connectRoom">
    <h2 class="f-white m-t-0"> Seja bem vindo </h2>
    <p class="f-white"> Informe o nome da sala que deseja criar, ou informe o nome de uma sala já existente para se conectar. </p>

    <input type="text" placeholder="Insira o nome da sala" v-model="roomID">
    <button type="submit m-y-16"> confirmar </button>
    <small class="m-t-32 f-white"> Este jogo é uma versão de testes e <br> pode apresentar bugs e limitações </small>
  </form>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
.form{
  background-image:linear-gradient(#000000, #150C85, #000000);
  border: 3px solid #ccc;
  width: auto;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 5px 5px 15px rgba(0,0,0,.5);

  @media(max-width: 768px){
    margin: 0px 24px;
  }

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
