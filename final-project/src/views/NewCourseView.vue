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
            <input v-model="course_name" type="text"
            placeholder="Course name">
        </div>
        <div class="codediv">
            <input v-model="course_code" type="text"
            placeholder="Course code">
        </div>
        <div>
            <p>Start Time: </p>
            <input v-model="startTime" type="time">
        </div>
        <div>
            <p>End Time: </p>
            <input v-model="endTime" type="time">
        </div>
        <div>
            <p>Start Date: </p>
            <input v-model="startDate" type="date">
        </div>
        <div>
            <div class="checkbox">
                <p>Days class will be held:</p>
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
        <div class="buttondiv">  
            <button @click="addCourse(); goToHome()">Add Course</button>
        </div>
    </div>
</template>

<style scoped>

    div {
        margin-top: 15px;
    }
    .checkbox {
        align-items: left;
    }

    input[type=checkbox] {
            vertical-align: middle;
            position: relative;
            bottom: 1px;
            
        }
    h2 {
    font-size: 2.2em;
    line-height: 1.1;
    }
    button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
    }
    button:hover {
    border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
    }
    
    
</style>