<template>
  <div class="file-info-note">
    <div class="title"><span class="material-icons icon-color">info</span> Check File Names Before Encoding</div>
    
    <p class="details">Before you choose video files to encode through AWS, please make sure all file name conventions are correct (see example below) in order for encoded videos to transfer into the correct COURSES folder after completion.
      </p>
      <p>
    Correct file name: <span class="file-name-convention">COMM428D_Sampling.mp4</span>,  which will transfer to COURSES/COMM/COMM428D folder.</p>
  </div>
</template>

<style>
.file-info-note{
  min-width: 400px;
  width: 80%;
  height: auto;
  border-left-color: var(--orange);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);
  position: relative;
  margin: 1rem auto;
  padding: 0 .6rem;
  border-left: .2rem solid #fcbf49;
  border-radius: .1rem;
  font-size: 0.9rem;
  line-height: 1.4;
  color:var(--blue-font-clr);
  position: relative;
}

 .file-info-note > .title{
  display: flex;
  align-items: center;
  margin: 0 -.6rem;
  padding: .5rem .6rem .5rem .6rem;
  border-bottom: .05rem solid var(--orange);
  border-bottom-color: var(--orange);
  background-color: rgba(252,191,73,.3);
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
  color: #ff9900;
  margin-right: 6px;
}

.file-info-note p {
  font-family: var(--font-body);
  padding: 1rem 1rem;
  color: var(--font-dark);
  font-size: 1.1rem;
}

.file-info-note p:nth-child(2){
  padding-bottom: 0.1rem;
}

.file-info-note .file-name-convention{
  position: relative;
  font-weight: bold;

}

span.file-name-convention::before {
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
</style>