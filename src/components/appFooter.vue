<i18n>
    en:
      createdBy: "Created by Artur Shamsiev"
    ru:
      createdBy: "Создал Артур Шамсиев"
</i18n>

<template>
    <div class="footer">
        {{ $t('createdBy') }} |
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