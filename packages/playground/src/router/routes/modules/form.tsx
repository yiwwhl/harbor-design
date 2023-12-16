import BasicLayout from "@/layout/BasicLayout";
import Form from "@harbor-design/icons/menus/form.svg";

const form = {
	path: "/form",
	name: "Form",
	meta: {
		locale: "表单",
		icon: <Form />,
		order: 1,
	},
	component: BasicLayout,
	children: [
		{
			path: "dynamicArco",
			name: "DynamicArco",
			meta: {
				locale: "动态表单 Arco",
			},
			component: () => import("@/views/Form/DynamicArco/index"),
		},
		{
			path: "dynamicNaive",
			name: "DynamicNaive",
			meta: {
				locale: "动态表单 Naive",
			},
			component: () => import("@/views/Form/DynamicNaive/index"),
		},
	],
};

export default form;
