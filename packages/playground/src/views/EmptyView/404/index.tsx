import { getImage } from "@/plugins/ImageCollector/src";
import { Empty, PageWrapper } from "@harbor-design/arco-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return (
				<PageWrapper title="404">
					<Empty
						title="页面找不到了"
						description="您要找的页面可能已被移除、更名或暂时不可用。"
						image={<img src={getImage("404")} />}
					/>
				</PageWrapper>
			);
		};
	},
});
