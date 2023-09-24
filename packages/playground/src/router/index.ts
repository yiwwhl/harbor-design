import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

// console.log("routes", ...routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    ...routes,
  ],
});

export default router;
