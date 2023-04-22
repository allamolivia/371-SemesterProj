<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import {
    getAuth,
    Auth,
    UserCredential,
    createUserWithEmailAndPassword,
  } from "firebase/auth"
  import {  DocumentReference, setDoc, doc, Firestore, getFirestore } from "firebase/firestore";
  import {useRouter} from "vue-router"

  const appNav = useRouter()
  const u_email = ref("")
  const u_pass = ref("")
  const u_fname = ref("")
  const u_lname = ref("")
  const u_role = ref("")
  const courses: string[] = [];
    
    var auth: Auth | null = null
    const db:Firestore = getFirestore();

    function isValidInput(): boolean {
        return u_email.value.length > 0 && u_pass.value.length > 0
    }
    
    onMounted(() => {
      auth = getAuth();
    })

    function createAccount(): void {
      createUserWithEmailAndPassword(auth!, u_email.value, u_pass.value)
        .then(async (cr: UserCredential) => {
          console.log("New account created with UID", cr.user?.email);
          const doc1: DocumentReference = doc(db, `users/${cr.user.uid}`);
          setDoc(doc1, {fname: u_fname.value, lname: u_lname.value, role: u_role.value, courses: courses })
            .then(() => {
              console.log("New doc added");
             })
          appNav.replace({ name: "MyHome",
            params: { userId: cr.user.uid }
          })
          .catch((err:any) => { /* your code here */ });
          })
          .catch((err: any) => {
            console.log(`Unable to create account ${err}`); 
          })
          .catch((err: any) => {
            console.error("Oops", err);
          });
    }


  
  </script>

<template>
  <div id="outerdiv">
    <h2>Create Account</h2>
    <div id="signupbox">
      <div class="inputdiv">
        <input class="textInput" v-model="u_email" type="text"
        placeholder="Enter your email">
      </div>
      <div class="inputdiv">
        <input class="textInput" type="password" v-model="u_pass"
          placeholder="Enter your password">
      </div>
      <div class="fnamediv">
          <input class="textInput" v-model="u_fname" type="text"
          placeholder="First Name">
      </div>
      <div class="lnamediv">
          <input class="textInput" v-model="u_lname" type="text"
          placeholder="Last Name">
      </div>
      <div class="radiodiv">
        <p style="font-weight: bold;">Select your role: </p>
        <input type="radio" v-model="u_role" id="student" name="user_role" value="Student">
        <label for="student">Student</label><br>
        <input type="radio" v-model="u_role" id="instructor" name="user_role" value="Instructor">
        <label for="instructor">Instructor</label><br>
      </div>
    </div>
    <div id="SignUp">
      <button :disabled="!isValidInput"
        @click="createAccount">Sign up</button>
    </div>
    <p>Already have an account? <RouterLink to="/">Log In</RouterLink></p>
</div>
</template>

<style scoped>
  #outerdiv {
    vertical-align:top;
  }

  #signupbox {
    margin-bottom:20px;
  }

  div {
    margin-top: 15px;
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


.textInput {
    padding: 3px;
    border: 5px;
    border-radius: 0px;
    border: 1px solid black;
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
