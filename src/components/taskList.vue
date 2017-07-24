<template>
    <div class="task-list">
        <div class="task-element" v-for="task in items">{{ task.name }}</div>
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