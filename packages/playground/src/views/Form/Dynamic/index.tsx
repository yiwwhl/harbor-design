import { Button, Input, InputNumber, Select } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent, onMounted } from "vue";
import styles from "./index.module.scss";
import sdk from "@stackblitz/sdk";

/**
 * 后续应该新增文档，对于 native 来说，Form 永远是后面的 schema 覆盖前面的 schema
 */

export default defineComponent({
  setup() {
    onMounted(() => {
      sdk.embedProjectId("embedStackblitz", "vitejs-vite-z9bsbh", {
        forceEmbedLayout: true,
        openFile: "src/App.tsx",
      });
    });

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
      gridProps: {
        gridTemplateColumns: "repeat(2, 1fr)",
        gridColumnGap: "20px",
        alignItems: "center",
      },
      native: {
        props: {
          Form: {
            autoLabelWidth: true,
          },
        },
      },
      schemas: [
        {
          label: "姓名",
          field: "name",
          component: Input,
          required: true,
        },
        {
          label: "年龄",
          field: "age",
          component: InputNumber,
          required: true,
          componentProps() {
            return {
              min: 0,
              max: 200,
            };
          },
        },
        {
          label: "性别",
          field: "gender",
          component: Select,
          required: true,
          componentProps: {
            options: getOptions,
          },
          gridProps: {
            gridTemplateColumns: "repeat(2, 1fr)",
            gridColumnGap: "20px",
          },
        },
        {
          label: "当前经历",
          type: "group",
          children: [
            {
              label: "当前职业名称",
              field: "currentJobName",
              component: Input,
              defaultValue: "前端开发工程师",
            },
          ],
          gridProps: {
            gridTemplateColumns: "repeat(2, 1fr)",
            gridColumnGap: "20px",
          },
        },
        {
          label: "过往经历",
          field: "experiences",
          type: "list",
          runtimeSetters: {
            listItemLabelSetter(rawItem, rawIndex) {
              return `${rawItem} ${rawIndex} list 级别定制化 label`;
            },
          },
          children: [
            {
              label() {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("学业经历");
                  }, 200);
                });
              },
              field: "edu",
              component: Input,
            },
            {
              label() {
                return "职业经历";
              },
              field: "job",
              component: Input,
              required: true,
              gridProps: {
                gridTemplateColumns: "repeat(2, 1fr)",
                gridColumnGap: "20px",
              },
            },
          ],
        },
        {
          label: "爱好",
          field: "hoby",
          type: "list",
          children: [
            {
              label() {
                return "爱好项";
              },
              field: "hobbyItem",
              component: Input,
            },
          ],
        },
      ],
    });

    return () => {
      return (
        <PageWrapper title="DynamicForm">
          <div class={styles.embedWrapper} id="embedStackblitz"></div>
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
