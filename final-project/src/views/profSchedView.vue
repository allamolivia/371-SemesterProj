<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, Auth, User } from "firebase/auth"
const dateStr = ref("")
const topic = ref("")
var auth: Auth | null = null 
var user: User | null = null

onMounted(() => {
    auth = getAuth();

})

</script>

<template>
<div>Please select the date</div>
<input type="date" v-model="dateStr">
<div> Please type in what you will be doing on this date</div>
<input type="text" v-model="topic">

<div>Professor is busy:</div>
<div>{{ dateStr }} doing {{ topic }}</div>
</template>