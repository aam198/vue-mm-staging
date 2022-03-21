<template>
  <div class="standard-storage">
    <InfoNote>
      <template v-slot:title>
        S3 Bucket Uploads
      </template>
      <template v-slot:details>
      Uploading to the S3 bucket for standard storage, (i.e. playback through our video player) In addition uploading files can also be overwritten, so please be careful when uploading files into the S3 bucket. Each file upload will move to Deep Archive so you do not need to Upload to Archive. 
      </template>
      </InfoNote> 
    <StorageStdBox />
  </div>
</template>

<script>

import InfoNote from '@/components/InfoNote.vue';
import StorageStdBox from '@/components/StorageStdBox.vue';

export default{
  components: {
    InfoNote,
    StorageStdBox
  }
}

</script>