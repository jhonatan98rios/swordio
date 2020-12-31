<template>
  <form class="m-0-a text-center p-t-64 m-t-32 is-column" @submit="connectRoom">
    <h2 class="f-dark"> Seja bem vindo </h2>
    <p> Informe o nome da sala que deseja criar, ou informe o nome de uma sala já existente para se conectar. </p>

    <input type="text" placeholder="Insira o nome da sala" v-model="roomID">
    <button type="submit"> confirmar </button>
    <small class="m-t-32"> Este jogo é uma versão de testes e <br> pode apresentar bugs e limitações </small>
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
    },
  },

  mounted(){



  }
}
</script>

<style lang="scss" scoped>

</style>
