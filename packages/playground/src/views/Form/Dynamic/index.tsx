import { Button, Input, Select } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
  setup() {
    const [setup, { submit }] = useForm({
      schemas: [
        {
          label({ model }) {
            return "性别" + `${model.listtest?.[0]?.hobby}`;
          },
          component({ model }) {
            return model.stable ? Input : Select;
          },
          field: "hi",
          defaultValue: 20,
        },
        {
          type: "group",
          label: "用户元数据",
          children: [
            {
              label: "稳定",
              field: "stable",
              component: ({ model }) => {
                return model.gender ? Input : Select;
              },
            },
            {
              label({ model }) {
                return "性别" + `${model.listtest?.[0]?.hobby}`;
              },
              field: "gender",
              component: Input,
              defaultValue({ model }) {
                return "性别" + `${model.listtest?.[0]?.hobby}`;
              },
            },
          ],
        },
        {
          type: "list",
          field: "listtest",
          label: "列表测试的 label",
          children: [
            {
              label({ model }) {
                return "性别2" + `${model.listtest?.[0]?.hobby}`;
              },
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
          <ProForm class={styles.proForm} setup={setup} />
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
