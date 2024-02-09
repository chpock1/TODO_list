<template>
<select
    v-model="localValue"
    @change="updateParent()"
>
    <option
        v-for="option in options"
        :value="option.value"
    >
        {{ option.label }}
    </option>
</select>
</template>


<script setup lang="ts">
import type {ISelectOption} from "@/Interface/ISelectOption";
import {ref} from "vue";
const lol = (a)=> console.log(a)
interface IProps {
    value: string | number,
    options: ISelectOption<string | number>[],
}

interface IEmits {
    (event: 'update:value', value: string | number,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const localValue = ref(props.value);

const updateParent = () => {
    emits('update:value', localValue.value)
}

</script>

<style module>

</style>