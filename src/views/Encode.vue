<template>
  <div class="encode">
      <UploadCard/>
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