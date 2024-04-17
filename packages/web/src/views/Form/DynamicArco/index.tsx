import { Button, Input, Radio, RadioGroup, Select } from "@arco-design/web-vue";
import {
	ProForm,
	ProxyedSchema,
	markNativeFunction,
	markOnetimeFunction,
	markStructuredPathParsing,
	useForm,
} from "@harbor-design/proform";
import { defineComponent, nextTick, reactive, ref } from "vue";
import styles from "./index.module.scss";
import PageWrapper from "@/components/advanced/PageWrapper";

export default defineComponent({
	setup() {
		function getOptions2() {
			console.log("执行异步函数 2222222222222222");
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
		const renderList = ref([]) as any;

		const [setup, { submit, hydrate, share, subscribeModel, resetModel }] =
			useForm({
				native: {
					props: {
						Form: {
							layout: "horizontal",
							autoLabelWidth: true,
						},
					},
				},
				schemas: [
					{
						label: "测试",
						field: "testa",
						component: RadioGroup,
						componentProps: {
							options: [
								{
									label: "测试A",
									value: true,
								},
								{
									label: "测试B",
									value: false,
								},
							],
						},
					},
					{
						label: "姓名",
						field: markStructuredPathParsing("user.name"),
						component: Input,
						defaultValue: "",
						componentSlots: {
							append: "hi",
						},
						rules: [
							{
								validator(val, cb) {
									if (val === "2") {
										cb("错误");
									}
								},
							},
						],
					},
					{
						type: "list",
						label: "list",
						field: "users",
						runtime: {
							customizeListItemLabel(rawLabel: string, rawIndex: number) {
								return `${rawLabel} ${rawIndex}`;
							},
						},
						children: [
							{
								label: "测试",
								component: Input,
								field: "1",
							},
						],
					},
					{
						label: "性别",
						field: "gender",
						component: Select,
						componentProps: {
							onChange: markNativeFunction(({ share, rawArgs }) => {
								share({
									display: rawArgs[0] === "male" ? "选中男" : "选中女",
								});
							}),
							options: markOnetimeFunction(() => {
								return new Promise((r) => {
									setTimeout(() => {
										r([
											{
												label: "男",
												value: "male",
											},
											{
												label: "女",
												value: "female",
											},
										]);
									}, 2000);
								});
							}),
						},
					},
					{
						label: ({ shared }) => shared.display,
						field: "display",
						component: Input,
						componentProps: {
							disabled: true,
							modelValue({ shared }) {
								return shared.display;
							},
						},
					},
					{
						label: "年龄",
						field: "age",
						component: ({ model }) => (model.name === "1" ? Radio : Input),
						show({ model }) {
							return model.name === "1";
						},
					},
				],
			});

		hydrate({
			testa: false,
		});
		const what = reactive({});

		setTimeout(() => {
			Object.assign(what, {
				content: Date.now(),
			});
		}, 200);

		share({
			what,
		});

		resetModel();

		setTimeout(() => {
			renderList.value = [
				{
					label: "男",
					value: "male",
				},
			];
		}, 2000);

		share({
			helloworld: "yes hello world",
		});

		subscribeModel((value, { stopSubscribe }) => {
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
					defaultValue({ shared, share }) {
						share({ renderList });
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
					label: "性别",
					field: "gender",
					component: Select,
					required: true,
					componentProps: {
						options: ({ shared }) => {
							return shared.renderList;
						},
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
						prefix: ({ model }) => {
							return `前缀：${model.age ?? ""}`;
						},
						suffix: ({ model, reactiveModel }) => {
							Object.assign(reactiveModel, {
								currentJobName: "hh",
							});
							return `后缀：${model.age ?? ""}`;
						},
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
						{
							label: "性别里面",
							field: "gender",
							component: Select,
							required: true,
							componentProps: {
								options: ({ share }) => {
									setTimeout(() => {
										share({
											name: "wtf",
										});
									}, 3000);
									return getOptions2();
								},
							},
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
							label({ shared }) {
								return "爱好项" + shared.name;
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
