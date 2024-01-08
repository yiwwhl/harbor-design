import { Button, Input, Select } from "@arco-design/web-vue";
import {
	ProForm,
	ProxyedSchema,
	markNativeFunction,
	useForm,
} from "@harbor-design/proform";
import { defineComponent, ref } from "vue";
import styles from "./index.module.scss";
import PageWrapper from "@/components/advanced/PageWrapper";

/**
 * 后续应该新增文档，对于 native 来说，Form 永远是后面的 schema 覆盖前面的 schema
 */

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

		const [setup, { submit }] = useForm({
			ui: "ArcoVue",
			native: {
				props: {
					Form: {
						autoLabelWidth: true,
					},
				},
			},
			schemas,
		});

		setTimeout(() => {
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
						},
					],
				},
				{
					label: "过往经历",
					field: "experiences",
					type: "list",
					runtime: {
						customizeItemLabel(rawItem, rawIndex) {
							return `${rawItem} ${rawIndex} list 级别定制化 label`;
						},
					},
					children: [
						{
							label() {
								return new Promise((resolve) => {
									setTimeout(() => {
										resolve("学业经历");
									}, 200);
								});
							},
							field: "edu",
							component: Input,
						},
						{
							label() {
								return "职业经历";
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
		}, 400);

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
