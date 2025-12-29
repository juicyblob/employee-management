import { defineStore } from "pinia";
import type { Employee } from "../interfaces/employee.interface";
import { ref } from "vue";
import axios from "axios";
import { API_ROUTES } from "../api";
import {v4 as uuidv4} from "uuid";
import employeesData from '../data/employees.json';
import { USER_ID_KEY } from '../utils/constants';

export const useEmployeeStore = defineStore('employee', () => {
    const employees = ref<Employee[]>([]);
    const categoryEmployees = ref<Employee[]>([]);
    const currentSort = ref<string>('date');

    async function fetchEmployees(alias: string) {
        const { data } = await axios.get<Employee[]>(API_ROUTES.employees, {
            params: {
                category: alias,
                sort: currentSort.value
            }
        });
        employees.value = data;
    }

    async function getEmpoyeesByAlias(alias: string) {
        if (employees.value) {
            if (alias == 'all') {
                categoryEmployees.value = employees.value;
            } else {
                categoryEmployees.value = employees.value?.filter((employee) => employee.department === alias);
            }
            
        }
    }

    async function uploadDemoEmployees() {
        const userId = uuidv4();
        localStorage.setItem(USER_ID_KEY, userId);
        
        for (const employee of employeesData) {
            await axios.post<Employee>(API_ROUTES.employees, employee);
        }
        
    }

    return { employees, fetchEmployees, uploadDemoEmployees, getEmpoyeesByAlias, categoryEmployees }
});