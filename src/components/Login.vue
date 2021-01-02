<template>
  <form class="form is-column container m-t-64" @submit="loginAccount">
    <h2 class="text-center f-dark f-white m-t-0"> Conecte-se </h2>
    <input class="w-100 m-b-8" type="text" placeholder="Insira seu usuário" v-model="user">
    <input class="w-100 m-b-8" type="password" placeholder="Insira sua senha" v-model="pass">
    <button type="submit"> confirmar </button>

    <p class="f-white" @click="$emit('changeHasAccount')"> Não tem uma conta? </p>
  </form>
</template>

<script>
import axios from 'axios'
import { setToken } from '../scripts/token'

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

        axios.post('http://localhost:3000/login', {
          user_name: this.user,
          user_pass: this.pass
        })
        .then((response) => {

          if(response.status == 200){
            alert('Você está conectado')

            setToken(response.data.token, this.user)
            this.pass = null
            
            this.$router.push('salas')                                   
          }else{

            alert('Erro ao conectar. Verifique seus dados e sua conexão e tente novamente')
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
  background-image:linear-gradient(#000000, #150C85, #000000);
  border: 3px solid #ccc;
  width: auto;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 5px 5px 15px rgba(0,0,0,.5);

  .input{
    width: 250px;
  }

  button{
    width: 250px;
    height: 25px;
    border-radius: 4px;
    border: none;
    margin: 0px;
  }
}
</style>
