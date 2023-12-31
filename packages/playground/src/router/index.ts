import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			redirect: "/home",
		},
		{
			path: "/login",
			name: "Login",
			component: () => import("@/views/Login/index"),
		},
		...routes,
	],
});

export default router;
