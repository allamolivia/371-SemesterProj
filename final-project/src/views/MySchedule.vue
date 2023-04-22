<script setup lang="ts">
    import { ref, onMounted, Ref } from "vue"
    import { getAuth, Auth } from "firebase/auth"
    import { CollectionReference, collection, getDocs, QuerySnapshot, QueryDocumentSnapshot, DocumentReference, getDoc, DocumentSnapshot, doc, Firestore, getFirestore } from "firebase/firestore";
    import {useRouter} from "vue-router"
    import { UserType, CourseType } from "./DataTypes.vue";
    import "@lbgm/pro-calendar-vue/style";
</script>

<template>

</template>

<style scoped>

</style>