<i18n src="./messages/dailyTasks.yml" />

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
                               :placeholder="$t('placeholder.taskname')"
                               type="text">
                        <bb-dropdown @onSelect="onTaskTypeSelect"
                                     style="width: 150px"
                                     :placeholder="'Task type'"
                                     :items="taskTypes" />
                        <bb-dropdown @onSelect="onIntervalsSelect"
                                     style="width: 260px"
                                     v-if="isCurrentTypePomodoro"
                                     :placeholder="$t('placeholder.amountOfIntervals')"
                                     :items="variousIntervals" />
                        <button type="button" @click="addNewTask" :disabled=!taskInfoIsValid>{{ $t('button.create') }}</button>
                    </div>
                </div>
            </transition>
            <h2>{{ $t('route.title') }}</h2>
        </div>
        <task-list :tasksInfo="$store.state.daily"></task-list>
    </div>
</template>

<script>
    import TaskList from 'components/taskList.vue'
    import taskService from 'services/taskService'
    import BbDropdown from "components/bb-dropdown.vue";

    const DEFAULT_TYPE = "INSTANT";

    export default {
        components: {
            BbDropdown,
            TaskList,
        },

        data() {
            return {
                showInputsContainer: false,
                showInputs: false,
                showAddButton: true,
                newTaskInput: '',
                newTaskType: null,
                newTaskIntervalsAmount: null,
                showDailyTaskFormWrapper: false,
                showDailyTaskForm: false,
                inAddMode: true,
                taskTypes: [
                    { value: "INSTANT", label: "INSTANT" },
                    { value: "POMODORO", label: "POMODORO" },
                ],
                variousIntervals: [
                    { value: 1, label: 1},
                    { value: 2, label: 2},
                    { value: 4, label: 4},
                    { value: 8, label: 8},
                ]
            }
        },

        computed: {
            headerMode() {
                return !this.inAddMode ? 'mode:cancel' : 'mode:add'
            },
            taskInfoIsValid() {
                if (this.newTaskType === 'POMODORO') {
                    return this.newTaskInput.trim().length !== 0 && this.newTaskType && this.newTaskIntervalsAmount;
                } else {
                    return this.newTaskInput.trim().length !== 0 && this.newTaskType;
                }
            },
            isCurrentTypePomodoro() {
                return this.newTaskType === 'POMODORO';
            }
        },

        methods: {
            addNewTask() {
                console.log('intervals', this.newTaskIntervalsAmount);
                this.$store.dispatch('createNewTask', {
                    name: this.newTaskInput,
                    intervals: this.newTaskIntervalsAmount,
                    type: this.newTaskType,
                }).then(() => {
                    this.hideNewDailyTaskFormWrapper();
                    this.newTaskInput = '';
                }, () => {
                    this.hideNewDailyTaskFormWrapper();
                });
            },

            showNewDailyTaskFormWrapper() {
                this.showDailyTaskFormWrapper = true;
                this.inAddMode = false;
            },
            hideNewDailyTaskFormWrapper() {
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

            onIntervalsSelect(item) {
                this.newTaskIntervalsAmount = item.value;
            },

            onTaskTypeSelect(type) {
                this.newTaskType = type.value;
            },
        }
    }
</script>

<style scoped lang="sass">
    @import "~routes/dailyTasks.scss"
</style>