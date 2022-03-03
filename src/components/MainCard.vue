<template>
  <section>
    <div class="main-area">
      <div class="card">
        <div class="card-header">
                
          <label class="checkbox-container">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>

          <h2 class="file-location-check">File Location</h2>
          <h2 class="file-name-check">File Name </h2>
          <h2 class="file-type-check">File Type</h2>
          <h2 class="file-size-check">File Size</h2>
          <h2 class="status-check">Status</h2>
        </div>

        <div class="card-content">
      
        </div>
      </div>
    </div>
  </section>

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
  min-width: 700px;
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
  flex-shrink: 0;
  height: 55px;
  border-bottom: 1px solid var(--border-color);
  padding: 0 20px;
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
}


.file-location-check{
  display:flex;
  justify-content: center;
  width: 25%;
}
.file-name-check{
  display:flex;
  justify-content: center;
  width: 40%;
}
.file-type-check{
  display:flex;
  justify-content: center;
  width: 15%;
}
.file-size-check{
  display:flex;
  justify-content: center;
  width: 15%;
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

</style>

<script lang="ts">
import {Vue} from 'vue-class-component';


export default class MainCard extends Vue {}
</script>