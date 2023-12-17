import { getImage } from "@/plugins/ImageCollector/src";
import { Empty, PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return (
				<PageWrapper title="空状态">
					<Empty
						title="功能开发中"
						description="功能开发中，上线日期待定"
						image={<img src={getImage("working")} />}
					/>
				</PageWrapper>
			);
		};
	},
});
