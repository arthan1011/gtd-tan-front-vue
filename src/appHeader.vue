<template>
    <div class="app-header">
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
        background-color: darkcyan;
    }
    .app-header .logout {
        font-size: large;
        color: greenyellow;
        text-decoration: none;
    }
</style>