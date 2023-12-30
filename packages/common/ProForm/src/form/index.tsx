import { PropType, defineComponent } from "vue";
import { Setup } from "../types";
import { RuntimeCore } from "../services";

export default defineComponent({
	props: {
		setup: {
			type: Function as PropType<Setup>,
			required: true,
		},
	},
	setup(props) {
		const runtimeCore = new RuntimeCore(props.setup);

		return () => {
			return runtimeCore.exec();
		};
	},
});
