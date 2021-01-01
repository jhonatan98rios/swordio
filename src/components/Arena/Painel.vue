<template>
  <div class="panel">
    <p class="turn" v-if="active"> Seu turno </p>
    <p class="turn" v-if="!active"> Turno do oponente </p>
    <p class="m-0-a p-0 counter" v-html="counter" />

    <div class="is-column container m-0-a status is-start">
      <h4 class="m-y-0 f-white"> Usuário </h4>
      <div class="m-y-0 p-0 is-flex w-100">
        <h3 class="f-white m-y-0"> HP: </h3>
        <div class="life-bar m-l-8 m-t-2">
          <span :style="userLife" />
        </div>
      </div>
    </div>

    <Console :console="console" />
  </div>
</template>

<script>
import Console from '@/components/Arena/Console.vue'

export default {
  components:{
    Console
  },

  props: {
    console: {
      type: String,
      required: false
    },
    counter: {
      type: Number,
      required: false
    },
    active: {
      type: Boolean,
      required: false
    },
    health: {
      type: Number,
      required: false
    }
  },

  computed: {
    userLife(){
      return{
        width: this.health / 2 + '%',
        backgroundColor: `rgb(${ 200 - this.health }, ${ this.health }, 0)`
      }
    }
  }
}
</script>

<style scoped lang="scss">

  .panel{
    padding-top: 4px;
    background-image:linear-gradient(#000000, #150C85, #000000);
    border: 3px solid #ccc;

    @media(max-height: 768px){
      position: fixed;
      bottom: 0;
      width: calc(100% - 6px);
    }

    .turn{
      margin-top: -64px;
      margin-bottom: 12px;
      font-family: sans-serif;
      color: #eee;
      font-weight: bold;
      text-shadow: 1px 1px 2px #000000;
    }

    .counter{
      background-color: #000;
      border: 3px solid #ccc;
      color: #fff;
      box-shadow: 0px 1px 3px rgba(0,0,0,.5);
      width: 20px;
      height: 20px;
      padding: 8px;
      border-radius: 50%;
      font-family: sans-serif;
      font-size: 18px;
    }

    .status {
      h2{
        color: #ccc;
      }
    } 
  }

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
</style>