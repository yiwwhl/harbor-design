import { defineComponent } from "vue";
import styles from "./index.module.scss";
import Logo from "@/assets/image/harbor.svg?component";
import ArrowRight from "@/assets/icons/basic/ArrowRight.svg";
import { ImageCollector } from "@/plugins/ImageCollector/src";

export default defineComponent({
	setup() {
		return () => {
			return (
				<div class={styles.header}>
					<div class={styles.title}>
						<Logo class={styles.logo} />
						Harbor Design
					</div>
					<div class={styles.meta}>
						<img class={styles.avatar} src={ImageCollector.getImage("user")} />
						<div class={styles.uinfo}>
							<div class={styles.nickName}>yiwwhl</div>
							<div class={styles.role}>管理员</div>
						</div>
						<div class={styles.icon}>
							<ArrowRight />
						</div>
					</div>
				</div>
			);
		};
	},
});
