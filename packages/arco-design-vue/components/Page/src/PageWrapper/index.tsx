import BasicWrapper from "../../../../basicComponents/BasicWrapper/index";
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    return () => {
      return (
        <BasicWrapper heightMode="fixed">{slots.default?.()}</BasicWrapper>
      );
    };
  },
});
