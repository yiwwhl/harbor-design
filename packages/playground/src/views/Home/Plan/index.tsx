import PageWrapper from "@/components/advanced/PageWrapper";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return (
				<PageWrapper title="计划">
					规范接口设计，考虑从 Prisma 迁移到 drizzle
				</PageWrapper>
			);
		};
	},
});
