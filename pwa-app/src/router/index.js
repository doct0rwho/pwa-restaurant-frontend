import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/Auth.vue";
import Menu from "@/views/Menu.vue";
import Favorites from "@/views/Favorites.vue";
import Profile from "@/views/Profile.vue";
import Settings from "@/views/Profile/Settings.vue";



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
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  }, 
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/profile/settings",
    name: "Settings",
    component: Settings,

  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;