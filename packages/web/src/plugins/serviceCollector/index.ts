import { registAllServices } from "@/architecture";

export function ServiceAutoLoader() {
	return {
		install() {
			registAllServices();
		},
	};
}
