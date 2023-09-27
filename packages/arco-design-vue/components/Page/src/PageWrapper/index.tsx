import { computed, defineComponent, onMounted, ref } from "vue";
import styles from "./index.module.scss";
import { basicProps } from "./props";
import { HeightMode } from "./type";

export default defineComponent({
  props: {
    ...basicProps,
  },
  setup(props, { slots }) {
    const pageWrapperRef = ref();
    const isPageWrapperHeaderShow = computed(() => !!props.title);

    const heightByMode: Record<HeightMode, string> = {
      [HeightMode.FLEX_FIT]: "unset",
    };

    onMounted(() => {
      pageWrapperRef.value.style.setProperty(
        "--pagewrapper-margin",
        `${props.spaceAround}px`
      );
      pageWrapperRef.value.style.setProperty(
        "--pagewrapper-height",
        heightByMode[props.heightMode]
      );
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
