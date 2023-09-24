import { computed, defineComponent, ref, watchEffect } from "vue";
import styles from "./index.module.scss";
import { basicProps } from "./props";

export default defineComponent({
  props: {
    ...basicProps,
  },
  setup(props, { slots }) {
    const pageWrapperRef = ref();
    const isPageWrapperHeaderShow = computed(() => !!props.title);

    watchEffect(() => {
      if (pageWrapperRef.value) {
        pageWrapperRef.value.style.setProperty(
          "--pagewrapper-margin",
          `${props.spaceAround}px`
        );
      }
    });

    return () => {
      return (
        <div ref={pageWrapperRef} class={styles.pageWrapper}>
          {isPageWrapperHeaderShow.value && <div>header: {props.title}</div>}
          {slots.default?.()}
        </div>
      );
    };
  },
});
