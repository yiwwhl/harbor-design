import PageWrapper from "@/components/advanced/PageWrapper";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
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
