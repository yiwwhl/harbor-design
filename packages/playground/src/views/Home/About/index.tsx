import { defineComponent } from "vue";
import { PageWrapper } from "@harbor-design/arco-design-vue/components/Page/index";

export default defineComponent({
  setup() {
    return () => {
      return <PageWrapper>Harbor Design About</PageWrapper>;
    };
  },
});
