<script setup lang="ts">
    type colorOption = 'blue' | 'yellow' | 'red';
    type textColor = 'white' | 'dark';
    const { text, color, txtColor, isDisabled = false} = defineProps<{ text: string, color: colorOption, txtColor: textColor, isDisabled?: boolean}>();
</script>

<template>
    <button 
    class="default-button" 
    :style="{'background-color': `var(--color-${!isDisabled ? color : 'gray'})`, 'color': `var(--color-${txtColor})`}"
    :disabled="isDisabled"
    >
        {{ text }}
    </button>
</template>

<style scoped lang="scss">
    .default-button {
        border: none;
        outline: none;
        appearance: none;
        cursor: pointer;
        font-family: var(--font-family);
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
        padding: 12px 24px;
        min-width: 140px;
        border-radius: 4px;
        transition: opacity .3s ease;

        &:disabled:hover {
            opacity: 1;
        }

        &:hover {
            opacity: 0.85;
        }
    }
</style>