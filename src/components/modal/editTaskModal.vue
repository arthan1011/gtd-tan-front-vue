<template>
    <div class="modal-container">
        <div class="header">
            <div class="header-title">Edit</div>
            <div class="close-button" @click="onCancel">
                <span></span>
            </div>
        </div>
        <div class="body">
            <div class="edit-field">
                <div class="field">
                    <div class="label">
                        <label for="taskName">Name</label>
                    </div>
                    <div class="input">
                        <input id="taskName" @keyup.enter="submitNewName()" type="text" name="taskName" v-model="task.name">
                    </div>
                </div>
                <button type="button" @click="submitNewName()" :disabled="!taskNameIsValid">Save</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'edit-task-modal',

        props: {
            task: Object
        },

        computed: {
            taskNameIsValid() {
                if (this.task.name) {
                    return this.task.name.trim().length !== 0;
                }
                return false;
            }
        },

        methods: {
            onCancel() {
                this.$emit('modal:hide')
            },

            submitNewName() {
                this.$emit('edit:name', {
                    id: this.task.id,
                    name: this.task.name
                });
            },
        }
    }
</script>

<style scoped lang="sass">
    @import "editTaskModal.scss"
</style>