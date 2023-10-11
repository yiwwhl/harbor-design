import BasicLayout from "@/layout/BasicLayout";
import Form from "@harbor-design/icons/menus/form.svg";

const table = {
  path: "/table",
  name: "Table",
  meta: {
    locale: "表格",
    icon: <Form />,
    order: 1,
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
