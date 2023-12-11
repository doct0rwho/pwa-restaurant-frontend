import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../src/custom-styles.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css'; 
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import VueSidebarMenu from 'vue-sidebar-menu'
import vue3GoogleLogin from 'vue3-google-login'
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Sidebar from 'primevue/sidebar';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Change the URL to your Socket.io server

const app = createApp(App);
app.config.globalProperties.$socket = socket;

app.use(vue3GoogleLogin, {
    clientId: '1078415963516-oqv1vs5r16be0gta4rup75f00tvj13b5.apps.googleusercontent.com'
});

app.use(PrimeVue);
app.use(router);
app.use(VueSidebarMenu);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Menu', Menu);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);
app.component('Sidebar', Sidebar);
app.component('Textarea', Textarea);

app.mount('#app');
