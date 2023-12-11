import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/Auth.vue";
import Menu from "@/views/Menu.vue";
import Favorites from "@/views/Favorites.vue";
import Profile from "@/views/Profile.vue";
import Settings from "@/views/Profile/Settings.vue";
import Staff from "@/views/AuthStaff.vue";
import StaffProfile from "@/views/StaffProfile.vue";
import StaffSettings from "@/views/Profile/StaffSettings.vue";
import Admin from "@/views/Cabinets/Admin.vue";
import Cook from "@/views/Cabinets/Cook.vue";
import Waiter from "@/views/Cabinets/Waiter.vue";
import Demo from "@/views/Cabinets/Demo.vue";
import EditMenu from "@/views/Cabinets/EditMenu.vue";


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

  },
  {
    path: "/staff",
    name: "Staff",
    component: Staff,
  },
  {
    path: "/staff/profile",
    name: "StaffProfile",
    component: StaffProfile,
  },
  {
    path: "/staff/profile/settings",
    name: "StaffSettings",
    component: StaffSettings,
  },
  {
    path: "/workerSpace/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/workerSpace/cook",
    name: "Cook",
    component: Cook,
  },
  {
    path: "/workerSpace/waiter",
    name: "Waiter",
    component: Waiter,
  },
  {
    path: "/workerSpace/demo",
    name: "Demo",
    component: Demo,
  },
  {
    path: "/workerSpace/editMenu",
    name: "EditMenu",
    component: EditMenu,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, 
});

export default router;