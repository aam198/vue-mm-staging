<template>
 <div class="available">
    <MainCard />
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    
      <Button text="Download File(s)" />
       

  </div> 
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainCard from '@/components/MainCard.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import Button from '@/components/Button.vue';

 // @ is an alias to /src

@Options({
  name: "Available",
  components: {
    HelloWorld,
    MainCard,
    Button
  },
})
export default class Available extends Vue {}
</script>
