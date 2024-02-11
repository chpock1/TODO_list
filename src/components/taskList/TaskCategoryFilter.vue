<template>
<div class="categoryWrap">

    <div
        v-for="category of visibleCategories"
        :key="category.value"
        :class="['category', category.color_code]"
        @click="setCategory(category.value)"
    >
        {{ category.label }}

    </div>
</div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {taskCategoryList} from "@/libs/taskList/TaskListHelper";
//types
import type {ITaskCategorySetting} from "@/Interface/ITaskCategorySetting";
import type {TTaskCategory} from "@/Interface/TTaskCategory";

interface IProps {
    category: TTaskCategory | null,
}

interface IEmits {
    (event: 'update:category', value: TTaskCategory | null,): void
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();


const visibleCategories = computed<ITaskCategorySetting[]>(() => {
    return Object.values(taskCategoryList)
        .filter(category => category.value)
})

const setCategory = (value: TTaskCategory) => {
    const newCategory = value === props.category ? null : value
    emits('update:category', newCategory)
}

</script>

<style scoped>
.categoryWrap {
    display: flex;
    @media screen and (max-width: 991px) {
        display: none;
    }
}
.category {
    cursor: pointer;
    color: var(--task-color);
    border: 1px solid var(--task-color);
    padding: 15px 30px;
    border-radius: 4px;
    margin-left: 25px;
}
</style>