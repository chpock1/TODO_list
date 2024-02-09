<template>
<select
    :value="value"
    @update:value="emits('update:value', $event)"
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

interface IProps {
    value: string | number,
    options: ISelectOption<string | number>[],
}

interface IEmits {
    (event: 'update:value', value: string,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

</script>

<style module>

</style>