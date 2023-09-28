import { computed, defineComponent, onMounted } from "vue";
import styles from "../../assets/index.module.scss";
import { basicProps } from "./props";
import { useSetProperty } from "./hooks";

export default defineComponent({
  props: {
    ...basicProps,
  },
  setup(props, { slots }) {
    const isbasicwrapperHeaderShow = computed(() => !!props.title);
    const {
      domRef,
      setWidth,
      setHeight,
      setMargin,
      setOverflow,
      setHeaderHeight,
      setHeaderPadding,
    } = useSetProperty(props);

    onMounted(() => {
      setWidth();
      setHeight();
      setMargin();
      setOverflow();
      setHeaderHeight();
      setHeaderPadding();
    });

    return () => {
      return (
        <div ref={domRef} class={styles.basicWrapper}>
          {isbasicwrapperHeaderShow.value && (
            <div class={styles.header}>
              <div class={styles.title}>{props.title}</div>
              <div class={styles.headerRight}>{slots.headerRight?.()}</div>
            </div>
          )}
          {slots.default?.()}
        </div>
      );
    };
  },
});
