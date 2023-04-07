<script setup lang="ts">
</script>

<template>
  <div>
    <div id="routing">
      <button id="loginbutton"><RouterLink to="/login">Login</RouterLink></button>
      <button id="signupbutton"><RouterLink to="/signup">Sign Up</RouterLink></button>
    </div>
    <h1>Website Name TBD </h1>
    <router-view></router-view>
  </div>
</template>

<style scoped>

html,
      body {
        margin: 0;
        padding: 0;
      }

    body {
        height: 100vh;
        width: 100vw;
      }

    template {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}


#loginbutton {
    width: 150px;
  }
  #signupbutton {
    width: 150px;
    margin-left: 10px;
  }
  
</style>
