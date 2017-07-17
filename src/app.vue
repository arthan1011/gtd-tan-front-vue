<template>
    <div class="app">
        <div class="message">{{ msg }}</div>
        <todo-list></todo-list>
        <blocks></blocks>
    </div>
</template>

<script>
    import TodoList from './todoList.vue'
    import Blocks from  './blocks.vue'

    export default {
        name: 'app',
        data() {
            return {
                msg: 'Hello, Vue-loader'
            }
        },
        components: { TodoList, Blocks }
    }
</script>

<style>
    .message {
        color: red;
    }
</style>