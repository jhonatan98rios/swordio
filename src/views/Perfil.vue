<template>
  <div class="perfil" v-if="perfil">
    <h2 class="text-white title m-b-32"> Perfil </h2>
    <ul class="list">
      <li class="text-white"> NV: {{ perfil.nv }} </li>
      <li class="text-white"> XP: {{ perfil.xp }} / {{ perfil.next }} </li>
      <li class="text-white"> HP: {{ perfil.hp }} </li>
      <li class="text-white"> Ataque: {{ perfil.attack }} </li>
      <li class="text-white"> Defesa: {{ perfil.defence }} </li>
      <li class="text-white"> Pontos: {{ perfil.points }} </li>
      <button @click="getExp">
        XP++
      </button>
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
  methods: {
    getExp(){
      this.$store.dispatch('setExpState', { xp: 5 })
    }
  }
}
</script>

<style lang="scss" scoped>
.perfil{
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
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