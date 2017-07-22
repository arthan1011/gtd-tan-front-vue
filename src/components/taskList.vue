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

<style>
    .task-list {
        margin-top: 7px;
    }
    .task-list > .task-element {
        background-color: #99c96f;
        padding: 5px;
        border-top: 1px solid gray;
        border-right: 1px solid gray;
        border-left: 1px solid gray;
    }
    .task-list > .task-element:last-child {
        border-bottom: 1px solid gray;
    }
</style>