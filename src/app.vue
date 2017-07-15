<template>
    <div class="app">
        <div class="message">{{ msg }}</div>
        <todo-list></todo-list>
    </div>
</template>

<script>
    import TodoList from './todoList.vue'
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Hello, Vue-loader'
            }
        },
        components: { TodoList }
    }
</script>

<style>
    .message {
        color: red;
    }
</style>