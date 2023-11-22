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
          type: "group",
          label: "用户元数据",
          children: [
            {
              label: "稳定",
              field: "2",
              component: Input,
            },
            {
              label: "性别",
              field: "gender",
              component: Select,
              componentProps: {
                options: getOptions,
              },
              defaultValue({ model }) {
                return "测试1122" + (model?.listtest?.[0].hobby ?? "");
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
              label: "稳定测试2",
              field: "3",
              component: Input,
            },
            {
              label: "爱好",
              field: "hobby",
              component: () => Input,
              defaultValue: "测试新",
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
