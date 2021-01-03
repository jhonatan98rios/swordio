<template>
  <form class="form is-column container m-t-64" @submit="signAccount">
    <h2 class="text-center f-dark f-white m-t-0"> Crie uma conta </h2>
    <input class="w-100 m-b-8" type="text" placeholder="Insira seu usuário" v-model="user">
    <input class="w-100 m-b-8" type="password" placeholder="Insira sua senha" v-model="pass">
    <button type="submit"> confirmar </button>

    <p class="f-white" @click="$emit('changeHasAccount')"> Já tem uma conta? </p>
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

      if(this.user && this.pass){
        axios.post(`${process.env.VUE_APP_SOCKET}/sign`, {
          user_name: this.user,
          user_pass: this.pass
        })
        .then((response) => {

          alert(response.data)
          this.user = null
          this.pass = null

          this.$emit('changeHasAccount')

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
