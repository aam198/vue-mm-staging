<template>
 
    <div class="main-area">
      <div class="card">
        <!-- Card Search -->
        <div class="card-search" :style=" {display: SearchDisplay}">
      
          <div class="search-bar">
            <input class="search" id="search" 
           v-model="term" type="text" name="text" @keyup.enter="search(term)"  @keyup="reset(term)"
            placeholder="Search files by prefix - Hit [ Enter ] to start search">
            <!-- <input class="search" id="search" 
           v-model="term" type="text" name="text" @keyup="search(term)" @keyup.enter="$emit(search)" 
            placeholder="Search files by prefix - [Enter] to search"> -->
          </div>

        </div>
        <!-- Card Header -->
        <div class="card-header">  
          <label class="checkbox-container">
            <input type="checkbox"  @click="selectAll()" v-show="disable">
            <span class="checkmark" v-show="disable"></span>
          </label>

          <h2 class="file-location-check">File Location</h2>
          <h2 class="file-name-check">File Name </h2>
          <h2 class="file-type-check">File Type</h2>
          <h2 class="file-size-check">File Size</h2>
          <h2 class="file-storage">Storage Class</h2>
          <h2 class="status-check">Status</h2>
        </div>
       
       <div class="card-content">
         <slot></slot>
       </div>
       
      </div>
    </div>
 

</template>

<style scoped lang="scss">

section{
  display: grid;
  grid-area: main;
  margin: 2.5% 1%;
}

.card{
  background-color: var(--card-bg-color);
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  min-width: 800px;
  margin-right: 4%;
  min-height: 50rem;
  width: 100%;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}


.card-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 1;
  height: 55px;
  border-bottom: 1px solid var(--border-color);
  padding-right: 1rem;
  white-space: nowrap;
  color: var(--font-dark); 
  text-transform: uppercase;   
}
.title-center{
  justify-content: center;
}
.card-header h2{
  color: var(--font-dark); 
  font-size: 1.1em;
  font-weight: 700;
}

.file-location-check{
  max-width: 20%;
}
.file-name-check{
  display:flex;
  justify-content: center;
  max-width: 25%;
}
.file-type-check{
  display:flex;
  justify-content: center;
  max-width: 15%;
}
.file-size-check{
  display:flex;
  justify-content: center;
  width: 15%;
}
.file-storage{
  display:flex;
  justify-content: center;
  width: 20%;
}
.status-check{
  display:flex;
  justify-content: center;
  width: 15%;
}

.remove-select{
  display: flex;
  justify-content: flex-start;
  width: 5%;
}

/* Search bar Styling */

.card-search {
  margin-bottom: .8rem;
}
.search-bar {
  height: 40px;
  display: flex;
  width: 100%;
  padding-left: 16px;
  padding: 0 30px;
  margin-top: 1rem;
  }
   
.search-bar input {
  width: 17rem;
  height: 100%;
  border: none;
  background-color:  #fff;
  border-radius:1.6rem;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  padding: 0 20px 0 40px;
  box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 12px 48%;
  color: #000657; 
  transition: width 0.4s ease-in-out;
}
   
.search-bar input::placeholder {
  font-family: 'Libre Franklin', sans-serif;
  color: var(--inactive-color);
  font-size: 15px;
  font-weight: 500;
}
    
.search-bar input:focus, textarea:focus {      
  outline: none !important;     
  border-color: 1px solid #000657;     
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 65%;
}
/* End of Styling for Search Bar */
// Checkbox Styling

/* Check Mark Styling */
.checkbox-container {
  position: relative;
  margin-bottom: 20px;
  padding: 0px 10px;
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
  
/* End of Checkbox Styling */
</style>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import { defineComponent } from 'vue'

export default defineComponent({
  name: "MainCard",
  props: [
    'search',
    'SearchDisplay',
    'reset'
  ],
  
  data() {
    return {
      term: '',
    }
  },
  
  methods: {
    selectAll() {
      this.$emit('selectAll');
      // Sending event up to Search.vue
    }
   },
  computed: {
    disable(){
      if(this.$route.path === '/search' || this.$route.path === '/s3search'){
        return false
      }
      else {
        return true
      }
    }
  }
})


</script>