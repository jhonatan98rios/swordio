<template>
  <div class="perfil w-100 m-0-a" v-if="perfil">
    <h2 class="text-white title m-b-32"> Perfil </h2>
    <ul class="list">
      <li class="text-white"> NV: {{ perfil.user_name }} </li>
      <li class="text-white"> NV: {{ perfil.nv }} </li>
      <li class="text-white"> XP: {{ perfil.xp }} / {{ perfil.next }} </li>
      <li class="text-white"> HP: {{ perfil.hp }} </li>
      <li class="text-white"> Ataque: {{ perfil.attack }} </li>
      <li class="text-white"> Defesa: {{ perfil.defence }} </li>
      <li class="text-white"> Pontos: {{ perfil.points }} </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    perfil(){
      return this.$store.state.perfil ? this.$store.state.perfil : null
    }
  },
  mounted(){
    if(!this.$store.state.perfil){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.perfil{
  max-width: 768px;
  margin-top: 10vh;

  .title{
    text-align: center;
  }

  .list{
    list-style: none;
  }
}

.text-white{
  color: #ffffff;
}
</style>