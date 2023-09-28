import { PageWrapper } from "@harbor-design/arco-design-vue/Components/Page";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return <PageWrapper title="form">动态表单</PageWrapper>;
    };
  },
});
