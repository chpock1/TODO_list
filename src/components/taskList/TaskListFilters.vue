<template>
<IMSelect :options="options" :value="status" @update:value="emits('update:status', $event)"/>

</template>


<script setup lang="ts">
import IMSelect from "@/components/ui/IMSelect.vue";
import {taskStatusList} from "@/libs/taskList/TaskListHelper";

interface IProps {
    status: string,
}

interface IEmits {
    (event: 'update:status', value: string|number,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const options = Object.entries(taskStatusList).map(([value, label]) => ({value, label}))

</script>

<style module>

</style>