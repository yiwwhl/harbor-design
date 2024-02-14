import { ProjectService } from "@/architecture/core/ProjectService";
import PageWrapper from "@/components/advanced/PageWrapper";
import AvatarUploader from "@/components/advanced/Uploader/AvatarUploader";
import useUserStore from "@/store/modules/user";
import { Button, Space } from "@arco-design/web-vue";
import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
	setup() {
		const AuthService = ProjectService.getService("Auth");
		const userStore = useUserStore();

		function handleLogout() {
			AuthService.logout();
		}

		// TODO：管理 demo 账户的权限，后续会调整
		const isDemo = userStore.user.username === "demo";

		return () => {
			return (
				<div class={styles.userCenterWrapper}>
					<PageWrapper class={styles.userInfo}>
						<Space direction="vertical" align="center" size={20}>
							{!isDemo && <AvatarUploader round />}
							<div>{userStore.user.nickname}</div>
							<Button type="primary" onClick={handleLogout}>
								退出登录
							</Button>
						</Space>
					</PageWrapper>
					<PageWrapper class={styles.userSummary}>
						<div>Summary dev inprogress.</div>
					</PageWrapper>
				</div>
			);
		};
	},
});
