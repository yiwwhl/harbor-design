import { PageWrapper } from "@harbor-design/arco-design-vue/components/Page";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="关于">
          {{
            headerRright() {
              return "Header Right";
            },
          }}
        </PageWrapper>
      );
    };
  },
});
