<template>
    <div class="complete-task-modal">
        <transition name="showModal">
            <div class="modal-mask" v-show="show">
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
                            <button class="confirm-press-button"
                                    @mouseup="pressButtonUp"
                                    @mouseleave="pressButtonUp"
                                    @mousedown="pressButtonDown"
                            >Press to complete<br> {{taskName}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
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
            show: Boolean,
            taskDate: Object
        },

        computed: {
            taskName() {
                return this.$store.state.daily.tasks.find((t) => t.id === this.taskDate.id).name;
            }
        },

        watch: {
            show(isShown) {
                if (isShown) {
                    this.movingBlockClass = {
                        "anime-rot-1": false,
                        "anime-rot-2": false,
                        "anime-rot-3": false,
                        "anime-rot-end": false,
                        "anime-rot-back": false,
                    };
                }
            }
        },

        methods: {
            onCancel() {
                this.$emit('modal:cancel');
            },
            emitTaskCompleted() {
                this.$emit('task:done');
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