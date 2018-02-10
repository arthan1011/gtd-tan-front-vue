<i18n src="./messages/taskList.yml" />

<template xmlns:v-gtd-tooltip="http://www.w3.org/1999/xhtml">
    <div>
        <modal-window :show="showCompleteInstantTaskModal">
            <complete-task-modal :taskDate="currentTaskDate"
                                 :mode="completeTaskModalMode"
                                 v-on:task:done="onTaskDone"
                                 v-on:task:fail="onTaskFail"
                                 v-on:modal:cancel="hideCompleteTaskModal"></complete-task-modal>
        </modal-window>
        <modal-window :show="showCompletePomodoroTaskModal">
            <complete-pomodoro-task-modal :taskDate="currentTaskDate"
                                 v-on:task:done="onTaskDone"
                                 v-on:task:fail="onTaskFail"
                                 v-on:modal:cancel="hideCompleteTaskModal"></complete-pomodoro-task-modal>
        </modal-window>
        <modal-window :show="showEditModal">
            <edit-task-modal :task="editTaskDate"
                             :headerTitle="'edit'"
                             :buttonName="'save'"
                             v-on:modal:hide="showEditModal = false"
                             v-on:edit:name="editTaskName"></edit-task-modal>
        </modal-window>
        <modal-window :show="showDeleteModal">
            <edit-task-modal :task="deleteTaskDate"
                             :headerTitle="'delete'"
                             :buttonName="'to_delete'"
                             :readonly="true"
                             :buttonClass="'red'"
                             v-on:modal:hide="showDeleteModal = false"
                             v-on:edit:name="deleteTask"></edit-task-modal>
        </modal-window>
        <transition name="listFadeIn">
            <template v-if="hasServerResponse === true">
                <div v-if="hasAnyTasks" class="task-list2">
                    <div class="task-labels task-date">
                        <div class="tl-label"></div>
                        <div :class="['tl-label', isSuccessful(task.id)]"
                             @click="onTaskLabelClick(task.id)"
                             v-for="task in tasksInfo.tasks">
                            <div class="label-container">
                                <div class="task">{{task.name}}</div>
                                <div class="popup" v-show="task.inEditMode">
                                    <div class="control-panel">
                                        <span v-gtd-tooltip:top="$t('editTask')" class="edit" @click="showEditWindow(task.id)"></span>
                                        <span v-gtd-tooltip:top="$t('deleteTask')" class="remove" @click="showDeleteWindow(task.id)"></span>
                                    </div>
                                    <div v-bind:class="['fake-items', task.offset ? 'offset' : '']">
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
            </template>
        </transition>
        <div class="loader" :style="{
                                 opacity: hasServerResponse === false ? '1' : '0',
                                 display: hasServerResponse === false ? 'block' : 'none'}" >
            <div class="anima">
                <div class="row">
                    <div class="dot n1"></div>
                    <div class="dot n2"></div>
                    <div class="dot n3"></div>
                    <div class="dot n4"></div>
                    <div class="dot n5"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import NoTasksStub from 'components/noTasksStub.vue'
    import CompleteTaskModal from 'components/modal/completeTaskModal.vue';
    import CompletePomodoroTaskModal from 'components/modal/completePomodoroTaskModal.vue';
    import EditTaskModal from 'components/modal/editTaskModal.vue';
    import ModalWindow from 'components/modal/modalWindow.vue';
    import notificationSound from 'static/tick.mp3'

    let testRow = [{}];

    const PENDING_MODE = 'mode:pending';
    const SUCCESS_MODE = 'mode:success';
    const FAILURE_MODE = 'mode:failure';

    export default {
        name: 'task-list',
        components: {
            CompleteTaskModal,
            CompletePomodoroTaskModal,
            EditTaskModal,
            ModalWindow,
            NoTasksStub,
        },
        props: {
            tasksInfo: Object
        },
        data() {
            return {
                showCompleteInstantTaskModal: false,
                showCompletePomodoroTaskModal: false,
                currentTaskDate: {},
                editTaskDate: {},
                deleteTaskDate: {},
                fakeItems: testRow,
                showEditModal: false,
                showDeleteModal: false,
                completeTaskModalMode: null,
                hasServerResponse: null,
                tickSound: null,
            }
        },

        computed: {
            hasAnyTasks() {
                return this.tasksInfo && this.tasksInfo.tasks && this.tasksInfo.tasks.length !== 0
            },

        },

        created() {
            this.tickSound = new Audio(notificationSound);
        },

        mounted() {
            const timeout = setTimeout(() => {
                if (this.hasServerResponse === null) {
                    this.hasServerResponse = false;
                }
            }, 50);

            this.$store.dispatch('loadDailyTasks').then(_ => {
                this.hasServerResponse = true;
            });
        },

        methods: {
            isSuccessful(taskId) {
                const todayTasksStates = this.tasksInfo.dateLineItems.find((lineItem) => lineItem.today).tasks;
                const isCompeted = todayTasksStates.find(t => t.id === taskId).completed;
                return isCompeted ? 'completed' : ''
            },

            showCompleteTaskModal(task, item) {
                if (task.completed !== null || !item.today) {
                    return;
                }

                let info = this.tasksInfo.tasks.find((t) => { return t.id === task.id });

                switch (info.type) {
                    case 'INSTANT':
                        this.showCompleteInstantTaskModal = true;
                        break;
                    case 'POMODORO':
                        this.showCompletePomodoroTaskModal = true;
                        break;
                    default:
                        throw new Error(`Unknown type [${info.type}]`);
                }

                this.currentTaskDate = task;
            },

            hideCompleteTaskModal() {
                this.showCompleteInstantTaskModal = false;
                this.showCompletePomodoroTaskModal = false;
                this.completeTaskModalMode = null;
            },

            onTaskDone(payload) {
                const timeout = setTimeout(() => {
                    this.completeTaskModalMode = PENDING_MODE;
                }, 100);

                this.$store.dispatch('completeTask', {
                    id: payload.taskId
                }).then(() => {
                    clearTimeout(timeout);
                    this.completeTaskModalMode = SUCCESS_MODE;
                    this.showNotification(this.findTaskById(payload.taskId));
                });
            },

            showNotification(task) {
                if (task.type === 'POMODORO') {
                    new Notification("Success", {
                        body: task.name
                    });
                    setTimeout(() => {
                        this.tickSound.play();
                    }, 400);
                }
            },

            onTaskFail(payload) {
                const timeout = setTimeout(() => {
                    this.completeTaskModalMode = PENDING_MODE;
                }, 100);

                this.$store.dispatch('failTask', {
                    id: payload.taskId
                }).then(() => {
                    console.log(`Task #${payload.taskId} is fail!`);
                    clearTimeout(timeout);
                    this.completeTaskModalMode = FAILURE_MODE;
                });
            },

            editTaskName(payload) {
                this.$store.dispatch('changeTaskName', {
                    id: payload.id,
                    name: payload.name
                }).then(() => {
                    this.showEditModal = false;
                })
            },

            deleteTask(payload) {
                this.$store.dispatch('deleteTask', {
                    id: payload.id
                }).then(() => {
                    this.showDeleteModal = false;
                })
            },

            getTaskDateItemClass(completed) {
                return completed === true ? 'done' : completed === false ? 'fail' : 'unknown';
            },

            findTaskById(taskId) {
                return this.tasksInfo.tasks.find(task => task.id === taskId);
            },

            showEditWindow(taskId) {
                const task = this.findTaskById(taskId);
                this.editTaskDate = {...task};
                this.showEditModal = true;
            },

            showDeleteWindow(taskId) {
                const task = this.findTaskById(taskId);
                this.deleteTaskDate = {...task};
                this.showDeleteModal = true;
            },

            onTaskLabelClick(taskId) {
                const MODE_PROP_NAME = 'inEditMode';
                const task = this.findTaskById(taskId);
                if (task.inEditMode) {
                    this.$set(task, "offset", false);
                    setTimeout(() => {
                        this.$set(task, MODE_PROP_NAME, false);
                    }, 500)
                } else {
                    this.$set(task, MODE_PROP_NAME, true);
                    setTimeout(() => {
                        this.$set(task, "offset", true);
                    }, 100)
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
    @import "style/taskList"
</style>