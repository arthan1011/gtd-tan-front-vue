<template>
    <div>
        <h2>Daily Tasks</h2>
        <task-list :items="taskList"></task-list>
    </div>
</template>

<script>
    import TaskList from 'components/taskList.vue'
    import axios from 'axios'
    import taskService from 'services/taskService'

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
            this.taskList = this.$store.state.dailyTasks;
            taskService.loadDailyTasks();
            this.$gtd.api.get('/task/daily').then(res => {
                this.taskList = res.data;
            });
        }
    }
</script>