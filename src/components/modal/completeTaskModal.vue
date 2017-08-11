<template>
    <div class="complete-task-modal">
        <div class="modal-mask" v-show="show">
            <div class="modal-container">
                <button @click="onCancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'complete-task-modal',

        data() {
            return {}
        },

        props: {
            show: Boolean
        },

        methods: {
            onCancel() {
                this.$emit('modal:cancel');
            }
        }
    }
</script>

<style lang="sass">
    @import "completeTaskModal.scss"
</style>