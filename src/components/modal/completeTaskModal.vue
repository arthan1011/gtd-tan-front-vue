<template>
    <div class="complete-task-modal">
        <div class="modal-mask" v-show="show">
            <div class="modal-container">
                <div class="modal-header">
                    <button class="modal-close-button" @click="onCancel"></button>
                </div>
                <div class="modal-body">
                    <div class="manual-confirmation">
                        <div class="confirm-main">
                            <div class="block-wrapper">
                                <div class="moving-block"
                                     @transitionend="movingBlockTransitionEnd"
                                     :class="movingBlockClass"></div>
                            </div>
                        </div>
                        <button class="confirm-press-button"
                                @mouseup="pressButtonUp"
                                @mousedown="pressButtonDown"
                        >Press</button>
                    </div>
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
            show: Boolean
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

<style lang="sass">
    @import "completeTaskModal.scss"
</style>