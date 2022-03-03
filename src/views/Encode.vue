<template>
  <div class="encode">
      <UploadCard/>
      <button class="uploadfile__button" type="submit">Upload</button>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadCard from '@/components/UploadCard.vue'; // @ is an alias to /src


@Options({
  components: {
    UploadCard
  },
})
export default class Encode extends Vue {}
</script>