<template>
<section>
    {{task.name}}
    {{task.description}}
    {{task.status}}
</section>


</template>


<script setup lang="ts">
import type {ITaskItem} from "@/Interface/ITaskItem";

interface IProps {
    task: ITaskItem,
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