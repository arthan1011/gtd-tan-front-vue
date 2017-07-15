<template>
    <div class="todo-list">
         <div v-for="item in todoList.items"> {{ item }}</div>
    </div>
</template>

<script>
    import todoList from './todoList.json'
    export default {
        name: 'todo-list',
        data() {
            return {
                todoList: todoList
            }
        }
    }
</script>