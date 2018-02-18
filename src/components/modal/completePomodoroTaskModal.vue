<i18n src="./messages/completePomodoroTaskModal.yml" />

<template>
    <div class="modal-container">
        <div class="modal-header">
            <div class="header">
                {{taskName}}: {{taskState}}
            </div>
            <div :class="['modal-close-button', canClose ? '' : 'blocked']" @click="onClose">
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
                    <div class="start-btn"
                         v-if="!dirty"
                         :class="startButtonClass"
                         @transitionend="startButtonDone"
                         @mouseup="startButtonRelease"
                         @mouseleave="startButtonRelease"
                         @mousedown="startButtonPress">
                        <div class="moving-element"></div>
                        <div class="text-overlay" v-html="$t('pressToStart')"></div>
                    </div>
                    <button class="pause-btn"
                            type="button"
                            v-if="inOperation"
                            @click="pauseTimer">{{ $t('button.pause') }}</button>
                    <button class="resume-btn"
                            type="button"
                            v-if="!inOperation && dirty"
                            @click="resumeTimer">{{ $t('button.resume') }}</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    const OUTER_RADIUS = 98;

    const requestFrame = (callback) => {
        setTimeout(callback, 1000 / 60)
    };

    export default {
        name: 'complete-pomodoro-task-modal',

        data() {
            return {
                startButtonClass: {
                    "starting": false,
                },
                inOperation: false,
                dirty: false,
                finished: false,
                remainingTime: -1,
                duration: 25 * 60,
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
                    return this.$t('readyToStart')
                }
                if (this.inOperation) {
                    return this.$t('inOperation')
                }
                if (this.finished) {
                    return this.$t('done')
                }
                if (!this.finished && !this.inOperation) {
                    return this.$t('paused')
                }
            }
        },

        created() {
            this.remainingTime = this.duration * 1000;
        },

        mounted() {
            let canvas = this.$el.querySelector('#pomodoro-canvas');
            this.ctx = canvas.getContext('2d');
            this._drawTimer();
        },

        methods: {
            startButtonPress() {
                this.startButtonClass.starting = true;
            },

            startButtonRelease() {
                this.startButtonClass.starting = false;
            },

            startButtonDone() {
                if (this.startButtonClass.starting === true) {
                    this.startTimer();
                }
            },

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
                const CENTER_RADIUS = 15;

                // center
                this.ctx.fillStyle = '#FF4400';
                this.ctx.beginPath();
                this.ctx.moveTo(100, 100);
                this.ctx.arc(100, 100, CENTER_RADIUS, Math.PI, Math.PI + Math.PI*2);
                this.ctx.fill();

                //center outline
                this.ctx.strokeStyle = 'white';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(100-CENTER_RADIUS, 100);
                this.ctx.arc(100, 100, CENTER_RADIUS, Math.PI, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.stroke();

                // outer outline
                this.ctx.strokeStyle = 'white';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(100-OUTER_RADIUS, 100);
                this.ctx.arc(100, 100, OUTER_RADIUS, Math.PI, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.stroke();
            },

            _clearCanvas() {
                this.ctx.clearRect(0, 0, 200, 100);
                this._drawBG();
            },

            _drawTimer(remainingTime) {
                const RADIUS = 98;
                const PARTS = 6;
                const DECREAS_PERCENT = 50;

                let heights = [];
                for (let k = 0; k < PARTS; k++) {
                    const decrease = ((100 - DECREAS_PERCENT) / 100);
                    let height = RADIUS - Math.floor(RADIUS * decrease * (k / PARTS));
                    let degree = (k + 1) / PARTS;
                    heights.push({
                        height,
                        degree,
                    });
                }

                this.ctx.clearRect(0, 0, 200, 100);

                let totalTime = this.duration * 1000;
                const fraction = (totalTime - remainingTime) / totalTime;


                let currentPartIndex = Math.floor(fraction * PARTS);

                for (let i = currentPartIndex; i >= 0; i--) {

                    let radians;
                    if (i === currentPartIndex) {
                        radians = Math.PI * fraction;
                    } else {
                        radians = Math.PI * heights[i].degree;
                    }

                    // fill remained space
                    this.ctx.beginPath();
                    this.ctx.moveTo(100, 100);
                    this.ctx.arc(100, 100, OUTER_RADIUS, Math.PI, Math.PI + radians);
                    this.ctx.closePath();
                    this.ctx.fillStyle = '#2f54eb';
                    this.ctx.fill();

                    // fill space
                    this.ctx.beginPath();
                    this.ctx.moveTo(100, 100);
                    this.ctx.arc(100, 100, heights[i].height, Math.PI, Math.PI + radians);
                    this.ctx.fillStyle = 'green';
                    this.ctx.fill();

                    this.ctx.strokeStyle = 'yellow';
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.arc(100, 100, heights[i].height, Math.PI, Math.PI + radians);
//                    this.ctx.lineTo(100, 100);
//                    this.ctx.closePath();
                    this.ctx.stroke();

                    // sector line
                    this.ctx.moveTo(
                        (100 - OUTER_RADIUS * Math.cos(radians)),
                        (100 - OUTER_RADIUS * Math.sin(radians))
                    );
                    this.ctx.lineTo(100, 100);
                    this.ctx.stroke();
                }

                this._drawBG();
            },

            _completeTask() {
                this.inOperation = false;
                this.finished = true;
                this.$emit('task:done', {taskId: this.taskDate.id});
            },

            onClose() {
                let canClose = !this.dirty || this.finished;

                if (canClose) {
                    this.$emit('modal:cancel');
                    this.remainingTime = this.duration * 1000;
                    this._clearCanvas();
                    this.dirty = false;
                    this.inOperation = false;
                    this.finished = false;
                    this.startButtonClass.starting = false;
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
    @import "style/completePomodoroTaskModal"
</style>