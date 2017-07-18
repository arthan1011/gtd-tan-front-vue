<template>
    <div>
        <label for="blocksCheckbox">Show blocks</label>
        <input id="blocksCheckbox" type="checkbox" v-model="showBlocks"/>
        <div v-bind:class="blocksContainer">
            <div>First block</div>
            <template v-if="showBlocks">
                <div>Second block</div>
                <div>Third block</div>
            </template>
            <template v-else>
                <div>Fourth block</div>
                <div>Fifth block</div>
            </template>
        </div>
        <span>Test</span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                blocksContainer: 'blocks-container',
                showBlocks: true
            }
        }
    }
</script>
<style>
    .blocks-container {
        display: flex;
        flex-flow: row;
    }
    .blocks-container > div {
        width: 200px;
        margin: 5px;
        height: 160px;
        line-height: 160px;
        font-family: Verdana, sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        background-color: cornflowerblue;
    }
</style>