<template>
    <div class="message">{{ msg }}</div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Hello, Vue-loader'
            }
        }
    }
</script>

<style>
    .message {
        color: red;
    }
</style>