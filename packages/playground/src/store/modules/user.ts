import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
	state: () => ({
		user: {
			token: "",
		} as AnyObject,
	}),
	getters: {
		isLoggedIn(state) {
			return !!state.user.token;
		},
	},
	actions: {
		saveUser(_user: AnyObject) {
			this.user = _user;
		},
		saveToken(_token: string) {
			this.user.token = _token;
		},
	},
	persist: true,
});

export default useUserStore;
