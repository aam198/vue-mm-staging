<template>
  <div class="continue-container">
    <button @click="onClick()" :style="{ background: color }" class="btn"><i class="fa fa-upload" aria-hidden="true"></i>
    {{ text }}
    </button>
    <button class ="btn"><slot>Button</slot></button>
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
