import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/homepage/Home.vue";
import About from "@/components/authentication/Auth.vue";
import Menu from "@/components/menu/Menu.vue";
import Favorites from "@/components/favorites/Favorites.vue";
import Profile from "@/components/profile/Profile.vue";
import Settings from "@/components/settings/Settings.vue";
import Staff from "@/components/authentication/AuthStaff.vue";
import StaffProfile from "@/components/profile/StaffProfile.vue";
import StaffSettings from "@/components/settings/StaffSettings.vue";
import Admin from "@/components/cabinets/Admin.vue";
import Cook from "@/components/cabinets/Cook.vue";
import Waiter from "@/components/cabinets/Waiter.vue";
import Demo from "@/components/cabinets/Demo.vue";
import EditMenu from "@/components/menu/EditMenu.vue";
import Chef from "@/components/cabinets/Chef.vue";
import History from "@/components/history/History.vue";
import Confirm from "@/components/authentication/confirmAuth.vue";



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
    path: "/menu/:id?",
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
  {
    path: "/workerSpace/chef",
    name: "Chef",
    component: Chef,
  },
  {
    path:"/history",
    name: "History",
    component: History,
  },
  {
    path:"/application_approved/:token?",
    name: "Confirm",
    component: Confirm,
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes, 
});

export default router;