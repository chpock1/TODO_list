<template>
<div>
    <!--кнопка создания задачи-->
    <button @click="openTaskCreator()">Создать</button>
    <!--фильтры-->
    <TaskListFilters
        v-if="taskList.length"
        v-model:status="filters.status.value"
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
    <!--окно создания задачи-->
    <TaskListCreator v-model:show="showCreateTask" @createTask="createTask($event)"/>
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


const taskList = ref<ITaskItem[]>(TaskListCacheManager.getList() || []);

const showCreateTask = ref(false);
const filters = {
    status: ref(''),

}

const filteredList = computed<ITaskItem[]>(()=> {
    return taskList.value.filter(task => task.status.includes(filters.status.value))
})

const clearFilter = () => {
  filters.status.value = '';
}

const updateTaskList = () => {
    TaskListCacheManager.setList(taskList.value);
}

const openTaskCreator = () => {
    showCreateTask.value = true;
}
const createTask = (task: ITaskItem) => {
    task.id = taskList.value.length + 1
    taskList.value.push(task);
    updateTaskList();
}

</script>

<style module>

</style>