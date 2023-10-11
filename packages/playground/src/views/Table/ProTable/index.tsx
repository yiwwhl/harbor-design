import { defineComponent } from "vue";
import { PageWrapper } from "@harbor-design/arco-design-vue/components/Page";

export default defineComponent({
  setup() {
    return () => {
      return <PageWrapper title="高级表格">Pro Table</PageWrapper>;
    };
  },
});
