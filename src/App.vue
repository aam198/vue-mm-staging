<template>
  <div id="container_grid">
  <Header/>
  <Navigation/>
  <router-view/>
  </div>
</template>

<style lang="scss">
$blue-med: rgba(45 68 105 / 100%);
$blue-dark:#1c2c62;
$header-font-color: #F6F7F9;
$header-login-border-color: rgba(249 250 251 /80%);
$nav-font-color: #F6F7F9;
$font-clr: #F6F7F9;
$font-dark: #000657;
$card-bg-color:rgba( 48 72 106 / 20%);
$border-color: rgba(113 119 144 / 25%);
$orange: #ff9900;
$white: #F6F7F9;
$gray: rgba( 48 72 106 / 20%);
$dark-gray: #92b0b3;

@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');


:root {
  --header-background-color: #{$blue-med};
  --header-font-color: #{$header-font-color};
  --header-login-border-color: #{$header-login-border-color};
  --nav-font-color: #{$nav-font-color};
  --font-clr: #{$font-clr};
  --font-dark: #{$font-dark};
  --card-bg-color: #{$card-bg-color};
  --border-color: #{$border-color};
  --blue-dark: #{$blue-dark};
  --orange: #{$orange};
  --navy: #{$blue-med};
  --white: #{$white};
  --gray: #{$gray};
  --dark-gray: #{$dark-gray};
}

* {
	vertical-align: baseline;
	font-weight: inherit;
	font-family: inherit;
	font-style: inherit;
	font-size: 100%;
	border: 0 none;
	outline: 0;
	padding: 0;
	margin: 0;
}


html{
    scrollbar-color: #666 #201c29; 
    font-size: 100%;
}

body {
  width: 100%;
  height: 100vh;
  margin: 0;
  background-color: #f8f9fa;
  font-weight: 400;
  line-height: 1.2;
}


header {
  display: block;
}

.flex-center{
  display: flex;
  align-items: center;
  justify-content: center;
}

h1,h2,h3,h4,h5{
   color: var(--font-clr);
   font-family: 'Archivo Narrow', sans-serif;
}

h1{font-size: 5rem;}
h2{font-size: 2rem;}
h3{font-size: 1.953rem;}
h4{font-size: 1.563rem;}
h5{font-size: 1.25rem;}

.active {
  font-weight: 600;
  color: #000657;
  background: var(--orange);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#container_grid {
  display: grid;
  grid-template-columns: auto 2fr;
  //grid-template-rows: 0.1fr 1fr;
  grid-template-areas: "header header" "nav main";
}

@media (max-width: 860px){
    .container_grid{
        display:grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 0.1fr 1fr;
        grid-template-areas:
        "header header"
        "nav main";
    }

    h1{
        font-size: 3em;
    }
    h2 {
        font-size: 1.6em;
    }
    aside{
        width: 14rem;
    }
    aside a{
        font-size: 1.1em;
    }
}


</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue'; // @ is an alias to /src
import Navigation from '@/components/Navigation.vue';



@Options({
  components: {
    Header,
    Navigation
  },
  mounted: () => { document.title = "Multimedia Services";}
})
export default class App extends Vue {}
</script>
