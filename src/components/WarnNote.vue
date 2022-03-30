<template>
  <div class="warn-info-note">
    <div class="title"><span class="material-icons icon-color">info</span> <span class="info"><slot name ="title"></slot></span><span class="close-info" @click="closeOut()">Got it!</span></div>
    
    <p class="details"><slot name="details"></slot>
    </p>
    
  </div>
</template>

<script>
export default {
  name: 'WarnNote',
  methods: {
    closeOut() {
      console.log('will close')
      this.$emit('got-it')
    }
  }
}
</script>



<style>
.warn-info-note{
  min-width: 800px;
  width: 85%;
  height: auto;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);
  position: relative;
  margin: 1rem auto;
  padding: 0 .6rem;
  border-left-color: var(--orange);
  border-left: .2rem solid var(--orange);
  border-radius: .1rem;
  font-size: 0.8rem;
  line-height: 1.4;
  color:var(--blue-font-clr);
  position: relative;
}

 .warn-info-note > .title{
  display: flex;
  align-items: center;
  margin: 0 -.6rem;
  padding: .5rem .6rem .5rem .6rem;
  border-bottom: .05rem solid var(--orange);
  border-bottom-color: var(--orange);
  background-color: var(--orange-light);
  font-family: var(--font-header);
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--font-dark);
}

.title::before{
  position: absolute;
  font-size: 1rem;
}
.icon-color{
  color: var(--orange);
  margin-right: 6px;
}

.title > .info {
  width: 80%;
  align-self: flex-start;
  padding-right: 2rem;
}

.title > .close-info{
  margin-left:auto;
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

.warn-info-note p {
  font-family: var(--font-body);
  padding: 0.5rem 1rem 1rem 1rem;
  color: var(--font-dark);
  font-size: 1.05rem;
}

.warn-info-note p:nth-child(2){
  padding-bottom: 0.1rem;
}

.warn-info-note .warn-name-convention{
  position: relative;
  font-weight: bold;
}

span.warn-name-convention::before {
  content: ""; 
  display: inline-block;
  position: absolute;
  left: -0.1px;
  right: -0.1px;
  bottom: -6px;
  height: 30%;
  transform-origin: bottom;
  background-color: var(--orange);
  opacity: 1;
  transform: rotate(-2deg);
  z-index: -1;
}

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

@media (max-width: 1292px){
  .warn-info-note p:nth-child(1){
    line-height: 1.7;
  }
  .warn-info-note{
    margin-left: 1rem;
  }
}

@media (max-width: 400px){
 .warn-info-note{
    margin-left: 1rem;
  }
} 

</style>