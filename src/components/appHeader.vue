<i18n src="./messages/appHeader.yml" />

<template>
    <header class="app-header">
        <div class="header-item-wrapper">
            <button v-if="mode !== 'mode:none'" v-bind:class="classObject" @click="addButtonClick">{{buttonLabel}}</button>
        </div>
        <nav class="links">
            <router-link v-t="'daily'" class="r-link" to="/daily" tag="button">Daily</router-link><router-link v-t="'donation'" class="r-link" to="/donation" tag="button">Donation</router-link>
        </nav>
        <div class="header-item-wrapper reverse">
            <a class="logout" href="/logout"><span></span></a>
            <gtd-selector :options="locales" :initial="locale" @selected="changeLocale"/>
        </div>
    </header>
</template>

<script>

    import GtdSelector from "components/select.vue";

    export default {
        name: 'app-header',
        components: {
            GtdSelector,
        },

        data() {
            return {
                locales: [
                    { value: 'ru', label: 'RU (Русский)' },
                    { value: 'en', label: 'EN (English)' },
                ],
                locale: this.$gtd.getLocale()
            }
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
                return this.isAddMode() ? this.$t('add') : this.$t('cancel');
            }
        },

        methods: {
            isAddMode() {
                return this.mode === 'mode:add';
            },

            addButtonClick() {
                this.$emit(this.isAddMode() ? 'add:daily' : 'cancel:daily');
            },

            changeLocale(locale) {
                this.$gtd.setLocale(locale);
                this.locale = locale;
            }
        }
    }
</script>

<style scoped lang="sass">
    @import "style/appHeader"
</style>