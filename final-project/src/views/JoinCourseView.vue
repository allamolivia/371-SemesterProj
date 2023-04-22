<script setup lang="ts">
    import { ref, Ref, onMounted } from "vue"
    import {  DocumentReference, getDocs, doc, Firestore, getFirestore, 
            QuerySnapshot, QueryDocumentSnapshot, CollectionReference, collection, updateDoc, arrayUnion } 
            from "firebase/firestore";
    import { CourseType } from "./DataTypes.vue";
    import {useRouter} from "vue-router"


    const db:Firestore = getFirestore();
    const allCourses: Ref<CourseType[]> = ref([]);
    const appNav = useRouter()

    type JoinCourseDetailType = {
        userId: string;
    }

    const props = defineProps<JoinCourseDetailType>()

    const myStateColl:CollectionReference = collection(db, "courses");
    getDocs(myStateColl).then(
        (qs: QuerySnapshot) => {
            qs.forEach((qd:QueryDocumentSnapshot) => {
                const courseData = qd.data() as CourseType
                courseData.code = qd.id
                allCourses.value.push(courseData)
            })
    })

    function joinCourse(courseCode: string) {

        const course: DocumentReference = doc(db, `courses/${courseCode}`)
        const user: DocumentReference = doc(db, `users/${props.userId}`)

        updateDoc(course, {
            studentIds: arrayUnion(props.userId)
        })
        .then(() => { console.debug("Update successful");})
        updateDoc(user, {
            courses: arrayUnion(courseCode)
        })
        .then(() => { console.debug("Update successful");})
        appNav.back()
    }

    function goToHome() {
        appNav.push({ name: "MyHome"})
    }

</script>

<template>
    <div>
        <div><button class="homeButton" @click="goToHome()">Go Home</button></div>
        <table class="courseTable">
        <th  class="tableHead">Find Course</th>
                <tr class="courseTable" v-for="(c,arrIdx) in allCourses" v-bind:key="arrIdx">
                    {{ c.code }} {{ c.name }} Instructor: {{ c.proflname }}, {{ c.proffname }}
                    <button class="coursebutton" @click="joinCourse(c.code)">Join</button>
                </tr>
        </table>
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

    .homeButton {
    border-radius: 8px;
    border: 2px solid black;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    margin-top: 20px;
    margin-left: 5px;
    margin-right: 5px;
    }

    .courseTable {
        text-align: center;
        border: 2px solid black;
        border-color: black;
        margin-left: 5px;
        margin-right: auto;
        margin-top: 20px;
        padding-left: 5px;
        color: black;
        width: auto;
        height: auto;
        background-color: rgba(255, 255, 255, 0.87);
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        color: black;
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

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
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
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
  margin-right: 5px;
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