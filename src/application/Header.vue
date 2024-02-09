<template>
<div class="headerBlock">
    {{ title }}
</div>
</template>


<script setup lang="ts">

import {computed} from "vue";
import ToDoListCacheManager from "@/libs/casheManager/TodoListCacheManager";
import {getCountTaskByType} from "@/libs/todoList/TodoListHelper";
import type {ITaskItem} from "@/Interface/ITaskItem";

const todoListManager = ToDoListCacheManager;

const taskList = computed<ITaskItem[]>(()=> {
    const todoList = todoListManager.getList();
    if (todoList !== null) {
        return todoList;
    }
    return [];
})

const title = computed<string>(() => {
    const tasks = taskList.value;

    const count = getCountTaskByType(tasks);

    const description = [];

    // Склонять не хочется :(
    if (count.done > 0) {
        description.push(`вы уже выполнили ${count.done} задач`)
    }
    if (count.hold > 0) {
        description.push(`необходимо выполнить ${count.hold} задач`)
    }
    if (count.progress > 0) {
        description.push(`в данный момент выполняется ${count.hold} задач`)
    }
    if (description.length === 0) {
        description.push(`На сегодня задач нет, можно отдохнуть:)`)
    }

    return description.join(', ');
})
</script>

<style scoped>
.headerBlock {
    height: 35px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    border-bottom: 1px solid #e6eef5;
    transition: border .1s;
}
</style>