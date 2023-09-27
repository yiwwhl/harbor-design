import { PageWrapper } from "@harbor-design/arco-design-vue/components/Page";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return <PageWrapper>关于</PageWrapper>;
    };
  },
});
