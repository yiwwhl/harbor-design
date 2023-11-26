import { Button, Input, InputNumber, Select } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent, onBeforeMount, reactive } from "vue";
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

    const genderOptions = reactive([]);
    const resValue = reactive({});

    onBeforeMount(async () => {
      const res = await getOptions();
      Object.assign(genderOptions, res);

      setTimeout(() => {
        Object.assign(resValue, {
          test0: "he",
          list1: [{ other: "hi" }],
        });
      }, 500);

      setTimeout(() => {
        Object.assign(resValue, {
          test0: "he2",
          list1: [{ other: "hi" }],
        });
      }, 1500);

      hydrate(resValue);
    });

    const [setup, { submit, hydrate }] = useForm({
      schemas: [
        {
          type: "group",
          label: ({ model }) => model.test1 + "list label",
          children: [
            {
              label: "测试0",
              field: "test0",
              component: Input,
              defaultValue: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("testdefault");
                  }, 800);
                });
              },
            },
            {
              component: InputNumber,
              label: "222",
              field: "211",
              componentProps: {
                max: 100,
                min: 2,
              },
            },
            {
              label: "测试1",
              field: "test1",
              component: Select,
              defaultValue({ model }) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("model: =>" + model.list1?.[0]?.testArr1);
                  }, 100);
                });
              },
            },
            {
              label: "讽刺",
              field: "hahah",
              component: Input,
              required: true,
            },
          ],
        },
        {
          type: "list",
          field: "list1",
          label: "list label",
          children: [
            {
              label: ({ model }) => model.test0 + "测试更多",
              field: "testmore",
              component: Select,
              required: true,
              componentProps({ model }) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      options: getOptions,
                      allowSearch: () => {
                        return new Promise((resolve) => {
                          resolve(!!model.test0);
                        });
                      },
                    });
                  }, 300);
                });
              },
            },
            {
              label: "测试数组1",
              field: "testArr1",
              component: Input,
              defaultValue() {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("list1 value");
                  }, 1000);
                });
              },
            },
            {
              label: "其他必填",
              field: "other",
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
