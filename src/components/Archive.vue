<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useArchiveStore } from '../stores/archive.store';
import ArchiveCard from './ArchiveCard.vue';
import ButtonDefault from './ButtonDefault.vue';
import CategoryFilters from './CategoryFilters.vue';
import { useCategoryStore } from '../stores/category.store';

const storeArchive = useArchiveStore();
const storeCategory = useCategoryStore();
const counter = computed(() => {
    if (storeCategory.categoryStats) {
        return storeCategory.categoryStats['archive'];
    }
});

onMounted( async () => {
    await storeArchive.fetchEmployees();
});


</script>

<template>
    <div class="archive">
        <div class="archive__head">
            <h1 class="archive__head-title">Архив</h1>
            <div class="archive__head-counter">{{ counter }}</div>
        </div>
        <div class="archive__buttons">
            <ButtonDefault text="Очистить архив" color="red" txt-color="white" />
        </div>
        <div class="archive__employees">
            <CategoryFilters mode="archive" />
            <div class="archive__cards">
                <ArchiveCard 
                v-for="employee in storeArchive.employees"
                :key="employee.id"
                :photo="employee.photo"
                :name="employee.name"
                :position="employee.position"
                :mail="employee.email"
                :id="employee.id ?? 0"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .archive {

        &__head {
            display: flex;
            gap: 20px;
            font-weight: 500;
            font-size: 32px;

            &-counter {
                color: var(--color-gray);
            }
        }

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
            grid-template-columns: repeat(auto-fit, minmax(238px, 263px));
            gap: 22px;
        }
    }
</style>