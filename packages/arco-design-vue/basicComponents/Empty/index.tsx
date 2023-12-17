import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
	props: {
		image: {
			type: Object,
		},
		title: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	setup(props) {
		return () => {
			return (
				<div class={styles.emptyWrapper}>
					<div class={styles.image}>{props.image}</div>
					<div class={styles.title}>{props.title}</div>
					<div class={styles.description}>{props.description}</div>
				</div>
			);
		};
	},
});
