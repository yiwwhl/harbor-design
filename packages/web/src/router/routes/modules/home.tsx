import BasicLayout from "@/layout/BasicLayout";
import Home from "@/assets/icons/menus/home.svg";

const home = {
	path: "/home",
	name: "Home",
	meta: {
		locale: "主页",
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
				locale: "关于",
			},
			component: () => import("@/views/Home/About/index"),
		},
		{
			path: "plan",
			name: "Plan",
			meta: {
				locale: "计划",
			},
			component: () => import("@/views/Home/Plan/index"),
		},
	],
};

export default home;
