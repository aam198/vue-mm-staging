<template>
 <div class="available">
   <transition name="fade" appear>
    <InfoNote v-if="hideNote" @got-it="hideNote = false" >
     <template v-slot:title>Available Files</template>
     <template v-slot:details>List of all the files that have been restored from the Archive (AWS Deep Glacier) and are now available to download to your local machine. These files were copied from their original location and are available for <strong> 30 days</strong>. Please <strong>refresh</strong> the page if files do not show right away.</template>
     </InfoNote>
  </transition>

  <section>
    <MainCard SearchDisplay = "none">
    
    
    </MainCard>   
    
    <div class="continue-container">
      <button @click="openModal" class="btn download_btn" id="downloadBtn" ><i class="fa fa-download" aria-hidden="true"></i>Download File(s)</button>
      <transition name="fade" appear>
        <Modal v-if="showModal" @close-click="closeModal">
         Videos will be encoded into 3 different formats (low, med, high)
          Would you like to encode these video files? 
        </Modal>
      </transition>
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
import InfoNote from '@/components/InfoNote.vue';


 // @ is an alias to /src

@Options({
  name: "Available",
  components: {
    HelloWorld,
    MainCard,
    Button,
    Modal,
    InfoNote,
  },
  
  data: () => {
    return {
      showModal: false,
      hideNote: true,
      currentPage: 1,
    }
  },
  methods: {
    openModal(): void {
      console.log('this would open modal');
      this.showModal = !this.showModal;
    },
    closeModal(): void {
      console.log('this would close');
      this.showModal = !this.showModal;
    },
   
  }
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