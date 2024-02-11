<template>
<div>
    <div class="tasksHeader">
        <TaskListLogo class="logo"/>
        <TaskCategoryFilter
            v-model:category="filters.category.value"
        />
        <button class="headerAddBtn" @click="openTaskCreator()">Добавить задачу</button>
    </div>
    <p class="title">Список задач</p>
    <!--фильтры-->
    <TaskStatusFilter

        v-model:status="filters.status.value"
        class="statusFilter"
    />

    <Transition name="fade" mode="out-in">

        <!--отсортированный лист задач-->
        <div v-if="filteredList.length" class="taskList">
            <TaskListElement
                v-for="task in filteredList"
                :key="task.id"
                :task="task"
                class="task"
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

import type {ITaskItem} from "@/Interface/ITaskItem";
import TaskListCreator from "@/components/taskList/TaskListCreator.vue";
import TaskListElement from "@/components/taskList/TaskListElement.vue";
import TaskCategoryFilter from "@/components/taskList/TaskCategoryFilter.vue";
import type {TTaskCategory} from "@/Interface/TTaskCategory";
import TaskListLogo from "@/components/taskList/TaskListLogo.vue";
import TaskStatusFilter from "@/components/taskList/TaskStatusFilter.vue";
import type {TTaskStatus} from "@/Interface/TTaskStatus";


const taskList = ref<ITaskItem[]>(TaskListCacheManager.getList() || []);

const showCreateTask = ref(false);
const filters = {
    status: ref<null|TTaskStatus>(null),
    category: ref<null|TTaskCategory>(null)
}

const filteredList = computed<ITaskItem[]>(()=> {
    return taskList.value.filter(task => {
        return true
    });
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

<style scoped>
.tasksHeader {
    display: flex;
    justify-content: space-between;
}
.logo {
    flex-basis: 100%;
    font-size: 20px;
    font-weight: 800;
    line-height: 50px;
}
.headerAddBtn {
    margin-left: 30px;
}

.title {
    margin-top: 40px;
    font-size: 16px;
    font-weight: 700;
}

.statusFilter {
    margin-top: 15px;
}

.taskList {
    margin-top: 15px;
    --count-columns: 4;
    display: grid;
    grid-template-columns: repeat(var(--count-columns), minmax(200px, 300px));
    gap: 20px;
    justify-content: center;

    @media screen and (max-width: 991px) {
        --count-columns: 3;
    }
    @media screen and (max-width: 670px) {
        --count-columns: 2;
    }
    @media screen and (max-width: 400px) {
        --count-columns: 1;
    }
}
</style>