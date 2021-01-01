<template>
  <div class="header">
    <div class="container m-0-a is-column is-start m-t-8">
      <h4 class="m-y-0 f-white"> Oponente </h4>
      <div class="m-y-0 is-flex w-100 m-t-4"> 
        <h3 class="f-white m-y-0">HP:</h3> 
        <div class="life-bar m-l-8 m-t-2">
          <span :style="oponnentLife" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    health: {
      type: Number,
      required: true
    }
  },

  computed: {
    oponnentLife(){
      return{
        width: this.$props.health / 2 + '%',
        backgroundColor: `rgb(${ 200 - this.$props.health }, ${ this.$props.health }, 0)`
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.header{
  width: calc(100% - 6px);
  height: 50px;
  margin: 0 auto;
  padding-bottom: 16px;
  background-image:linear-gradient(#150C85, #000000);
  border: 3px solid #ccc;
  
  .life-bar{
    width: 100%;
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