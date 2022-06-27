<template>
  <section>
   <div class="main-area">
    <div class="card">

     <div class="card-header">          
       <label class="checkbox-container">
        <input type="checkbox"  v-model="allSelected" @click="selectAll()">
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
       
         <ul>
          <li id="fileDetails" class="file-details" ref="fileDetails" v-for="upload in uploads" :key="upload.key">
            <label class="checkbox-container">
              <input
              :checked="checkValue == true"
               type="checkbox" v-model="selected" :value="upload.key" >
              <span class="checkmark checkUpload"></span>
            </label>
            <div class="width-20"></div>
            <div class="width-25">{{sliceString(upload.key)}}</div>
            <div class="width-10">{{upload.type}}</div> 
            <div class="width-15">{{formatSize(upload.total)}}</div> 
            <div class="width-10"><i class="fas fa-times remove" @click="removeFile(upload.key)"></i></div>
          </li>
         </ul> 

        <form class="uploadbox" id="drop-area" :data-active="active" v-on:drop.prevent="performUpload" v-on:drag.stop v-on:dragstart.stop v-on:dragend.stop v-on:dragenter.prevent="setActive" v-on:dragover.prevent="setActive" v-on:dragleave.prevent="setInactive" :class="{advanced: isAdvanced}" method="post" action="" enctype="multipart/form-data">
        
           <div :dropZoneActive="active" class="uploadbox__input drag-area">
              
            <div class="icon uploadbox__icon"><i class="fas fa-cloud-upload-alt"></i></div>
            
            <input class="uploadbox__file" type="file" hidden name="upload_files[]" ref="file" id="uploadfile" data-multiple-caption="{count} files selected" multiple  v-on:change="performUpload" accept=".mp3,.mp4,.png "  />
       
              <label for="uploadfile">
                <h2 id="select-file" v-if="active==false">
                  Drag & Drop Assets to Upload to Archive
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

<!-- Modal Pop-up  -->

   <button @click="openModal"  class="btn uploadfile__button" id="archiveBtn" ><i class="fa fa-upload" aria-hidden="true"></i>Upload File(s)</button>
   
    <transition name="fade" appear>

        <Modal v-if="showModal"
        @confirmClick="confirm" 
      @closeClick="closeModal"  text="Archive">
          Files will be uploaded to <strong>Deep Archive</strong> storage class where they will not be instantly available.
            Would you like to continue to upload? 
        </Modal>

    </transition>
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
  border: 2px dashed var(--orange);
  background: transparent;
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

.checkUpload {
  margin-left: 10px;
}

//  Files listed
.file-details{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.file-details > div {   
  text-overflow: clip; padding: 10px;}

.width-10{
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


li i {
  color: var(--red-clr);
  cursor: pointer;
  font-size: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 1rem;
  margin-left: 10px;
  transition: color 0.2s ease;
}

li i:hover{
  color: var(--red-hover);
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
import Modal from '@/components/Modal.vue';
import {defineComponent,ComponentPropsOptions,Ref,ref,reactive} from 'vue';
import {PropType} from 'vue';
// May not need next 2 lines
import { formatSize, sliceString } from "../helpers.js"



declare interface BaseComponentData {
    /*files?:  FileList,*/
    /*error_msg?: string,*/
    uploads: Ref<Array<Upload>>,
    showModal: boolean,
    allSelected: boolean,
    checkValue: boolean,
    selected: Array<string>,
    active: boolean
}

declare interface Upload {
    loaded: number,
    total: number
    key: string,
    type: string,
}


declare interface FileUpload {
    loaded: number,
    total: number,
    key: string,
    type: string,
    file: File
}



export default defineComponent({
    name: "UploadBox",
    data: () => {
        return { 
         showModal: false,
         uploads: ref([]),
         allSelected: true,
         checkValue: true,
         active: false,
         selected: [] as Array<string>
        }  as BaseComponentData;
       
    },
    components: {'ProgressBar': ProgressBar, Modal},
    props: {},
    emits: ["update-progress"],
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
        // this.checkValue= !this.checkValue;
       }
      },
    
      setActive() {
        this.active= true;
      },
      setInactive() {
        this.active=false;
      },
      formatSize,
      sliceString,
    
      openModal(): void {
        console.log('this would open modal');
        this.showModal = !this.showModal;
      },
      closeModal(): void {
        console.log('this will close');
        this.showModal = !this.showModal;
      },

      confirm(): void{
       
        
        let uploads = this.uploads;
        console.log('uploads', uploads);
        const myTarget = JSON.parse(JSON.stringify(uploads));
        console.log('myTarget', myTarget[0]);


        for (let i=0; i < this.uploads.length; i++) {
           // this.upload(i, files[i]);
           console.log('Line 447', myTarget[i]);

        //TODO: Add in ProgressBar Component

        //const bar: typeof ProgressBar = new ProgressBar();
        //let progress_data: Upload =  reactive({loaded: 0, total: myTarget.size, key: myTarget.name});
        // add the progress data to the array
         //let uindex = this.uploads.push(progress_data);
        // on progress call back
        //const config: S3ProviderPutConfig = {
                    //progressCallback: (progress) => { 
                       // progress_data.loaded = progress.loaded;
                      //  console.log(progress);
               // }
          //  };
         console.log('Will send to the s3!', myTarget[i].key,  myTarget[i].file);
            // initiate the upload
         Storage.put(myTarget[i].key, myTarget[i].file);
         }


        // Close modal after confirm
        this.showModal = !this.showModal;
        console.log(this.uploads.length);

        // TODO: Add in if Progress Toast Message if complete then clear 
        // Clear uploads in list
          this.uploads = []; 
      },

      // REMOVE FILE FUNCTION
    removeFile(fileName) {
      const index = this.uploads.findIndex(
        file => file.key === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.uploads.splice(index, 1); 
    },

    isAdvanced(): boolean {
        const div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window; 
        },

    addFiles(index: number, file: File): void{
        // Get File information
        const key: string = file.name;
        const size: number = file.size;
        const file_name_array = key.split(".");
        const file_name= file_name_array[0];
        const file_type = file_name_array[file_name_array.length-1];
        const type: string = file.type;

        const fileList: FileUpload =  reactive({loaded:0, total: file.size, key: file.name, type: file_type, file: file});
        let uindex = this.uploads.push(fileList);
        console.log("this is file list", fileList.file);
        },

    upload(index: number, file: File): void {
      const fileList: FileUpload =  reactive({loaded:0, total: file.size, key: file.name, type: file.type, file: file});
      console.log("Line 434", fileList.file)
        const key: string = file.name;
        //const bar: ProgressBar = new ProgressBar();
        let progress_data: Upload =  reactive({loaded: 0, total: file.size, key: file.name, type: ''});
        // add the progress data to the array
        let uindex = this.uploads.push(progress_data);
        // on progress call back
        const config: S3ProviderPutConfig = {
                progressCallback: (progress) => { 
                    progress_data.loaded = progress.loaded;
                    console.log(progress);
            }
        };
         console.log('Will send to the s3!');
            // initiate the upload
         Storage.put(key,fileList,config);
      },

        performUpload(event: Event): void {
            event.preventDefault();
            this.setInactive();
            const input = event.target as HTMLInputElement;
            const files = input.files as FileList;
            
            for (let i=0; i < files.length; i++) {
                this.addFiles(i, files[i]);
                console.log('Line 457', files[i]);
                // this.upload(i, files[i]);
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