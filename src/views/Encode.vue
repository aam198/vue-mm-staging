<template>
  <div class="encode">
      <EncodeBox/>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import EncodeBox from '@/components/EncodeBox.vue'; // @ is an alias to /src



@Options({
  components: {
    EncodeBox,
    },
  },
)
export default class Encode extends Vue {}
</script>