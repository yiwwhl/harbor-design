import BasicLayout from "@/layout/BasicLayout";
import Table from "@/assets/icons/menus/table.svg";

const table = {
	path: "/table",
	name: "Table",
	meta: {
		locale: "表格",
		icon: <Table />,
		order: 2,
	},
	component: BasicLayout,
	children: [
		{
			path: "proTable",
			name: "ProTable",
			meta: {
				locale: "高级表格",
			},
			component: () => import("@/views/Table/ProTable/index"),
		},
	],
};

export default table;
