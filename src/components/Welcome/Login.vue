<template>
  <form class="form glass is-column container" @submit="loginAccount">
    <h2 class="text-center f-white m-t-0"> Conecte-se </h2>
    <input class="w-100 m-b-8" type="text" placeholder="Insira seu usuário" v-model="user">
    <input class="w-100 m-b-8" type="password" placeholder="Insira sua senha" v-model="pass">
    <button class="f-14" type="submit"> Confirmar </button>

    <p class="f-white f-12" @click="$emit('changeHasAccount')"> Não tem uma conta? </p>
  </form>
</template>

<script>
import axios from 'axios'
import { setToken } from '../../scripts/token'

export default {
  name: 'Login',
  data(){
    return {
      user: null,
      pass: null
    }
  },
  methods:{
    loginAccount: function(e){
      e.preventDefault()

      if(this.user && this.pass){

        this.$emit('close-warning')

        axios.post(`https://rpg-socket.herokuapp.com/login`, {
          user_name: this.user,
          user_pass: this.pass
        })
        .then((response) => {

          if(response.status == 200){

            setToken(response.data.token, this.user)
            this.pass = null
            
            this.$emit('warning-event', 'Seja bem vindo!')
            this.$router.push('salas')                                   
          }else{

            this.$emit('warning-event', 'Erro ao conectar. Verifique seus dados e sua conexão e tente novamente')
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
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
  }
}
</style>
