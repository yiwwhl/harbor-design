import { PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="关于">
          {{
            headerRight() {
              return "harbor pagewrapper right";
            },
            default() {
              return "关于项目";
            },
          }}
        </PageWrapper>
      );
    };
  },
});
