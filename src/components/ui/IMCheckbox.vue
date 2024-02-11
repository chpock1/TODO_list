<script setup lang="ts">
import {onUpdated, ref, watch} from "vue";

interface IProps {
    value: boolean,
}

interface IEmits {
    (event: 'update:value', value: boolean,): void,
    (event: 'change', value: boolean,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const checked = ref(props.value);

watch(checked, (val)=> {
    emits('update:value', val);
    emits('change', val);
})
onUpdated(()=> {
    if(props.value !== checked.value) {
        checked.value = props.value
    }
})
</script>

<template>
<input type="checkbox" v-model="checked" @click.stop>
</template>

<style scoped>

</style>