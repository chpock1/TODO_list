<template>
<section class="listElement">
    <div class="d-flex">
        <h1
            v-if="categoryInfo"
            :class="['category', categoryInfo.color_code]"
        >
            {{ categoryInfo.label }}
        </h1>

    </div>
    <h2 class="title trim-lines">{{task.name}}</h2>
    <p class="description trim-lines">{{task.description}}</p>
</section>


</template>


<script setup lang="ts">
import type {ITaskItem} from "@/Interface/ITaskItem";
import {taskCategoryList, taskStatusList} from "@/libs/taskList/TaskListHelper";
import {computed} from "vue";

interface IProps {
    task: ITaskItem,
}

interface IEmits {
    (event: 'update:status', value: string,): void,
    (event: 'update:tag', value: string,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const categoryInfo = computed(() => {
    return props.task.category && taskCategoryList[props.task.category];
})
</script>

<style scoped>
.listElement {
    padding: 15px 20px;
    border-radius: 10px;
    background: #fff;
    position: relative;
    cursor: pointer;
}
.category {
    color: var(--task-color);
    flex-basis: 100%;
    margin: 0;
}
.title {
    font-weight: 600;
    font-size: 16px;
}
.description {
    --count-trim-lines: 2;
    font-size: 14px;
    position: relative;
    height: 32px;
}
.description::after {
    content: '';
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 90%);
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>