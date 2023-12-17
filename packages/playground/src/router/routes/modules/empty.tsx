import BasicLayout from "@/layout/BasicLayout";
import Empty from "@harbor-design/icons/menus/empty.svg";

const empty = {
	path: "/emptyview",
	name: "EmptyView",
	meta: {
		locale: "空状态",
		icon: <Empty />,
		order: 5,
	},
	component: BasicLayout,
	children: [
		{
			path: "working",
			name: "Working",
			meta: {
				locale: "开发中",
			},
			component: () => import("@/views/EmptyView/Working/index"),
		},
		{
			path: "notfound",
			name: "NotFound",
			meta: {
				locale: "404",
			},
			component: () => import("@/views/EmptyView/404/index"),
		},
	],
};

export default empty;
