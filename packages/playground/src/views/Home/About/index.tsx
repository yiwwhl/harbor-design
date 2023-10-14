import { PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="关于">
          {{
            headerRight() {
              return "Header Right";
            },
            default() {
              return "default";
            },
          }}
        </PageWrapper>
      );
    };
  },
});
