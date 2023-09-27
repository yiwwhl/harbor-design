import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { BasicWrapper } from "@harbor-design/arco-design-vue/basicComponents/index";
import { PageWrapper } from "@harbor-design/arco-design-vue/components/Page";

export default defineComponent({
  setup() {
    return () => {
      return (
        <PageWrapper>
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
