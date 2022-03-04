<template>

  <div class="home">
    <MainCard>
      <Descriptions msg="Hello Component and prop!" />
      <div>
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
      </div>
    </MainCard>

     <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainCard from '@/components/MainCard.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import Descriptions from '@/components/Descriptions.vue'
 // @ is an alias to /src

@Options({
  components: {
    MainCard,
    HelloWorld,
    Descriptions
  },
})
export default class Home extends Vue {}
</script>
