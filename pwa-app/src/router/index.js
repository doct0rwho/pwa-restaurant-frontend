import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/Auth.vue";
import Menu from "@/views/Menu.vue";

const routes = [
  {
    path: '/*',
    redirect: { name: Home }
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: About,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;