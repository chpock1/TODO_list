<template>
    <input v-model="localValue" placeholder="Поиск по задачам.."/>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

interface IProps {
    search: string,
}

interface IEmits {
    (event: 'update:search', value: string,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const localValue = ref(props.search);

const updateSearch = (search: string) => emits('update:search', search)

watch(localValue, updateSearch.bind(localValue.value))
</script>

<style scoped>

</style>