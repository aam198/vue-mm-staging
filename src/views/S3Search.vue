<template>
  <div class="container">
          <!-- <amplify-photo-picker
            v-bind:photoPickerConfig="photoPickerConfig"
          ></amplify-photo-picker>
          <amplify-s3-album path="public/"></amplify-s3-album> -->

        <div >
          <div v-for="(item, index) in results" :key="index" style="display: flex; flex: 1; margin: 30px; justify-content: center;">
            <div  style="--width:300px; margin: 12px; ">
            <div>{{ item.key }}</div>
            </div>
         </div>
       </div>
      

  </div>
</template>



<script>
import {defineComponent,ComponentPropsOptions,Ref,ref,reactive, onMounted} from 'vue';
import {Storage, S3ProviderPutConfig} from '@aws-amplify/storage';


export default defineComponent({
  name: "s3search",
  data() {
    return {
       items: [],
       error: '',
       logger: {},
    };
  },
  computed: {
    options() {
      //retain for future use
      const defaults = {}
      return Object.assign(defaults, this.s3AlbumConfig || {})
    },
  },
  
  setup(){
    const results = ref([])

    onMounted(async () => {
        results.value = await Storage.list("");
        console.log("called onMounted", results);    
      });
    return {
      results,
    }
    
  },

 mounted() {
    console.log('line 59', this.results)
    // this.processStorageList(items); 
 },

methods: {

  processStorageList(results) {
  let files = []
  let folders = new Set()
  results.forEach(res => {
    if (res.size) {
      files.push(res)
        // sometimes files declare a folder with a / within then
        let possibleFolder = res.key.split('/').slice(0,-1).join('/')
        if (possibleFolder) folders.add(possibleFolder)
      } else {
        folders.add(res.key)
      }
    })
    return {files, folders}
  },
      getImages() {
      if (!this.path) { 
        this.setError('Album path not provided');
        return; 
      }
      Storage.list(this.path, this.options)
        .then(res => {
          that.items = res.map(item => {
            return { path: item.key };
          });
        })
        .catch(e => this.setError(e));
    },
    
  },


  // mounted: {
    
  //   // function () {
  //   //   Storage.list('') // for listing ALL files without prefix, pass '' instead
  //   //   .then(result => console.log(result)
  //   //     // processStorageList(results)
  //   //     )
  //   //   .catch(err => console.log(err));
  //   // }
  // },
})

</script>


<style scoped>
 .amplify-album {
    width: var(--component-width-desktop);
    margin: 1em auto;
    border-radius: 6px;
    background-color: var(--color-white);
    box-shadow: var(--box-shadow);
  }
  .amplify-album-container {
    width: 400px;
    margin: 0 auto;
    padding: 1em;
  }
  .amplify-image-container {
    display: inline;
  }
</style>