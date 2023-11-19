import { Input, Select } from "@arco-design/web-vue";
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
          type: "group",
          label: "用户元数据",
          children: [
            {
              label: "性别",
              field: "gender",
              component: Select,
              componentProps: {
                options: () => {
                  return new Promise((resolve) => {
                    resolve([
                      {
                        label: "男",
                        value: "male",
                      },
                      {
                        label: "女",
                        value: "female",
                      },
                    ]);
                  });
                },
              },
            },
          ],
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
