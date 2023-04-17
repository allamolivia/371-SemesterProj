<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import { getAuth, Auth } from "firebase/auth"
    import {  DocumentReference, setDoc, doc, Firestore, getFirestore } from "firebase/firestore";
    import {useRouter} from "vue-router"

    var auth: Auth | null = null
    // var my_uid: string = ""

    const appNav = useRouter()
    const db:Firestore = getFirestore();
    const course_name = ref("")
    const course_code  = ref("")

    type HomeViewDetailType = {
        userId: string;
    }

    const props = defineProps<HomeViewDetailType>()

    onMounted(() => {
        auth = getAuth();
       /*auth!.onAuthStateChanged(user => {
            if (user) { my_uid = user.uid; }
        }) */
    })

    function goToNewCourse() {
        appNav.push({ name: "NewCourse",
        params: { userId: props.userId }
        })
    }

    function logOut() {
        auth!.signOut();
        appNav.back()
    }

</script>

<template>
    <div><p>Signed in as: <button @click="logOut">Sign Out</button></p></div>
    <div class="parent">
        <div class="div1">
            <p>My Courses</p>
        </div>
        <div class="div2">
        </div>
        <div class="div3">
            <button @click="goToNewCourse">+ New Course</button>
        </div>
    </div>
</template>

<style scoped>
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

    .div1 { 
        grid-area: 2 / 1 / 6 / 3; 
        background-color: #3b3b3b;
        border-color: black;
        height: 100%;
        width: 100%;
    }
    .div2 { grid-area: 2 / 3 / 6 / 6;
        background-color: #3b3b3b;
        border-color: black; 
        height: 100%;
        width: 100%;
    }
    .div3 { grid-area: 1 / 1 / 2 / 6; 
        background-color: #3b3b3b;
        border-color: black;
        height: 100%;
        width: 100%;
        text-align: center;
    }

    button {
        padding: 20px;
    }

</style>