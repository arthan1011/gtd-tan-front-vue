<template>
    <div class="app">
        <app-header />
        <todo-list></todo-list>
        <blocks></blocks>
    </div>
</template>

<script>
    import TodoList from './todoList.vue'
    import Blocks from  './blocks.vue'
    import AppHeader from './appHeader.vue'

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
        }
    }
</script>

<style>
    .message {
        color: red;
    }
</style>