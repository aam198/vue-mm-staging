<template>
  <div class="search">
    <main>
        <div v-for="upload in uploads" :key="upload.key" class="upload">
            <div></div>
            <div class="width-40">{{upload.name}}</div>
            <div class="">{{upload.type}}</div>
            <div class="">{{upload.size}}</div>
            <div class="">{{upload.status}}</div>
        </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.upload {
    display: flex; 
    font-family: Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
    border: 1px solid black;
    border-radius: 3px;
}
.upload > div { flex-grow: 1; text-align: left;text-overflow: clip; padding: 2px;}
.align-self-center {align-self: center !important;}
.width-40 {width: 40% !important;}
.width-20 {width: 20% !important;}
.width-25 {width: 25% !important;}
.width-10 {width: 10% !important;}
.width-5 {width: 5% !important;}

</style>

<script lang="ts">
import {defineComponent} from 'vue';
import {AttributeValue, DynamoDBClient, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import {Auth} from 'aws-amplify';
import HumanReadable from '../human-readable';

declare interface ArchiveFile {
    name: string,
    size: number,
    type: string,
    status: string,
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
                status: file.storageclass.S || ""
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

    }
})


</script>