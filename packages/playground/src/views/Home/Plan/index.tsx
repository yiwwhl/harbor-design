import { PageWrapper } from "@harbor-design/arco-design-vue/Components/Page";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="计划" headerHeight={100} headerPadding="0 40px">
          测试自定义 headerHeight 与 headerPadding
        </PageWrapper>
      );
    };
  },
});
