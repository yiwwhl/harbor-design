import { Button, Input, InputPassword } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent, ref } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
  setup() {
    const modelPreview = ref();
    const [register, { submit }] = useForm({
      schemas: [
        {
          type: "list",
          field: "arr12312",
          label: "列表测试",
          children: [
            {
              label: "测试列表1",
              field: "test1",
              defaultValue: "hello2",
              component: Input,
            },
            {
              label: "测试列表2",
              field: "test2",
              component: Input,
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
