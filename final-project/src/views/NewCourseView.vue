<script setup lang="ts">

    import { ref, Ref, onMounted } from "vue"
    import {  DocumentReference, getDoc, doc, Firestore, getFirestore, 
            DocumentSnapshot, setDoc, CollectionReference, collection, updateDoc, arrayUnion } 
            from "firebase/firestore";
    import {useRouter} from "vue-router"

    const db:Firestore = getFirestore();
    const course_name = ref("");
    const course_code  = ref("");
    const studentIds: string[] = [];
    const startTime = ref("");
    const endTime = ref("");
    const startDate = ref("");
    const weekdays: Ref<String[]> = ref([]);
    

    type NewCourseDetailType = {
        userId: string;
    }

    const appNav = useRouter()
    const props = defineProps<NewCourseDetailType>()

    function goToHome() {
        appNav.push({ name: "MyHome"})
    }

    function addCourse() {
        const myUser:DocumentReference = doc(db, `users/${props.userId}`);
        getDoc(myUser).then(
            (qd:DocumentSnapshot) => {
                if (qd.exists()) {
                    var profFname = qd.data().fname
                    var profLname = qd.data().lname
                    const newDoc: DocumentReference = doc(db, "courses", `${course_code.value}`)

                    setDoc(newDoc, {    
                                        name: course_name.value, 
                                        profuid: props.userId, 
                                        proffname: profFname, 
                                        proflname: profLname,
                                        studentIds: studentIds,
                                        endTime: endTime.value,
                                        startTime: startTime.value,
                                        startDate: startDate.value,
                                        schedule: weekdays.value
                    })

                    .then(() => {
                    console.log("New doc Added ");
                    updateDoc(myUser, {
                        courses: arrayUnion(course_code.value)
                        })
                        .then(() => { console.debug("Update success");})
                    })
                    .catch((err:any) => { /* your code here */ }); 
                }
            })
        
    }



</script>

<template>
    <div>
        <h2>Add New Course</h2>
        <div class="namediv">
            <input class="textInput" v-model="course_name" type="text"
            placeholder="Course name">
        </div>
        <div class="codediv">
            <input class="textInput" v-model="course_code" type="text"
            placeholder="Course code">
        </div>
        <div>
            <p style="font-weight: bold;">Start Time: </p>
            <input style="border: 1px solid black;" v-model="startTime" type="time">
        </div>
        <div>
            <p style="font-weight: bold;">End Time: </p>
            <input style="border: 1px solid black;" v-model="endTime" type="time">
        </div>
        <div>
            <p style="font-weight: bold;">Start Date: </p>
            <input style="border: 1px solid black;" v-model="startDate" type="date">
        </div>
        <div>
            <div class="checkbox">
                <p style="font-weight: bold;">Days class will be held:</p>
                <input type="checkbox" id="mondaycheck" v-model="weekdays" value="M">
                <label for="monday">  Monday</label><br>
                <input type="checkbox" id="tuesday" v-model="weekdays" value="T">
                <label for="tuesday">  Tuesday</label><br>
                <input type="checkbox" id="wednesday" v-model="weekdays" value="W">
                <label for="wednesday">  Wednesday</label><br>
                <input type="checkbox" id="thursday" v-model="weekdays" value="Th">
                <label for="thursday">  Thursday</label><br>
                <input type="checkbox" id="friday" v-model="weekdays" value="F">
                <label for="friday">  Friday</label><br>
            </div>
        </div>
        <div>  
            <button @click="addCourse(); goToHome()">Add Course</button>
        </div>
        <div>  
            <button @click="goToHome()">Go Back</button>
        </div>
    </div>
</template>

<style scoped>

    div {
        margin-top: 10px;
    }
    .checkbox {
        align-items: left;
    }

    input[type=checkbox] {
            vertical-align: middle;
            position: relative;
            bottom: 1px;
            
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
  margin-bottom: 35px;
}

.textInput {
    padding: 3px;
    border: 5px;
    border-radius: 0px;
    border: 1px solid black;
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
  margin-top: 5px;
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