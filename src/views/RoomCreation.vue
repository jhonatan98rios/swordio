<template>
  <div class="p-t--15 is-column">
    <form class="form glass m-0-a text-center is-column container" @submit="connectRoom">
      <h2 class="f-white m-t-0 f-sans"> Criação de sala </h2>
      <p class="f-white f-sans"> Informe o nome da sala que deseja criar, ou informe o nome de uma sala já existente para se conectar. </p>

      <input type="text" placeholder="Insira o nome da sala" v-model="roomID">
      <p v-if="error" v-html="error" class="f-warning f-12"/>
      <button class="f-sans" type="submit"> Confirmar </button>
      <small class="m-t-16 f-white f-12 f-sans"> Este jogo é uma versão de testes e pode apresentar bugs e limitações </small>
    </form>

    <button class="f-sans" @click="logout"> Logout </button>
  </div>
</template>

<script>

export default {
  data(){
    return {
      roomID: null,
      error: null
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
      }else{
        this.error = 'Informe o nome da sala'
      }
    },
    logout: function(){
      localStorage.removeItem('rpg');
      this.$router.push('/')
    }
  },

  mounted(){
    if(!this.$store.state.perfil){
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
