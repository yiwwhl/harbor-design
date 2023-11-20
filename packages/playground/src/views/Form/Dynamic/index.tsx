import { Button, Input, InputNumber, Select } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent, onBeforeMount, reactive } from "vue";

export default defineComponent({
  setup() {
    function getPriority() {
      return new Promise((resolve) => {
        resolve([
          {
            label: "高",
            value: "high",
          },
          {
            label: "中",
            value: "medium",
          },
          {
            label: "低",
            value: "low",
          },
        ]);
      });
    }

    function getOptions() {
      return new Promise((resolve) => {
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
      });
    }

    const options = reactive([]);

    onBeforeMount(async () => {
      Object.assign(options, await getOptions());
    });

    function getHobby() {
      return new Promise((resolve) => {
        resolve([
          {
            label: "打篮球",
            value: "play busketball",
          },
          {
            label: "读书",
            value: "reading",
          },
        ]);
      });
    }

    const [setup, { submit }] = useForm({
      schemas: [
        {
          label: "用户名",
          field: "username",
          component: Input,
          defaultValue: "default username",
          rules: [
            {
              required: true,
              message: "用户名必填",
            },
          ],
        },
        {
          label: () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve("密码");
              }, 500);
            });
          },
          field: () => "password",
          component: () => Input,
          defaultValue: () => "default password",
        },
        {
          label: () => "测试异步",
          component: Select,
          field: "test",
          componentProps: {
            options,
          },
        },
        {
          type: "group",
          label: "用户元数据",
          children: [
            {
              label: "年龄",
              field: "age",
              component: InputNumber,
              componentProps: {
                max: 100,
              },
            },
            {
              label: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("性别");
                  }, 100);
                });
              },
              field: "gender",
              component: () => {
                return new Promise((resolve) => {
                  resolve(Select);
                });
              },
              componentProps: () => ({
                options,
              }),
            },
            {
              label: "爱好",
              field: "hobby",
              component: Select,
              componentProps: () => {
                return new Promise((resolve) => {
                  resolve({ options: getHobby });
                });
              },
            },
          ],
        },
        {
          type: "list",
          label: "学习计划",
          field: "studyPlan",
          children: [
            {
              label: "学习内容",
              field: "studyWhat",
              component: Input,
              defaultValue: () => {
                return new Promise((resolve) => {
                  resolve("计算机组成原理");
                });
              },
              rules: [
                {
                  required: true,
                  message: "学习内容必填",
                },
              ],
            },
            {
              label: "优先级",
              field: "priority",
              component: Select,
              componentProps: {
                options: getPriority,
              },
              defaultValue: () => {
                return new Promise((resolve) => {
                  resolve("high");
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
              submit().then((data: any) => {
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
