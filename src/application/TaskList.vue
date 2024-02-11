<template>
<div>
    <div class="tasksHeader">
        <TaskListLogo class="logo"/>

        <TaskCategoryFilter
            v-model:category="filters.category"
        />
        <TaskListSearch
            v-model:search="filters.search"
        />
        <button class="headerAddBtn" @click="openTaskCreator()">Добавить задачу</button>
    </div>
    <h1 class="title">Список задач</h1>
    <!--фильтры-->

    <TaskStatusFilter

        v-model:status="filters.status"
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
                @click="openTaskCreator(task)"
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
    <TaskListCreator
        v-if="detailInfoTask !== null"
        :task="detailInfoTask"
        :show="true"

        @close="detailInfoTask = null"
        @createTask="createTask($event)"
        @deleteTask="deleteTask($event)"
    />
</div>
</template>


<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import TaskListCacheManager from "@/libs/casheManager/TaskListCacheManager";

import TaskListEmpty from "@/components/taskList/TaskListEmpty";

import type {ITaskItem} from "@/Interface/ITaskItem";
import TaskListCreator from "@/components/taskList/TaskListCreator.vue";
import TaskListElement from "@/components/taskList/TaskListElement.vue";
import TaskCategoryFilter from "@/components/taskList/filters/TaskCategoryFilter.vue";
import type {TTaskCategory} from "@/Interface/TTaskCategory";
import TaskListLogo from "@/components/taskList/TaskListLogo.vue";
import TaskStatusFilter from "@/components/taskList/filters/TaskStatusFilter.vue";
import type {TTaskStatus} from "@/Interface/TTaskStatus";
import TaskListSearch from "@/components/taskList/filters/TaskListSearch.vue";
import getDefaultTask from "@/libs/default/getDefaultTask";
import clone from "@/libs/general/DeepClone";


const taskList = ref<ITaskItem[]>(TaskListCacheManager.getList() || []);

const detailInfoTask = ref<null|ITaskItem>(null);
const filters = reactive({
    status: null as null|TTaskStatus,
    category: null as null|TTaskCategory,
    search: '',
})

const filteredList = computed<ITaskItem[]>(()=> {
    return taskList.value.filter(task => {
        const bySearch = (task.description + task.name).includes(filters.search)
        const byCategory = filters.category === null || filters.category === task.category
        const byStatus = filters.status === null || filters.status === task.status
        return bySearch && byCategory && byStatus;
    });
})

const clearFilter = () => {
  filters.status = null;
  filters.search = '';
  filters.category = null;
}

const updateTaskList = () => {
    TaskListCacheManager.setList(taskList.value);
}

const openTaskCreator = (task?: ITaskItem) => {
    if(!task) {
        task = getDefaultTask()
    }
    detailInfoTask.value = clone(task);
}

const createTask = (task: ITaskItem) => {
    detailInfoTask.value = null;
    const editedIndex = taskList.value.findIndex(t=>t.id === task.id)
    if(task.id >= 0 && editedIndex !== -1) {
        taskList.value.splice(editedIndex, 1, task)
    }
    else {
        task.id = taskList.value.length + 1
        taskList.value.push(task);
    }
    updateTaskList();
}

const deleteTask = (id: number) => {
    detailInfoTask.value = null;
    const editedIndex = taskList.value.findIndex(t=>t.id === id)
    if(editedIndex !== -1) {
        taskList.value.splice(editedIndex, 1)
    }
    updateTaskList();
}

</script>

<style scoped>
.tasksHeader {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
}
.logo {
    flex-basis: 100%;
    font-size: 20px;
    font-weight: 800;
    line-height: 50px;
    @media screen and (max-width: 670px) {
        display: none;
    }
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