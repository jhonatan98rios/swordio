<template>
  <div class="view is-centered">

    <canvas ref="canvas" class="oponnent" />
    
  </div>
</template>

<script>
/* import sprite from '../../assets/images/default.png'
import attackSprite from '../../assets/images/rsz_attack.png'
import hurtSprite from '../../assets/images/rsz_hurt.png'
import diedSprite from '../../assets/images/rsz_died.png' */
import sprite from '../../assets/images/new/spritesheet.png'

export default {
  data(){
    return {
      context: null,
      image: null,
      shift: 0,
      frameWidth: 549,
      frameHeight: 100,
      totalFrames: 15,
      currentFrame: 0,
      speed: 100,
      isDead: false,
      canvas: null
    }
  },
  props: {
    spritesheet: {
      type: String,
      required: true
    }
  },

  methods: {
    animate() {
      
      this.context.clearRect(0, 0, this.frameWidth, this.frameHeight);
      this.context.drawImage(
        this.image, 
        this.shift,
        this.canvas.sy, 
        this.canvas.sWidth , 
        this.canvas.sHeight, 
        this.canvas.dx, 
        this.canvas.dy, 
        this.canvas.dWidth, 
        this.canvas.dHeight
      );

      
      this.shift += this.frameWidth + 1;
    
      if (this.currentFrame == this.totalFrames) {
        this.shift = 0;
        this.currentFrame = 0;
      }
    
      this.currentFrame++;

      if (this.isDead == false){
        setTimeout(this.animate, this.speed)
      }

    },

    loadImage() {
      console.log('Ok')
      this.animate();
      this.image.removeEventListener('load', this.loadImage)
    }
  },

  mounted(){
    this.context = this.$refs.canvas.getContext("2d");
    this.image = new Image()

    this.canvas = {
      sx: this.shift,
      sy: 0,
      sWidth: 550,
      sHeight: 600,
      dx: 10,
      dy: -30,
      dWidth: this.frameWidth/2,
      dHeight: this.frameHeight*2
    }

    this.image.src = sprite
    this.image.addEventListener("load", this.loadImage, false);
    this.animate()
    console.log(this.canvas)
  },

  watch:{
    spritesheet: function(newVal){
      this.shift = 0;
      this.currentFrame = 0;

      //this.speed = newVal === 'default' ? 200 : 120
      
      this.canvas.sy = newVal === 'default' ? 0 :
        this.canvas.sy = newVal === 'attack' ? 550 :
          this.canvas.sy = newVal === 'hurt' ? 1100 : 
            this.canvas.sy = newVal === 'died' ? 1650 : this.canvas.sy

      
      if(newVal === 'died'){
        setTimeout(() => {
          this.isDead = true
        }, 350)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.view{
  height: 100vh;
  width: 100%;
  background-image: url(../../assets/images/bg.jpg);
  background-size: cover;
  background-position: 50% 100%;
  z-index: -1;

  @media(max-height: 700px){
    }
  position: absolute;
  top: 0px;

  @media(max-height: 580px){
    top: -40px;
  }

  .oponnent{
    max-height: 55%;
    width: 380px;
    height: 300px;
    margin-top: 35vh;

    @media(max-width: 768px){
      margin-top: 230px;
    }
  }
}

@keyframes blinker {
  0%{ opacity: 0 } 
  50%{ opacity: 1 } 
  100%{ opacity: 0 } 
}
</style>