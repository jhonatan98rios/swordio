<template>
  <div class="loading glass m-0-a text-center">
    <h2 class="m-y-16 f-sans"> Aguardando oponente </h2>
    <p class="f-sans"> Não se esqueça de <br> enviar o nome da sala que você criou <br> para um amigo</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>

.loading{
  width: 70%;
  padding: 32px;
  max-width: 400px;
  border-radius: 8px;
  margin-top: 15vh !important;

  h2{
    color: #fff;
  }

  p{
    color: #ccc;
  }
}

</style>