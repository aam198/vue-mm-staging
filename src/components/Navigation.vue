<template>
    <nav id="nav">
        <aside id="sidenav-open">
          <h2><i class="fab fa-aws" aria-hidden="true"></i> MM Services </h2>
          
           
          <router-link to="/"><i class="fab fa-buffer" aria-hidden="true"></i>Available Files</router-link> 
          <router-link to="/encode"><i class="fa fa-upload" aria-hidden="true"></i>Encode Video Files</router-link>
          <router-link to="/s3"><i class="fas fa-photo-video" aria-hidden="true"></i>S3 Bucket</router-link>
           <router-link to="/upload"><i class="fas fa-archive" aria-hidden="true"></i>Upload to Archive</router-link>
          <router-link to="/search"><i class="fas fa-search" aria-hidden="true"></i>Search Archive</router-link>
         
      </aside>
    </nav>
</template>

<style scoped lang="scss">
#nav {
  grid-area: nav;
}

nav {
    display: inline-flex;
}

aside h2 {
    margin: 0;
    padding: 30px 0;
    color: var(--font-clr);
    font-family: 'Archivo Narrow', sans-serif;
}

aside {
  color: var(--nav-font-color);
  margin-top: .4rem;
  min-height: 60rem;
  max-height: 860px;
  width: 17rem;
  padding-left: 15px;
  height: 47rem;
  background-image: linear-gradient(20deg , #000657, #30486a);
  border-top-right-radius: 80px;
  border-bottom-right-radius: 80px;
  box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.2);
}

aside a {
  font-weight:600;
  font-size: 1.2em;
  font-family: 'Libre Franklin', sans-serif;
  color: #fff;
  display: block;
  margin-bottom: 15px;
  padding: 12px;
  padding-left: 10px;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

aside a i, aside i {
  margin-right: 5px;
}

aside a:hover, aside a:active, .router-link-active, .router-link-exact-active{
  font-weight: 600;
  color: #000657;
  background: var(--orange);
  outline: none;
  position: relative;
  cursor: pointer;
  background-color: #ffa500;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

aside a:hover::after {
  content: "";
  position: absolute;
  background-color: transparent;
  bottom: 100%;
  right: 0;
  height: 35px;
  width: 35px;
  border-bottom-right-radius: 18px;
  box-shadow: 0 20px 0 0 #ffa500;
}

aside a:hover::before {
  content: "";
  position: absolute;
  background-color: transparent;
  top: 100%;
  right: 0;
  height: 35px;
  width: 30px;
  border-top-right-radius: 18px;
  box-shadow: 0 -20px 0 0 #ffa500;
}

aside .description{
  font-family: 'Noto Sans', sans-serif;
  font-size: 0.9em;
  margin: 0;
  padding: 1.5rem 1rem;
}

.description p{
  padding-bottom: 1rem;
  line-height: 1.5;
}

</style>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Navigation extends Vue {}
</script>