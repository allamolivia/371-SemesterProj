<script setup lang="ts">
    import { ref, onMounted, Ref } from "vue"
    import { getAuth, Auth } from "firebase/auth"
    import { CollectionReference, collection, getDocs, QuerySnapshot, QueryDocumentSnapshot, DocumentReference, getDoc, DocumentSnapshot, doc, Firestore, getFirestore } from "firebase/firestore";
    import {useRouter} from "vue-router"
    import { UserType, CourseType } from "./DataTypes.vue";
    import "@lbgm/pro-calendar-vue/style";
    import { Appointment } from "@lbgm/pro-calendar-vue";

    const db:Firestore = getFirestore();
    const myColl:CollectionReference = collection(db, "courses")
    const evts : Appointment[] = []
    const myCourses : String[] = []
    var courseDate : Date
    const appNav = useRouter()

    type ScheduleDetailType = {
        userId: string;
    }

    function goToHome() {
        appNav.push({ name: "MyHome"})
    }

    const cfg = {
        actions: {
            view: {
                enabled: false
            },
            report: {
            enabled: false
            }
        }
    }

    const props = defineProps<ScheduleDetailType>()

    const myDoc:DocumentReference = doc(db, `users/${props.userId}`);

    getDoc(myDoc).then(
        (qd1:DocumentSnapshot) => {
            if (qd1.exists()) {
                const userData = qd1.data() as UserType
                userData.courses.forEach(element => myCourses.push(element))
                var counter = 0
                myCourses.forEach(element => {
                    console.log(element)
                    const courseDoc:DocumentReference = doc(db, `courses/${element}`);
                    getDoc(courseDoc).then(
                    (qd2:DocumentSnapshot) => {
                        if (qd2.exists()) {
                            const courseData = qd2.data() as CourseType
                            courseDate = new Date(courseData.startDate + " " + courseData.startTime);
                            var dateStr = courseDate.toISOString()
                            console.log(dateStr)
                            evts.push({ date: dateStr, id : counter.toString(), keywords: "", name: courseData.name})
                            counter += 1
                            }
                    })
                })
            }
        })

</script>

<template>
    <div><button @click="goToHome()">Go Home</button></div>
    <div style="border: 5px solid black; background-color: lightgrey;">
    <div class="parent">
    <pro-calendar
    :events="evts"
    :loading="false"
    :config="cfg"
    view="week"
    date="'isoStringDate'"
    @calendarClosed="void 0"
    />
</div>
</div>
</template>

<style scoped>
    .parent {
        width: 1200px
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

h1 {
  font-size: 3.2em;
  line-height: 1.1;
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
  margin-top: 20px;
  width: 125px;
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