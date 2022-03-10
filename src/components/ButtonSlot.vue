<template>
  <div class="continue-container">
    <button @click="onClick" class ="btn"><i class="fa fa-upload" aria-hidden="true"></i><slot>Button</slot></button>
  </div>
</template>



<script lang="ts">
import { defineComponent, ref} from "vue"

  export default defineComponent( {
    name: 'ButtonSlot',
    methods: {
      onClick() {
        this.$emit('btn-click')
      },
    },
  })

</script>