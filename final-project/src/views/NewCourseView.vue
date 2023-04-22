<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import {  DocumentReference, getDoc, doc, Firestore, getFirestore, 
            DocumentSnapshot, setDoc, CollectionReference, collection, updateDoc, arrayUnion } 
            from "firebase/firestore";
    import {useRouter} from "vue-router"

    const db:Firestore = getFirestore();
    const course_name = ref("");
    const course_code  = ref("");
    const studentIds: string[] = [];
    const strtTime = ref("");
    const ndTime = ref("");
    const date = ref("");

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
                                        endTime: ndTime.value,
                                        startTime: strtTime.value
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
            <input v-model="strtTime" type="time">
        </div>
        <div>
            <p>End Time: </p>
            <input v-model="ndTime" type="time">
        </div>
        <div>
            <p>Date: </p>
            <input v-model="date" type="date">
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
</style>