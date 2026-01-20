<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue';
import IconSearch from '../assets/svg/IconSearch.vue';
import { useRouter } from 'vue-router';

const isActive = ref<boolean>(false);
const submitSearch = ref<boolean>(false);
const input = useTemplateRef<HTMLInputElement>('input');
const inputValue = ref<string>('');
const router = useRouter();

async function switchActive() {
    if (!isActive.value) {
        isActive.value = true;
        await nextTick();
        input.value?.focus();
    } else {
        isActive.value = false;
        if (!submitSearch.value) {
            inputValue.value = '';
        }
        
        
    }
}

function search() {
    submitSearch.value = true;
    input.value?.blur();
    router.push({ name: 'employee-search', params: { query: inputValue.value } });
    submitSearch.value = false;
}


</script>

<template>
    <div class="search" @click="switchActive">
        <IconSearch />
        <form class="search__form" @submit.prevent="search">
            <input type="text" class="search__input" ref="input" v-model="inputValue" @blur="switchActive">
        </form>
    </div>
</template>

<style scoped lang="scss">
    .search {
        position: fixed;
        width: 100%;
        padding: 24px 46px;
        z-index: 100;
        box-shadow: 0 2px 4px 0 rgba(86, 86, 86, 0.06);
        background-color: var(--color-white);
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;

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
            cursor: pointer;
        }

        svg {
            display: flex;
        }
    }
</style>