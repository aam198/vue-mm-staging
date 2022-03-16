<template>
 <div class="available">
  <section>
    <MainCard SearchDisplay = "none">
      
      
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>

      <!-- <Modal /> -->
     
    </MainCard>   
    
    <div class="continue-container">
      <button class="btn download_btn" id="downloadBtn" ><i class="fa fa-download" aria-hidden="true"></i>Download File(s)</button>
    </div>
   </section> 
  </div> 
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainCard from '@/components/MainCard.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';

 // @ is an alias to /src

@Options({
  name: "Available",
  components: {
    HelloWorld,
    MainCard,
    Button,
    Modal
  },
})
export default class Available extends Vue {}
</script>

<style scoped>

img {
    height: 350px;
    width: 350px;
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
.download_btn i {
  margin-right: 8px;
}

.btn:hover, button.btn:hover
{
  background-color: var(--blue-dark);
  transform: translate3d(0px,-1px,0px);
  box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
}

</style>