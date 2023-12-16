import { PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return (
				<PageWrapper title="计划">
					<div>- 持续优化动态表单, 文档完善</div>
					<div>- 重构 BasicWrapper 及 PageWrapper</div>
					<div>- 项目增加 nest 或 koa server 用于学习</div>
				</PageWrapper>
			);
		};
	},
});
