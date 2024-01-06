import { IService } from "@/architecture/types";
import useUserStore from "@/store/modules/user";
import request from "@/utils/Request";

export interface IUserService extends IService {
	getProfile: AnyPromiseFn;
}

export abstract class AbstractUserService implements IUserService {
	abstract avaliableRouteNames: string[];

	abstract getProfile: AnyPromiseFn;
}

export default class BaseUserService extends AbstractUserService {
	constructor(
		public _userStore = useUserStore(),
		public _request = request,
	) {
		super();
	}

	avaliableRouteNames = ["UserCenter"];

	getProfile = () => {
		return this._request.get("/user/profile");
	};
}
