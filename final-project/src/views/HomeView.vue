<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import { getAuth, Auth } from "firebase/auth"
    import {  DocumentReference, getDoc, DocumentSnapshot, doc, Firestore, getFirestore } from "firebase/firestore";
    import {useRouter} from "vue-router"
    import { UserType } from "./DataTypes.vue";

    var auth: Auth | null = null
    var role = ("")

    const appNav = useRouter()
    const db:Firestore = getFirestore();
    const course_name = ref("")
    const course_code  = ref("")
    const u_fname = ref("")
    

    type HomeViewDetailType = {
        userId: string;
    }

    const props = defineProps<HomeViewDetailType>()

    const myDoc:DocumentReference = doc(db, `users/${props.userId}`);

    getDoc(myDoc).then(
        (qd:DocumentSnapshot) => {
            if (qd.exists()) {
                const userData = qd.data() as UserType
                u_fname.value = userData.fname;
                role = userData.role;
            }
        })

    onMounted(() => {
        auth = getAuth();
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
    <div><h3 :key="u_fname">Welcome, {{ u_fname }}!<button class="signoutbutton" @click="logOut">Sign Out</button></h3></div>
    <div class="parent">
        <div class="div1">
            <p>My Courses 
                <button v-if="role == 'Instructor'" @click="goToNewCourse">+ New Course</button>
                <button v-else-if="role == 'Student'" @click="goToNewCourse">Join Course</button>
            </p>
        </div>
        <div class="div2">
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
        grid-area: 1 / 1 / 6 / 3;
        background-color: #3b3b3b;
        border-color: black;
        height: 100%;
        width: 100%;
    }
    .div2 { grid-area: 1 / 3 / 6 / 6;
        background-color: #3b3b3b;
        border-color: black; 
        height: 100%;
        width: 100%;
    }

    button {
        float: right;
        margin-right: 20px;
    }

    .signoutbutton {
        margin-left: 10px;
    }

</style>