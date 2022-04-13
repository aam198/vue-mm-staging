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
   <MainCard @search-text="searchText">
      
    <div v-for="upload in uploads" :key="upload.key" class="upload">
      <label class="checkbox-container">
        <input type="checkbox">
        <span class="checkmark"></span>
      </label>

      <div class="width-20"> {{upload.path }} </div>
      <div class="width-25">{{upload.name}}</div>
      <div class="width-15">{{upload.type}}</div>
      <div class="width-15">{{upload.size}}</div>
      <div class="width-15">{{upload.storage}}</div>
      <div class="status"> <div :class="[upload.status === 'success' ? '' : 'circle' ]"></div></div>
      <!-- <div :class="[upload.status === 'success' ? 'circle' : '' ]">{{upload.status}}</div> -->
     </div>

      
     <div class="load_more-container">
       <button @click="loadMore"  class="load-more" ><i class="fa fa-angle-down" aria-hidden="true"></i>load more (50)</button>
      </div> 
    </MainCard>
    <div class="continue-container">
      <button class="btn" id="restore-12">12-Hour Restore</button>
      <button class="btn" id="restore-48">48-Hour Restore</button>
    </div>
    
   </section>
  </div>
</template>

<style scoped lang="scss">


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
</style>

<script lang="ts">
import {defineComponent} from 'vue';
import {AttributeValue, DynamoDBClient, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import {Auth} from 'aws-amplify';
import HumanReadable from '../human-readable';
import MainCard from '@/components/MainCard.vue';
import Button from '@/components/Button.vue';
import InfoNote from '@/components/InfoNote.vue';
import HelloWorld from '@/components/HelloWorld.vue';

declare interface ArchiveFile {
    name: string,
    size: string,
    path: string,
    type: string,
    storage: string,
    status: string,
    key: string,
}

declare interface BaseComponentData {
    // files?:  FileList,
    /*error_msg?: string,*/
    uploads: Array<ArchiveFile>,
    nextToken?: string,
    hideNote: boolean,
}


const mapper = function(file: {[key: string]: AttributeValue}): ArchiveFile {
    return { 
      name: file.filename.S || "", 
      size: file.filesize.S || "0", 
      path: file.originalSourcePath.S || "",
      key: file.requestID.S || "", 
      type: file.filetype?.S || "", 
      storage: file.storageclass.S || "",
      status: file.transferStatus.S || ""
    }
};


const REGION = "us-east-1";
const RECORD_LIMIT = 50;

export default defineComponent({
    components:{
      MainCard,
      Button,
      InfoNote,
      HelloWorld,
    },

    data: () => {
        return { 
            uploads: [] as Array<ArchiveFile>,
            nextToken: undefined,
            hideNote: true,
            searchText: '',
        }  as BaseComponentData;
    },
    mounted: async function() {
        
        const params: ScanCommandInput = {
            TableName: "MediaArchive",
            ProjectionExpression: "requestID, filename, originalSourcePath, filesize, filetype, storageclass, transferStatus",
            Limit: RECORD_LIMIT
        };
       
        let credentials = await Auth.currentCredentials();
        
        const ddbClient = new DynamoDBClient({ 
          region: REGION,
          credentials: Auth.essentialCredentials(credentials) });
            
        const data = await ddbClient.send(new ScanCommand(params));

        console.log(data);


        /* loads the items into the array */
        const items: Array<ArchiveFile> = data.Items?.map(mapper) || [];

        /* store the last requestId */
        
        this.nextToken = data.LastEvaluatedKey?.requestID.S || "";
        
        // Iterating through the array and formatting 
        items.map(item => {
          // Taking out the extension that is connected to the whole name
          const fName= item.name;
          const fArr= fName.split(".");
          const file_name = fArr[0];
          item.name = file_name; 
          // console.log(item.name);
          // Formatting file size Adding byte size
          const file_byte = new Array('Bytes', 'KB', 'MB', 'GB');
          // Parse fSize to Integer 
          let fSize = parseInt(item.size);
          var i=0;
            while(fSize>900){fSize/=1024;i++;}
          const file_size = (Math.round(fSize*100)/100)+' '+file_byte[i];
          console.log(typeof file_size);
          
          item.size = file_size;

          const fPath = item.path;
          const fArrPath= fPath.split("/")
          console.log(fArrPath);
          const filePath = fArrPath[3] + '/' + fArrPath[4] + '/' + fArrPath[5];
          console.log(filePath)
          item.path = filePath;
        });
        // Send each item to uploads
        items.forEach((item) => {
          this.uploads.push(item)
          });
        
        console.log(data.LastEvaluatedKey);
        
        /* Handles if user scrolls to the bottom */
        // window.addEventListener('scroll', this.monitorScroll);
        
      console.log(items);
     
          // return data;    
    },
    methods: {
       searchText(){},

       loadMore() {
        this.loadNextBatch()
       },
        monitorScroll: async function() {
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
                console.log('scrolled to the bottom')
                this.loadNextBatch()
            }
        },
        loadNextBatch: async function() {
            const params: ScanCommandInput = {
                TableName: "MediaArchive",
                ProjectionExpression: "requestID, filename, originalSourcePath, filesize, filetype, storageclass, transferStatus",
                Limit: RECORD_LIMIT,
                ExclusiveStartKey:  { "requestID": {"S": this.nextToken || ""}},
            };

            let credentials = await Auth.currentCredentials();
        
            const ddbClient = new DynamoDBClient({ 
                region: REGION,
                credentials: Auth.essentialCredentials(credentials) });
            
            const data = await ddbClient.send(new ScanCommand(params));

            console.log(data);

            /* loads the items into the array */
            const items: Array<ArchiveFile> = data.Items?.map(mapper) || [];
            // Iterating through the array and formatting 
            items.map(item => {
              // Slice up the file path, similar to uploadBox utility function. https://stackoverflow.com/questions/63216973/slice-url-to-get-the-file-name-in-vue
              // Taking out the extension that is connected to the whole name
              const fName= item.name;
              const fArr= fName.split(".");
              const file_name = fArr[0];
              item.name = file_name; 
              // console.log(item.name);
              // Formatting file size Adding byte size
              const file_byte = new Array('Bytes', 'KB', 'MB', 'GB');
              // Parse fSize to Integer 
              let fSize = parseInt(item.size);
              var i=0;
                while(fSize>900){fSize/=1024;i++;}
              const file_size = (Math.round(fSize*100)/100)+' '+file_byte[i];
              console.log(typeof file_size);
              
              item.size = file_size;

              const fPath = item.path;
              const fArrPath= fPath.split("/")
          console.log(fArrPath);
              const filePath = fArrPath[3] + '/' + fArrPath[4] + '/' + fArrPath[5];
              console.log(filePath)
          item.path = filePath;
             });

            // this.uploads = this.uploads.concat(items);
            this.uploads = this.uploads.concat(items);

            /* store the last requestId */
            this.nextToken = data.LastEvaluatedKey?.requestID.S || "";
        }

    },
    
})


</script>