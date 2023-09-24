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
      path: "dynamic",
      name: "Dynamic",
      meta: {
        locale: "动态表单",
      },
      component: () => import("@/views/Form/Dynamic/index"),
    },
  ],
};

export default form;
