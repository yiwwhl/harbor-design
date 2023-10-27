import { PropType, defineComponent } from "vue";
import { FormRegister } from "../types/form";
import { rendercore } from "../services/rendercore";

export default defineComponent({
  props: {
    register: {
      type: Function as PropType<FormRegister>,
      required: true,
    },
  },
  setup(props) {
    const { render } = rendercore(props);
    return () => {
      return render();
    };
  },
});
