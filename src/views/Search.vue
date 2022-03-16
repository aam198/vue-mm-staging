<template>
  <div class="search">
   <section>
    <MainCard>
        <div v-for="upload in uploads" :key="upload.key" class="upload">
          <label class="checkbox-container">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>

      <div class="width-25">COURSES/ACCT/ACCT490</div>
      <div class="width-25">{{upload.name}}</div>
      <div class="width-15">{{upload.type}}</div>
      <div class="width-15">{{upload.size}}</div>
      <div class="width-20">{{upload.storage}}</div>
      <div class="width-5">Status</div>
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
  border: 1px solid black;
  border-radius: 3px;
}
.upload > div { flex-grow: 1; text-align: center; text-overflow: clip; padding: 5px;}
.align-self-center {align-self: center !important;}
.width-10{
  display:flex;
  justify-content: center;
  min-width: 10%;
}
.width-15 { 
  display:flex;
  justify-content: center;
  max-width: 15%;
}
.width-20 {
  display:flex;
  justify-content: center;
  width: 20%;
  }
.width-25{
  display:flex;
  width: 20%;
  max-width: 30%;
}



.width-10 {width: 10% !important;}
.width-5 {width: 5% !important;}

.continue-container{
  display: flex;
  justify-content: flex-end;
  gap:10px;
  margin: 1rem 0px;
  width: 100%;
  max-width: 1400px;
  min-width: 700px;
}

.btn, button.btn{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 18.5rem;
  height: 4rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
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

/* Check Mark Styling */
.checkbox-container {
  position: relative;
  margin-bottom: 20px;
  padding: 0px 13px;
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

declare interface ArchiveFile {
    name: string,
    size: number,
    type: string,
    storage: string,
    key: string,
}

declare interface BaseComponentData {
    /*files?:  FileList,*/
    /*error_msg?: string,*/
    uploads: Array<ArchiveFile>,
    nextToken?: string
}



const mapper = function(file: {[key: string]: AttributeValue}): ArchiveFile {
    return { 
                name: file.filename.S || "", 
                size: parseInt(file.filesize.S || "0"), 
                key: file.requestID.S || "", 
                type: file.filetype?.S || "", 
                storage: file.storageclass.S || ""
    }
};

const REGION = "us-east-1";
const RECORD_LIMIT = 50;

export default defineComponent({
    data: () => {
        return { 
            uploads: [] as Array<ArchiveFile>,
            nextToken: undefined
        }  as BaseComponentData;
    },
    mounted: async function() {
        
        const params: ScanCommandInput = {
            TableName: "MediaArchive",
            ProjectionExpression: "requestID, filename, filesize, filetype, storageclass",
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
            
        items.forEach((x) => this.uploads.push(x));
        
        console.log(data.LastEvaluatedKey);


        /* Handles if user scrolls to the bottom */
        window.addEventListener('scroll', this.monitorScroll);

      console.log(items);

        //     return data;    
    },
    methods: {
        monitorScroll: async function() {
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
                console.log('scrolled to the bottom')
                this.loadNextBatch()
            }
        },
        loadNextBatch: async function() {
            const params: ScanCommandInput = {
                TableName: "MediaArchive",
                ProjectionExpression: "requestID, filename, filesize, filetype, storageclass",
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

            this.uploads = this.uploads.concat(items);

            /* store the last requestId */
            this.nextToken = data.LastEvaluatedKey?.requestID.S || "";

        }

    },
    components:{
      MainCard
    }
})


</script>