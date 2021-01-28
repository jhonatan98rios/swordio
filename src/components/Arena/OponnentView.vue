<template>
  <div class="view is-centered">

    <canvas ref="canvas" class="oponnent" />

    <div class="disabled" v-if="sprites">
      <img :src="sprites.attack" alt="">
      <img :src="sprites.hurt" alt="">
      <img :src="sprites.died" alt="">
    </div>
    
  </div>
</template>

<script>
import sprite from '../../assets/images/rsz_default.png'
import attackSprite from '../../assets/images/rsz_attack.png'
import hurtSprite from '../../assets/images/rsz_hurt.png'
import diedSprite from '../../assets/images/rsz_died.png'

export default {
  data(){
    return {
      context: null,
      image: null,
      shift: 0,
      frameWidth: 274,
      frameHeight: 300,
      totalFrames: 14,
      currentFrame: 0,
      speed: 200,
      isDead: false
    }
  },
  props: {
    spritesheet: {
      type: String,
      required: true
    }
  },

  computed: {
    sprites(){
      return {
        default: sprite,
        attack: attackSprite,
        hurt: hurtSprite,
        died: diedSprite
      }
    }
  },

  methods: {
    animate() {
      this.context.clearRect(0, 0, this.frameWidth, this.frameHeight);
      this.context.drawImage(this.image, this.shift, 0, this.frameWidth*0.9 , this.frameHeight+150, 0, -30, this.frameWidth, this.frameHeight);
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

    this.image.src = sprite
    this.image.addEventListener("load", this.loadImage, false);
    this.animate()
  },

  watch:{
    spritesheet: function(newVal){
      this.image.src = this.sprites[newVal]

      this.shift = 0;
      this.currentFrame = 0;

      this.speed = newVal === 'default' ? 200 : 120
      this.frameWidth = newVal === 'default' ? 274 : 274  
      
      if(newVal === 'died'){
        setTimeout(() => {
          this.isDead = true
        }, 450)
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

.disabled{
  display: none;
}
</style>