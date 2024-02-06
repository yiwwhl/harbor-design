import PageWrapper from "@/components/advanced/PageWrapper";
import { sharedModal } from "@/views/Home/About/sharedModal";
import { Button } from "@arco-design/web-vue";
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		return () => {
			return (
				<PageWrapper title="关于">
					{{
						default() {
							return (
								<>
									<div>个人组件库 + 中后台模板项目实践</div>
									<div>架构概念验证 + 产品驱动学习</div>
									<Button
										onClick={() => {
											sharedModal.open();
										}}
										type="primary"
									>
										测试对函数式调用 Modal 的封装
									</Button>
								</>
							);
						},
					}}
				</PageWrapper>
			);
		};
	},
});
