<script setup lang="ts">
    import { ref, onMounted, Ref } from "vue"
    import { getAuth, Auth } from "firebase/auth"
    import { CollectionReference, collection, getDocs, QuerySnapshot, QueryDocumentSnapshot, DocumentReference, getDoc, DocumentSnapshot, doc, Firestore, getFirestore } from "firebase/firestore";
    import {useRouter} from "vue-router"
    import { UserType, CourseType } from "./DataTypes.vue";

    var auth: Auth | null = null
    var role = ("")

    const appNav = useRouter()
    const db:Firestore = getFirestore();
    const course_name = ref("")
    const course_code  = ref("")
    const u_fname = ref("")
    const allCourse: Ref<String[]> = ref([]);
    const myColl:CollectionReference = collection(db, "courses")
    

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

    function goToJoinCourse() {
        appNav.push({ name: "JoinCourse",
        params: { userId: props.userId }
        })
    }

    function logOut() {
        auth!.signOut();
    }

    function goToMySchedule() {
        appNav.push({ name: "MySchedule",
        params: { userId: props.userId }
    })
    }

    getDoc(myDoc).then(
        (qd:DocumentSnapshot) => {
            if (qd.exists()) {
                const userData = qd.data() as UserType
                userData.courses.forEach(element => allCourse.value.push(element))
            }
        })

</script>

<template>
    <div><h3 :key="u_fname">Welcome, {{ u_fname }}!<button class="signoutbutton" @click="logOut()"><RouterLink to="/">Sign Out</RouterLink></button></h3></div>
    <div class="parent">
        <div class="div1">
            <p>
                <button class="coursebutton" v-if="role == 'Instructor'" @click="goToNewCourse">+ New Course</button>
                <button class="coursebutton" v-else-if="role == 'Student'" @click="goToJoinCourse">Join Course</button>
                <button class="coursebutton" @click="goToMySchedule">My Schedule</button>
            </p>
            <table class="courseTable">
                <th class="courseTable">My Courses:</th>
                <tr class="courseTable" v-for="(i, pos) in allCourse" :key="pos">{{ i }}</tr>
            </table>

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
        color: white;
    }
    .div2 { grid-area: 1 / 3 / 6 / 6;
        background-color: #3b3b3b;
        border-color: black; 
        height: 100%;
        width: 100%;
    }

    .coursebutton {
        float: right;
        margin-right: 20px;
        border-color: white;
        margin-left: auto;
        margin-right: auto;
        padding: 5px;
        margin-left: 40px;
        margin-right: 60px;
        margin-top: 20px;
    }

    .signoutbutton {
        margin-left: 10px;
        border-color: black;
        padding-right: 5px;
        padding-left: 5px;
    }

    .courseTable {
        text-align: center;
        border: 1px solid white;
        border-color: white;
        margin-left: auto;
        margin-right: auto;
        margin-top: 80px;
        padding: 5px;
    }

</style>