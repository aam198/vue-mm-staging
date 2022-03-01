<template>

  <div class="available">
    <Card>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </Card>
    <div class="continue-container">
    <button class= "dl-button btn">
      Download File(s)
    </button>
  </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import Card from '@/components/Card.vue';
 // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
    Card
  },
})
export default class Available extends Vue {}
</script>
