<template>
    <div class="task-list">
        <div class="task-element" v-for="task in tasks">{{ task.name }}</div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'task-list',
        data() {
            return {
                tasks: []
            }
        },

        created() {
            console.log("Component Task list created!");
            this.fetchData();
        },

        methods: {
            fetchData() {
                axios.get('/rest/task/daily').then(res => {
                    this.tasks = res.data;
                });
            }
        }
    }
</script>

<style lang="sass">
    @import "taskList.scss"
</style>