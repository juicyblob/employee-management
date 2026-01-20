<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useEmployeeStore } from '../stores/employee.store';
import CategoryCard from './CategoryCard.vue';
import type { Employee } from '../interfaces/employee.interface';

const { query } = defineProps<{ query: string }>();
const foundEmployees = ref<Employee[]>([]);
const storeEmployee = useEmployeeStore();

watch(() => query, (newQuery) => {
    getSearchResults(newQuery)
}, { immediate: true });

const searchInfo = computed(() => {
    if (foundEmployees.value.length == 0) {
        return `По запросу с${query}» ничего не найдено`;
    } else {
        return `По запросу «${query}» найдено ${foundEmployees.value.length} совпадения`;
    }
});

onMounted(async () => {
    await storeEmployee.fetchEmployees('all');
    getSearchResults();
});

function getSearchResults(searhQuery = query) {
    let regExp = new RegExp(searhQuery, 'ig');
    foundEmployees.value = storeEmployee.employees.filter(person => {
        return regExp.test(person.name);
    });
}
    
</script>

<template>
    <div class="search-page">
        <div class="search-page__title">Результаты поиска</div>
        <div class="search-page__info">
            {{ searchInfo }}
        </div>
        <div class="search-page__cards">
            <CategoryCard
                v-for="employee in foundEmployees"
                :key="employee.id"
                :photo="employee.photo"
                :name="employee.name"
                :position="employee.position"
                :mail="employee.email"
                :id="employee.id ?? 0"
                />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .search-page {

        &__title {
            font-weight: 500;
            font-size: 32px;
            margin-bottom: 32px;
        }

        &__info {
            font-weight: 400;
            font-size: 14px;
            color: var(--color-gray);
            padding-bottom: 10px;
            border-bottom: 1px solid #dadadf;
        }

        &__cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(238px, 263px));
            gap: 22px;
            margin-top: 32px;
        }
    }
</style>