<template>
    <section>
        <upload-box/>
    </section>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UploadBox from '@/components/UploadBox.vue'; // @ is an alias to /src

@Options({
  components: {
    UploadBox
  },
})
export default class Upload extends Vue {}
</script>