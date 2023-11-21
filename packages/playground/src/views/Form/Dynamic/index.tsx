import { Button, Input } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const [setup, { submit }] = useForm({
      schemas: [
        {
          label: "用户名",
          field: "username",
          component: Input,
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
          field: "usernew",
          component: Input,
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
              label: "年龄",
              field: "age",
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
          ],
        },
        {
          type: "list",
          field: "listtest",
          label: "列表",
          children: [
            {
              label: "测试改变值",
              field: "testchange",
              component: Input,
              defaultValue({ model }) {
                return `${model?.listtest?.[0].hobby ?? ""}`;
              },
            },
            {
              label: ({ model }) => {
                return `爱好呀${model?.listtest?.[0].hobby ?? ""}`;
              },
              field: "hobby",
              component: Input,
              defaultValue: "默认值设定的联动效果",
              componentProps({ model }) {
                return new Promise((resolve) => {
                  // 异步了
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
