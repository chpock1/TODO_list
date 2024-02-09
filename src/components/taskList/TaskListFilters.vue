<template>
<Select :options="taskStatusList" :value="status" @update:value="emits('update:status', $event)"/>

</template>


<script setup lang="ts">
import Select from "@/components/ui/Select.vue";
import {taskStatusList} from "@/libs/taskList/TaskListHelper";

interface IProps {
    status: string,
    tag: string,
}

interface IEmits {
    (event: 'update:status', value: string,): void,
    (event: 'update:tag', value: string,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();


</script>

<style module>

</style>