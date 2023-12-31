import { IUserService } from "@/architecture/services/User/base";

/**
 * 若希望各个业务模块产生对应的类型提示，则需要在全局范围内进行类型注入，
 * 当然受限于 TS 本身静态的特性与项目复杂度的综合考虑，这里只设计基本的
 * interface，唯一的缺陷是业务模块的定义和类型的注入隔离了，但由于本质
 * 上业务抽象后接口统一的准则，也无伤大雅
 */
interface ServiceMap {
	User: IUserService;
}

export class ProjectService {
	private constructor() {}

	static avaliableRouteNames: string[] = [];

	// @ts-expect-error
	static serviceMap: ServiceMap = {};

	static regist(serviceKey: keyof any, service: AnyObject) {
		// @ts-expect-error
		this.serviceMap[serviceKey] = service;
	}

	static getService(serviceKey: keyof ServiceMap) {
		return this.serviceMap[serviceKey];
	}
}
