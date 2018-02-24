<template>
    <div class="bb-dropdown">
        <transition name="fade">
            <div class="wormhole"
                 v-show="showList"
                 @click="hideList">
                <div class="list" v-bind:style="listCoordinates">
                    <div v-for="item in items" class="bb-dropdown-item" @click="selectItem(item)">
                        <div>{{item.label}}</div>
                    </div>
                </div>
            </div>
        </transition>
        <button @click="toggleListVisibility($event)"><span>{{dataPlaceholder}}</span><span class="arrow-down">▼</span></button>
    </div>
</template>

<script>
    export default {
        name: "bb-dropdown",

        props: {
            placeholder: String,
            items: {
                type: Array,
                "default": []
            }
        },

        data() {
            return {
                showList: false,
                dataPlaceholder: this.placeholder,
                listCoordinates: {
                    top: '0',
                    left: '0',
                    width: '100px'
                }
            }
        },

        mounted() {
            this.cc = this.$gtd.uniCounter++;
            this.$gtd.onWindowScrollMap[this.cc] = (e) => {
                this.showList = false;
            }
        },
        destroyed() {
            delete this.$gtd.onWindowScrollMap[this.cc];
        },

        methods: {
            toggleListVisibility(event) {
                const element = event.target.closest('button');
                const pos = element.getBoundingClientRect();
                console.log('bottom', pos.bottom);
                console.log('left', pos.left);

                this.listCoordinates.top = pos.bottom + 'px';
                this.listCoordinates.left = pos.left + 'px';
                this.listCoordinates.width = (pos.right - pos.left) + 'px';

                console.log('di');
                this.showList = !this.showList;
            },

            hideList() {
                this.showList = false;
            },

            selectItem(item) {
                this.dataPlaceholder = item.label;
                this.$emit('onSelect', item);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~colors.scss";
    .bb-dropdown {
        position: relative;
        margin-right: 5px;
        button {
            min-width: 150px;
            width: 100%;
            height: 100%;
            text-transform: none;
            font-size: 18px;
            background-color: $color-background;
            color: $new-color-1;
            border: 1px solid $new-color-2;
            text-align: left;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .wormhole {
            position: fixed;
            z-index: 1001;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            .list {
                cursor: pointer;
                position: fixed;
                z-index: 2;
            }
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.3s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
        .fade-enter-to, .fade-leave {
            opacity: 1;
        }
    }
    .bb-op-0 {
        opacity: 0;
        transition: opacity 0.3s;
    }
    .bb-op-1 {
        opacity: 1;
        transition: opacity 0.3s
    }
    .bb-dropdown-item {
        font-size: 18px;
        box-sizing: border-box;
        padding: 10px;
        background-color: $color-background;
        color: lighten($second-color, 20);
        border: 1px solid $new-color-1;
        border-bottom: none;
        &:first-child {
            border-top: none;
        }
        &:last-child {
            border-bottom: 1px solid $new-color-1;
        }
        &:hover {
            color: $new-color-1;
        }
    }
    .arrow-down {
        font-size: 12px;
    }
</style>