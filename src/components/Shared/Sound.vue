<template>
  <div class="sound-menu">
    <img 
      class="sound-button" 
      src="../../assets/images/sound.png" 
      alt="Tocar audio"
      @click="startSound"
    >
  </div>
</template>

<script>
//import { Howl } from 'howler'

export default {
  data(){
    return{
      menu: null,
      battle: null
    }
  },
  methods: {
    startSound(){      
      if(!this.menu || !this.menu.active){
        console.log('Play')
        this.menu.active = true
        this.menu.play()
      }else{
        console.log('Stop')
        this.menu.active = false
        this.menu.pause();
        this.menu.currentTime = 0;
      }

      /* this.menu = new Howl({
        src: ['https://media1.vocaroo.com/mp3/1og1THFGbREk'],
        autoplay: true,
        loop: false,
        volume: 0.5,
        onend: function() {
          console.log('Finished!');
        }
      }); */
    }
  },
  mounted(){
    this.menu = new Audio('https://media1.vocaroo.com/mp3/1og1THFGbREk')
  }
}
</script>

<style lang="scss" scoped>
.sound-menu{
  position: fixed;
  top: 0;
  right: 0;

  .sound-button{
    width: 24px;
    height: 24px;
    filter: invert(1);
    padding: 16px;
  }
}
</style>

// menu: https://media1.vocaroo.com/mp3/1og1THFGbREk
// battle: https://media1.vocaroo.com/mp3/1bAS6JppM3yr
// forest: https://media1.vocaroo.com/mp3/17EWbkf23mWC
// store: https://media1.vocaroo.com/mp3/1d3I0NmJtzcv

// attack: https://media1.vocaroo.com/mp3/13tfsmPUKrOX
// blocked: https://media1.vocaroo.com/mp3/1cLUKrQ6Mi3I
// item: https://media1.vocaroo.com/mp3/1OIiW6n5pcGP
// missed: https://media1.vocaroo.com/mp3/1e2rY253BKzH
// victory: https://media1.vocaroo.com/mp3/1fTvEgulgLaW