<template>
  <div>
    <Loading v-if="inLoading" />
    <div v-if="!inLoading">
      <div>

        <Header />
        <OponnentView />
        

        <Painel />

      </div>
      <Controls v-if="active" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Arena/Header.vue'
import OponnentView from '@/components/Arena/OponnentView.vue'
import Painel from '@/components/Arena/Painel.vue'
import Loading from '@/components/Arena/Loading.vue'
import Controls from '@/components/Arena/Controls.vue'


export default {
  components:{
    Header,
    OponnentView,
    Painel,
    Loading,
    Controls,
  },

  props: {
    socket: {
      type: Object,
    }
  },

  data(){
    return {
      inLoading: true,
      inProgress: false,
      active: true,
      user:{
        health: 200,
        active: false,
        defense: false
      },
      oponnent: {
        health: 200,
        defense: false,
        spriteInterval: null
      },
    }
  },
  mounted(){
    //startGame
    //turnOn
    //failToEnter

    this.$props.socket.on('startGame', () => {
      alert('Start')
      this.user.health = 200
      this.oponnent.health = 200
      this.inProgress = true
      this.loading = false

      /* setTimeout(() => {
        this.spriteAnimation(this.$refs.opponent, 'static_sprites')
      }, 100) */
    })
  }
};
</script>

<style lang="scss" scoped>

</style>