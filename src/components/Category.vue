<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '../stores/employee.store';
import Button from './ButtonDefault.vue';
import { computed, onMounted, ref, watch } from 'vue';
import CategoryCard from './CategoryCard.vue';
import CategoryFilters from './CategoryFilters.vue';
import CategoryHeader from './CategoryHeader.vue';
import Employee from './Employee.vue';
import Notification from './Notification.vue';
import { useNotificationStore } from '../stores/notification.store';
import { useCategoryStore } from '../stores/category.store';
import NoEmployees from './NoEmployees.vue';
import JsonExcel from "vue-json-excel3";

const storeEmployee = useEmployeeStore();
const storeNotification = useNotificationStore();
const storeCategory = useCategoryStore();
const route = useRoute();
const router = useRouter();
const showEmployeeDetails = ref<boolean>(false);

onMounted( async () => {
    const alias = route.path.replace('/employees/', '');
    await storeEmployee.fetchEmployees('all');
    await storeEmployee.getEmpoyeesByAlias(alias);
    await storeCategory.getCategoryCounters();
});

onBeforeRouteUpdate((_to, _from, next) => {
    showEmployeeDetails.value = false;
    next();
});

const alias = computed(() => {
    return route.path.replace('/employees/', '');
});

const noEmployees = computed(() => {
    if (storeCategory.categoryStats) {
        return storeCategory.categoryStats[alias.value] == 0;
    }
});

watch(alias, async (newAlias) => {
    await storeEmployee.getEmpoyeesByAlias(newAlias);
});

async function selectEmployee(id: number) {
    await storeEmployee.getEmployeeById(id);
    showEmployeeDetails.value = true;
    window.scrollTo({ top: 0, left: 0 });
}

function openAddForm() {
    router.push({ name: 'employee-new' });
}

const excelFileName = computed(() => {
    const alias = route.path.replace('/employees/', '');
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear());
    return `${alias}_${day}-${month}-${year}.xlsx`;
});

const excelFields = {
    'Имя Фамилия': 'name',
    'Должность': 'position',
    'Ставка/мес': 'salary',
    'Дата рождения': 'birthday',
    'Возраст': 'age',
    'Email': 'email',
    'Дата создания':'created_at'
}


</script>

<template>
    <div class="category" v-if="!showEmployeeDetails">
        <CategoryHeader />
        <div class="category__buttons">
            <JsonExcel
            :data="storeEmployee.categoryEmployees"
            :fields="excelFields"
            type="xlsx"
            :name="excelFileName"
            >
            <Button text="Выгрузить в Excel" color="blue" txt-color="white" :is-disabled="noEmployees" />
            </JsonExcel>
            <Button text="Добавить сотрудника" color="yellow" txt-color="dark" @click="openAddForm" />
        </div>
        <div class="category__employees">
            <CategoryFilters mode="category" :is-disabled="noEmployees" />
            <div v-if="!noEmployees" class="category__cards">
                <CategoryCard
                v-for="employee in storeEmployee.categoryEmployees"
                :key="employee.id"
                :photo="employee.photo"
                :name="employee.name"
                :position="employee.position"
                :mail="employee.email"
                :id="employee.id ?? 0"
                @select-employee="selectEmployee"
                />
            </div>
            <NoEmployees v-else />
        </div>
    </div>
    <Employee 
    v-else 
    :employee="storeEmployee.selectEmployee" 
    @backward="() => showEmployeeDetails = false"
    />
    <Notification :show="storeNotification.show" :text="storeNotification.message" />
</template>

<style scoped lang="scss">
    .category {
        padding-bottom: 80px;
        
        &__buttons {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 24px;
            margin-top: 40px;
        }

        &__employees {
            margin-top: 35px;
        }

        &__cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(238px, 263px));
            gap: 22px;

            @media (max-width: 1548px) {
                grid-template-columns: repeat(auto-fill, minmax(238px, 242px));
                gap: 20px;
            }

            @media (max-width: 1435px) {
                grid-template-columns: repeat(auto-fill, minmax(224px, 232px));
                gap: 18px;
            }

            @media (max-width: 1378px) {
                grid-template-columns: repeat(auto-fill, minmax(200px, 224px));
                gap: 16px;
            }

            @media (max-width: 1330px) {
                grid-template-columns: repeat(auto-fill, minmax(190px, 210px));
            }

            @media (max-width: 1260px) {
                grid-template-columns: repeat(auto-fill, minmax(180px, 200px));
            }

        }
    }
</style>