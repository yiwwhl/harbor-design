import router from "@/router";
import useUserStore from "@/store/modules/user";
import request from "@/utils/Request";

export interface IAuthService {
	login: AnyPromiseFn;
	logout: AnyFunction;
	getToken: AnyFunction;
}

export abstract class AbstractAuthService implements IAuthService {
	abstract login: AnyPromiseFn;
	abstract logout: AnyFunction;
	abstract getToken: AnyFunction;
}

export default class BaseAuthService extends AbstractAuthService {
	constructor(
		public _userStore = useUserStore(),
		public _request = request,
	) {
		super();
	}

	avaliableRouteNames = ["UserCenter"];

	login = (res: AnyObject) => {
		return this._request.post("/auth/login", res).then(({ data }) => {
			this._userStore.saveToken(data.token);
			router.push("/");
		});
	};

	logout = () => {
		this._userStore.clearToken();
		router.replace({
			name: "Login",
		});
	};

	getToken = () => {
		const userStore = useUserStore();
		return userStore.user.token;
	};
}
