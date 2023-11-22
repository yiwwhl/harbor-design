import { Button, Input, Select } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    function getOptions() {
      return new Promise((resolve) => {
        setTimeout(() => {
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
        }, 200);
      });
    }
    const [setup, { submit }] = useForm({
      schemas: [
        {
          label: "用户名",
          field: () => {
            return new Promise((resolve) => {
              resolve("username");
            });
          },
          component: Input,
          defaultValue: "测试用户名",
          rules: [
            {
              required: true,
              message: "用户名必填",
            },
          ],
        },
        {
          label: ({ model }) => {
            return new Promise((resolve) => {
              resolve(`用户名新版${(model.age ?? "") + "新值"}`);
            });
          },
          field: () => {
            return new Promise((resolve) => {
              resolve("password");
            });
          },
          component: Input,
          defaultValue({ model }) {
            return new Promise((resolve) => {
              resolve("测试11" + model?.listtest?.[0].hobby);
            });
          },
          rules: [
            {
              required: true,
              message: "用户名必填",
            },
          ],
        },
        {
          type: "group",
          label: "用户元数据",
          children: [
            {
              label: ({ model }) => `年龄${model.gender ?? ""}`,
              field: ({ model }) => `${model.gender ?? ""}age`,
              component: Input,
              defaultValue({ model }) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(
                      `${model?.listtest?.[0].hobby + "首次异步处理" ?? ""}`
                    );
                  }, 200);
                });
              },
            },
            {
              label: "性别",
              field: "gender",
              component: Select,
              componentProps: {
                options: getOptions,
              },
              defaultValue({ model }) {
                return new Promise((resolve) => {
                  resolve("星波12" + (model?.listtest?.[0].hobby ?? ""));
                });
              },
            },
          ],
        },
        {
          type: "list",
          field: "listtest",
          label: "列表",
          children: [
            {
              label({ model }) {
                return `测试改变值，性别 ${model.gender ?? ""}`;
              },
              field: ({ model }) => {
                return model?.listtest?.[0].hobby;
              },
              component: Input,
              defaultValue({ model }) {
                return new Promise((resolve) => {
                  resolve("测试11" + model?.listtest?.[0].hobby);
                });
              },
            },
            {
              label: ({ model }) => {
                return `爱好呀${model?.listtest?.[0].hobby ?? ""}`;
              },
              field: "hobby",
              component: () => Input,
              defaultValue() {
                return "默认值设定的联动效果";
              },
              componentProps({ model }) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      disabled: !!model.username,
                    });
                  }, 200);
                });
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
          <Button
            onClick={() => {
              submit().then((data) => {
                console.log("提交", data);
              });
            }}
          >
            提交
          </Button>
        </PageWrapper>
      );
    };
  },
});
