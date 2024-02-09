<template>
<Dialog :show="show" width="400px" @update:show="emits('update:show', $event)">
    <div class="root">
        <h3>Создание задачи</h3>
        <div class="input-addon__required">Название</div>
        <input v-model="newTask.name"/>

        <div class="input-addon">Описание</div>
        <input v-model="newTask.description"/>

        <div class="input-addon__required">Статус</div>
        <Select :options="taskStatusList" v-model:value="newTask.status"/>

        <button class="saveButton" @click="createTask()">Сохранить</button>
    </div>
</Dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";

import Dialog from "@/components/ui/Dialog.vue";

import type {ITaskItem} from "@/Interface/ITaskItem";
import Select from "@/components/ui/Select.vue";
import {taskStatusList} from "@/libs/taskList/TaskListHelper";

interface IProps {
    show: boolean,
}

interface IEmits {
    (event: 'update:show', value: boolean,): void,
    (event: 'createTask', task: ITaskItem): void
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const newTask = ref<ITaskItem>({
    id: 0,
    name: "",
    description: "",
    status: 'hold',
})

const createTask = () => {
    emits('createTask', newTask.value);
    emits('update:show', false);

}

</script>

<style scoped>
.root {
    position: relative;
    background-color: #fff;
    border: 0;
    box-shadow: 0 4px 12px #00000026;
    padding: 10px 30px;
    border-radius: 5px;
    min-height: 300px;
}
.saveButton {
    margin-top: 30px;
    width: 100%;
}
</style>