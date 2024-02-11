<template>
<section class="listElement">
    <div class="categoryWrap">
        <input type="checkbox" @click.stop>
        <h1
            :class="['category', categoryInfo.color_code]"
        >
            {{ categoryInfo.label }}
        </h1>
        <IMPopover>
            <template #title>
                <Action class="moreBtn"/>
            </template>
            <template #content>
                <p
                    v-for="(status, value) of taskStatusList"
                    :key="value"
                    @click="emits('update:status', value)"
                >
                    {{status}}
                </p>
            </template>
        </IMPopover>

    </div>
    <h2 class="title trim-lines">{{task.name}}</h2>
    <p class="description trim-lines">{{task.description}}</p>
    <span class="elementStatus">{{taskStatusList[task.status]}}</span>
</section>


</template>


<script setup lang="ts">
import {computed} from "vue";
import {taskCategoryList, taskStatusList} from "@/libs/taskList/TaskListHelper";
import type {ITaskItem} from "@/Interface/ITaskItem";

import Action from "@/components/icons/Action";
import IMPopover from "@/components/ui/IMPopover.vue";

interface IProps {
    task: ITaskItem,
}

interface IEmits {
    (event: 'update:status', value: string,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const categoryInfo = computed(() => {
    if(props.task.category) {
        return taskCategoryList[props.task.category]
    }
    else {
        return {
            label: '',
            value: '',
            color_code: '',
        }
    }
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
.categoryWrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.category {
    color: var(--task-color);
    flex-basis: 100%;
    margin: 0;
    margin-left: 5px;
}
.moreBtn {

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