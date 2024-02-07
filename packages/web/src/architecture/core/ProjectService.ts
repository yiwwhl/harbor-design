import { IAuthService } from "@/architecture/services/Auth/base";
import { IFileService } from "@/architecture/services/File/base";
import { IUserService } from "@/architecture/services/User/base";
import { App } from "vue";

/**
 * 若希望各个业务模块产生对应的类型提示，则需要在全局范围内进行类型注入，
 * 当然受限于 TS 本身静态的特性与项目复杂度的综合考虑，这里只设计基本的
 * interface，唯一的缺陷是业务模块的定义和类型的注入隔离了，但由于本质
 * 上业务抽象后接口统一的准则，也无伤大雅
 */
export interface ServiceMap {
	Auth: IAuthService;
	User: IUserService;
	File: IFileService;
}

export class ProjectService {
	private constructor() {}

	static app: App;

	static avaliableRouteNames: string[] = [];

	// @ts-expect-error
	static serviceMap: ServiceMap = {};

	static regist(serviceKey: keyof ServiceMap, service: any) {
		this.serviceMap[serviceKey] = service;
	}

	static getService<K extends keyof ServiceMap>(serviceKey: K): ServiceMap[K] {
		return this.serviceMap[serviceKey];
	}
}
