<template>
  <form class="form glass m-t--15 is-column container p-32" @submit="loginAccount">
    <h2 class="text-center f-white m-t-0 f-sans"> Conecte-se </h2>
    <input class="w-100 m-b-8 f-sans" type="text" placeholder="Insira seu usuário" v-model="user">
    <input class="w-100 m-b-8 f-sans" type="password" placeholder="Insira sua senha" v-model="pass">
    <button class="f-14 f-sans" type="submit"> Confirmar </button>

    <p class="f-white f-12 f-sans" @click="$emit('changeHasAccount')"> Não tem uma conta? </p>
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
        this.$store.dispatch('setWarning', {
          amount: null
        })
        

        axios.post(`https://rpg-socket.herokuapp.com/login`, {
          user_name: this.user,
          user_pass: this.pass
        })
        .then((response) => {

          if(response.status == 200){

            this.$store.dispatch('setWarning', {
              amount: 'Seja bem vindo!'
            })

            setToken(response.data.token, this.user)
            this.pass = null
            if(this.$route.name != 'RoomCreation'){
              this.$router.push('salas')
            }
            this.setPerfil(response.data.perfil)
          }
        })
        .catch(() => {

          this.$store.dispatch('setWarning', {
            amount: 'Usuário não encontrado'
          })
        })
      }
    },
    setPerfil: function( perfil ){   
      this.$store.dispatch('setPerfilState', {
        amount: perfil
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form{
  width: 70%;
  border-radius: 8px;

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
