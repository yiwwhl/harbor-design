import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
	props: {
		show: {
			type: Boolean,
		},
	},
	setup(_, { slots }) {
		return () => {
			return (
				<>
					<div class={styles.itemWrapper}>{slots.default?.()}</div>
				</>
			);
		};
	},
});
