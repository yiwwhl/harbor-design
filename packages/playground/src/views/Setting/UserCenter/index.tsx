import PageWrapper from "@/components/advanced/PageWrapper";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return (
				<PageWrapper title="UserCenter">
					UserCenter Dev InProgress...
				</PageWrapper>
			);
		};
	},
});
