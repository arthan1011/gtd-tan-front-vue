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
                        <manual-confirmation :show="show"
                                             v-on:task:done="emitTaskCompleted"
                                             :taskDate="taskDate"></manual-confirmation>

                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    //TODO: Переделать в универсальное модальное окно с анимацией появления
    import ManualConfirmation from 'components/modal/manualConfirmation.vue';

    export default {
        name: 'complete-task-modal',
        components: {
            ManualConfirmation
        },

        props: {
            show: Boolean,
            taskDate: Object,
        },

        methods: {
            onCancel() {
                this.$emit('modal:cancel');
            },
            emitTaskCompleted() {
                this.$emit('task:done');
            },
        }
    }
</script>

<style scoped lang="sass">
    @import "completeTaskModal.scss"
</style>