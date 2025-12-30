import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    routes: [
        {
            path: '/',
            component: () => import('./views/LoadingView.vue'),
            name: 'loading'
        },
        {
           path: '/employees/:alias',
           component: () => import('./views/MainView.vue'),
           name: 'employees'
        },
    ],
    history: createWebHistory(),
});