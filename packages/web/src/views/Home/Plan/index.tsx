import PageWrapper from "@/components/advanced/PageWrapper";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return <PageWrapper title="计划">近期：规范化接口设计</PageWrapper>;
		};
	},
});
