<template>
    <div class="task-list">
        <transition-group name="taskList" tag="div">
            <div class="task-element" v-for="task in items" v-bind:key="task.name">{{ task.name }}</div>
        </transition-group>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'task-list',
        props: {
            items: Array
        },
        data() {
            return {}
        },

        created() {
            console.log("Component Task list created!");
        },

    }
</script>

<style lang="sass">
    @import "taskList.scss"
</style>