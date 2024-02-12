// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/mainPage.vue"),
    alias: "/",
  },
  {
    path: "/favourite",
    component: () => import("@/pages/favouriteMovies.vue"),
  },
  {
    path: "/movie",
    component: () => import("@/pages/movieFullInfo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
