<template>
    <div>
        <h2>Daily Tasks</h2>
        <task-list></task-list>
    </div>
</template>

<script>
    import TaskList from 'components/taskList.vue'

    export default {
        components: {
            TaskList
        }
    }
</script>