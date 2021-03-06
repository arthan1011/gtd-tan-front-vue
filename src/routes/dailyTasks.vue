<template>
    <div class="daily-tasks">
        <app-header ref="header"
                    :mode=headerMode
                    v-on:add:daily="showNewDailyTaskFormWrapper"
                    v-on:cancel:daily=hideNewDailyTaskFormWrapper />
        <div class="tasks-header">
            <transition name="addDailyFormWrapper" v-on:after-enter="showNewDailyTaskForm">
                <div v-show="showDailyTaskFormWrapper" class="task-form-container">
                    <div class="task-form"
                         @transitionend="taskFormTransitionEnd"
                         :class="{'ani-shown': showDailyTaskForm, 'ani-hidden': !showDailyTaskForm} ">
                        <input id='taskName'
                               v-model="newTaskInput"
                               @keyup.enter="addNewTask"
                               placeholder="New task name"
                               type="text">
                        <select name="taskType" id="taskType" v-model="newTaskType">
                            <option value="INSTANT" selected>Instant Task</option>
                            <option value="POMODORO">Pomodoro Task</option>
                        </select>
                        <button type="button" @click="addNewTask" :disabled=!taskNameIsValid>Create</button>
                    </div>
                </div>
            </transition>
            <h2>Your daily tasks</h2>
        </div>
        <task-list :tasksInfo="$store.state.daily"></task-list>
    </div>
</template>

<script>
    import TaskList from 'components/taskList.vue'
    import taskService from 'services/taskService'

    const DEFAULT_TYPE = "INSTANT";

    export default {
        components: {
            TaskList,
        },

        data() {
            return {
                showInputsContainer: false,
                showInputs: false,
                showAddButton: true,
                newTaskInput: '',
                newTaskType: 'INSTANT',
                showDailyTaskFormWrapper: false,
                showDailyTaskForm: false,
                inAddMode: true,
            }
        },

        computed: {
            headerMode() {
                return !this.inAddMode ? 'mode:cancel' : 'mode:add'
            },
            taskNameIsValid() {
                return this.newTaskInput.trim().length !== 0;
            }
        },

        created() {
            console.log("Route component 'Daily Tasks' created!");
            this.$store.dispatch('loadDailyTasks');
        },

        methods: {
            addNewTask() {
                this.$store.dispatch('createNewTask', {
                    name: this.newTaskInput,
                    type: this.newTaskType,
                }).then(() => {
                    console.log("new Task created!");
                    this.hideNewDailyTaskFormWrapper();
                    this.newTaskInput = '';
                    this.newTaskType = DEFAULT_TYPE;
                }, () => {
                    this.hideNewDailyTaskFormWrapper();
                });
            },

            showNewDailyTaskFormWrapper() {
                console.log("Showing new daily task form!");
                this.showDailyTaskFormWrapper = true;
                this.inAddMode = false;
            },
            hideNewDailyTaskFormWrapper() {
                console.log("Hiding new daily task form!");
                this.showDailyTaskForm = false;
                this.inAddMode = true;
            },

            taskFormTransitionEnd() {
                if (!this.showDailyTaskForm) {
                    this.showDailyTaskFormWrapper = false;
                }
            },

            showNewDailyTaskForm() {
                this.showDailyTaskForm = true;
            },
        }
    }
</script>

<style scoped lang="sass">
    @import "~routes/dailyTasks.scss"
</style>