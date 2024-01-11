import PageWrapper from "@/components/advanced/PageWrapper";
import { ProForm, useForm } from "@harbor-design/proform";
import { defineComponent } from "vue";
import styles from "./index.module.scss";
import { NInput, NSelect, NButton } from "naive-ui";

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

		const [setup, { submit }] = useForm({
			ui: "NaiveUI",
			native: {
				props: {
					Form: {
						autoLabelWidth: true,
					},
				},
			},
			schemas: [
				{
					label({ model }) {
						return new Promise((resolve) => {
							resolve(model.age + "姓名");
						});
					},
					field: "name",
					component({ model }) {
						return model.age ? NInput : NSelect;
					},
				},
				{
					label: "年龄",
					field: "age",
					component: NInput,
					componentProps() {
						return {
							min: 0,
							max: 200,
						};
					},
				},
				{
					label: "性别",
					field: "gender",
					component: NSelect,
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
							component: NInput,
							defaultValue: "前端开发工程师",
						},
					],
				},
				{
					label: "过往经历",
					field: "experiences",
					type: "list",
					runtime: {
						customizeListItemLabel(rawItem, rawIndex) {
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
							component: NInput,
						},
						{
							label() {
								return "职业经历";
							},
							field: "job",
							component: NInput,
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
							component: NInput,
						},
					],
				},
			],
		});

		return () => {
			return (
				<PageWrapper title="Naive 表单">
					{{
						default() {
							return <ProForm class={styles.proForm} setup={setup} />;
						},
						headerRight() {
							return (
								<NButton
									type="primary"
									onClick={() => {
										submit().then((data) => {
											console.log("提交", data);
										});
									}}
								>
									提交
								</NButton>
							);
						},
					}}
				</PageWrapper>
			);
		};
	},
});
