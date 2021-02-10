<template>
  <div class="header glass-border">
    <div class="container m-0-a is-column is-start m-t-16">
      <h4 class="m-y-0 f-white"> Oponente </h4>
      <div class="m-y-0 is-flex w-100 m-t-4"> 
        <h3 class="f-white m-y-0">HP:</h3> 
        <div class="life-bar m-l-8 m-t-2 w-100">
          <span :style="oponnentLife" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      maxHealth: 0
    }
  },
  props: {
    health: {
      type: Number,
      required: true
    }
  },

  computed: {
    oponnentLife(){
      let damage = this.maxHealth - this.$props.health
      let damagePercentage = (damage / (this.maxHealth / 100))
      let width = (this.$props.health / (this.$props.health / 100)) - damagePercentage

      return{
        width: (this.$props.health <= 0 ? 0 : width) + '%',
        backgroundColor: `rgb(${ 200 - this.$props.health }, ${ this.$props.health }, 0)`
      }
    }
  },

  mounted(){
    this.maxHealth = this.$props.health
  }
};
</script>

<style lang="scss" scoped>

.header{
  width: calc(100% - 24px);
  margin: 12px auto;
  border-radius: 8px;
  padding-bottom: 16px;
  background-image:linear-gradient(rgba(20, 12, 133, 0.75), rgba(0, 0, 0, .9));
  box-shadow: 3px 3px 3px rgba(0,0,0,.5);
  backdrop-filter: blur(2px);
  
  .life-bar{
    height: 15px;
    border: 1px solid #eee;
    border-radius: 4px;

    span{
      display: block;
      height: 100%;
      background-color: #eee;
      border: 1px solid #150C85;
      border-radius: 4px;
      box-sizing: border-box;
      transition: all 1s;
      transition-timing-function: ease-out;
    }
  }
}

</style>