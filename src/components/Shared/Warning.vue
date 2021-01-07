<template>
  <div class="glass warning">
    <span class="close" @click="$store.commit('setWarning', null)">&times;</span>
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
  padding: 32px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  background-color: rgba(255,255,255,.05);

  .close{
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
  }

  p{
    color: #fff;
    text-align: center;
  }
}
</style>