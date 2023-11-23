import { Button, Input } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const defaultValue = ref();

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
              component: Input,
              defaultValue({ model }) {
                return (
                  "异步默认依赖测试：" +
                  defaultValue.value +
                  `${model.listtest?.[0]?.hobby}`
                );
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
              defaultValue: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("异步默认值");
                  }, 2000);
                });
              },
              componentProps({ model }) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      disabled: !!model.username,
                    });
                  }, 2000);
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
