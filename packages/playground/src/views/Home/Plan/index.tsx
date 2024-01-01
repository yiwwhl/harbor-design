import PageWrapper from "@/components/advanced/PageWrapper";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return <PageWrapper title="计划">近期：接入用户登录系统</PageWrapper>;
		};
	},
});
