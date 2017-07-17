<template>
    <div>
        <label for="blocksCheckbox">Show blocks</label>
        <input id="blocksCheckbox" type="checkbox" v-model="showBlocks"/>
        <div v-bind:class="blocksContainer" v-if="showBlocks">
            <div>First block</div>
            <div>Second block</div>
            <div>Third block</div>
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