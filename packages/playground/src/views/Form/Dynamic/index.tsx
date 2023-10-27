import { Button, Input, InputPassword, Select } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent, ref } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
  setup() {
    const modelPreview = ref();
    function getOptions() {
      console.log("有且仅有执行了一次异步函数");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              label: "选项1",
              value: "options1",
            },
            {
              label: "选项2",
              value: "options2",
            },
          ]);
        }, 500);
      });
    }
    const [register, { submit, hydrate }] = useForm({
      schemas: [
        {
          type: "list",
          field: "sdlfjlkdsj",
          label: "列表测试",
          children: [
            {
              label: "测试列表1",
              field: "test1",
              component: Input,
            },
            {
              label: "测试列表2",
              field: "test2",
              component: Input,
              rules: [
                {
                  required: true,
                  message: "测试列表2必填",
                },
              ],
            },
            {
              label: "测试异步列表下拉",
              field: "asyncTreeSelect",
              component: Select,
              defaultValue: "options1",
              componentProps: {
                options: getOptions,
                multiple: true,
              },
            },
            {
              label: "测试非异步列表下拉",
              field: "treeSelectNoAsync",
              component: Select,
              defaultValue: "noAsync1",
              componentProps: {
                options: [
                  {
                    label: "非异步选项",
                    value: "noAsync1",
                  },
                ],
              },
            },
            {
              label: "测试标准属性：禁用",
              field: "treeSelect",
              component: Select,
              componentProps: {
                disabled: true,
              },
            },
          ],
        },
        {
          type: "group",
          label: "组测试",
          children: [
            {
              label: "测试1",
              field: "test1",
              defaultValue: "hel12312lo2",
              component: Input,
            },
            {
              label: "测试2",
              field: "tes21",
              component: Input,
              rules: [
                {
                  required: true,
                  message: "测试2必填",
                },
              ],
            },
          ],
        },
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
          label: "密码",
          field: "password",
          component: InputPassword,
          rules: [
            {
              required: true,
              message: "密码必填",
            },
          ],
        },
      ],
    });

    function getDetail() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            sdlfjlkdsj: [
              {
                test1: "evan huang",
              },
              {
                test2: "holy",
              },
            ],
          });
        }, 200);
      });
    }

    hydrate(getDetail);

    return () => {
      return (
        <PageWrapper title="动态表单">
          <div class={styles.dynamicFormWrapper}>
            <ProForm register={register}></ProForm>
            <Button
              onClick={() => {
                submit().then((model) => {
                  console.log(model);
                  modelPreview.value = model;
                });
              }}
            >
              提交
            </Button>
            <div>model: {JSON.stringify(modelPreview.value)}</div>
          </div>
        </PageWrapper>
      );
    };
  },
});
