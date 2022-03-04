<template>

  <div class="available">
    <MainCard>
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </MainCard>
    <div class="continue-container">
      <button class= "dl-button btn">
        Download File(s)
    </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainCard from '@/components/MainCard.vue';
import HelloWorld from '@/components/HelloWorld.vue';

 // @ is an alias to /src

@Options({
  name: "Available",
  components: {
    HelloWorld,
    MainCard
  },
})
export default class Available extends Vue {}
</script>
