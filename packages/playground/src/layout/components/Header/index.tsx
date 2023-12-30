import { defineComponent } from "vue";
import styles from "./index.module.scss";
import Logo from "@/assets/image/harbor.svg?component";
import { ImageCollector } from "@/plugins/ImageCollector/src";
import { useRouter } from "vue-router";

export default defineComponent({
	setup() {
		const router = useRouter();

		return () => {
			return (
				<div class={styles.header}>
					<div class={styles.title}>
						<Logo class={styles.logo} />
						Harbor Design
					</div>
					<div
						class={styles.meta}
						onClick={() =>
							router.push({
								name: "UserCenter",
							})
						}
					>
						<img class={styles.avatar} src={ImageCollector.getImage("user")} />
						<div class={styles.uinfo}>
							<div class={styles.nickName}>yiwwhl</div>
							<div class={styles.role}>管理员</div>
						</div>
					</div>
				</div>
			);
		};
	},
});
