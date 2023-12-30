import BasicLayout from "@/layout/BasicLayout";
import Table from "@harbor-design/icons/menus/table.svg";

const table = {
	path: "/table",
	name: "Table",
	meta: {
		locale: "Table",
		icon: <Table />,
		order: 1,
	},
	component: BasicLayout,
	children: [
		{
			path: "proTable",
			name: "ProTable",
			meta: {
				locale: "ProTable",
			},
			component: () => import("@/views/Table/ProTable/index"),
		},
	],
};

export default table;
