<template>
  <div class="view is-centered">

    <div
      class="oponnent"
      :class="spritesheet"
      ref="oponnent"
    />
    
  </div>
</template>

<script>

export default {
  props: {
    spritesheet: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.view{
  height: 100vh;
  width: 100%;
  background-image: url(../../assets/images/bg-1.jpg);
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
    width: 320px;
    height: 320px;
    margin-top: 35vh;
    background-repeat: no-repeat;
    background-size: auto;
    background-position-x: 30px;
    background-position-y: -750;
    overflow: hidden;

    @media(max-width: 768px){
      margin-top: 230px;
    }
  }

  .idle{
    background-image: url(../../assets/images/idle.gif);
  }

  .attack{
    background-image: url(../../assets/images/attack.gif);
  }

  .hurt{
    background-image: url(../../assets/images/hurt.gif);
    animation: blinker .5s infinite;
  }

  .died{
    background-image: url(../../assets/images/died.gif);
  }
}

@keyframes blinker {
  0%{ opacity: 0 } 
  50%{ opacity: 1 } 
  100%{ opacity: 0 } 
}

</style>