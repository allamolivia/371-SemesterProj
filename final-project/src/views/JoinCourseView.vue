<script setup lang="ts">
    import { ref, Ref, onMounted } from "vue"
    import {  DocumentReference, getDocs, doc, Firestore, getFirestore, 
            QuerySnapshot, QueryDocumentSnapshot, CollectionReference, collection, updateDoc, arrayUnion } 
            from "firebase/firestore";
    import { CourseType } from "./DataTypes.vue";

    const db:Firestore = getFirestore();
    const allCourses: Ref<CourseType[]> = ref([]);

    type JoinCourseDetailType = {
        userId: string;
    }

    const props = defineProps<JoinCourseDetailType>()

    const myStateColl:CollectionReference = collection(db, "courses");
    getDocs(myStateColl).then(
        (qs: QuerySnapshot) => {
            qs.forEach((qd:QueryDocumentSnapshot) => {
                const courseData = qd.data() as CourseType
                allCourses.value.push(courseData)
            })
    })



</script>

<template>
    <div>
        <h2>Find Course</h2>
        <div>
            <ul>
                <li  v-for="(c,arrIdx) in allCourses" v-bind:key="arrIdx">{{ c }}></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

    div {
        margin-top: 15px;
    }
</style>