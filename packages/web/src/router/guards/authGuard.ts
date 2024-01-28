import useUserStore from "@/store/modules/user";
import { Router } from "vue-router";

export function setupAuthGuard(router: Router) {
	const userStore = useUserStore();
	router.beforeEach((to, _, next) => {
		if (to.name === "Login" && !userStore.isLoggedIn) {
			next();
		}
		if (userStore.isLoggedIn) {
			to.name === "Login" ? next("/") : next();
		} else {
			next({
				name: "Login",
			});
		}
	});
}
