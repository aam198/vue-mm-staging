<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {Amplify,Auth, Storage} from 'aws-amplify';
import config from '../amplify-config';
import AWS from '@aws-sdk/client-s3';
import { S3Client, ListBucketsCommand} from "@aws-sdk/client-s3";


Amplify.configure(config);

Auth.currentAuthenticatedUser({bypassCache: false})
  .then(user => {
    console.log(user);
    console.log(user.username);
    Auth.currentCredentials().then(data=>{
      console.log(data);
    })
    // Auth.currentCredentials().then(data=>{ 
    //   AWS.config.credentials = data;})
    // // Auth.currentCredentials().then(data=>{
    // //   console.log(data);
    // //   return data;
    // // });
  })
  .catch(err => {
    console.log(err);
    Auth.federatedSignIn();
  }
);

// Storage.put("test.txt","Private Content");


// const client = new S3Client({ region: "us-east-1",credentials: credentials });
// const command = new ListBucketsCommand({});
// client.send(command)
//   .then(data=>console.log('HEY THIS FIRED FLAWLESSLY'))
//   .catch(err=>{
//     console.error("SHIT THIS DIDN'T WORK");
//     console.error(err)});

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
