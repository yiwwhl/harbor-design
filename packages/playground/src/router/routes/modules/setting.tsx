import BasicLayout from "@/layout/BasicLayout";
import Setting from "@/assets/icons/menus/setting.svg";

const setting = {
	path: "/setting",
	name: "Setting",
	meta: {
		locale: "Setting",
		icon: <Setting />,
		order: 10,
	},
	component: BasicLayout,
	redirect: {
		name: "UserCenter",
	},
	children: [
		{
			path: "usercenter",
			name: "UserCenter",
			meta: {
				locale: "UserCenter",
			},
			component: () => import("@/views/Setting/UserCenter/index"),
		},
	],
};

export default setting;
