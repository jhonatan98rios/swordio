<template>
  <div class="is-flex m-t-8 is-end panel">
    <p class="f-white"> {{ console }} </p>
  </div>
</template>

<script>
export default {
  props: {
    console: {
      type: String,
      required: false
    }
  }
}

</script>

<style lang="scss" scoped>
.panel{
  border: none !important;
  border-top: 3px solid #ccc !important;
  width: calc(100% - 68px);
  height: 100px;
  padding: 16px 32px;
  color: #eee;
  background-image: none !important;
}
</style>