<template>
  <div class="upload">
        <upload-box/>
        <Button text="Upload File(s)"  />
  </div> 
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadBox from '@/components/UploadBox.vue'; // @ is an alias to /src
import Button from '@/components/Button.vue'; // @ is an alias to /src


@Options({
  components: {
    UploadBox,
    Button
  },
})
export default class Upload extends Vue {}
</script>