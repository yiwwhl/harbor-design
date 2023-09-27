import { defineComponent, provide } from "vue";
import { basicProps } from "./props";

export const globalConfigSymbol = Symbol("globalConfig");

export default defineComponent({
  props: {
    ...basicProps,
  },
  setup(props, { slots }) {
    provide(globalConfigSymbol, {
      headerHeight: props.headerHeight,
    });
    return () => {
      return <>{slots.default?.()}</>;
    };
  },
});
