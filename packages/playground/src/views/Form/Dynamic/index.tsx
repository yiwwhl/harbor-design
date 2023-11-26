import { Button, Input, Select } from "@arco-design/web-vue";
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

    onBeforeMount(async () => {
      const res = await getOptions();
      Object.assign(genderOptions, res);
    });

    const [setup, { submit }] = useForm({
      schemas: [
        {
          type: "group",
          label: "list label",
          children: [
            {
              label: "测试0",
              field: "test0",
              component: Input,
              defaultValue() {
                return new Promise((resolve) => {
                  resolve("done");
                });
              },
            },
            {
              label: "测试1",
              field: "test1",
              component({ model }) {
                return new Promise((resolve) => {
                  resolve(model.test0 ? Input : Select);
                });
              },
              defaultValue({ model }) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("model: =>" + model.list1?.[0]?.testArr1);
                  }, 100);
                });
              },
            },
          ],
        },
        {
          type: "list",
          field: "list1",
          label: "list label",
          children: [
            {
              label: "测试更多",
              field: "testmore",
              component: Select,
              componentProps({ model }) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      options: getOptions,
                      allowSearch: () => {
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            resolve(!!model.test0);
                          }, 2000);
                        });
                      },
                    });
                  }, 300);
                });
              },
              defaultValue() {
                return "hi";
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
