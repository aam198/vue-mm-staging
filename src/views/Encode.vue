<template>
  <div class="encode">
     <transition name="fade" appear>
      <WarnNote v-if="hideNote" @got-it="closeNote">
        <template v-slot:title>Please Check File Names Before Processing Encode</template>
        <template v-slot:details>Before you choose video files to encode through AWS, please make sure all file name conventions are correct (see example below) in order for encoded videos to transfer into the correct COURSES folder after completion.
        <p>Correct file name: <span class="warn-name-convention">COMM428D_Sampling.mp4</span>,  which will transfer to COURSES/COMM/COMM428D folder.</p></template>
        </WarnNote> 
      </transition>
    <EncodeBox />
  </div>
</template>


<script>
import EncodeBox from '@/components/EncodeBox.vue'; // @ is an alias to /src
import WarnNote from '@/components/WarnNote.vue';

export default {
  name: "Encode",
  components: {
    EncodeBox,
    WarnNote
    },
    data() {
      return{
        hideNote: true
      }
    },
    methods: {
      closeNote() {
        this.hideNote = !this.hideNote;
        console.log(this.hideNote)
      }
    }
  }
</script>

<style scoped>

</style>