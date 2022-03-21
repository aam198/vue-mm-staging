<template>
  <div class="encode">
      <WarnNote v-if="hideNote" @got-it="closeNote" />
    <EncodeBox />
  </div>
</template>


<script>
import EncodeBox from '@/components/EncodeBox.vue'; // @ is an alias to /src
import WarnNote from '@/components/InfoNote.vue';

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