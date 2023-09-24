import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

// console.log("routes", ...routes);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    ...routes,
  ],
});

export default router;
