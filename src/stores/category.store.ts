import { defineStore } from "pinia";
import type { Category } from "../interfaces/category.interface";
import { ref } from "vue";
import axios from "axios";
import { API_ROUTES } from "../api";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<Category[]>();
    type counters = Record<string, number>;
    const categoryStats = ref<counters>();

    async function fetchCategories() {
        const { data } = await axios.get<Category[]>(API_ROUTES.categories);
        categories.value = data;
    }

    async function getCategoryCounters() {
        const { data } = await axios.get(API_ROUTES.counters);
        categoryStats.value = data;
    }

    return { categories, fetchCategories, getCategoryCounters, categoryStats }
});