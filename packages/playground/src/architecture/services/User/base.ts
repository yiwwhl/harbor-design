import { IService } from "@/architecture/types";
import router from "@/router";
import useUserStore from "@/store/modules/user";

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
	constructor(public userStore = useUserStore()) {
		super();
	}

	avaliableRouteNames = ["UserCenter"];

	login = () => {
		this.userStore.saveToken(`dev token`);
		router.push("/");

		return Promise.resolve("ok");
	};

	logout = () => {
		this.userStore.clearToken();
		router.replace({
			name: "Login",
		});
	};
}
