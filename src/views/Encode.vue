<template>
  <div class="encode">
      <UploadBox/>
      <Button text="Encode File(s)" />
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadBox from '@/components/UploadBox.vue'; // @ is an alias to /src
import Button from '@/components/Button.vue'; 


@Options({
  components: {
    UploadBox,
    Button
  },
})
export default class Encode extends Vue {}
</script>