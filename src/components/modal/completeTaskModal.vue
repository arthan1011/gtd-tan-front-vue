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
                             @transitionend="doneMovingBlockTransitionEnd"
                             :class="movingBlockClass">
                        </div>
                        <div class="moving-block-fail"
                             @transitionend="failMovingBlockTransitionEnd"
                             :class="movingBlockClass">
                        </div>
                    </div>
                    <div class="moving-gear"
                         :class="movingBlockClass">
                    </div>
                </div>
                <div class="controls">
                    <button class="win"
                            @mouseup="doneButtonRelease"
                            @mouseleave="doneButtonRelease"
                            @mousedown="doneButtonPress">
                        <!--Press to complete<br> {{taskName}}-->
                    </button>
                    <button class="fail"
                            @mouseup="failButtonRelease"
                            @mouseleave="failButtonRelease"
                            @mousedown="failButtonPress">
                        <!--Press to fail<br> {{taskName}}-->
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    let chain = {
        clearAnimationState(cssClassPrefix, numberOfParts, classMap) {
            for (let i = 1; i <= numberOfParts; i++) {
                Vue.set(classMap, `${cssClassPrefix}-${i}`, false);
            }
            Vue.set(classMap, `${cssClassPrefix}-back`, false);
            Vue.set(classMap, `${cssClassPrefix}-end`, false);
        },
        beginAnimation(cssClassPrefix, classMap) {

            // start animation if not already finished
            if (!classMap[`${cssClassPrefix}-end`]) {
                classMap[`${cssClassPrefix}-1`] = true;
            }
        },

        abortAnimation(cssClassPrefix, numberOfParts, classMap) {
            // remove all animation classes
            classMap[`${cssClassPrefix}-back`] = false;
            for (let i = 1; i <= numberOfParts; i++) {
                classMap[`${cssClassPrefix}-${i}`] = false;
            }

            // return to initial state
            if (!classMap[`${cssClassPrefix}-end`]) {
                classMap[`${cssClassPrefix}-back`] = true;
            }
        },

        continueAnimation(cssClassPrefix, numberOfParts, classMap, finishCallback) {
            classMap[`${cssClassPrefix}-back`] = false;

            for (let i = 1; i <= numberOfParts; i++) {
                if (classMap[`${cssClassPrefix}-${i}`] === true) {
                    let lastPart = i === numberOfParts;
                    if (lastPart) {
                        classMap[`${cssClassPrefix}-${i}`] = false;
                        classMap[`${cssClassPrefix}-end`] = true;
                        finishCallback();
                        return;
                    } else {
                        classMap[`${cssClassPrefix}-${i}`] = false;
                        classMap[`${cssClassPrefix}-${i+1}`] = true;
                        return;
                    }
                }
            }
        }
    };

    export default {
        name: 'complete-task-modal',

        data() {
            return {
                movingBlockClass: {}
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

        created() {
            chain.clearAnimationState("anime-rot", 3, this.movingBlockClass);
            chain.clearAnimationState("anime-rot-fail", 3, this.movingBlockClass);
        },

        methods: {
            onCancel() {
                this.$emit('modal:cancel');

                chain.clearAnimationState("anime-rot", 3, this.movingBlockClass);
                chain.clearAnimationState("anime-rot-fail", 3, this.movingBlockClass);
            },
            onTaskCompleted() {
                this.$set(this.taskDate, 'finished', true);
                this.$emit('task:done', {taskId: this.taskDate.id});
            },
            onTaskFailed() {
                this.$set(this.taskDate, 'finished', true);
                this.$emit('task:fail', {taskId: this.taskDate.id});
            },
            doneButtonPress() {
                if (!this.taskDate.finished) {
                    chain.beginAnimation("anime-rot", this.movingBlockClass);
                }
            },
            failButtonPress() {
                if (!this.taskDate.finished) {
                    chain.beginAnimation("anime-rot-fail", this.movingBlockClass);
                }
            },
            doneButtonRelease() {
                chain.abortAnimation("anime-rot", 3, this.movingBlockClass);
            },
            failButtonRelease() {
                chain.abortAnimation("anime-rot-fail", 3, this.movingBlockClass);
            },
            doneMovingBlockTransitionEnd() {
                chain.continueAnimation("anime-rot", 3, this.movingBlockClass, this.onTaskCompleted.bind(this));
            },
            failMovingBlockTransitionEnd() {
                chain.continueAnimation("anime-rot-fail", 3, this.movingBlockClass, this.onTaskFailed.bind(this));
            },
        }
    }

</script>

<style scoped lang="sass">
    @import "completeTaskModal.scss"
</style>