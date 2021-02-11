<template>
  <div class="is-column controls">
    <img src="../../assets/images/attack.svg" alt="Ataque" @click="$emit('attack')">
    <img src="../../assets/images/itens.svg" alt="Itens" @click="$emit('useCure')" v-if="hasPotion">
    <img src="../../assets/images/defense.svg" alt="Defesa" @click="$emit('useDefense')">
  </div>
</template>

<script>

export default {
  data(){
    return{
      hasPotion: true
    }
  },
  props: {
    socket: {
      type: Object,
    }
  },
}
</script>

<style lang="scss" scoped>

.controls{
  border-bottom: none;
  width: 100px;
  min-height: 300px;
  height: auto;
  position: absolute;
  right: 0px;
  top: 200px;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  img{
    width: 60px;
    height: 60px;
    margin: 10px;
    opacity: .9;
  }
}


</style>