<script setup lang="ts">
</script>

<template>
    <div class="parent">
        <div class="div1">
            <p>My Courses</p>
        </div>
        <div class="div2">
        </div>
        <div class="div3"><RouterLink to="/newcourse">+ Add Course</RouterLink></div>
    </div>

</template>

<style scoped>
    .parent {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 3px;
        grid-row-gap: 3px;

        height: 100%;
        width: 100%;
        padding: 10px;
    }

    template {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }

    .div1 { 
        grid-area: 2 / 1 / 6 / 3; 
        background-color: #3b3b3b;
        border-color: black;
        height: 100%;
        width: 100%;
    }
    .div2 { grid-area: 2 / 3 / 6 / 6;
        background-color: #3b3b3b;
        border-color: black; 
        height: 100%;
        width: 100%;
    }
    .div3 { grid-area: 1 / 1 / 2 / 6; 
        background-color: #3b3b3b;
        border-color: black;
        height: 100%;
        width: 100%;
    }

</style>