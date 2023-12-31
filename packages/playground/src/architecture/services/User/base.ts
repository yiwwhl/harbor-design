import { IService } from "@/architecture/types";
import router from "@/router";
import useUserStore from "@/store/modules/user";
import request from "@/utils/Request";

export interface IUserService extends IService {
	login: AnyPromiseFn;
	logout: AnyFunction;
}

export abstract class AbstractUserService implements IUserService {
	abstract avaliableRouteNames: string[];
	abstract login: AnyPromiseFn;
	abstract logout: AnyFunction;
}

export default class BaseUserService extends AbstractUserService {
	constructor(
		public _userStore = useUserStore(),
		public _request = request,
	) {
		super();
	}

	avaliableRouteNames = ["UserCenter"];

	login = (res: AnyObject) => {
		console.log("login model:", res);
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("done");
				this._userStore.saveToken(`dev token`);
				router.push("/");
			}, 1000);
		});
	};

	logout = () => {
		this._userStore.clearToken();
		router.replace({
			name: "Login",
		});
	};
}
