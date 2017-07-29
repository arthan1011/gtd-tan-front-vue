<template>
    <div>
        <div class="ctrl-panel">
            <div class="ctrl-wrapper">
                <transition name="add-button" v-on:after-leave="afterAddButtonLeave">
                    <input v-show="showAddButton" type="button" @click="showTaskInputs" class="add-btn" value="Add" />
                </transition>
                <transition name="formInputs" >
                    <div class="add-inputs" v-show="showInputs">
                        <transition>
                            <div>
                                <div class="form-input">
                                    <label for="new-task-input-name">Name</label>
                                    <input id="new-task-input-name" type="text" />
                                </div>
                                <div class="form-input">
                                    <button class="submit-btn" type="button">Add</button>
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
                showInputs: false,
                showAddButton: true
            }
        },

        created() {
            console.log("Route component 'Daily Tasks' created!");
            this.$store.dispatch('loadDailyTasks');
        },

        methods: {
            showTaskInputs() {
                console.log("Trying to add a new task");
                this.showAddButton = false;
            },
            afterAddButtonLeave() {
                console.log("After add button leave");
                this.showInputs = true;
            }
        }
    }
</script>

<style lang="sass">
    @import "~components/dailyTasks.scss"
</style>