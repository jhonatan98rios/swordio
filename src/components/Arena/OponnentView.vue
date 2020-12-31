<template>
  <div class="view">
    <img 
      ref="opponent" 
      src="../../assets/images/character/0_Warrior_Attack_1_0.png"
      alt="oponente"
    >
  </div>
</template>

<script>
export default {

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

  img{
    max-height: 55%;
    margin-top: 210px;
  }
}

</style>