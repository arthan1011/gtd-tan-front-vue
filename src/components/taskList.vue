<template>
    <div class="task-list">
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
                         v-bind:class="[item.complete ? 'done' : 'fail']"
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
            tasksInfo: Object
        },
        data() {
            return {}
        },

        created() {
            console.log("Component Task list created!");
        },

    }

    function createDateLine() {
        const result = [];
        let now = new Date();
        for (let i = 0; i < 21; i++) {
            result.push({
                day: now.getDate(),
                month: now.getMonth() + 1,
                year: now.getFullYear(),
            });
            now.setDate(now.getDate() + 1);
        }
        return result;
    }
</script>

<style lang="sass">
    @import "taskList.scss"
</style>