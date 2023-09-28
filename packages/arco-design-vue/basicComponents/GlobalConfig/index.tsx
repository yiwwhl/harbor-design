import { defineComponent, provide } from "vue";

export const globalConfigSymbol = Symbol("globalConfig");

export default defineComponent({
  props: {
    systemConfig: {
      type: Object,
      required: true,
    },
  },
  setup(props, { slots }) {
    provide(globalConfigSymbol, {
      ...props.systemConfig,
    });
    return () => {
      return <>{slots.default?.()}</>;
    };
  },
});
