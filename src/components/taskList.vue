<template>
    <div class="task-list">
        <complete-task-modal :show="showModal"
                             v-on:modal:cancel="showModal = false" />
        <!--<div class="modal-mask" v-show="showModal">
            <div class="modal-container">
                <button @click="showModal = false">Cancel</button>
            </div>
        </div>-->
        <div class="task-element">
            <div class="tl-date-label"></div>
            <div class="tl-dates" v-for="item in tasksInfo.meta.dates">
                <div class="tl-dl-item" :title="`${item.day}.${item.month}.${item.year}`">{{item.day}}</div>
            </div>
        </div>
        <transition-group name="taskList" tag="div">
            <div class="task-element" v-for="task in tasksInfo.tasks" v-bind:key="task.name">
                <div class="tl-label">
                    {{ task.name }}
                </div>
                <div class="tl-dateline">
                    <div class="tl-dl-item"
                         @click="showCompleteTaskModal(task)"
                         v-bind:class="[item.complete ? 'done' : 'fail']"
                         v-for="item in task.datelineItems"></div>
                </div>
            </div>
        </transition-group>
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
            }
        },

        created() {
            console.log("Component Task list created!");
        },

        methods: {
            showCompleteTaskModal(task) {
                console.log(`Showing complete task ${task.name} modal `);
                this.showModal = true;
            }
        }

    }
</script>

<style lang="sass">
    @import "taskList.scss"
</style>