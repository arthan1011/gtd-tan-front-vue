<template>
    <div class="app">
        <app-header />
        <router-view></router-view>
    </div>
</template>

<script>
    import TodoList from './todoList.vue'
    import Blocks from  './blocks.vue'
    import AppHeader from './components/appHeader.vue'
    import TaskList from './components/taskList.vue'

    export default {
        name: 'app',
        data() {
            return {
                msg: 'Hello, Vue-loader'
            }
        },
        components: {
            "todo-list": TodoList,
            "blocks": Blocks,
            "app-header": AppHeader,
            "task-list": TaskList
        }
    }
</script>

<style>
    .message {
        color: red;
    }
</style>