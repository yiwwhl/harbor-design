import { Input, InputNumber, Select } from "@arco-design/web-vue";
import { PageWrapper, ProForm, useForm } from "@harbor-design/arco-design-vue";
import { defineComponent, onBeforeMount, reactive } from "vue";

export default defineComponent({
  setup() {
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

    const [setup] = useForm({
      schemas: [
        {
          label: "用户名",
          field: "username",
          component: Input,
          defaultValue: "default username",
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
              component: Select,
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
      ],
    });

    return () => {
      return (
        <PageWrapper title="DynamicForm">
          <ProForm setup={setup} />
        </PageWrapper>
      );
    };
  },
});
