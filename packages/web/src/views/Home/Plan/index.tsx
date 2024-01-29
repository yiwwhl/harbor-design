import PageWrapper from "@/components/advanced/PageWrapper";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return <PageWrapper title="计划">开发 ProTable 及用户列表</PageWrapper>;
		};
	},
});
