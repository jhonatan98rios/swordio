<template>
  <form class="is-column container" @submit="signAccount">
    <h2 class="text-center f-dark f-white"> Crie uma conta </h2>
    <input class="w-100 m-b-8" type="text" placeholder="Insira seu usuário" v-model="user">
    <input class="w-100 m-b-8" type="password" placeholder="Insira sua senha" v-model="pass">
    <button class="m-t-8" type="submit"> confirmar </button>

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
        axios.post('http://localhost:3000/sign', {
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

</style>
