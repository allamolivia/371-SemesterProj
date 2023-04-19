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

        updateDoc(course, {
            studentIds: arrayUnion(props.userId)
        })
        .then(() => { console.debug("Update successful");})
        appNav.back()
    }



</script>

<template>
    <div>
        <h2>Find Course</h2>
        <div>
                <p  v-for="(c,arrIdx) in allCourses" v-bind:key="arrIdx">
                    {{ c.code }} {{ c.name }} Instructor: {{ c.proflname }}, {{ c.proffname }}
                    <button @click="joinCourse(c.code)">Join</button>
                </p>
        </div>
    </div>
</template>

<style scoped>

    div {
        margin-top: 15px;
    }
</style>