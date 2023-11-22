import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css'; 
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import VueSidebarMenu from 'vue-sidebar-menu'

import Sidebar from 'primevue/sidebar';

import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(VueSidebarMenu);
app.component('Button', Button);
app.component('Menu', Menu);
app.component('Sidebar', Sidebar);
app.mount('#app');
