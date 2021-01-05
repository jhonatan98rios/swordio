<template>
  <div class="welcome">
    <Login 
      class="container" 
      v-if="hasAccount" 
      @changeHasAccount="hasAccount = false"
    />
    
    <Sign 
      class="container" 
      v-if="!hasAccount" 
      @changeHasAccount="hasAccount = true" 
    />
    
  </div>
</template>

<script>
import Login from '@/components/Welcome/Login.vue'
import Sign from '@/components/Welcome/Sign.vue'

import axios from 'axios'
import { setToken, getToken } from '../scripts/token'

export default {
  name: 'welcome',
  components: {
    Login,
    Sign
  },
  data(){
    return{
      hasAccount: true
    }
  },
  methods: {
    loginAccountWithToken: function(username, token){
      axios.post(`https://rpg-socket.herokuapp.com/token_login`, {
        user_name: username,
        token
      })
      .then((response) => {

        if(response.status == 200){
          this.$store.dispatch('setWarning', {
            amount: 'Você está conectado'
          })

          setToken(response.data.token, username)
          this.$router.push('salas')

        }else{
          this.$store.dispatch('setWarning', {
            amount: 'Erro ao conectar. Verifique seus dados e sua conexão e tente novamente'
          })
        }
      })
      .catch((error) => {
      console.log(error);
      });
    }
  },
  mounted(){
    // Auto login
    let key = getToken()
    if(key && key.token && key.user){
      this.loginAccountWithToken(key.user, key.token)
    }
  }
}
</script>

<style lang="scss" scoped>

.welcome{
  min-height: 700px;
  width: 90vw;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  @media(max-width: 768px){
    width: 80%;
  }

  /* p, small {
    width: 60%;
    max-width: 320px;
    text-align: center;
    margin: 0px auto;
    color: #333333;
  }

  input{
    border: none;
    background-color: transparent;
    border-bottom: 1px #333333 solid;
    margin: 16px auto;
    font-size: 14px;
  }

  input:focus{
    outline: none;
  }

  button{
    background-color: transparent;
    border: none;
    width: 100px;
    height: 32px;
    cursor: pointer;
    font-size: 14px;
  }

  button:focus{
    outline: none;
  }

  p{
    cursor: pointer;
    font-size: 14px;
  } */

}





</style>
