<template>
    <div>
        <modal-window :show="showModal">
            <complete-task-modal :taskDate="currentTaskDate"
                                 v-on:task:done="onTaskDone"
                                 v-on:modal:cancel="showModal = false"></complete-task-modal>
        </modal-window>
        <div v-if="hasAnyTasks" class="task-list2">
            <div class="task-labels task-date">
                <div class="tl-label"></div>
                <div class="tl-label" v-for="task in tasksInfo.tasks">
                    {{task.name}}
                </div>
            </div>
            <div class="task-date" :class="{today: item.today}" v-for="item in tasksInfo.dateLineItems">
                <div class="td-item td-date" :title="`${item.date.day}.${item.date.month}.${item.date.year}`">{{item.date.day}}</div>
                <div class="td-item"
                     @click="showCompleteTaskModal(task, item)"
                     v-bind:class="[getTaskDateItemClass(task)]"
                     v-for="task in item.tasks">
                </div>
            </div>
        </div>
        <no-tasks-stub v-else></no-tasks-stub>
    </div>

</template>

<script>
    import axios from 'axios';
    import NoTasksStub from 'components/noTasksStub.vue'
    import CompleteTaskModal from 'components/modal/completeTaskModal.vue';
    import ModalWindow from 'components/modal/modalWindow.vue';

    export default {
        name: 'task-list',
        components: {
            CompleteTaskModal,
            ModalWindow,
            NoTasksStub,
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

        computed: {
            hasAnyTasks() {
                return this.tasksInfo.tasks.length !== 0
            }
        },

        created() {
            console.log("Component Task list created!");
        },

        methods: {
            showCompleteTaskModal(task, item) {
                if (task.completed !== null || !item.today) {
                    return;
                }
                this.currentTaskDate = task;
                this.showModal = true;
            },
            onTaskDone(payload) {
                console.log(`Task #${payload.taskId} is done!`);
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