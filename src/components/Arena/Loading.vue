<template>
  <div class="loading m-0-a text-center m-t-64">
    <h2 class="f-dark m-y-16"> Aguardando oponente </h2>
    <p> Não se esqueça de <br> enviar o nome da sala que você criou <br> para um amigo</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>

.loading{
  background-image:linear-gradient(#000000, #150C85, #000000);
  border: 3px solid #ccc;
  width: auto;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 5px 5px 15px rgba(0,0,0,.5);

  @media(max-width: 768px){
    margin: 0px 24px;
  }

  h2{
    color: #fff;
  }

  p{
    color: #ccc;
  }
}

</style>