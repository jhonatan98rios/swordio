<template>
  <div class="view is-centered">

    <div
      class="oponnent"
      :class="spritesheet"
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
  height: 500px;
  width: 100%;
  background-image: url(../../assets/images/background.jpg);
  background-size: cover;
  background-position: 40% 100%;
  z-index: -1;

  @media(max-height: 700px){
    position: absolute;
    top: 0px;
  }

  .oponnent{
    max-height: 55%;
    width: 320px;
    height: 320px;
    margin-top: 210px;
    //background-image: url(../../assets/images/idle.gif);
    background-repeat: no-repeat;
    background-size: auto;
    background-position-x: 30px;
    background-position-y: -750;
    overflow: hidden;
  }

  .idle{
    background-image: url(../../assets/images/idle.gif);
  }

  .attack{
    background-image: url(../../assets/images/attack.gif);
  }

  .hurt{
    background-image: url(../../assets/images/hurt.gif);
  }

  .died{
    background-image: url(../../assets/images/died.gif);
  }
}

</style>