<template>
    <div id ="myModal" class="modal">
      <transition name="pop" appear>
      <div class="modal-box">
        <h2><strong>Confirmation: Upload to {{text}} </strong></h2>
        <span class="close"><i class="fas fa-times" @click="closeClick()"></i></span>
        <div class="content">
         <slot></slot>
        </div>
        <div class="navigation">
            <button @click="onClick()" class="btn-sm" id="upload-encode">Yes, Please!</button>
          <button @click="closeClick()" class="btn-sm remove-btn" id="backBtn">No, Take me back</button>
        </div>    
      </div>
  </transition>
    </div>
</template>


<script>
  export default{
    name: 'Modal',
    props: {
      text: String
    },
    methods: {
      onClick() {
        console.log('click')
        // Sending up click event
        this.$emit('btn-click')
      },
      closeClick() {
        console.log('close')
        this.$emit('close-click')
      }
    }
  }
</script>

<style>

/* Drag and Drop Area Modal Styles */
.modal{
  display: flex;
  /* display: none; Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  padding-top: 2rem; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
}

.modal-box {
  margin: auto;
  padding: 30px;
  background: var(--clr-white);
  border-radius: 1rem;
  width: 45%;
  min-width: 450px;
  position: relative;
  z-index: 10;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
}

.modal-box h2 {
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 1.6rem;
  text-align: center;
}

.modal-box .close{
  color: rgba(45 68 105 / 100%);
  position: absolute;
  top: 10px;
  right: 20px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
}

.modal-box .close:hover {
  color: var(--orange);
  cursor: pointer;
}

.modal-box .content {
  overflow: auto;
  padding: 30px 30px;
  text-align: center;
  font-size: 1.2rem;
  font-family:var(--font-body);
  line-height: 1.6;
}

.modal-box .navigation{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

}  
.modal-box .btn-sm {
  display: flex;
  flex-direction: row;
  padding: 16px 45px;
  border: none;
  border-radius: 5px;
  background: rgba(45 68 105 / 100%);
  color: #F6F7F9;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.25s ease, background-color 0.4s ease;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
}
.modal-box .btn-sm:hover{
  background-color:#1c2c62;
  transform: translate3d(0px,-1px,0px);
  box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
}

.modal-box .btn-sm:focus {
  outline: 2px dashed var(--orange);
}
.modal-box .btn-sm:active{
  background-color: var(--orange);
}

.modal-box .remove-btn {
  background-color: var(--red-clr);
}

.modal-box .remove-btn:hover{
  background-color: #de3838;
}

@media screen and (max-width: 700px){
  .modal-box{
    width: 100%;
}
}

</style>