<template>
    <div>
        <div class="ctrl-panel">
            <input type="button" class="add-btn" value="Add" />
        </div>
        <task-list :items="$store.state.dailyTasks"></task-list>
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
            return {}
        },

        created() {
            console.log("Route component 'Daily Tasks' created!");
            this.$store.dispatch('loadDailyTasks');
        }
    }
</script>

<style lang="sass">
    @import "~components/dailyTasks.scss"
</style>