import PageWrapper from "@/components/advanced/PageWrapper";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return (
				<PageWrapper title="计划">
					<div>开发 ProTable 及用户列表</div>
					<div>沉淀新增组件相关文档</div>
				</PageWrapper>
			);
		};
	},
});
