<script setup lang="ts">

interface IEmits {
    (event: 'delete',): void,
    (event: 'cancel',): void,
}

const emits = defineEmits<IEmits>();

</script>

<template>
<div class="bottomMenu">
    <button class="btn cancelBtn" @click="emits('cancel')">Отменить</button>
    <button class="btn deleteBtn" @click="emits('delete')">Удалить</button>
</div>
</template>

<style scoped>
.bottomMenu {
    position: fixed;
    bottom: 0;
    left: 50%;
    padding: 20px 50px;
    display: flex;
    background: #FFF;
    border-radius: 10px 10px 0px 0px;
    transform: translateX(-50%);
    border: 1px solid #25252526;
}
.cancelBtn {
    border-color: #25252526;
    background-color: #FFF;
    color: #252525;
    width: 150px;
}
.deleteBtn {
    margin-left: 20px;
    border-color: #F44336;
    background-color: #F44336;
    color: #fff;
    width: 150px;
}
</style>