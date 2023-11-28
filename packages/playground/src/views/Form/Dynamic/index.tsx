import { Button, Input, Select } from "@arco-design/web-vue";
import {
  PageWrapper,
  ProForm,
  useForm,
  useModifiers,
} from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";
import styles from "./index.module.scss";

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
          label: "测试0",
          field: "ohly",
          component: Input,
          required: true,
          defaultValue() {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve("heeeeeeeee");
              }, 2000);
            });
            return "hello1";
          },
        },
        {
          type: "list",
          field: "list1",
          label: "list label",
          children: [
            {
              label: ({ model }) => `${model.ohly}` + "测试更多",
              field: "testmore",
              component: Select,
              required: true,
              componentProps() {
                return {
                  options: getOptions,
                  allowSearch: true,
                  filterOption: useModifiers((inputValue: any) => {
                    console.log("inputValue", inputValue);
                  }, "raw"),
                  allowClear: () => true,
                };
              },
            },
            {
              label: "改一改",
              field: "change",
              component: Input,
              required: true,
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
