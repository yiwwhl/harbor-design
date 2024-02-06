import { useModal } from "@/components/functional/Modal/useModal";
import { Input, Textarea } from "@arco-design/web-vue";
import { ProForm, useForm } from "@harbor-design/proform";

const [setup, { submit }] = useForm({
	schemas: [
		{
			label: "姓名",
			field: "name",
			required: true,
			component: Input,
		},
		{
			label: "意见或建议",
			field: "content",
			component: Textarea,
		},
	],
});

export const sharedModal = useModal(({ loading, modalCloseLock }) => {
	return {
		title: "意见反馈（测试提交 Modal 调用的 Demo，无实际作用）",
		content() {
			return <ProForm setup={setup} />;
		},
		onBeforeOk: () => {
			return submit().then(async (formdata) => {
				loading.value = true;
				console.log("formdata", formdata);
				await new Promise(() => {
					setTimeout(() => {
						loading.value = false;
						sharedModal.close();
					}, 2000);
				});
			});
		},
		...modalCloseLock,
	};
});
