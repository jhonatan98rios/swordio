<template>
  <div class="view w-100 is-centered">

    <canvas ref="canvas" class="oponnent" />
    
  </div>
</template>

<script>
import sprite from '../../assets/images/spritesheet.png'

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
      this.context.clearRect(0, 0, this.frameWidth*2, this.frameHeight*2);
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

    }
  },

  mounted(){
    this.context = this.$refs.canvas.getContext("2d");
    this.image = new Image()
    this.context.scale(1, .5)

    this.canvas = {
      sx: this.shift,
      sy: 0,
      sWidth: 500,
      sHeight: 500,
      dx: 10,
      dy: -50,
      dWidth: this.frameWidth,
      dHeight: this.frameHeight
    }

    this.image.src = sprite
    this.image.addEventListener("load", this.loadImage, false);
    this.animate()
  },

  watch:{
    spritesheet: function(newVal){
      this.shift = 0;
      this.currentFrame = 0;
      
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
  background-image: url(../../assets/images/bg.jpg);
  background-size: cover;
  background-position: 50% 100%;
  z-index: -1;
  position: absolute;
  top: 0px;

  @media(max-height: 580px){
    //top: -40px;
  }

  .oponnent{
    max-height: 55%;
    width: 350px;
    height: 350px;
    margin-top: 27vh;

    @media(max-width: 768px){
      margin-top: 220px;
      width: 300px;
      height: 280px;
    }

    @media(max-height: 680px){
      margin-top: 180px;
      zoom: 0.9;
    }

    @media(max-height: 1024px) and (max-width: 1024px) and (min-width: 768px){
      margin-top: 360px;
      zoom: 1;
    }
  }
}

@keyframes blinker {
  0%{ opacity: 0 } 
  50%{ opacity: 1 } 
  100%{ opacity: 0 } 
}
</style>