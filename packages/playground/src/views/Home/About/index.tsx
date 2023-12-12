import { PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="关于">
          {{
            default() {
              return <>个人组件库沉淀</>;
            },
          }}
        </PageWrapper>
      );
    };
  },
});
