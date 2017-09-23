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
                <div class="tl-label" @click="onTaskLabelClick(task.id)" v-for="task in tasksInfo.tasks">
                    <div class="label-container">
                        <div class="task">{{task.name}}</div>
                        <div class="popup" v-show="task.inEditMode">
                            <div class="fake-items">
                                <div v-bind:class="[item.today ? 'today' : '']" class="fake-item" v-for="item in fakeItems">
                                    <span v-bind:class="[getTaskDateItemClass(item.completed)]"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="task-date" :class="{today: item.today}" v-for="item in tasksInfo.dateLineItems">
                <div class="td-item td-date" :title="`${item.date.day}.${item.date.month}.${item.date.year}`">{{item.date.day}}</div>
                <div class="td-item"
                     @click="showCompleteTaskModal(task, item)"
                     v-for="task in item.tasks">
                    <span v-bind:class="[getTaskDateItemClass(task.completed)]"></span>
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

    let testRow = [{}];

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
                fakeItems: testRow,
            }
        },

        computed: {
            hasAnyTasks() {
                return this.tasksInfo.tasks.length !== 0
            },
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
                this.$store.dispatch('completeTask', {
                    id: payload.taskId
                }).then(() => {
                    console.log(`Task #${payload.taskId} is done!`);
                });
            },

            getTaskDateItemClass(completed) {
                return completed === true ? 'done' : completed === false ? 'fail' : 'unknown';
            },

            onTaskLabelClick(taskId) {
                const MODE_PROP_NAME = 'inEditMode';
                console.log("Clicked on label id " + taskId);
                const task = this.tasksInfo.tasks.find(task => task.id === taskId);
                if (task.inEditMode) {
                    this.$set(task, MODE_PROP_NAME, false);
                } else {
                    this.$set(task, MODE_PROP_NAME, true);
                }

                this.tasksInfo.tasks
                    .filter(t => t.id !== taskId)
                    .forEach(t => this.$set(t, MODE_PROP_NAME, false));

                const fakeItemsArray = [];
                for (let dateItem of this.tasksInfo.dateLineItems) {
                    let completed = dateItem.tasks.find(t => t.id === taskId).completed;
                    let today = dateItem.today;
                    fakeItemsArray.push({
                        completed, today
                    })
                }
                this.fakeItems = fakeItemsArray;
            },

        }

    }
</script>

<style scoped lang="sass">
    @import "taskList.scss"
</style>