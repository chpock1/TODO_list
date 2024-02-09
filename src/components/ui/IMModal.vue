<template>
<Teleport to="body">
    <Transition name="fade">
        <aside
            v-if="show"
            class="overlay"
            @click.stop="$emit('update:show', false)"
        >
            <section
                class="overlay__content"
                :style="{ width: width }"
                @click.stop
            >
                <slot name="default"></slot>
            </section>
        </aside>
    </Transition>
</Teleport>
</template>

<script setup lang="ts">

interface IProps {
    show: boolean,
    width: string,
}

interface IEmits {
    (event: 'update:show', value: boolean,): void,
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();


</script>

<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 5;
    top: 0;
    left: 0;
}
.overlay__content {
    overflow: auto;
}
</style>