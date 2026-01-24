/**
 * Employees Management System
 * © 2026 Андрей Самойленко
 * All rights reserved.
 */

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './routes';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount('#app');
