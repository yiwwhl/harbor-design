import { ProjectService, ServiceMap } from "@/architecture/core/ProjectService";

export function registAllServices() {
	const tsModules = import.meta.glob("./services/**/*.ts", { eager: true });
	const tsxModules = import.meta.glob("./services/**/*.tsx", { eager: true });
	const modules = {
		...tsModules,
		...tsxModules,
	};
	const processedServices: AnyObject = {};

	// 后续如果有定制化需求可以在此处通过函数参数传入额外处理函数
	Object.keys(modules).forEach((path: string) => {
		processedServices[path.replace("./services/", "").split(`/`)[0]] =
			modules[path];
	});

	Object.keys(processedServices).forEach((key) => {
		const service = new processedServices[key].default();
		ProjectService.avaliableRouteNames =
			ProjectService.avaliableRouteNames.concat(service.avaliableRouteNames);
		ProjectService.regist(key as keyof ServiceMap, service);
	});
}
