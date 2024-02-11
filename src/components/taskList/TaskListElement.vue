<template>
<section class="listElement">
    <p>Имя: {{task.name}}</p>
    <p>Описание: {{task.description}}</p>
    <p class="elementStatus">Статус: {{taskStatusList[task.status]}}</p>
</section>


</template>


<script setup lang="ts">
import type {ITaskItem} from "@/Interface/ITaskItem";
import {taskStatusList} from "@/libs/taskList/TaskListHelper";

interface IProps {
    task: ITaskItem,
}

interface IEmits {
    (event: 'update:status', value: string,): void,
    (event: 'update:tag', value: string,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

</script>

<style scoped>
.listElement {
    padding: 15px 20px;
    border-radius: 10px;
    background: #fff;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.elementStatus {
    align-self: flex-end;
}
</style>