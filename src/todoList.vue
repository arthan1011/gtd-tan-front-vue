<template>
    <div class="todo-list">
        <input type="text" v-model="newItem" /> <button @click="addTodoItem">Add</button>
        <div v-for="item in todoList"> {{ item }}</div>
    </div>
</template>

<script>
    import todoList from './todoList.json'
    export default {
        name: 'todo-list',
        data() {
            return {
                todoList: todoList.items,
                newItem: '',
            }
        },
        methods: {
            addTodoItem: function() {
                this.todoList.push(this.newItem);
            }
        }
    }
</script>