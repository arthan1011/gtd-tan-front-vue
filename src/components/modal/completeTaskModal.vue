<template>
    <div class="modal-container">
        <div class="modal-header">
            <div class="modal-close-button" @click="onCancel">
                <span></span>
            </div>
        </div>
        <div class="modal-body">
            <div class="manual-confirmation">
                <div class="confirm-main">
                    <div class="block-wrapper">
                        <div class="moving-block"
                             @transitionend="movingBlockTransitionEnd"
                             :class="movingBlockClass">
                        </div>
                    </div>
                    <div class="moving-gear"
                         :class="movingBlockClass">
                    </div>
                </div>
                <div class="controls">
                    <button class="win"
                            @mouseup="pressButtonUp"
                            @mouseleave="pressButtonUp"
                            @mousedown="pressButtonDown">
                        <!--Press to complete<br> {{taskName}}-->
                    </button>
                    <button class="fail">
                        <!--Press to fail<br> {{taskName}}-->
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'complete-task-modal',

        data() {
            return {
                movingBlockClass: {
                    "anime-rot-1": false,
                    "anime-rot-2": false,
                    "anime-rot-3": false,
                    "anime-rot-end": false,
                    "anime-rot-back": false,
                }
            }
        },

        props: {
            taskDate: Object
        },

        computed: {
            taskName() {
                const task = this.$store.state.daily.tasks.find((t) => t.id === this.taskDate.id);
                return task ? task.name : ''
            }
        },

        methods: {
            onCancel() {
                this.$emit('modal:cancel');

                // clear state
                this.movingBlockClass = {
                    "anime-rot-1": false,
                    "anime-rot-2": false,
                    "anime-rot-3": false,
                    "anime-rot-end": false,
                    "anime-rot-back": false,
                };
            },
            emitTaskCompleted() {
                this.$emit('task:done', {taskId: this.taskDate.id});
            },
            pressButtonDown() {
                if (!this.movingBlockClass["anime-rot-end"]) {
                    this.movingBlockClass["anime-rot-1"] = true;
                }
            },
            pressButtonUp() {
                this.movingBlockClass["anime-rot-back"] = false;
                this.movingBlockClass["anime-rot-1"] = false;
                this.movingBlockClass["anime-rot-2"] = false;
                this.movingBlockClass["anime-rot-3"] = false;
                if (!this.movingBlockClass["anime-rot-end"]) {
                    this.movingBlockClass["anime-rot-back"] = true;
                }
            },
            movingBlockTransitionEnd() {
                this.movingBlockClass["anime-rot-back"] = false;

                if (this.movingBlockClass["anime-rot-1"]) {
                    this.movingBlockClass["anime-rot-1"] = false;
                    this.movingBlockClass["anime-rot-2"] = true;
                    return;
                }
                if (this.movingBlockClass["anime-rot-2"]) {
                    this.movingBlockClass["anime-rot-2"] = false;
                    this.movingBlockClass["anime-rot-3"] = true;
                    return;
                }
                if (this.movingBlockClass["anime-rot-3"]) {
                    this.movingBlockClass["anime-rot-3"] = false;
                    this.movingBlockClass["anime-rot-end"] = true;
                    this.emitTaskCompleted()
                }

            }
        }
    }
</script>

<style scoped lang="sass">
    @import "completeTaskModal.scss"
</style>