import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { BasicWrapper, PageWrapper } from "@harbor-design/arco-design-vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <>
          <PageWrapper title="PageWrapper 下的 BasicWrapper">
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
          <PageWrapper title="BasicWrapper 的三种高度模式">
            <BasicWrapper title="heightMode: flex 自适应，由内部组件撑开 Wrapper 容器">
              <div>组件内部</div>
              <div>组件内部</div>
            </BasicWrapper>
            <BasicWrapper
              title="heightMode: fit, 撑满整个父容器但不超过整个父容器"
              heightMode="fit"
            >
              <div>组件内部</div>
              <div>组件内部</div>
            </BasicWrapper>
            <BasicWrapper
              title="heightMode: fixed, 高度为当前可视区域剩余空间的高度，也是 PageWrapper 的默认高度"
              heightMode="fixed"
            >
              可视区域剩余空间的高度
            </BasicWrapper>
          </PageWrapper>
        </>
      );
    };
  },
});
