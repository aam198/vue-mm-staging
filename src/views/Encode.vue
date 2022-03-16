<template>
  <div class="encode">
    <InfoNote />
      <EncodeBox/>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import EncodeBox from '@/components/EncodeBox.vue'; // @ is an alias to /src
import InfoNote from '@/components/InfoNote.vue';



@Options({
  components: {
    EncodeBox,
    InfoNote
    },
  },
)
export default class Encode extends Vue {}
</script>

<style scoped>

</style>