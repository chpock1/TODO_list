<template>
<div class="root" >
    <button :popovertarget="UID" class="popoverBtn" @click.stop>
        <slot name="title">Open Popover</slot>
    </button>

    <div popover :id="UID" class="popoverContent" @click.stop>
        <slot name="content"></slot>
    </div>

</div>
</template>

<script setup lang="ts">

const UID =generateUID().toString();

function generateUID() {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}
</script>

<style scoped>
.root {
    position: relative;
}
.popoverBtn {
    border: 0;
    background: none;
    width: auto;
    padding: 0;
    margin: 0;
}
.popoverContent {
    padding: 20px;
    border: 1px solid black;
    border-radius: 6px;
}
</style>