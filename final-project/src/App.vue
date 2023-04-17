<script setup lang="ts">

  import { getFirestore, Firestore } from '@firebase/firestore';

  const db:Firestore = getFirestore();

</script>

<template>
  <div>
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
    width: 120px;
  }
  #signupbutton {
    width: 120px;
    margin-left: 10px;
  }
  #profschedbutton {
    width: 120px;
    margin-left: 10px;
  }
  #homebutton {
    width: 120px;
    margin-left: 10px;
  }
  #stuschedbutton {
    width: 120px;
    margin-left: 10px;
    margin-top: 10px;
  }
  
</style>
