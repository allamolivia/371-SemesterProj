import App from "./App.vue";
import { createApp } from "vue";
import "./style.css";
import {getFirestore, Firestore, collection} from "firebase/firestore"

import { initializeApp,FirebaseApp } from "firebase/app";

import { ProCalendar } from "@lbgm/pro-calendar-vue";

const firebaseConfig = {
    apiKey: "AIzaSyAi6n1mbO5_i_FKRGemqO9iwjfuTUIYTis",
    authDomain: "finalprojauth.firebaseapp.com",
    projectId: "finalprojauth",
    storageBucket: "finalprojauth.appspot.com",
    messagingSenderId: "1020363348901",
    appId: "1:1020363348901:web:5ce4d749bb7eaa73a1e64c"
  };

const app = initializeApp(firebaseConfig);

import {createRouter, createWebHashHistory} from "vue-router"

import LoginView from "./views/LoginView.vue"
import SignUpView from "./views/SignUpView.vue"
import HomeView from "./views/HomeView.vue"
import profSchedView from "./views/profSchedView.vue"
import stuSchedView from "./views/stuSchedView.vue" 
import JoinCourseView from "./views/JoinCourseView.vue"
import NewCourseView from "./views/NewCourseView.vue"
import MySchedule from "./views/MySchedule.vue"

const myComponentRoutes = [
    { name: "MyHome", component: HomeView, props: true, path: "/home/:userId" },
    { path: "/", component: LoginView },
    { path: "/signup", component: SignUpView },
    { path: "/profSched", component: profSchedView },
    { path: "/stuSched", component: stuSchedView },    
    { name: "NewCourse", component: NewCourseView, props: true, path: "/newcourse/:userId" },
    { name: "JoinCourse", component: JoinCourseView, props: true, path: "/joincourse/:userId" },
    { name: "MySchedule", component: MySchedule, props: true, path: "/MySchedule/:userId"}
];

const myRouter = createRouter({
    history: createWebHashHistory(),
    routes: myComponentRoutes 
  })

const myApp: FirebaseApp = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(myApp);
createApp(App).use(ProCalendar).use(myRouter).mount("#app");

const users = collection(db, "users")