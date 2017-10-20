<template>
    <div class="modal-container">
        <div class="modal-header">
            <div class="header">
                {{taskName}}: {{taskState}}
            </div>
            <div :class="['modal-close-button', canClose ? '' : 'blocked']" @click="onCancel">
                <span></span>
            </div>
        </div>
        <div class="modal-body">
            <div class="motion-container">
                <canvas id="pomodoro-canvas" width="200px" height="100px"></canvas>
            </div>
            <div class="timer-container">
                <span>{{timerString}}</span>
            </div>
            <div class="control-container">
                <template v-if="!finished">
                    <button class="start-btn" type="button" v-if="!dirty" @click="startTimer">Start</button>
                    <button class="pause-btn" type="button" v-if="inOperation" @click="pauseTimer">Pause</button>
                    <button class="resume-btn" type="button" v-if="!inOperation && dirty" @click="resumeTimer">Resume</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>

    const requestFrame = (callback) => {
        setTimeout(callback, 1000 / 60)
    };

    export default {
        name: 'complete-pomodoro-task-modal',

        data() {
            return {
                inOperation: false,
                dirty: false,
                finished: false,
                remainingTime: -1,
                duration: 10,
                ctx: null,
            }
        },

        props: {
            taskDate: Object,
        },

        computed: {
            timerString() {
                const format = (num) => num < 10 ? "0" + num : "" + num;

                const time = Math.ceil(this.remainingTime / 1000);
                let minutes = Math.floor(time / 60);
                let seconds = time % 60;
                return `${format(minutes)}:${format(seconds)}`
            },
            canClose() {
                return !this.dirty || this.finished;
            },
            taskName() {
                return this.$store.getters.getTaskName(this.taskDate.id)
            },
            taskState() {
                if (!this.dirty) {
                    return 'Ready to start'
                }
                if (this.inOperation) {
                    return 'In operation'
                }
                if (this.finished) {
                    return 'Done'
                }
                if (!this.finished && !this.inOperation) {
                    return 'Paused'
                }
            }
        },

        created() {
            this.remainingTime = this.duration * 1000;
        },

        mounted() {
            console.log('mounted');
            let canvas = this.$el.querySelector('#pomodoro-canvas');
            this.ctx = canvas.getContext('2d');
            this._drawTimer();
        },

        methods: {
            _animate(time, countdown) {
                const currentTime = performance.now();
                const delta = currentTime - time;
                const remaining = countdown - delta;
                const remainingSeconds = Math.ceil(remaining / 1000);

                this.remainingTime = remaining;
                this._drawTimer(countdown);

                if (!this.inOperation) {
                    return;
                }
                if (remainingSeconds <= 0) {
                    this._completeTask();
                    return
                }

                requestFrame(() => {
                    this._animate(currentTime, remaining);
                });
            },
            _drawBG: function () {
                // center
                this.ctx.fillStyle = 'red';
                this.ctx.beginPath();
                this.ctx.moveTo(100, 100);
                this.ctx.arc(100, 100, 15, Math.PI, Math.PI + Math.PI*2);
                this.ctx.fill();

                // outline
                this.ctx.strokeStyle = 'white';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(2, 100);
                this.ctx.arc(100, 100, 98, Math.PI, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.stroke();
            },

            _clearCanvas() {
                this.ctx.clearRect(0, 0, 200, 100);
                this._drawBG();
            },

            _drawTimer(remainingTime) {
                this.ctx.clearRect(0, 0, 200, 100);

                let totalTime = this.duration * 1000;
                const fraction = (totalTime - remainingTime) / totalTime;

                this.ctx.fillStyle = 'green';
                this.ctx.beginPath();
                this.ctx.moveTo(100, 100);
                this.ctx.arc(100, 100, 98, Math.PI, Math.PI + Math.PI * fraction);
                this.ctx.fill();

                this._drawBG();
            },

            _completeTask() {
                this.inOperation = false;
                this.finished = true;
                this.$emit('task:done', {taskId: this.taskDate.id});
            },

            onCancel() {
                let canClose = !this.dirty || this.finished;

                if (canClose) {
                    this.$emit('modal:cancel');
                    this.remainingTime = this.duration * 1000;
                    this._clearCanvas();
                    this.dirty = false;
                    this.inOperation = false;
                    this.finished = false;
                }
            },

            startTimer() {
                this.dirty = true;
                this.inOperation = true;
                requestFrame(() => {
                    this._animate(performance.now(), this.remainingTime)
                });
            },
            pauseTimer() {
                this.inOperation = false;
            },
            resumeTimer() {
                this.inOperation = true;
                requestFrame(() => {
                    this._animate(performance.now(), this.remainingTime)
                });
            }
        },
    }

</script>

<style scoped lang="sass">
    @import "completePomodoroTaskModal.scss"
</style>