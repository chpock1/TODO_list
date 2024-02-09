<template>
<div class="headerBlock">
    {{ title }}
</div>
</template>


<script setup lang="ts">

import {computed} from "vue";
import TaskListCacheManager from "@/libs/casheManager/TaskListCacheManager";
import {getCountTaskByType} from "@/libs/taskList/TaskListHelper";

import type {ITaskItem} from "@/Interface/ITaskItem";
import DeclByNum from "@/libs/wordHelpers/DeclByNum";


const taskList = computed<ITaskItem[]>(()=> {
    const todoList = TaskListCacheManager.getList();
    if (todoList !== null) {
        return todoList;
    }
    return [];
})

const title = computed<string>(() => {
    const tasks = taskList.value;

    const count = getCountTaskByType(tasks);

    const description = [];

    // чуть костылей для склонений:(
    if (count.done > 0) {
        description.push(`вы уже выполнили ${count.done} ${DeclByNum(count.done, ['задачу', 'задачи', 'задач'])}`)
    }
    if (count.hold > 0) {
        description.push(`необходимо выполнить ${count.hold} ${DeclByNum(count.hold, ['задачу', 'задачи', 'задач'])}`)
    }
    if (count.progress > 0) {
        description.push(`в данный момент выполняется ${count.hold} ${DeclByNum(count.hold, ['задача', 'задачи', 'задач'])}`)
    }
    if (description.length === 0) {
        description.push(`На сегодня задач нет, можно отдохнуть:)`)
    }

    return description.join(', ');
})
</script>

<style scoped>
.headerBlock {
    height: var(--header-height);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    border-bottom: 1px solid #e6eef5;
    transition: border .1s;
}
</style>