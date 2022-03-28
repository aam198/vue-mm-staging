<template>
  <div class="continue-container">
    <button @click="onClick()" :style="{ background: color }" class="btn">
    {{ text }}
    </button>
  </div>
</template>


<script>
  export default {
  name: 'Button',
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit('btn-click')
    },
  },
}

</script>

<style scoped>
.continue-container{
  display: flex;
  justify-content: flex-end;
  gap:10px;
  margin: 0.5rem 0px;
  width: 100%;
  max-width: 1400px;
  min-width: 700px;
}


</style>