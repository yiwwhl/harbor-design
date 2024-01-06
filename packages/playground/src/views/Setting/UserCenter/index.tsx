import { ProjectService } from "@/architecture/core/ProjectService";
import PageWrapper from "@/components/advanced/PageWrapper";
import { Button } from "@arco-design/web-vue";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		const AuthService = ProjectService.getService("Auth");

		function handleLogout() {
			AuthService.logout();
		}

		return () => {
			return (
				<PageWrapper title="个人中心">
					<Button type="primary" onClick={handleLogout}>
						退出登录
					</Button>
				</PageWrapper>
			);
		};
	},
});
