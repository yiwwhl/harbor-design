import {
  CSSProperties,
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
} from "vue";
import styles from "./index.module.scss";
import { basicProps } from "./props";
import { HeightMode } from "./type";
import { globalConfigSymbol } from "../../components/GlobalConfig/index";

export default defineComponent({
  props: {
    ...basicProps,
  },
  setup(props, { slots }) {
    const globalConfig = inject(globalConfigSymbol) as any;
    const pageWrapperRef = ref();
    const isPageWrapperHeaderShow = computed(() => !!props.title);
    const pxOfSpaceArround = `${props.spaceAround * 2}px`;
    const pxOfFixedHeight = `${globalConfig.headerHeight}px`;

    const presetByHeightMode: Record<HeightMode, CSSProperties> = {
      flex: {
        width: "100%",
        height: "unset",
        overflow: "auto",
      },
      fit: {
        width: `calc(100% - ${pxOfSpaceArround})`,
        height: `calc(100% - ${pxOfSpaceArround})`,
        overflow: "scroll",
      },
      fixed: {
        width: `calc(100% - ${pxOfSpaceArround})`,
        height: `calc(100vh - ${pxOfSpaceArround} - ${pxOfFixedHeight})`,
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
