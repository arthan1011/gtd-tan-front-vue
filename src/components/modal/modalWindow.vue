<template>
    <div class="modal-window">
        <transition name="showModal">
            <div class="modal-mask" v-show="show">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'modal-window',

        props: {
            show: Boolean,
        },
    }
</script>

<style lang="scss">
    div.modal-window {
        .modal-mask {
            position: fixed;
            z-index: 1234;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(86, 122, 172, 0.5);
        }
    }

    // modal dialog animation
    .showModal-enter-active, .showModal-leave-active, .showModal-leave-active .modal-container {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .showModal-enter {
        transform: scale(1.3);
        opacity: 0;
    }
    .showModal-enter-to {
        transform: scale(1);
        opacity: 1;
    }
    .modal-mask.showModal-leave {
        opacity: 1;
    }
    .modal-mask.showModal-leave-to {
        opacity: 0;
    }
    .showModal-leave .modal-container {
        transform: scale(1);
        opacity: 1;
    }
    .showModal-leave-to .modal-container {
        transform: scale(.7);
        opacity: 0;
    }
</style>