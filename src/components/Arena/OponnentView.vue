<template>
  <div class="view is-centered">

    <canvas ref="canvas" class="oponnent" />
    
  </div>
</template>

<script>
import sprite from '../../assets/images/cropped/spritesheet.png'

export default {
  data(){
    return {
      context: null,
      image: null,
      shift: 0,
      frameWidth: 381.5,
      frameHeight: 412.5,
      totalFrames: 15,
      currentFrame: 0,
      speed: 60,
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
      this.context.clearRect(0, 0, this.frameWidth, this.frameHeight*2);
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
    this.context.scale(.75, .5)

    this.canvas = {
      sx: this.shift,
      sy: 0,
      sWidth: 500,
      sHeight: 550,
      dx: 50,
      dy: -30,
      dWidth: this.frameWidth,
      dHeight: this.frameHeight
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

      this.speed = newVal === 'attack' ? 60 : 120
      
      this.canvas.sy = newVal === 'default' ? 0 :
        this.canvas.sy = newVal === 'attack' ? 420 :
          this.canvas.sy = newVal === 'hurt' ? 840 : 
            this.canvas.sy = newVal === 'died' ? 1260 : this.canvas.sy

      
      if(newVal === 'died'){
        setTimeout(() => {
          this.isDead = true
        }, 400)
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
    width: 400px;
    height: 400px;
    margin-top: 25vh;
    border: 1px solid #000;

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