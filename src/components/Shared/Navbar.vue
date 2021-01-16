<template>
  <div class="navbar">
    <div class="burger" @click="toogleMenu">
      <span/>
      <span/>
      <span/>
    </div>
    <div class="nav-section" :class="{ 'visible' : activeMenu}">
      <ul>
        <li @click="toogleMenu">
          <router-link to="/">Inicio</router-link>
        </li>
        <li @click="toogleMenu">
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
  margin: 0 auto;
  top: 0px;
  height: 56px;
  width: 100%;
  background-color: rgb(0, 0, 0);

  .burger {
    width: 25px;
    height: 20px;
    margin: 0px 15px;
    padding-top: 15px;
   
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
    width: 100%;
    max-width: 300px;
    height: calc(100vh - 56px);
    background-color: rgba(0,0,0,.5);
    z-index: 1;

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