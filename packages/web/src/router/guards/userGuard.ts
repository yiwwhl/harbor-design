import { ProjectService } from "@/architecture/core/ProjectService";
import useUserStore from "@/store/modules/user";
import { Router } from "vue-router";

export function setupUserGuard(router: Router) {
	const UserService = ProjectService.getService("User");
	const userStore = useUserStore();
	router.beforeEach((to, __, next) => {
		if (!to.meta.public) {
			UserService.getProfile().then(({ data }) => {
				userStore.saveUser(data);
			});
		}
		next();
	});
}
