import { Wrapper } from "@harbor-design/arco-design-vue/components/Page";
import { defineComponent } from "vue";
import styles from "./index.module.scss";
import useBasicSettingStore from "../../../store/modules/basicSetting";

export default defineComponent({
  setup() {
    const basicSetting = useBasicSettingStore();
    return () => {
      return (
        <div
          class={styles.boxWithMaxHeight}
          style={{
            height: `calc(100vh - ${basicSetting.headerHeight}px)`,
          }}
        >
          <Wrapper heightMode="flex_fit">
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
            <Wrapper class={styles.wrapperWithClass}>
              带 class 覆盖的 wrapper
            </Wrapper>
          </Wrapper>
        </div>
      );
    };
  },
});
