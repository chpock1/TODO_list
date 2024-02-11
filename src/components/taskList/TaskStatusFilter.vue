<template>
<div class="statusList">
    <button
        v-for="(label, value) in taskStatusList"
        :key="value"
        :class="['statusBtn', value!==status && 'statusBtnUnActive']"
        @click="updateSelectedStatus(value)"
    >
        {{ label }}
    </button>
</div>
</template>


<script setup lang="ts">
import IMSelect from "@/components/ui/IMSelect.vue";
import {taskStatusList} from "@/libs/taskList/TaskListHelper";
import type {TTaskStatus} from "@/Interface/TTaskStatus";

interface IProps {
    status: null|TTaskStatus,
}

interface IEmits {
    (event: 'update:status', value: null|TTaskStatus,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const updateSelectedStatus = (status: TTaskStatus) => {
    const newStatus = status === props.status ? null : status
    emits('update:status', newStatus)
}

</script>

<style scoped>
.statusList {
    display: flex;
    margin-left: -10px;
}

.statusBtn {
    padding: 10px 20px;
    margin-left: 10px;
}
.statusBtnUnActive {
    border-color: #000000;
    background-color: #FFF;

    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #252525;

}
</style>