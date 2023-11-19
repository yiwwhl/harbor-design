import { Input } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const [setup] = useForm({
      schemas: [
        {
          label: "用户名",
          field: "username",
          component: Input,
          defaultValue: "default username",
        },
        {
          label: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve("密码");
              }, 500);
            });
          },
          field: () => "password",
          component: () => Input,
          defaultValue: () => "default password",
        },
        {
          label: "用户名2",
          field: "username",
          component: Input,
          defaultValue: "default username",
        },
      ],
    });

    return () => {
      return (
        <PageWrapper title="DynamicForm">
          <ProForm setup={setup} />
        </PageWrapper>
      );
    };
  },
});
