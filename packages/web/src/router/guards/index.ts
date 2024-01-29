import { setupAuthGuard } from "@/router/guards/authGuard";
import { setupUserGuard } from "@/router/guards/userGuard";
import { Router } from "vue-router";

export function setupRouteGuards(router: Router) {
	setupAuthGuard(router);
	setupUserGuard(router);
}
