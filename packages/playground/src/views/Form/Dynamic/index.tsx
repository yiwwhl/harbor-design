import { PageWrapper } from "@harbor-design/arco-design-vue/components/Page";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return <PageWrapper>Dynamic Form 动态表单</PageWrapper>;
    };
  },
});
