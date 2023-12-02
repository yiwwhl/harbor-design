import { Button, Input, Select } from "@arco-design/web-vue";
import {
  PageWrapper,
  ProForm,
  useForm,
  useModifiers,
} from "@harbor-design/arco-design-vue";
import { defineComponent, nextTick, onMounted } from "vue";
import styles from "./index.module.scss";

/**
 * 后续应该新增文档，对于 native 来说，Form 永远是后面的 schema 覆盖前面的 schema
 */

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

    onMounted(() => {
      hydrate({
        ohly: "hi",
        list1: [
          {
            testmore: "1",
            change: "2",
          },
        ],
      });
    });

    nextTick(() => {
      customize({
        native: {
          props: {
            Form: {},
          },
        },
      });
    });

    // TODO: schema 开放 customize，由运行时决定精细化设置
    const [setup, { submit, hydrate, customize }] = useForm({
      schemas: [
        {
          label: "测试0",
          field: "ohly",
          component: Input,
          required: true,
          defaultValue() {
            return new Promise((resolve) => {
              resolve("hello");
            });
          },
          native: {
            props: {
              Form: {
                layout: "vertical",
              },
              FormItem: {
                tooltip: "测试tooltip2",
              },
            },
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
              defaultValue() {
                return "male";
              },
              native: {
                props: {
                  Form: {
                    autoLabelWidth: true,
                    layout: "horizontal",
                  },
                  FormItem: {
                    tooltip: "测试tooltip2",
                  },
                },
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
