import { ProjectService } from "@/architecture/core/ProjectService";
import PageWrapper from "@/components/advanced/PageWrapper";
import { defineComponent, onBeforeMount } from "vue";

export default defineComponent({
	setup() {
		// 仅测试 Code，后续 remove
		const UserService = ProjectService.getService("User");
		onBeforeMount(async () => {
			const data = await UserService.getProfile();
			console.log("用户信息：", data);
		});

		return () => {
			return (
				<PageWrapper title="关于">
					{{
						default() {
							return <>个人组件库 + 中后台模板项目实践</>;
						},
					}}
				</PageWrapper>
			);
		};
	},
});
