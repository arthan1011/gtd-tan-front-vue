<template>
    <div class="task-list">
        <div class="task-element">
            <div class="tl-date-label"></div>
            <div class="tl-dates"></div>
        </div>
        <transition-group name="taskList" tag="div">
            <div class="task-element" v-for="task in items" v-bind:key="task.name">
                <div class="tl-label">
                    {{ task.name }}
                </div>
                <div class="tl-dateline">
                    <div class="tl-dl-item"
                         v-bind:class="[item === 1 ? 'done' : 'fail']"
                         v-for="item in task.datelineItems"></div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'task-list',
        props: {
            items: Array
        },
        data() {
            return {}
        },

        created() {
            console.log("Component Task list created!");
        },

    }
</script>

<style lang="sass">
    @import "taskList.scss"
</style>