import Vue from "vue";
import App from "./App.vue";
import { createApp } from "vue";
import "./style.css";
import {getFirestore, Firestore, collection} from "firebase/firestore"
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp,FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAi6n1mbO5_i_FKRGemqO9iwjfuTUIYTis",
    authDomain: "finalprojauth.firebaseapp.com",
    projectId: "finalprojauth",
    storageBucket: "finalprojauth.appspot.com",
    messagingSenderId: "1020363348901",
    appId: "1:1020363348901:web:5ce4d749bb7eaa73a1e64c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {createRouter, createWebHashHistory} from "vue-router"
// import HelloWordle from "./views/HelloWordle.vue"
// import LoginView from "./views/LoginView.vue"
// import SignUpView from "./views/SignUpView.vue"
// import StatsView from "./views/StatsView.vue"

const myComponentRoutes = [
    { path: "/", component: HomeView },
    { path: "/login", component: LoginView },
    // { path: "/signup", component: SignUpView },
    // { path: "/stats", component: StatsView }
];

const myRouter = createRouter({
    history: createWebHashHistory(),
    routes: myComponentRoutes 
  })

const myApp: FirebaseApp = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(myApp);
createApp(App).use(myRouter).mount("#app");

const users = collection(db, "users")