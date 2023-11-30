import { PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="计划">
          <div>持续优化动态表单</div>
          <div>动态表单仍有大量功能需要实现，包括更深层的抽象</div>
          <div>
            近期计划：继续闭环动态表单的定制化能力，包括单个 schema
            的定制和整体的定制
          </div>
        </PageWrapper>
      );
    };
  },
});
