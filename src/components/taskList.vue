<template>
    <div>
        <complete-task-modal :show="showModal"
                             :taskDate="currentTaskDate"
                             v-on:task:done="onTaskDone"
                             v-on:modal:cancel="showModal = false"></complete-task-modal>
        <div class="task-list2">
            <div class="task-labels task-date">
                <div class="tl-label"></div>
                <div class="tl-label" v-for="task in tasksInfo.tasks">
                    {{task.name}}
                </div>
            </div>
            <div class="task-date" v-for="item in tasksInfo.dateLineItems">
                <div class="td-item td-date" :title="`${item.date.day}.${item.date.month}.${item.date.year}`">{{item.date.day}}</div>
                <div class="td-item"
                     @click="showCompleteTaskModal(task)"
                     v-bind:class="[getTaskDateItemClass(task)]"
                     v-for="task in item.tasks">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import CompleteTaskModal from 'components/modal/completeTaskModal.vue';

    export default {
        name: 'task-list',
        components: {
            CompleteTaskModal
        },
        props: {
            tasksInfo: Object
        },
        data() {
            return {
                showModal: false,
                currentTaskDate: {},
            }
        },

        created() {
            console.log("Component Task list created!");
        },

        methods: {
            showCompleteTaskModal(task) {
                if (task.completed !== null) {
                    return;
                }
                this.currentTaskDate = task;
                this.showModal = true;
            },
            onTaskDone() {
                console.log("Task done!");
            },
            getTaskDateItemClass(task) {
                return task.completed === true ? 'done' : task.completed === false ? 'fail' : 'unknown';
            }
        }

    }
</script>

<style scoped lang="sass">
    @import "taskList.scss"
</style>