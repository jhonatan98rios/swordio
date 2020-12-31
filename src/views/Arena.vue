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
  data(){
    return {
      inLoading: false,
      active: true
    }
  }
};
</script>

<style lang="scss" scoped>

</style>