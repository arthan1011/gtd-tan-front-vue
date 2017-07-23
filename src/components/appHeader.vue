<template>
    <div class="app-header">
        <router-link class="r-link" to="/daily" tag="button">Daily</router-link><router-link class="r-link" to="/other" tag="button">Other</router-link>
        <a class="logout" href="/logout">Logout</a>
    </div>
</template>

<script>
    export default {
        name: 'app-header'
    }
</script>

<style lang="sass">
    @import "appHeader.scss"
</style>