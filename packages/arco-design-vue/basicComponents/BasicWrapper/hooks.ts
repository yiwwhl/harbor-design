import { globalConfigSymbol } from "../GlobalConfig";
import { CSSProperties, inject, ref } from "vue";

export function useSetProperty(props: Record<string, any>) {
  const domRef = ref();
  const globalConfig = inject(globalConfigSymbol) as any;
  const pxOfSpaceArround = `${props.spaceAround * 2}px`;
  const pxOfFixedHeight = `${globalConfig.System.headerHeight}px`;
  const presetByHeightMode: Record<string, CSSProperties> = {
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
  const { width, height, overflow } = presetByHeightMode[props.heightMode];

  function setWidth() {
    domRef.value.style.setProperty("--basicwrapper-width", width);
  }

  function setHeight() {
    domRef.value.style.setProperty("--basicwrapper-height", height);
  }

  function setMargin() {
    domRef.value.style.setProperty(
      "--basicwrapper-margin",
      `${props.spaceAround}px`
    );
  }

  function setOverflow() {
    domRef.value.style.setProperty("--basicwrapper-overflow", overflow);
  }

  function setHeaderHeight() {
    if (props.headerHeight) {
      return domRef.value.style.setProperty(
        "--basicwrapper-header-height",
        `${props.headerHeight}px`
      );
    }
    domRef.value.style.setProperty(
      "--basicwrapper-header-height",
      `${
        props.title
          ? globalConfig.BasicComponents?.BasicWrapper?.headerHeight ?? 50
          : 0
      }px`
    );
  }

  function setHeaderPadding() {
    if (props.headerPadding) {
      return domRef.value.style.setProperty(
        "--basicwrapper-header-padding",
        `${props.headerPadding}`
      );
    }
    domRef.value.style.setProperty(
      "--basicwrapper-header-padding",
      `${globalConfig.BasicComponents?.BasicWrapper?.headerPadding ?? "0 12px"}`
    );
  }

  return {
    domRef,
    setWidth,
    setHeight,
    setMargin,
    setOverflow,
    setHeaderHeight,
    setHeaderPadding,
  };
}
