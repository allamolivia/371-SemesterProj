<script setup lang="ts">
    import { ref, onMounted, Ref } from "vue"
    import { getAuth, Auth } from "firebase/auth"
    import { updateDoc, arrayRemove, where, query, arrayUnion, deleteDoc, CollectionReference, collection, getDocs, QuerySnapshot, QueryDocumentSnapshot, DocumentReference, getDoc, DocumentSnapshot, doc, Firestore, getFirestore } from "firebase/firestore";
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

    const myStateColl:CollectionReference = collection(db, "courses");
    getDocs(myStateColl).then(
        (qs: QuerySnapshot) => {
            qs.forEach((qd:QueryDocumentSnapshot) => {
                const courseData = qd.data() as CourseType
                courseData.code = qd.id
            })
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

    function deleteCourse(courseCode: CourseType) {

        const course: DocumentReference = doc(db, `courses/${courseCode}`)
        const user: DocumentReference = doc(db, `users/${props.userId}`)

        updateDoc(course, {
            studentIds: arrayRemove(props.userId)
        })
        .then(() => { console.debug("Update successful");})
        updateDoc(user, {
            courses: arrayRemove(courseCode)
        })
        .then(() => { console.debug("Update successful");})
    }

</script>

<template>
    <h2 :key="u_fname">Welcome, {{ u_fname }}!</h2>
    <div><button class="coursebutton" @click="logOut()"><RouterLink to="/">Sign Out</RouterLink></button></div>
    <button class="coursebutton" v-if="role == 'Instructor'" @click="goToNewCourse">+ New Course</button>
    <button class="coursebutton" v-else-if="role == 'Student'" @click="goToJoinCourse">Join Course</button>
    <button class="coursebutton" @click="goToMySchedule">My Schedule</button>
    <div class="parent">
        <div class="div1">
            <p>
                <!-- <button class="coursebutton" v-if="role == 'Instructor'" @click="goToNewCourse">+ New Course</button>
                <button class="coursebutton" v-else-if="role == 'Student'" @click="goToJoinCourse">Join Course</button>
                <button class="coursebutton" @click="goToMySchedule">My Schedule</button> -->
            </p>
            <table style="margin-top: 20px;" class="courseTable">
                <th class="courseTable">My Courses:</th>
                <tr class="courseTable" v-for="(i, pos) in allCourse" :key="pos"><p id="courseList">{{ i }}</p></tr>
            </table>
            
        </div>
        <div class="div2">
            <table style="margin-top: 20px;" class="courseTable">
            <th class="courseTable">Delete Courses:</th>
                <tr class="courseTable" v-for="(c,arrIdx) in allCourse" v-bind:key="arrIdx">
                    <button id="deletecoursebutton">{{ c }}</button>
                </tr>
            </table>
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
        margin-right: 12%;
        margin-left: 8%;
    }

    template {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }

    .div1 { 
        grid-area: 1 / 1 / 6 / 3;
        background-color: gray;
        border-color: black;
        height: 100%;
        width: 500px;
    }
    .div2 { grid-area: 1 / 3 / 6 / 6;
        background-color: gray;
        border-color: black; 
        height: 100%;
        width: 500px;
    }

    /* .coursebutton {
        float: right;
        margin-right: 20px;
        border-color: white;
        margin-left: auto;
        margin-right: auto;
        padding: 5px;
        margin-left: 40px;
        margin-right: 60px;
        margin-top: 20px;
    } */

    /* .signoutbutton {
        margin-left: 10px;
        border-color: black;
        padding-right: 5px;
        padding-left: 5px;
    } */

    .courseTable {
        text-align: center;
        border: 2px solid black;
        border-color: black;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        padding: 5px;
        color: black;
        width: 250px;
        height: auto;
        background-color: rgba(255, 255, 255, 0.87);
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        color: black;
    }

    #courseList {
        width: 100%;
        padding: 0.6em 1.2em;
        color: black;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
    }
    

    #deletecoursebutton {
        width: 100%;
        padding: 0.6em 1.2em;
        color: black;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer; 
    }

    #deletecoursebutton:hover {
        color: #535bf2;
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

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

h2 {
  font-size: 2em;
  line-height: 0.8;
  font-family: inherit;
}

.coursebutton {
  border-radius: 8px;
  border: 2px solid black;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
  margin-top: 20px;
  margin-left: 3px;
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