import { CSSProperties, computed, defineComponent, onMounted, ref } from "vue";
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

    const presetByHeightMode: Record<HeightMode, CSSProperties> = {
      flex: {
        width: "100%",
        height: "unset",
        overflow: "auto",
      },
      flex_fit: {
        width: `calc(100% - 2 * ${props.spaceAround}px)`,
        height: `calc(100% - 2 * ${props.spaceAround}px)`,
        overflow: "scroll",
      },
    };

    onMounted(() => {
      const { width, height, overflow } = presetByHeightMode[props.heightMode];

      pageWrapperRef.value.style.setProperty("--pagewrapper-width", width);
      pageWrapperRef.value.style.setProperty("--pagewrapper-height", height);
      pageWrapperRef.value.style.setProperty(
        "--pagewrapper-margin",
        `${props.spaceAround}px`
      );
      pageWrapperRef.value.style.setProperty(
        "--pagewrapper-overflow",
        overflow
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
