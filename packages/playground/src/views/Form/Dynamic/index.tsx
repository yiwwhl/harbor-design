import { PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return <PageWrapper title="DynamicForm"></PageWrapper>;
    };
  },
});
