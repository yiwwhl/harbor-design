import { Button, Input, Select } from "@arco-design/web-vue";
import {
	ProForm,
	ProxyedSchema,
	markNativeFunction,
	markOnetimeFunction,
	markStructuredPathParsing,
	useForm,
} from "@harbor-design/proform";
import { defineComponent, nextTick, ref } from "vue";
import styles from "./index.module.scss";
import PageWrapper from "@/components/advanced/PageWrapper";

export default defineComponent({
	setup() {
		function getOptions() {
			console.log("执行异步函数");
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve([
						{
							label: "男",
							value: "male",
						},
						{
							label: "女",
							value: "female",
						},
					]);
				}, 200);
			});
		}

		const schemas = ref<ProxyedSchema[]>([]);

		const [setup, { submit, share, subscribeModel, resetModel }] = useForm({
			native: {
				props: {
					Form: {
						layout: "horizontal",
						autoLabelWidth: true,
					},
				},
			},
			schemas,
		});

		resetModel();

		share({
			helloworld: "yes hello world",
		});

		subscribeModel((value, { stopSubscribe }) => {
			console.log("value", value, stopSubscribe);
			if (value.age === "223") {
				stopSubscribe();
			}
		});

		nextTick(() => {
			schemas.value = [
				{
					label: ({ model }) => {
						return model.age + "姓名";
					},
					field: markStructuredPathParsing("name[0][0].value[0]"),
					defaultValue({ shared }) {
						return shared?.helloworld;
					},
					component({ model }) {
						return model.age ? Input : Select;
					},
					required({ model }) {
						return !!model.age;
					},
				},
				{
					field: "age",
					component: Input,
					componentProps() {
						return {
							min: 0,
							max: 200,
						};
					},
					componentSlots: {
						prefix: markNativeFunction(({ model }) => {
							return `前缀：${model.age ?? ""}`;
						}),
					},
				},
				{
					label: "性别",
					field: "gender",
					component: Select,
					required: true,
					componentProps: {
						options: markOnetimeFunction(getOptions),
					},
				},
				{
					label: "当前经历",
					type: "group",
					children: [
						{
							label: "当前职业名称",
							field: "currentJobName",
							component: Input,
							defaultValue: "前端开发工程师",
							required: true,
							rules: [
								{
									validator: (value, callback) => {
										return value.length < 10
											? callback()
											: callback("字符数不能超过 10");
									},
								},
							],
						},
					],
				},
				{
					label: "过往经历",
					field: "experiences",
					type: "list",
					runtime: {
						customizeListItemLabel(rawLabel, rawIndex) {
							return `外面的 ${rawLabel} ${rawIndex}`;
						},
					},
					children: [
						{
							label({ share }) {
								return new Promise((resolve) => {
									share({
										some: "hello world",
									});
									setTimeout(() => {
										resolve("学业经历");
									}, 200);
								});
							},
							runtime: {
								customizeListItemLabel(rawLabel, rawIndex) {
									return `厘米的 ${rawLabel} ${rawIndex}`;
								},
							},
							field: "edu",
							component: Input,
						},
						{
							label({ shared }) {
								return "职业经历" + shared.some;
							},
							field: "job",
							component: Input,
							required: true,
						},
					],
				},
				{
					label: "爱好",
					field: "hoby",
					type: "list",
					children: [
						{
							label() {
								return "爱好项";
							},
							field: "hobbyItem",
							component: Input,
							defaultValue() {
								return new Promise((resolve) => {
									resolve("打篮球");
								});
							},
						},
					],
				},
			];
		});

		return () => {
			return (
				<PageWrapper title="Arco 表单">
					{{
						default() {
							return <ProForm class={styles.proForm} setup={setup} />;
						},
						headerRight() {
							return (
								<>
									<Button onClick={resetModel}>重置</Button>
									<Button
										type="primary"
										onClick={() => {
											submit().then((data) => {
												console.log("提交", data);
											});
										}}
									>
										提交
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
