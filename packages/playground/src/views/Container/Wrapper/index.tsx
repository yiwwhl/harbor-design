import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { BasicWrapper, PageWrapper } from "@harbor-design/arco-design-vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper title="容器 Wrapper 测试2">
          <BasicWrapper class={styles.wrapperWithClass}>
            带 class 覆盖的 BasicWrapper
          </BasicWrapper>
          <BasicWrapper class={styles.wrapperWithClass}>
            带 class 覆盖的 BasicWrapper
          </BasicWrapper>
          <BasicWrapper class={styles.wrapperWithClass}>
            带 class 覆盖的 BasicWrapper
          </BasicWrapper>
          <BasicWrapper class={styles.wrapperWithClass}>
            带 class 覆盖的 BasicWrapper
          </BasicWrapper>
          <BasicWrapper class={styles.wrapperWithClass}>
            带 class 覆盖的 BasicWrapper
          </BasicWrapper>
        </PageWrapper>
      );
    };
  },
});
