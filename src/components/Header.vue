<template>
    <header id="header">
      <div class="container" id="headerContainer">
          <div class="header-login">
             <img class="profile-img" src="https://images.unsplash.com/photo-1488229297570-58520851e868?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGNvZGV8ZW58MHx8MHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=900&amp;q=60" alt="">
             <!-- <div class="login-title" id="userLogin">{{ user.username }}</div> -->
            </div>
     </div>
    </header>
</template>

<style scoped lang="scss">

#header {
  grid-area: header;
  height: 13rem;
  width: 100%;
  max-width: 1800px;
  min-width: 700px;
  color: var(--header-font-color);
  margin-bottom: 0.5rem;
  background-color: var(--header-background-color);
  box-shadow: 0 4px 30px rgb(0 0 0 / 50%);
  border-bottom-right-radius: 1rem;
}

#headerContainer {
  display: flex;
  height: 100%;
  width: 100%;
  min-width: 700px;
  align-items: center;
  justify-content: space-between;
  position: relative;
 
}

.header-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 1.5rem;
  padding: 0 16px 0 40px;
  cursor: pointer;
}

.profile-img {
    border: 2px solid var(--header-login-border-color);
    width: 5rem;
    height: 5rem;
    margin-top: 10%;
    margin-bottom: 10%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: rgb(0 0 0 / 50%) 0px 3px 20px;
}
.profile-img:hover{
    border: 2px solid #f9fafb;
}

.login-title{
    font-family: var(--font-body);
}

@media (min-width: 1800px) {
  #header{
     border-bottom-right-radius: 1rem;
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {Amplify,Auth,Storage} from 'aws-amplify';
import config from '../amplify-config';

Amplify.configure(config);

Auth.currentAuthenticatedUser({bypassCache: false})
  .then(user => {
    console.log(user);
    console.log(user.username);
    Auth.currentCredentials().then(data=>{
      console.log(data);
    })
    // Auth.currentCredentials().then(data=>{ 
    //   AWS.config.credentials = data;})
    // // Auth.currentCredentials().then(data=>{
    // //   console.log(data);
    // //   return data;
    // // });
  })
  .catch(err => {
    console.log(err);
    Auth.federatedSignIn();
  }
);

@Options({
  props: {
    user: String
  }
})

export default class Header extends Vue {

  user!: string
  
}
</script>