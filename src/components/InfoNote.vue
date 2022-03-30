<template>
  <div class="info-note">
    <div class="title"><span class="material-icons icon-color">info</span> <span class="info-title"><slot name="title"> </slot></span><span class="close-info" @click="closeOut()">Got it!</span></div>
    <p class="details"> <slot name="details">
      </slot>
    </p>
     
  </div>
</template>

<script>
export default {
  name: 'InfoNote',
  methods: {
    closeOut() {
      console.log('will close')
      this.$emit('got-it')
    }
  }
}
</script>



<style scoped>
.info-note{
  min-width: 650px;
  width: 80%;
  height: auto;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);
  position: relative;
  margin: 1rem auto;
  padding: 0 .6rem;
  border-left-color: var(--blue-med);
  border-left: .2rem solid var(--blue-med);
  border-radius: .1rem;
  font-size: 0.9rem;
  line-height: 1.4;
  color:var(--blue-font-clr);
  position: relative;
}

 .info-note > .title{
  display: flex;
  align-items: center;
  margin: 0 -.6rem;
  padding: .5rem .6rem .5rem .6rem;
  border-bottom: .05rem solid var(--blue-dark);
  border-bottom-color: var(--blue-dark);
  background-color: var(--light-gray);
  font-family: var(--font-header);
  font-weight: 700;
  font-size: 1.35rem;
  color: var(--font-dark);
}

.title::before{
  position: absolute;
  font-size: 1rem;
}
.icon-color{
  color: var(--blue-med);
  margin-right: 6px;
}

.title > .info-title {
  width: 80%;
  align-self: flex-start;
  padding-right: 2rem;
}

.title > .close-info{
  margin-left: auto;
  padding-right: 0.5rem;
  color:  var(--orange-dark);
  font-style: italic;
  cursor: pointer;
  transition: color 200ms ease-in, transform 200ms ease-in-out;
}

.title > .close-info:hover {
  color: var(--orange-darker);
  transform: scale(1.1);
}

.info-note p {
  font-family: var(--font-body);
  padding: 1rem 1rem;
  color: var(--font-dark);
  font-size: 1.1rem;
}

/* .info-note p:nth-child(2){
  padding-bottom: 0.1rem;
} */


.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}



</style>