<template>
    <header class="app-header">
        <div class="left-btn-wrapper">
            <button v-bind:class="classObject" @click="addButtonClick">{{buttonLabel}}</button>
        </div>
        <nav class="links">
            <router-link class="r-link" to="/daily" tag="button">Daily</router-link><router-link class="r-link" to="/other" tag="button">Other</router-link>
        </nav>
        <a class="logout" href="/logout"><span></span></a>
    </header>
</template>

<script>
    export default {
        name: 'app-header',

        data() {
            return {}
        },

        props: {
            mode: {
                type: String,
                "default": "mode:add"
            }
        },

        computed: {
            classObject() {
                return {
                    "add-btn": this.isAddMode(),
                    "cancel-btn": !this.isAddMode(),
                }
            },
            buttonLabel() {
                return this.isAddMode() ? 'Add' : 'Cancel';
            }
        },

        methods: {
            isAddMode() {
                return this.mode === 'mode:add';
            },

            addButtonClick() {
                this.$emit(this.isAddMode() ? 'add:daily' : 'cancel:daily');
            }
        }
    }
</script>

<style lang="sass">
    @import "appHeader.scss"
</style>