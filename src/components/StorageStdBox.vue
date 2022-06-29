<template>
  <section>
   <div class="main-area">
    <div class="card">

     <div class="card-header">          
       <label class="checkbox-container">
        <input type="checkbox">
         <span class="checkmark"></span>
       </label>
      <h2 class="file-location-check">File Location</h2>
      <h2 class="file-name-check">File Name </h2>
      <h2 class="file-type-check">File Type</h2>
      <h2 class="file-size-check">File Size</h2>
      <h2 class="status-check">Status</h2>
     </div>
    <!-- End of Card Header -->
      <div class="card-content">
    
        <form class="uploadbox" id="drop-area" :data-active="active" v-on:drop.prevent="performUpload" v-on:drag.stop v-on:dragstart.stop v-on:dragend.stop v-on:dragenter.prevent="setActive" v-on:dragover.prevent="setActive" v-on:dragleave.prevent="setInactive" :class="{advanced: isAdvanced}" method="post" action="" enctype="multipart/form-data">
        
          <div id="fileDetails" class="file-details" ref="fileDetails"></div>    

           <div :dropZoneActive="active" class="uploadbox__input drag-area">
              
            <div class="icon uploadbox__icon"><i class="fas fa-cloud-upload-alt"></i></div>
            
            <input class="uploadbox__file" type="file" hidden name="upload_files[]" ref="file" id="uploadfile" data-multiple-caption="{count} files selected" multiple accept=".mp3,.mp4,.png " v-on:change="performUpload" />
       
              <label for="uploadfile">
                <h2 id="select-file" v-if="active==false">
                  Drag & Drop Assets to Upload to S3 Bucket
                </h2>
                <h2 id="select-file" v-else>
                  Release to Add
                </h2>
                <span>or</span>
                <div class="btn">Browse Files</div>
              </label>

            </div>

            <div class="uploadfile__uploading">Uploading...</div>
            <div class="uploadfile__success">Done!</div>
            <!-- <div class="uploadfile__error">{{errmsg}}</div> -->
          </form>
          <!-- Form End -->
        <!-- Progress Bar -->
          <div>
              <ProgressBar ref="progress" v-for="(item,index) in uploads"  :key="item.key"  :index="index" :loaded="item.loaded" :total="item.total" />
          </div>
      </div>
     </div>
    </div>
    <!-- End of main-area -->

  
  <div class="continue-container">
    <button class="btn uploadfile__button" id="archiveBtn" ><i class="fa fa-upload" aria-hidden="true"></i>Upload File(s)</button>

<!-- Modal Pop-up  -->
    <div id ="myModal" class="modal">
      <div class="modal-box">
        <h2>Encode Video Files</h2>
        <span class="close"><i class="fas fa-times"></i></span>
        <div class="content">
          Videos will be encoded into 3 different formats (low, med, high)
          Would you like to encode these video files? 
            </div>
        <div class="navigation">
            <button class="btn-sm" id="upload-s3">Yes, Encode!</button>
          <button class="btn-sm remove-btn" id="backBtn">No, Take me back</button>
        </div>    

      </div>
    </div>
  </div> 
  
 </section>
</template>

<style scoped lang="scss">

.uploadbox__dragndrop,
.uploadbox__uploading {
    display: none;
}

.uploadfile__error,
.uploadfile__uploading,
.uploadfile__success {
    display: none;
}

.uploadbox__file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.uploadbox__file + label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items:center;
}

.uploadbox__input {
  border: 2px dashed var(--bkg-clr);
  min-height: 700px;
  height: auto;
  width: 100%;
  margin: 0.5rem 0.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.uploadLabel{
  display: inline-flex;
  flex-direction: column;
}

.uploadbox__file label {
  color: var(--font-dark);
  font-weight: 700;
  margin-right: 2px;
}

.uploadbox__input h2{
  color: var(--font-dark);
  font-size: 30px;
  font-weight: 700;
}

.uploadbox__input span{
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 25px;
  font-weight: 500;
  color: var(--font-dark);
  margin: 10px 0 15px 0;
  text-align: center;
}

.uploadfile__button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 25px;
  border: none;
  margin-right: 1rem;
  background: rgba(45 68 105 / 100%);
  color: var(--font-clr);
  font-family: inherit;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  height: 4rem;
  width: 17rem;
}
.uploadfile__button i{
  margin-right: 8px;
}

.uploadbox.advanced {
  border-radius: 15px;
  outline: 2px dashed var(--blue-dark);
  outline-offset: -10px;
  transition: outline-offset .15s ease-in-out, background-color .15s linear;
  width: 100%;
  &[data-active=true]{
    outline: 2px dashed var(--orange);
    background: transparent;
  }
}

.uploadbox.advanced .uploadbox__dragndrop {
    display: inline;
}

.uploadbox.advanced .uploadbox__icon {
  font-size: 4rem;
  color: var(--orange);
}

.btn input[type=file]{
  opacity: 0;
}

.btn:disabled, .btn[disabled], .btn[disabled]:hover, .btn[disabled]:active {
  cursor: not-allowed;
  background-color: #e0e0e0;
  border: 1px dashed #292929;
}

/* Drag and Drop Area Modal Styles */
.modal{
  display: flex;
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 200px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
}

.modal-box {
  margin: auto;
  padding: 30px;
  background: var(--clr-white);
  border-radius: 5px;
  width: 45%;
  min-width: 450px;
  position: relative;
  z-index: 10;
}

.modal-box h2 {
  margin-bottom: 5px;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 1.6rem;
  text-align: center;
}

.modal-box .close{
  color: rgba(45 68 105 / 100%);
  position: absolute;
  top: 10px;
  right: 20px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
}

.modal-box .close:hover {
  color: var(--orange);
  cursor: pointer;
}

.modal-box .content {
  overflow: auto;
  padding: 30px 30px;
  text-align: center;
  font-size: 1.2rem;
  font-family:var(--font-body);
  line-height: 1.6;
}

.modal-box .navigation{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

}  
.modal-box .btn-sm {
  display: flex;
  flex-direction: row;
  padding: 16px 45px;
  border: none;
  border-radius: 5px;
  background: rgba(45 68 105 / 100%);
  color: #F6F7F9;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.25s ease, background-color 0.4s ease;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
}
.modal-box .btn-sm:hover{
  background-color:#1c2c62;
  transform: translate3d(0px,-1px,0px);
  box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
}

.modal-box .btn-sm:focus {
  outline: 2px dashed var(--orange);
}
.modal-box .btn-sm:active{
  background-color: var(--orange);
}

.modal-box .remove-btn {
  background-color: var(--red-clr);
}

.modal-box .remove-btn:hover{
  background-color: #de3838;
}

.checkbox-container {
  position: relative;
  margin-bottom: 20px;
  padding: 0px 10px;
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

@media screen and (max-width: 700px){
  .modal-box{
    width: 100%;
}
}

</style>

<script lang="ts">
import {Storage, S3ProviderPutConfig} from '@aws-amplify/storage';
//import UploadTaskProgressEvent from '@aws-amplify/storage';
import ProgressBar from '@/components/ProgressBar.vue';
import {defineComponent,ComponentPropsOptions,Ref,ref,reactive} from 'vue';
import {PropType} from 'vue';
import { formatSize, sliceString } from "../helpers.js"


declare interface BaseComponentData {
    /*files?:  FileList,*/
    /*error_msg?: string,*/
    uploads: Ref<Array<Upload>>,
    active: boolean,
    showModal: boolean,
    allSelected: boolean,
    checkValue: boolean,
    selected: Array<string>,
}

declare interface Upload {
    loaded: number,
    total: number
    key: string
}

export default defineComponent({
    name: "UploadBox",
    data: () => {
      return { 
        showModal: false,
        uploads: ref([]),
        allSelected: true,
        checkValue: false,
        active: false,
        selected: [] as Array<string>
      }  as BaseComponentData;  
    },

    components: {'ProgressBar': ProgressBar},
    props: {},
    emits: ["update-progress"],
    computed: {
      isDisabled() {
        return this.listFile.length < 0;
      }
    },
    methods: {
      selectAll: function() {
        if (!this.allSelected){
          console.log('select all pressed', this.allSelected.valueOf())
          const selected = this.uploads.map((upload) => upload.key);
          this.selected = selected;
          console.log(selected);
          console.log('line 358', this.allSelected.valueOf())
        }
        else if (this.allSelected) {
          console.log('clicking');
          this.selected = [];
          this.allSelected = !this.allSelected;
        }
      },
      isAdvanced(): boolean {
        const div = document.createElement('div');
          return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window; 
        },
      setActive() {
        this.active= true;
       },
      setInactive() {
        this.active=false;
      },
      listFile(index: number, file: File): void{
        // Get File information
        const key: string = file.name;
        const size = file.size;
        const file_name_array = key.split(".");
        console.log(key, size, file_name_array)
        const file_name= file_name_array[0];
        const file_type = file_name_array[file_name_array.length-1];
        console.log(file_name, file_type)
        const file_byte = new Array('Bytes', 'KB', 'MB', 'GB');
        let fSize = size;
        var i=0;
        while(fSize>900){fSize/=1024;i++;}
        const file_size = (Math.round(fSize*100)/100)+' '+file_byte[i];
    
      },
      upload(index: number,file: File): void {
          const key: string = file.name;
          //const bar: ProgressBar = new ProgressBar();
          let progress_data: Upload =  reactive({loaded: 0, total: file.size, key: file.name});
          // add the progress data to the array
          let uindex = this.uploads.push(progress_data);
          // on progress call back
          const config: S3ProviderPutConfig = {
                  progressCallback: (progress) => { 
                      progress_data.loaded = progress.loaded;
                      console.log(progress);
              }
          };
          // initiate the upload
          Storage.put(key,file,config);
      },
      performUpload(event: Event): void {
        this.setInactive();
        const input = event.target as HTMLInputElement;
        const files = input.files as FileList;
          // Uncomment 3 lines below to send files to upload function
        for (let i=0; i< files.length; i++) {
          //     this.upload(i,files[i]);
          this.listFile(i, files[i]);
          }
      }, 
    }
})




// declare interface BaseComponentData {
//     files: FileList?,
//     error_msg: string?
// }



// // @Options({
// //   components: {
// //     UploadBox,
// //   }
// // })
// @Component()
// export default class UploadBox extends Vue {
//     error_message: string? = null;
//     file_list: FileList? = null;

//     isAdvanced(): Boolean {
//         var div = document.createElement('div');
//         return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window; 
//     };

//     selectFiles(event: Event): void {
//         const input = event.target as HTMLInputElement;
//         if (!input.files?.length) {
//             return
//         }
//         this.file_list=input.files;
//         alert('hello, this fired');
//     }
// }
</script>