import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
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
