import { basicProps } from "../../../../BasicComponents/BasicWrapper/props";
import BasicWrapper from "../../../../BasicComponents/BasicWrapper/index";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    ...basicProps,
  },
  setup(props, { slots }) {
    return () => {
      return (
        <BasicWrapper {...props} heightMode="fixed">
          {{
            ...slots,
          }}
        </BasicWrapper>
      );
    };
  },
});
