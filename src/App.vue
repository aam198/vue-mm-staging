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
$font-header: 'Archivo Narrow', sans-serif;
$font-body: 'Libre Franklin', sans-serif;
$font-small: 'Noto Sans', sans-serif;
$card-bg-color:rgba( 48 72 106 / 20%);
$border-color: rgba(113 119 144 / 25%);
$orange: #ff9900;
$white: #F6F7F9;
$clr-white: #ffffff; 
$gray: rgba( 48 72 106 / 20%);
$dark-gray: #92b0b3;
$red-clr: #c35353;


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
  --font-header: #{$font-header};
  --font-body: #{$font-body};
  --font-small: #{$font-small};
  --card-bg-color: #{$card-bg-color};
  --border-color: #{$border-color};
  --blue-dark: #{$blue-dark};
  --orange: #{$orange};
  --blue-med: #{$blue-med};
  --navy: #{$blue-med};
  --white: #{$white};
  --clr-white: #{$clr-white};
  --gray: #{$gray};
  --dark-gray: #{$dark-gray};
  --red-clr: #{$red-clr};
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
  max-width: 1755px;
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

.continue-container{
  display: flex;
  justify-content: flex-end;
  gap:10px;
  margin: 1rem 0px;
  width: 100%;
  max-width: 1400px;
  min-width: 700px;
}

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
  font-weight: 700;
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
.card-content{
  font-family: var(--font-body);
  padding: 0 1.5rem 0 0.7rem;
  margin: 1rem 0px;
  display: flex;
  flex-direction: column;
}

.btn{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 14rem;
  height: 2.5rem;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  margin-right: 0px;
  background: rgba(45 68 105 / 100%);
  color: var(--font-clr);
  font-family: var(--font-body);
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
  }

.btn:hover
{
  background-color: var(--blue-dark);
  transform: translate3d(0px,-1px,0px);
  box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
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
