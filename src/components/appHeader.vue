<template>
    <div class="app-header">
        <router-link to="/daily">Daily</router-link>
        <router-link to="/other">Other</router-link>
        <a class="logout" href="/logout">Logout</a>
    </div>
</template>

<script>
    export default {
        name: 'app-header'
    }
</script>

<style>
    .app-header {
        height: 2em;
        padding: 0 5px;
        background-color: darkcyan;
    }
    .app-header .logout {
        font-size: large;
        float: right;
        line-height: 30px;
        color: greenyellow;
        text-decoration: none;
    }
</style>