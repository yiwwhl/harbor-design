import { defineComponent } from "vue";
import styles from "./index.module.scss";
import Logo from "@/assets/image/harbor.svg?component";
import { useRouter } from "vue-router";
import useBasicSettingStore from "@/store/modules/basicSetting";
import useUserStore from "@/store/modules/user";
import { storeToRefs } from "pinia";

export default defineComponent({
	setup() {
		const router = useRouter();
		const basicSettingStore = useBasicSettingStore();
		const userStore = useUserStore();
		const user = storeToRefs(userStore).user;

		return () => {
			return (
				<div class={styles.header}>
					<div class={styles.title}>
						<Logo class={styles.logo} />
						Harbor Design
					</div>
					<div
						class={styles.meta}
						onClick={() => {
							basicSettingStore.updateSidebarMenuKeys(
								"selectedKeys",
								"UserCenter",
							);
							router.push({
								name: "UserCenter",
							});
						}}
					>
						<img class={styles.avatar} src={user.value.avatar} />
						<div class={styles.uinfo}>
							<div class={styles.nickName}>{user.value.nickname}</div>
							<div class={styles.role}>管理员</div>
						</div>
					</div>
				</div>
			);
		};
	},
});
