<template>
    <form class="uploadbox" v-on:drop.stop v-on:drag.stop v-on:dragstart.stop v-on:dragend.stop v-on:dragenter.stop v-on:dragleave.stop :class="{advanced: isAdvanced}" method="post" action="" enctype="multipart/form-data">
        <div class="uploadbox__input">
            <svg class="uploadbox__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
            <input class="uploadbox__file" type="file" name="upload_files[]" id="uploadfile" data-multiple-caption="{count} files selected" multiple accept=".mp3,.mp4" v-on:change="performUpload" />
            <label for="uploadfile">
                <strong>Choose a file</strong>
                <span class="uploadfile_dragndrop">or drag it here</span>.
            </label>
            <button class="uploadfile__button" type="submit">Upload</button>
        </div>
        <div class="uploadfile__uploading">Uploading...</div>
        <div class="uploadfile__success">Done!</div>
        <div class="uploadfile__error">{{errmsg}}</div>
    </form>
    <div>
        <ProgressBar ref="progress" v-for="(item,index) in uploads"  :key="item.key"  :index="index" :loaded="item.loaded" :total="item.total" />
    </div>
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

.uploadbox__file + label strong {
    color: var(--navy);
    font-weight: 700;
    margin-right: 2px;
}

.uploadfile__button {
    font-weight: 700;
    color: #e5edf1;
    background-color: #39bfd3;
    display: none;
    padding: 8px 16px;
    margin: 40px auto 0;
}

.uploadbox {
    font-size: 1.25em;
    background-color: #c8dadf;
    position: relative;
    padding: 100px 20px;
}

.uploadbox.advanced {
    background-color: var(--gray);
    border-radius: 5px;
    outline: 2px dashed var(--dark-gray);
    outline-offset: -10px;
    transition: outline-offset .15s ease-in-out, background-color .15s linear;
    max-width: 50vw;
}

.uploadbox.advanced .uploadbox__dragndrop {
    display: inline;
}

.uploadbox.advanced .uploadbox__icon {
    width: 100%;
    height: 80px;
    fill: #92b0b3;
    display: block;
    margin-bottom: 40px;
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