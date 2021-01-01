<template>
  <div class="is-flex m-t-8 is-end panel">
    {{ console }}
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
  border-top: 2px solid #ccc;
  width: calc(100% - 68px);
  height: 100px;
  padding: 16px 32px;
  color: #eee;
}
</style>