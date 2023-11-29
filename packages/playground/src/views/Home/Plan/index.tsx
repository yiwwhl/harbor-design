import { PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="计划">
          <div>持续优化动态表单</div>
          <div>动态表单仍有大量功能需要实现，包括更深层的抽象</div>
        </PageWrapper>
      );
    };
  },
});
