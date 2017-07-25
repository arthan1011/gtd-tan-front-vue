<template>
    <div class="todo-list">
        <input type="text" v-model="newItem" /> <button @click="addTodoItem">Add</button>
        <div v-show="showList">
            <div v-for="item in todoList"> {{ item }}</div>
        </div>

    </div>
</template>

<script>
    import todoList from 'todoList.json'
    export default {
        name: 'todo-list',
        data() {
            return {
                todoList: todoList.items,
                newItem: '',
            }
        },
        computed: {
            showList() {
                let some = this.todoList.every((item) => item !== 'No');
                console.log(`Should show list: ${some}`);
                return some;
            }
        },
        methods: {
            addTodoItem() {
                this.todoList.push(this.newItem);
            }
        }
    }
</script>