<template>
    <header class="app-header">
        <div class="left-btn-wrapper">
            <button v-bind:class="classObject" @click="addButtonClick">{{ addMode ? 'Add' : 'Cancel' }}</button>
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
            return {
                addMode: true
            }
        },

        computed: {
            classObject: function() {
                return {
                    "add-btn": this.addMode,
                    "cancel-btn": !this.addMode,
                }
            }
        },

        methods: {
            addButtonClick() {
                this.$emit(this.addMode ? 'add:daily' : 'cancel:daily');
                this.addMode = !this.addMode;
            }
        }
    }
</script>

<style lang="sass">
    @import "appHeader.scss"
</style>