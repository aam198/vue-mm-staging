<template>
  <div class="search-page">
    <transition name="fade" appear>
    <InfoNote v-if="hideNote" @got-it="hideNote = false">
      <template v-slot:title>
        Search Archive
      </template>
     <template v-slot:details>
       Search for files you would like to download to local computer. <strong>12-Hour Restore</strong> : choose for an immediate need (i.e. impacting students in live lessons. <strong>48-Hour Restore</strong>: anything else. After selection, check for files in <strong>Available Files</strong>
     </template>
    </InfoNote> 
   </transition>

 <section>
  <MainCard v-model="allSelected" @selectAll = "selectAll()" :search="search" >
  <!-- <MainCard v-model="allSelected" @selectAll = "selectAll()" :search="search" :reset="resetBatch"> -->
  <!-- <MainCard :search-text="searchText"> -->

    <div v-for="(item, index) in results" :key="index.key" class="upload">
      <label class="checkbox-container">
        <input type="checkbox" v-model="selected" :value="item.key">
        <span class="checkmark"></span>
      </label>

        
      <div class="width-20"> {{  }} </div>
      <div class="width-25">{{ sliceString(item.key)}}</div>
      <div class="width-15">{{ fileType(item.key) }}</div>
      <div class="width-15">{{ formatSize(item.size) }}</div>
      <div class="width-15">{{  }}</div>
      <!-- <div class="status"> <div :class="[upload.status === 'success' ? '' : 'circle' ]"></div></div> -->
      <!-- <div :class="[upload.status === 'success' ? 'circle' : '' ]">{{upload.status}}</div> -->
     </div>

      
     <!-- <div class="load_more-container">
       <button @click="loadNextBatch"  class="load-more" ><i class="fa fa-angle-down" aria-hidden="true"></i>load more (50)</button>
      </div>  -->
    </MainCard>
    <div class="continue-container">
      <button class="btn" id="restore-12">12-Hour Restore</button>
      <button class="btn" id="restore-48">48-Hour Restore</button>
    </div>

    <h1>File List</h1>
    <ul>
      <li v-for="file in files" :key="file.key">
        <File :name="file.Key" :date="file.LastModified" />
      </li>
    </ul>
    
   </section>
          <!-- <amplify-photo-picker
            v-bind:photoPickerConfig="photoPickerConfig"
          ></amplify-photo-picker>
          <amplify-s3-album path="public/"></amplify-s3-album> -->
    
  </div>
</template>



<script>
import {defineComponent,ComponentPropsOptions,Ref,ref,reactive, onMounted} from 'vue';
import {Storage, S3ProviderPutConfig} from '@aws-amplify/storage';
import {Amplify} from 'aws-amplify';
import MainCard from '@/components/MainCard.vue';
import InfoNote from '@/components/InfoNote.vue';
import Button from '@/components/Button.vue';
import { formatSize, sliceString, fileType } from "../helpers.js"
import S3 from '@aws-sdk/client-s3'
import config from '../amplify-config';

// Point to s3
// console.log(config.Storage.AWSS3.bucket);


export default defineComponent({
  name: "s3search",
  components: {
    MainCard,
    InfoNote,
    Button
  },
  data() {
    return {
      items: [],
      error: '',
      logger: {},
      hideNote: true,
      allSelected: true,
      selected: [],
      files: [],
    };
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
  
    // console.log('line 59', this.results)
    
    // this.processStorageList(items); 
    // const s3 = new S3();
    // const params = {
    //   Bucket: config.Storage.AWSS3.bucket,
    // };
    // s3.listObjectsV2(params, (err, data) => {
    //   if (err) return console.error(err);
    //   this.files = data.Contents.sort((a, b) => b.LastModified - a.LastModified);
    // });
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

  formatSize,
  sliceString,
  fileType,

  selectAll: function() {
       
    if (this.allSelected){
      console.log('line 353', this.allSelected.valueOf())
      console.log('select all pressed');
      const selected = this.items.map((upload) => upload.key);
      this.selected = selected;
      console.log(selected);
      console.log('line 358', this.allSelected.valueOf())
      if(this.allSelected == true){
        this.allSelected = !this.allSelected
      }
      }
    else if (!this.allSelected) {
      console.log('clicking');
      this.selected = [];
      this.allSelected = !this.allSelected;
    }
  },

  },
   
  //   computed: {
  //   options() {
  //     //retain for future use
  //     const defaults = {}
  //     return Object.assign(defaults, this.s3AlbumConfig || {})
  //   },
  // },

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


.upload {
  display: flex; 
  font-family: var(--font-body);
  border-radius: 3px;
}
.upload > div {   
  text-overflow: clip; padding: 10px;}
.align-self-center {align-self: center !important;}

.status{
  width: 10%;
  display: flex;
  justify-content: center;
}
.width-15 { 
  display:flex;
  max-width: 11%;
  flex-grow: 1;
}
.width-20 {
  display:flex;
  max-width: 25%;
  width: 20%;
  flex-grow: 1;
  overflow-wrap: break-word;
  word-break: break-all;
  }
.width-25{
  display:flex;
  flex-grow: 1;
  width: 15%;
  max-width: 20%;
  overflow-wrap: break-word;
  word-break: break-all;
}

.width-30{
  display:flex;
  flex-grow: 1;
  max-width: 25%;
  height: auto;
}

.status .circle{
  margin-top: 5px;
  margin-left: 20px;
  height: 10px;
  width: 10px;
  background: var(--green-clr);
  border-radius: 50%;
}

.continue-container{
  display: flex;
  justify-content: flex-end;
  gap:10px;
  margin: 1rem 0px;
  width: 100%;
  max-width: 1400px;
  min-width: 700px;
}

.load_more-container{
  display: flex;
  align-self: center;
  justify-content: flex-end;
}

.btn, button.btn{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 18rem;
  height: 4rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  margin-right: 1rem;
  background: rgba(45 68 105 / 100%);
  color: var(--font-clr);
  font-family: var(--font-body);
  font-size: 1.3rem;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
}

.btn:hover, button.btn:hover{
  background-color: var(--blue-dark);
  transform: translate3d(0px, -1px, 0px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
button.load-more{
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 0px;
  display: inline-flex;
  justify-content: center;
  align-items:center;
  background: transparent;
  border: 3px solid var(--blue-dark);
  padding: 0.8rem 1rem;
  margin: 0.7rem 0;
  width: 15.5rem;
  transition: background 0.3s ease-in-out, color 0.2s ease-in-out;
  font-size: 1.2rem;
  font-weight: 700;
}

.load-more i{
  margin-right: 8px;
  font-size: 2rem;
  transition: color 0.2s ease-in;
}

.load-more:hover {
  background: var(--blue-dark);
  color: var(--font-clr);
}
.load-more:hover > i {
  color: var(--orange);
}

/* Check Mark Styling */
.checkbox-container {
  position: relative;
  margin-bottom: 20px;
  margin-top: 8px;
  padding: 10px 13px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  }

/* To hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
}

.checkbox-container:hover input ~ .checkmark {
  border: 1px solid var(--blue-med);
  border-color: var(--blue-med);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--blue-dark);
}
  /* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}
  /* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
  left: 6px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
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