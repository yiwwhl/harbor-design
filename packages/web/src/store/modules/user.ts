import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
	state: () => ({
		user: {
			token: "",
			id: undefined,
			nickname: undefined,
			username: undefined,
			gender: undefined,
			email: undefined,
		} as AnyObject,
	}),
	getters: {
		isLoggedIn(state) {
			return !!state.user.token;
		},
	},
	actions: {
		saveUser(_user: AnyObject) {
			Object.assign(this.user, _user);
		},
		saveToken(_token: string) {
			this.user.token = _token;
		},
		clearToken() {
			this.user.token = "";
		},
	},
	persist: true,
});

export default useUserStore;
