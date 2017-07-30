<template>
    <div>
        <div class="ctrl-panel">
            <div class="ctrl-wrapper">
                <transition name="add-button" v-on:after-leave="afterAddButtonLeave">
                    <input v-show="showAddButton" type="button" @click="showTaskInputs" class="add-btn" value="Add" />
                </transition>
                <transition name="formInputsContainer"
                            v-on:after-leave="afterAddInputsContainerLeave"
                            v-on:after-enter="afterAddInputsContainerEnter">
                    <div class="add-inputs" v-show="showInputsContainer">
                        <transition name="formInputs" v-on:after-leave="afterAddInputsLeave">
                            <div v-show="showInputs">
                                <div class="form-input">
                                    <label for="new-task-input-name">Name</label>
                                    <input id="new-task-input-name"
                                           v-model="newTaskInput"
                                           @keyup.enter="addNewTask"
                                           type="text" />
                                </div>
                                <div class="form-input al-r">
                                    <input @click="addNewTask" class="submit-btn" type="button" value="Create" />
                                </div>
                            </div>
                        </transition>
                    </div>
                </transition>
            </div>
        </div>
        <task-list :items="$store.state.dailyTasks"></task-list>
    </div>
</template>

<script>
    import TaskList from 'components/taskList.vue'
    import axios from 'axios'
    import taskService from 'services/taskService'

    export default {
        components: {
            TaskList
        },

        data() {
            return {
                showInputsContainer: false,
                showInputs: false,
                showAddButton: true,
                newTaskInput: '',
            }
        },

        created() {
            console.log("Route component 'Daily Tasks' created!");
            this.$store.dispatch('loadDailyTasks');
        },

        methods: {
            addNewTask() {
                this.$store.dispatch('createNewTask', {
                    name: this.newTaskInput
                }).then(() => {
                    console.log("new Task created!");
                    this.showInputs = false;
                    this.newTaskInput = '';
                });
            },

            showTaskInputs() {
                console.log("Trying to add a new task");
                this.showAddButton = false;
            },

            afterAddButtonLeave() {
                console.log("After add button leave");
                this.showInputsContainer = true;
            },

            afterAddInputsContainerLeave() {
                this.showAddButton = true;
            },

            afterAddInputsContainerEnter() {
                this.showInputs = true
            },

            afterAddInputsLeave() {
                this.showInputsContainer = false;
            }
        }
    }
</script>

<style lang="sass">
    @import "~components/dailyTasks.scss"
</style>