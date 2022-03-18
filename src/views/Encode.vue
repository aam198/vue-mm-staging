<template>
  <div class="encode">
  
      <InfoNote v-if="hideNote" @got-it="closeNote" />
    <EncodeBox/>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import EncodeBox from '@/components/EncodeBox.vue'; // @ is an alias to /src
import InfoNote from '@/components/InfoNote.vue';



@Options({
  name: "Encode",
  components: {
    EncodeBox,
    InfoNote
    },
    data: ()=> {
      return{
        hideNote: true
      }
    },
    methods: {
      closeNote(): void {
        this.hideNote = !this.hideNote;
        console.log(this.hideNote)
      }
    }
  },
)
export default class Encode extends Vue {}
</script>

<style scoped>

</style>