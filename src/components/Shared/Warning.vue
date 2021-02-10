<template>
  <div class="glass warning p-32">
    <span class="close" @click="close">&times;</span>
    <p> {{ warning }} </p>
  </div>
</template>

<script>
export default {
  props: {
    warning: {
      type: String,
      required: true
    }
  },
  methods: {
    close(){
      this.$store.dispatch('setWarning', { amount: null })

      if(this.$props.warning == 'Você venceu!!' || this.$props.warning == 'Você perdeu...'){
        this.$router.push('salas')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.warning{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  top: 10vh;
  width: 80%;
  max-width: 300px;
  height: 60px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  background-color: rgba(255,255,255,.05);
  z-index: 9999999;

  .close{
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    cursor: pointer;
  }

  p{
    color: #fff;
    text-align: center;
  }
}
</style>