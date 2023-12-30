import BasicLayout from "@/layout/BasicLayout";
import Home from "@/assets/icons/menus/home.svg";

const home = {
	path: "/home",
	name: "Home",
	meta: {
		locale: "Home",
		icon: <Home />,
		order: 0,
	},
	component: BasicLayout,
	redirect: {
		name: "About",
	},
	children: [
		{
			path: "about",
			name: "About",
			meta: {
				locale: "About",
			},
			component: () => import("@/views/Home/About/index"),
		},
		{
			path: "plan",
			name: "Plan",
			meta: {
				locale: "Plan",
			},
			component: () => import("@/views/Home/Plan/index"),
		},
	],
};

export default home;
