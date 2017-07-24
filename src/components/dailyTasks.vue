<template>
    <div>
        <h2>Daily Tasks</h2>
        <task-list :items="taskList"></task-list>
    </div>
</template>

<script>
    import TaskList from './taskList.vue'
    import axios from 'axios'

    export default {
        components: {
            TaskList
        },

        data() {
            return {
                taskList: []
            }
        },

        created() {
            console.log("Route component 'Daily Tasks' created!");
            this.$gtd.api.get('/task/daily').then(res => {
                this.taskList = res.data;
            });
        }
    }
</script>