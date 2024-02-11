<template>
<IMModal :show="show" width="400px" @update:show="emits('close')">
    <div v-if="show" class="root">
        <h3>Создание задачи</h3>
        <div class="input-addon__required">Название</div>
        <input v-model="newTask.name"/>

        <div class="input-addon__required">Описание</div>
        <textarea v-model="newTask.description"/>

        <div class="input-addon">Категория</div>
        <IMSelect
            v-model:value="newTask.category"
            :options="categoryOptions"
        />

        <button class="saveButton" @click="createTask()">Сохранить</button>
        <button v-if="newTask.id>=0" class="deleteBtn" @click="deleteTask()">Удалить</button>
    </div>
</IMModal>
</template>

<script setup lang="ts">
import IMModal from "@/components/ui/IMModal.vue";

import type {ITaskItem} from "@/Interface/ITaskItem";
import IMSelect from "@/components/ui/IMSelect.vue";
import {taskCategoryList} from "@/libs/taskList/TaskListHelper";

interface IProps {
    task: ITaskItem,
    show: boolean
}

interface IEmits {
    (event: 'createTask', task: ITaskItem): void
    (event: 'close'): void
    (event: 'deleteTask', id: number): void
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const newTask = Object.assign(props.task)

const categoryOptions = Object.values(taskCategoryList);

const validateFields = (): boolean => {
    const validValues = [newTask.name, newTask.description];
    return !validValues.includes('');
}

const createTask = () => {
    if(validateFields()) {
        emits('createTask', newTask);
    }
    else {
        alert('Заполните обязательные поля');
    }
}
const deleteTask = () => {
    emits('deleteTask', newTask.id);
}

</script>

<style scoped>
.root {
    position: relative;
    background-color: #fff;
    border: 0;
    box-shadow: 0 4px 12px #00000026;
    padding: 20px 30px;
    border-radius: 5px;
    min-height: 300px;
}
.saveButton {
    margin-top: 30px;
    width: 100%;
}
.deleteBtn {
    background-color: #F44336;
    margin-top: 30px;
    width: 100%;
}
</style>