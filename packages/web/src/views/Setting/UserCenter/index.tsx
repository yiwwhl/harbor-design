import { ProjectService } from "@/architecture/core/ProjectService";
import PageWrapper from "@/components/advanced/PageWrapper";
import AvatarUploader from "@/components/advanced/Uploader/AvatarUploader";
import useUserStore from "@/store/modules/user";
import { Button, Space } from "@arco-design/web-vue";
import { defineComponent } from "vue";

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
				<PageWrapper title="个人中心">
					<Space direction="vertical" size={12}>
						{!isDemo && <AvatarUploader />}
						<Button type="primary" onClick={handleLogout}>
							退出登录
						</Button>
					</Space>
				</PageWrapper>
			);
		};
	},
});
