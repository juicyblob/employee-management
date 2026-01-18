<script setup lang="ts">
import { useRouter } from 'vue-router';
import ButtonDefault from './ButtonDefault.vue';

const router = useRouter();

function goToAll() {
    router.push({ name: 'employee-list', params: { alias: 'all'} });
}

</script>

<template>
    <div class="not-found">
        <span class="not-found__code">404</span>
        <h1 class="not-found__title">Ой, такой страницы нет</h1>
        <ButtonDefault 
        text="На страницу всех сотрудников" 
        color="blue" 
        txt-color="white"
        @click="goToAll"
        />
    </div>
</template>

<style scoped lang="scss">
    .not-found {
        max-width: 420px;
        text-align: center;
        //margin: 0 auto;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);

        &__code {
            font-weight: 700;
            font-size: 128px;
            color: var(--color-gray);
        }

        &__title {
            font-weight: 500;
            font-size: 32px;
            color: var(--color-dark);
            margin-bottom: 32px;
        }

    }
</style>