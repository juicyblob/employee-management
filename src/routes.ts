import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    routes: [
        {
            path: '/',
            component: () => import('./views/LoadingView.vue'),
            name: 'loading'
        },
        {
           path: '/:alias',
           component: () => import('./views/MainView.vue'),
           name: 'main'
        },
    ],
    history: createWebHistory(),
});