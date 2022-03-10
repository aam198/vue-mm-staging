<template>
  <div class="descriptions">
    <h1>{{ msg }} </h1>
  </div>
</template>

<script>
export default {
  name: 'First',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.demo {
  background-color: cyan;
}
</style>