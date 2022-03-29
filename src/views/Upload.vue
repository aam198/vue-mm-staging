<template>
  <div class="upload">
   <transition name="fade" appear>
    <InfoNote v-if="hideNote" @got-it="hideNote = false">
      <template v-slot:title>
        Upload to AWS Deep Glacier
      </template>
     <template v-slot:details>
       Files will upload into <strong>AWS Deep Glacier</strong> storage. Users can archive their local files for safe storage and backup.?Select the location, in which the files will live, and the files will be archived to that location.?
     </template>
    </InfoNote> 
   </transition>
  
   <upload-box/>

  </div> 
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadBox from '@/components/UploadBox.vue'; // @ is an alias to /src
import Button from '@/components/Button.vue'; // @ is an alias to /src
import InfoNote from '@/components/InfoNote.vue'; // @ is an alias to /src



@Options({
  components: {
    UploadBox,
    Button,
    InfoNote
  },
  data: () => {
    return{
      hideNote: true
    }
  },
})
export default class Upload extends Vue {}
</script>