import { Wrapper } from "@harbor-design/arco-design-vue/components/Page";
import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
  setup() {
    return () => {
      return (
        <Wrapper>
          基本 wrapper
          <Wrapper class={styles.wrapperWithClass}>
            带 class 覆盖的 wrapper
          </Wrapper>
        </Wrapper>
      );
    };
  },
});
