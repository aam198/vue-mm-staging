<template>
 
    <form class="uploadbox" id="drop-area" v-on:drop.stop v-on:drag.stop v-on:dragstart.stop v-on:dragend.stop v-on:dragenter.stop v-on:dragleave.stop :class="{advanced: isAdvanced}" method="post" action="" enctype="multipart/form-data">
      <div id="fileDetails" class="file-details"></div>    

        <div class="uploadbox__input drag-area">
          
            <div class="icon uploadbox__icon"><i class="fas fa-cloud-upload-alt"></i></div>

            <label for="uploadfile" class="uploadLabel">
              <h2 id="select-file">
                Drag & Drop Assets to Encode
              </h2>
              <span>or</span>
            </label>
            
            <input class="uploadbox__file" type="file" name="upload_files[]" id="uploadfile" data-multiple-caption="{count} files selected" multiple accept=".mp3,.mp4" v-on:change="performUpload" />
        </div>
        <div class="uploadfile__uploading">Uploading...</div>
        <div class="uploadfile__success">Done!</div>
        <!-- <div class="uploadfile__error">{{errmsg}}</div> -->
    </form>
    <div>
        <ProgressBar ref="progress" v-for="(item,index) in uploads"  :key="item.key"  :index="index" :loaded="item.loaded" :total="item.total" />
    </div>
  <button class="uploadfile__button" type="submit">Upload</button>
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
  white-space: nowrap;
  cursor: pointer;
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
  margin-right: 0px;
  background: rgba(45 68 105 / 100%);
  color: var(--font-clr);
  font-family: inherit;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
}

.uploadbox.advanced {
  border-radius: 15px;
  outline: 2px dashed var(--blue-dark);
  outline-offset: -10px;
  transition: outline-offset .15s ease-in-out, background-color .15s linear;
  width: 100%;
}

.uploadbox.advanced .uploadbox__dragndrop {
    display: inline;
}

.uploadbox.advanced .uploadbox__icon {
  font-size: 4rem;
  color: var(--orange);
}


</style>

<script lang="ts">
import {Storage, S3ProviderPutConfig} from '@aws-amplify/storage';
//import UploadTaskProgressEvent from '@aws-amplify/storage';
import ProgressBar from '@/components/ProgressBar.vue';
import {defineComponent,ComponentPropsOptions,Ref,ref,reactive} from 'vue';
import {PropType} from 'vue';

declare interface BaseComponentData {
    /*files?:  FileList,*/
    /*error_msg?: string,*/
    uploads: Ref<Array<Upload>>,

}

declare interface Upload {
    loaded: number,
    total: number
    key: string
}

export default defineComponent({
    name: "UploadBox",
    data: () => {
        return { uploads: ref([])}  as BaseComponentData;
    },
    components: {'ProgressBar': ProgressBar},
    props: {},
    emits: ["update-progress"],
    methods: {
        isAdvanced(): boolean {
            const div = document.createElement('div');
            return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window; 
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
            const input = event.target as HTMLInputElement;
            const files = input.files as FileList;
            for (let i=0; i< files.length; i++) {
                this.upload(i,files[i]);
            }
        }
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