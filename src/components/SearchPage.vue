<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useEmployeeStore } from '../stores/employee.store';
import CategoryCard from './CategoryCard.vue';
import type { Employee } from '../interfaces/employee.interface';
import EmployeeDeatail from './Employee.vue';
import Notification from './Notification.vue';
import { useNotificationStore } from '../stores/notification.store';

const { query } = defineProps<{ query: string }>();
const foundEmployees = ref<Employee[]>([]);
const storeEmployee = useEmployeeStore();
const storeNotification = useNotificationStore();
const showEmployeeDetails = ref<boolean>(false);

watch(() => query, (newQuery) => {
    getSearchResults(newQuery)
}, { immediate: true });

const searchInfo = computed(() => {
    if (foundEmployees.value.length == 0) {
        return `По запросу «${query}» ничего не найдено`;
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

async function selectEmployee(id: number) {
    await storeEmployee.getEmployeeById(id);
    showEmployeeDetails.value = true;
}

function updateSearchResult() {
    getSearchResults();
}
    
</script>

<template>
    <div class="search-page" v-if="!showEmployeeDetails">
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
                @select-employee="selectEmployee"
                />
        </div>
    </div>
    <EmployeeDeatail 
    v-else 
    :employee="storeEmployee.selectEmployee" 
    @backward="() => showEmployeeDetails = false"
    @update-search="updateSearchResult"
    />
    <Notification :show="storeNotification.show" :text="storeNotification.message" />
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