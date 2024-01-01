import BasicLayout from "@/layout/BasicLayout";
import Form from "@/assets/icons/menus/form.svg";

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
				locale: "Arco 表单",
			},
			component: () => import("@/views/Form/DynamicArco/index"),
		},
		{
			path: "dynamicNaive",
			name: "DynamicNaive",
			meta: {
				locale: "Naive 表单",
			},
			component: () => import("@/views/Form/DynamicNaive/index"),
		},
	],
};

export default form;
