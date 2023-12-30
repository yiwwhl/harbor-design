import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
	setup() {
		return () => {
			return (
				<div class={styles.footerWrapper}>
					<div>Copyright © 2023-present</div>
					<div>Powered by yiwwhl</div>
				</div>
			);
		};
	},
});
