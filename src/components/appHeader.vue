<i18n src="./messages/appHeader.yml" />

<template>
    <header class="app-header">
        <div class="header-item-wrapper">
            <button v-if="mode !== 'mode:none'" v-bind:class="classObject" @click="addButtonClick">{{buttonLabel}}</button>
        </div>
        <nav class="links">
            <router-link v-t="'daily'" class="r-link" to="/daily" tag="button">Daily</router-link><router-link v-t="'donation'" class="r-link" to="/donation" tag="button">Donation</router-link>
        </nav>
        <div class="header-item-wrapper">
            <div class="gtd-selector">
                <button class="gtd-selector-button" @click="showOptions">{{ currentLocale }}</button>
                <div class="options" :class="[isOptionsShown ? 'active' : '']">
                    <div v-for="locale in locales" @click="changeLocale(locale.value)" class="gtd-option">
                        {{ locale.label }}
                    </div>
                </div>
            </div>
            <a class="logout" href="/logout"><span></span></a>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'app-header',

        data() {
            return {
                isOptionsShown: false,
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
            currentLocale() {
                return this.locales.find(l => l.value === this.locale).label;
            },
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

        mounted() {
            this.$gtd.onWindowClickList.push(e => {
                if (!e.target.matches('.gtd-selector-button')) {
                    if (this.isOptionsShown) {
                        this.isOptionsShown = false;
                    }
                }
            });
        },


        methods: {
            isAddMode() {
                return this.mode === 'mode:add';
            },

            addButtonClick() {
                this.$emit(this.isAddMode() ? 'add:daily' : 'cancel:daily');
            },

            showOptions() {
                this.isOptionsShown = true;
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