import { Button, Input, Select } from "@arco-design/web-vue";
import {
	ProForm,
	ProxyedSchema,
	markNativeFunction,
	useForm,
} from "@harbor-design/proform";
import { defineComponent, nextTick, ref } from "vue";
import styles from "./index.module.scss";
import PageWrapper from "@/components/advanced/PageWrapper";

export default defineComponent({
	setup() {
		function getOptions() {
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

		const [setup, { submit, subscribeModel }] = useForm({
			native: {
				props: {
					Form: {
						layout: "vertical",
						autoLabelWidth: true,
					},
				},
			},
			schemas,
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
					label({ model }) {
						return new Promise((resolve) => {
							resolve(model.age + "姓名");
						});
					},
					field: "name",
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
						options: getOptions,
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
							);
						},
					}}
				</PageWrapper>
			);
		};
	},
});
