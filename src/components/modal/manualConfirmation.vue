<template>
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
</template>

<script>

    export default {
        name: 'manual-confirmation',

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
            taskDate: Object,
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

<style lang="scss">
    @import "~colors.scss";

    $size: 20px;

    .manual-confirmation {
        width: 9 * $size;
        height: 10 * $size;
        background-color: #2bff5a;
        .confirm-main {
            position: relative;
            background-color: $color-background;
            width: 100%;
            height: 8 * $size;
            .block-wrapper {
                width: 5 * $size;
                height: 5 * $size;
                position: absolute;
                border: 1px solid $new-color-1;
                background-color: $unknown-color;
                overflow: hidden;
                top: 1 * $size;
                right: 2 *$size;
                .moving-block {
                    background-color: $done-color-light;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    right: 100%;
                    transform-origin: right bottom;
                }
            }
            .moving-gear {
                width: 2 * $size;
                height: 2 *$size;
                position: absolute;
                bottom: 1 * $size;
                left: 1 * $size;
                background-image: url("~images/gear-4.svg");
                background-repeat: no-repeat;
            }
        }
        .confirm-press-button {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: $done-color-light;
            width: 100%;
            height: 2 * $size;
        }
    }

    .moving-block {
        &.anime-rot-1 {
            transition: transform .6s linear;
            transform: rotate(45deg);
        }
        &.anime-rot-2 {
            transition: transform 1.2s ease-out;
            transform: rotate(75deg);
        }
        &.anime-rot-3 {
            transition: transform 0.1s ease;
            transform: rotate(90deg);
        }
        &.anime-rot-end {
            transform: rotate(90deg);
        }
        &.anime-rot-back {
            transition: transform .2s ease-in;
            transform: rotate(0deg);
        }
    }

    .moving-gear {
        &.anime-rot-1 {
            transition: transform .6s linear;
            transform: rotate(90deg);
        }
        &.anime-rot-2 {
            transition: transform 1.2s ease-out;
            transform: rotate(150deg);
        }
        &.anime-rot-3 {
            transition: transform 0.1s ease;
            transform: rotate(180deg);
        }
        &.anime-rot-end {
            transform: rotate(180deg);
        }
        &.anime-rot-back {
            transition: transform .2s ease-in;
            transform: rotate(0deg);
        }
    }
</style>