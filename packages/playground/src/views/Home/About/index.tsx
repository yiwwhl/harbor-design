import { defineComponent } from "vue";
import { PageWrapper } from "@harbor-design/arco-design-vue/components/Page/index";

export default defineComponent({
  setup() {
    return () => {
      return <PageWrapper>关于</PageWrapper>;
    };
  },
});
