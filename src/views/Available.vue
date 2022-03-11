<template>
 <div class="available">
    <MainCard SearchDisplay = "none">
      
        <img alt="Vue logo" style="height: 250px; width: 250px; margin: 0 auto;" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
     
    </MainCard>   
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

<style scoped>
  img {
    height: 350px;
    width: 350px;
  }
</style>