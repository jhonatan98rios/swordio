<template>
  <div class="navbar w-100 m-0-a">
    <div class="burger" @click="toogleMenu">
      <span/>
      <span/>
      <span/>
    </div>
    <div class="nav-background w-100" v-if="activeMenu" @click="activeMenu = false" /> 
    <div class="nav-section w-100" :class="{ 'visible' : activeMenu}" @click="activeMenu = false">
      <ul>
        <li @click="toogleMenu">
          <router-link to="/salas">Inicio</router-link>
        </li>
        <li @click="toogleMenu" v-if="currentRoute != 'Arena'">
          <router-link to="/perfil">Perfil</router-link>
        </li>
        <li>
          <Sound />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Sound from '@/components/Shared/Sound.vue'

export default {
  data(){
    return {
      activeMenu: false
    }
  },
  components: {
    Sound
  },
  computed: {
    soundState(){
      return this.$store.state.sound.active
    },
    currentRoute(){
      return this.$route.name;
    }
  },
  methods: {
    toogleMenu(){
      this.activeMenu = !this.activeMenu
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  top: 0px;
  height: 56px;
  background-color: rgb(0, 0, 0);
  z-index: 99999;

  .nav-background{
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,.5);
  }

  .burger {
    width: 25px;
    height: 20px;
    margin: 0px 15px;
    padding-top: 15px;
    cursor: pointer;
   
    span{
      width: 25px;
      height: 3px;
      margin-bottom: 5px;
      background-color: #ffffff;
      position: relative;
      display: block;
    }
  }

  .nav-section{
    position: fixed;
    top: 56px;
    left: 0px;
    transform: translateX(-300px);
    transition: all .5s;
    max-width: 300px;
    height: calc(100vh - 56px);
    background-color: rgba(0,0,0,.5);
    z-index: 99999;

    ul{
      list-style: none;

      /deep/a{
        cursor: pointer;
        text-decoration: none;
        color: #ffff;
      }
    }
  }
}

.visible{
  transform: translateX(0px) !important;
  transition: all .5s !important;
}
</style>