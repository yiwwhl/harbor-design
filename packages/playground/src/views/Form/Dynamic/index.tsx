import { Button, Input, InputNumber, Select } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
  setup() {
    const [setup, { submit }] = useForm({
      schemas: [
        {
          label({ model }) {
            return model.hello + "Hello Form";
          },
          field: "hello",
          component: Input,
        },
        {
          type: "group",
          label: "用户基本信息",
          children: [
            {
              label: "姓名",
              field: "name",
              component: Input,
            },
            {
              label: "年龄",
              field: "age",
              component: InputNumber,
            },
            {
              label: "性别",
              field: "gender",
              component: Select,
              componentProps: {
                options: [
                  {
                    label: "男",
                    value: "male",
                  },
                  {
                    label: "女",
                    value: "female",
                  },
                ],
              },
            },
          ],
        },
        {
          type: "list",
          label: "经历",
          field: "experience",
          children: [
            {
              label: "工作",
              field: "job",
              component: Input,
            },
            {
              label: "学校",
              field: "school",
              component: Input,
              defaultValue: "20",
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
