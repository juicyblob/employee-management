<script setup lang="ts">
    type colorOption = 'green' | 'red';
    const { text, color } = defineProps<{ text: string, color: colorOption }>();

</script>

<template>
    <button
    class="card-button"
    :style="{ 'backgroundColor': `var(--color-${color})`}"
    >
    {{ text }}
    </button>
</template>

<style scoped lang="scss">
    .card-button {
        border: none;
        outline: none;
        appearance: none;
        cursor: pointer;
        font-family: var(--font-family);
        color: var(--color-white);
        font-size: 14px;
        line-height: 14px;
        font-weight: 500;
        padding: 9px;
        width: 100%;
        border-radius: 4px;
        transition: opacity .3s ease;

        &:hover {
            opacity: 0.85;
        }
    }
</style>