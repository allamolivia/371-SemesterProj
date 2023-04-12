<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import {  DocumentReference, getDoc, doc, Firestore, getFirestore, 
            DocumentSnapshot, addDoc, CollectionReference, collection } 
            from "firebase/firestore";

    const db:Firestore = getFirestore();
    const course_name = ref("");
    const course_code  = ref("");

    type NewCourseDetailType = {
        userId: string;
    }

    const props = defineProps<NewCourseDetailType>()

    function addCourse() {
        const myDoc:DocumentReference = doc(db, `users/${props.userId}`);
        getDoc(myDoc).then(
            (qd:DocumentSnapshot) => {
                if (qd.exists()) {
                    var profFname = qd.data().fname
                    var profLname = qd.data().lname

                    const myColl: CollectionReference = collection(db, "courses")
                    addDoc(myColl, {    
                                        name: course_name.value, 
                                        code: course_code.value, 
                                        profuid: props.userId, 
                                        proffname: profFname, 
                                        proflname: profLname 
                    })
                    .then(() => {
                    console.log("New doc Added ");
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
        <div class="buttondiv">  
            <button @click="addCourse">Add Course</button>
        </div>
    </div>
</template>

<style scoped>

    div {
        margin-top: 15px;
    }
</style>