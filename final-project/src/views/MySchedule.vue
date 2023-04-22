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

    type ScheduleDetailType = {
        userId: string;
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
</template>

<style scoped>
    .parent {
        width: 1200px
    }
</style>