<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue';
import IconSearch from '../assets/svg/IconSearch.vue';

const isActive = ref<boolean>(false);
const input = useTemplateRef<HTMLInputElement>('input');

async function switchActive() {
    if (!isActive.value) {
        isActive.value = true;
        await nextTick();
        input.value?.focus();
    } else {
        isActive.value = false;
        if (input.value) {
            input.value.value = '';
        }
    }
}    


</script>

<template>
    <div class="search">
        <IconSearch v-show="!isActive" @click="switchActive" />
        <input type="text" class="search__input" v-show="isActive" ref="input" @blur="switchActive">
    </div>
</template>

<style scoped lang="scss">
    .search {
        position: fixed;
        width: 100%;
        padding: 24px 46px;
        z-index: 100;
        background-color: var(--color-white);

        &__input {
            height: 22px;
            padding: 0;
            border: none;
            outline: none;
            appearance: none;
            font-family: var(--font-family);
            font-size: 16px;
            line-height: 16px;
            color: var(--color-dark);
            caret-color: var(--color-dark);
        }

        svg {
            display: flex;
            cursor: pointer;
        }
    }
</style>