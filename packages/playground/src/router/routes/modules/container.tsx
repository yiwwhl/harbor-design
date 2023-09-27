import BasicLayout from "@/layout/BasicLayout";
import ContainerIcon from "@harbor-design/icons/menus/container.svg";

const container = {
  path: "/container",
  name: "Container",
  meta: {
    locale: "容器",
    icon: <ContainerIcon />,
    order: 2,
  },
  component: BasicLayout,
  redirect: {
    name: "About",
  },
  children: [
    {
      path: "wrapper",
      name: "Wrapper",
      meta: {
        locale: "Wrapper",
      },
      component: () => import("@/views/Container/Wrapper/index"),
    },
  ],
};

export default container;
