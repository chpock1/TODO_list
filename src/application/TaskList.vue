<template>
<div>
    <!--кнопка создания задачи-->
    <button @click="openTaskCreator()">Создать</button>

    <!--окно создания задачи-->
    <TaskListCreator v-model:show="showCreateTask" @createTask="createTask($event)"/>

    <!--фильтры-->
    <TaskListFilters
        v-if="taskList.length"
        v-model:status="filters.status.value"
        v-model:tag="filters.tag.value"
    />

    <Transition name="fade" mode="out-in">

        <!--отсортированный лист задач-->
        <div v-if="filteredList.length">
            <TaskListElement
                v-for="task in filteredList"
                :key="task.id"
                :task="task"
            />
        </div>

        <!--пустой лист-->
        <TaskListEmpty
            v-else
            :includeFilter="taskList.length > 0"
            @clearFilter="clearFilter"
        />
    </Transition>
</div>
</template>


<script setup lang="ts">
import {computed, ref} from "vue";
import TaskListCacheManager from "@/libs/casheManager/TaskListCacheManager";

import TaskListEmpty from "@/components/taskList/TaskListEmpty";
import TaskListFilters from "@/components/taskList/TaskListFilters.vue";

import type {ITaskItem} from "@/Interface/ITaskItem";
import TaskListCreator from "@/components/taskList/TaskListCreator.vue";
import TaskListElement from "@/components/taskList/TaskListElement.vue";


const taskList = TaskListCacheManager.getList() || [];

const showCreateTask = ref(false);
const filters = {
    tag: ref(''),
    status: ref(''),

}

const filteredList = computed<ITaskItem[]>(()=> {
    return taskList.filter(task => task.status === filters.status.value)
})

const clearFilter = () => {
  filters.tag.value = '';
  filters.status.value = '';
}

const updateTaskList = () => {
    TaskListCacheManager.setList(taskList);
}

const openTaskCreator = () => {
    showCreateTask.value = true;
}
const createTask = (task: ITaskItem) => {
    task.id = taskList.length + 1
    taskList.push(task);
    updateTaskList();
}

</script>

<style module>

</style>