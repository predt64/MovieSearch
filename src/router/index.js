// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/MainPage.vue"),
    alias: "/",
  },
  {
    path: "/favourite",
    component: () => import("@/pages/FavouriteMoviesPage.vue"),
  },
  {
    path: "/movie/:id",
    component: () => import("@/pages/MovieFullInfoPage.vue"),
    name:'movie'
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
