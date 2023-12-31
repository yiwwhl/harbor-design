import { setupAuthGuard } from "@/router/guards/authGuard";
import { Router } from "vue-router";

export function setupRouteGuards(router: Router) {
	setupAuthGuard(router);
}
