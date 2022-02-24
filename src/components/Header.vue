<template>
    <header id="header">
      <div class="container" id="headerContainer">
          <div class="header-login">
             <img class="profile-img" src="https://images.unsplash.com/photo-1488229297570-58520851e868?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGNvZGV8ZW58MHx8MHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=900&amp;q=60" alt="">
             <div class="login-title" id="userLogin">User</div>
            </div>
     </div>
    </header>
</template>

<style scoped lang="scss">

#header {
    grid-area: header;
    height: 13rem;
    width: 100%;
    min-width: 700px;
    color: var(--header-font-color);
    margin-bottom: 0.5rem;
    background-color: var(--header-background-color);
    box-shadow: 0 4px 30px rgb(0 0 0 / 50%);
}

#headerContainer {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}

.header-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 20px;
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
</style>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class Header extends Vue {}
</script>