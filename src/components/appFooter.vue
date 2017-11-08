<template>
    <div class="footer">
        Created by Artur Shamsiev |
        <a href="mailto:brainburns@protonmail.com">brainburns@protonmail.com</a> |
        {{version}}
    </div>
</template>
<script>

    export default {
        name: "app-footer",

        data() {
            return {
                version: 'v' + this.$gtd.version
            }
        }

    }
</script>
<style lang="sass">
    @import "style/appFooter"
</style>