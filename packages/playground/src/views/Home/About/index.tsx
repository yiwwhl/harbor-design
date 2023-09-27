import { defineComponent } from "vue";
import { Wrapper } from "@harbor-design/arco-design-vue/components/Page/index";

export default defineComponent({
  setup() {
    return () => {
      return <Wrapper>关于</Wrapper>;
    };
  },
});
