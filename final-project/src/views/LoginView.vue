<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import {
    getAuth,
    Auth,
    UserCredential,
    signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup
  } from "firebase/auth"
  import {useRouter} from "vue-router"

    const u_email = ref("")
    const u_pass = ref("")
    const message = ref(" ")
    const appNav = useRouter()
    var auth: Auth | null = null

    function isValidInput(): boolean {
        return u_email.value.length > 0 && u_pass.value.length > 0
    }

    onMounted(() => {
      auth = getAuth();
    })

    function withEmail(): void {
    signInWithEmailAndPassword(auth!, u_email.value, u_pass.value)
      .then(async (cr: UserCredential) => {
        console.log("login successfull.")
        message.value=("login successful!")

        appNav.push({ name: "MyHome",
        params: { userId: cr.user.uid }
        })
    
      })
      .catch((err: any) => {

        if (err == "FirebaseError: Firebase: Error (auth/invalid-email).") {
          message.value="Incorrect username or password"
        } else {
          message.value=(`Unable to login. ${err}`)
        }
      });
    
  }
  
  const auth1 = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth1, provider)
    .then((cred:UserCredential) => {
      console.log("Signed in as", cred.user?.email);

      appNav.push({ name: "MyHome",
        params: { userId: cred.user.uid }
        })
    })
    .catch((err: any) => {
      console.error("Oops", err);
    });
  </script>

<template>
  <div id="outerdiv">
    <h2>Sign In</h2>
    <div id="signupbox">
      <p class="inputdiv">
        <input style="margin-top: 30px;" class="textInput" v-model="u_email" type="text"
        placeholder="Enter your email">
      </p>
      <p class="inputdiv">
        <input class="textInput" type="password" v-model="u_pass"
          placeholder="Enter your password">
      </p>
    </div>
    <div id="SignUp" class="buttonStyle">
      <button :disabled="!isValidInput"
        @click="withEmail(); signInWithPopup(auth1, provider)">Log in</button>
        <p>Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink></p>
    <p>{{ message }}</p>
    </div>
</div>
</template>

<style scoped>
  #outerdiv {
    vertical-align:top;
  }

  #signupbox {
    margin-bottom:50px;
  }

  .inputdiv {
    margin-top: 15px;
  }

  .textInput {
    padding: 3px;
    border: 5px;
    border-radius: 0px;
    border: 1px solid black;
  }

  .parent {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 3px;
        grid-row-gap: 3px;

        height: 500px;
        width: 1200px;
        padding: 10px;
    }

    template {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }

    :root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

button:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  /*place-items: center;*/
  min-width: 320px;
  min-height: 100vh;
}

h2 {
  font-size: 2em;
  line-height: 0.8;
  font-family: inherit;
  margin-top: 20px;
}

button {
  border-radius: 8px;
  border: 2px solid black;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
  margin-left: 5px;
  margin-bottom: 10px;
  margin-right: 5px;
  width: 100px;
}

button:hover {
  border: 2px solid black;
  border-radius: 0px;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

</style>