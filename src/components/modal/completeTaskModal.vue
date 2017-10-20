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
                        <div class="moving-block done"
                             @transitionend="doneMovingBlockTransitionEnd"
                             :class="doneClasses">
                        </div>
                        <div class="moving-block fail"
                             @transitionend="failMovingBlockTransitionEnd"
                             :class="failClasses">
                        </div>
                        <div :style="{opacity: isPendingMode ? '1' : '0'}" class="animation-block pending">
                            <div class="row">
                                <div class="dot n1"></div>
                                <div class="dot n2"></div>
                                <div class="dot n3"></div>
                            </div>
                        </div>
                        <div v-if="isSuccessMode" class="animation-block success">
                            <div class="icon"></div>
                        </div>
                        <div v-if="isFailureMode" class="animation-block failure">
                            <div class="icon"></div>
                        </div>
                    </div>
                    <div class="moving-gear"
                         :class="gearClasses">
                    </div>
                </div>
                <div class="controls">
                    <button class="win"
                            @mouseup="doneButtonRelease"
                            @mouseleave="doneButtonRelease"
                            @mousedown="doneButtonPress">
                        <div class="tooltip left">
                            <div class="text">
                                <span>Press to complete<br> {{taskName}}</span>
                            </div>
                            <div class="arrow">
                                <div class="right"></div>
                            </div>
                        </div>
                        <!--Press to complete<br> {{taskName}}-->
                    </button>
                    <button class="fail"
                            @mouseup="failButtonRelease"
                            @mouseleave="failButtonRelease"
                            @mousedown="failButtonPress">
                        <div class="tooltip right">
                            <div class="text">
                                <span>Press to fail<br> {{taskName}}</span>
                            </div>
                            <div class="arrow">
                                <div class="left"></div>
                            </div>
                        </div>
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
                        finishCallback && finishCallback();
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
                doneClasses: {},
                failClasses: {},
                gearClasses: {},
            }
        },

        props: {
            taskDate: Object,
            mode: String,
        },

        computed: {
            taskName() {
                return this.$store.getters.getTaskName(this.taskDate.id)
            },
            isPendingMode() {
                return this.mode === 'mode:pending'
            },
            isSuccessMode() {
                return this.mode === 'mode:success'
            },
            isFailureMode() {
                return this.mode === 'mode:failure'
            }
        },

        created() {
            chain.clearAnimationState("anime-rot", 3, this.doneClasses);
            chain.clearAnimationState("anime-rot", 3, this.failClasses);
            chain.clearAnimationState("anime-rot", 3, this.gearClasses);
        },

        methods: {
            onCancel() {
                this.$emit('modal:cancel');

                chain.clearAnimationState("anime-rot", 3, this.doneClasses);
                chain.clearAnimationState("anime-rot", 3, this.failClasses);
                chain.clearAnimationState("anime-rot", 3, this.gearClasses);
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
                    chain.beginAnimation("anime-rot", this.doneClasses);
                    chain.beginAnimation("anime-rot", this.gearClasses);
                }
            },
            failButtonPress() {
                if (!this.taskDate.finished) {
                    chain.beginAnimation("anime-rot", this.failClasses);
                    chain.beginAnimation("anime-rot", this.gearClasses);
                }
            },
            doneButtonRelease() {
                chain.abortAnimation("anime-rot", 3, this.doneClasses);
                chain.abortAnimation("anime-rot", 3, this.gearClasses);
            },
            failButtonRelease() {
                chain.abortAnimation("anime-rot", 3, this.failClasses);
                chain.abortAnimation("anime-rot", 3, this.gearClasses);
            },
            doneMovingBlockTransitionEnd() {
                chain.continueAnimation("anime-rot", 3, this.doneClasses, this.onTaskCompleted.bind(this));
                chain.continueAnimation("anime-rot", 3, this.gearClasses, null);
            },
            failMovingBlockTransitionEnd() {
                chain.continueAnimation("anime-rot", 3, this.failClasses, this.onTaskFailed.bind(this));
                chain.continueAnimation("anime-rot", 3, this.gearClasses, null);
            },
        }
    }

</script>

<style scoped lang="sass">
    @import "completeTaskModal.scss"
</style>