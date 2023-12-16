import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
	props: {
		schema: Object,
	},
	setup(props, { slots }) {
		return () => {
			return (
				<div class={styles.groupWrapper}>
					<div class={styles.label}>{props.schema?.label}</div>
					{slots.default?.()}
				</div>
			);
		};
	},
});
