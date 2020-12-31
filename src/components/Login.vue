<template>
  <form class="is-column" @submit="loginAccount">
    <h2 class="text-center f-dark f-white"> Conecte-se </h2>
    <input class="w-100 m-b-8" type="text" placeholder="Insira seu usuário" v-model="user">
    <input class="w-100 m-b-8" type="password" placeholder="Insira sua senha" v-model="pass">
    <button class="m-t-8" type="submit"> confirmar </button>

    <p class="f-white" @click="$emit('changeHasAccount')"> Não tem uma conta? </p>
  </form>
</template>

<script>
import axios from 'axios'

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

        axios.post('/login', {
          user_name: this.user,
          user_pass: this.pass
        })
        .then((response) => {

          if(response.status == 200){
            alert('Você está conectado')

            //setToken(response.data.token, this.login.user)
            
            this.pass = null
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

</style>
