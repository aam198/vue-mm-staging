<template>
  <div class="encode">

      <UploadBox/>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadBox from '@/components/UploadBox.vue'; // @ is an alias to /src


@Options({
  components: {
    UploadBox
  },
})
export default class Encode extends Vue {}
</script>