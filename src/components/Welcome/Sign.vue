<template>
  <form class="form glass is-column container" @submit="signAccount">
    <h2 class="text-center f-white m-t-0"> Crie uma conta </h2>
    <input class="w-100 m-b-8" type="text" placeholder="Insira seu usuário" v-model="user">
    <input class="w-100 m-b-8" type="password" placeholder="Insira sua senha" v-model="pass">
    <button class="f-14" type="submit"> Confirmar </button>

    <p class="f-white f-12" @click="$emit('changeHasAccount')"> Já tem uma conta? </p>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Sign',
  data(){
    return {
      user: null,
      pass: null
    }
  },
  methods: {
    signAccount: function(e){
      e.preventDefault()

      if(this.user.length < 6){
        this.$emit('warning-event', 'O login precisa ter ao menos 6 caracteres')
        return
      }

      if(this.pass.length < 8){
        this.$emit('warning-event', 'A senha precisa ter ao menos 8 caracteres')
        return
      }

      this.$emit('close-warning')

      axios.post(`https://rpg-socket.herokuapp.com/sign`, {
        user_name: this.user,
        user_pass: this.pass
      })
      .then((response) => {

        if(response.status == 200){
          this.user = null
          this.pass = null
  
          this.$emit('warning-event', 'Sua conta foi criada com sucesso!')
          this.$emit('changeHasAccount')
        }else{
          this.$emit('warning-event', 'Houve um problema com a criação da sua conta')
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form{
  width: 70%;
  padding: 32px;
  border-radius: 8px; 
  margin-top: 15vh;

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
