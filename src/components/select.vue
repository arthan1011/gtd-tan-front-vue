<template>
    <div class="gtd-selector">
        <button class="gtd-selector-button" @click="showOptions">{{ currentLabel }}</button>
        <div class="options" :class="[isOptionsShown ? 'active' : '']">
            <div v-for="option in options" @click="select(option.value)" class="gtd-option">
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gtd-selector',

        props: {
            options: {
                type: Array,
                "default": []
            },
            initial: String
        },

        data() {
            return {
                selectedValue: this.initial,
                isOptionsShown: false,
            }
        },

        computed: {
            currentLabel() {
                let find = this.options.find(o => o.value === this.selectedValue);
                return find === undefined ? '' : find.label;
            }
        },

        mounted() {
            // TODO: pushed listener should be removed on component unmount, use map instead of onWindowClickList
            this.$gtd.onWindowClickList.push(e => {
                if (!e.target.matches('.gtd-selector-button')) {
                    if (this.isOptionsShown) {
                        this.isOptionsShown = false;
                    }
                }
            });
        },

        methods: {
            showOptions() {
                this.isOptionsShown = true;
            },

            select(value) {
                this.selectedValue = value;
                this.$emit('selected', value);
            }
        }
    }
</script>

<style scoped lang="sass">
    @import "style/select"
</style>