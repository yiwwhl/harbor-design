import {
	CSSProperties,
	Ref,
	isReactive,
	isRef,
	nextTick,
	reactive,
	ref,
	toRaw,
	watch,
} from "vue";
import { Context, Preset } from "..";
import {
	Setup,
	Schema,
	FormCustomization,
	AnyObject,
	ItemSchema,
	GroupSchema,
	ListSchema,
	ProcessorBySchemaType,
	Runtime,
	NativeCustomizationOptions,
} from "../../types";
import Processor from "../Processor";
import {
	IS,
	deepAssign,
	deepClone,
	replaceUndefinedInString,
} from "../../utils";
import Effect from "../Effect";
import RuntimeContainer from "./RuntimeContainer";
import RuntimeAdpter from "./RuntimeAdapter";

// TODO: should refactor
export default class RuntimeCore {
	processor: Processor;
	schemas: Ref<Schema[]> = ref([]);
	model: Ref<AnyObject> = ref({});
	processorBySchemaType: ProcessorBySchemaType = {
		item: this.runtimeItemProcessor.bind(this),
		group: this.runtimeGroupProcessor.bind(this),
		list: this.runtimeListProcessor.bind(this),
	};
	formRef: Ref<AnyObject> = ref(null as unknown as AnyObject);
	hydrateEffect = new Effect();
	native: NativeCustomizationOptions = reactive({});
	grid = {};
	runtime: Runtime = {};
	globalNativeFormOverride = reactive({
		props: {
			Form: {},
			FormItem: {},
		},
		slots: {
			Form: {},
			FormItem: {},
		},
	});
	ui: string;
	runtimeAdapter: RuntimeAdpter;
	shared: AnyObject = reactive({});

	constructor(public setup: Setup) {
		this.processor = new Processor(this);
		const formCustomization = this.setup(this) as FormCustomization;
		this.ui = formCustomization.ui ?? Context.presets.ui;
		this.runtimeAdapter = new RuntimeAdpter(this.ui);
		Object.assign(
			this.globalNativeFormOverride,
			this.runtimeAdapter.getRuntimeNative(),
		);
		if (isRef(formCustomization.schemas)) {
			watch(
				// @ts-expect-error
				() => formCustomization.schemas.value,
				() => {
					// @ts-expect-error
					this.processor.parseSchemas(formCustomization.schemas.value);
				},
				{
					deep: true,
				},
			);
		} else if (isReactive(formCustomization.schemas)) {
			const stopWatch = watch(
				() => formCustomization.schemas,
				() => {
					// @ts-expect-error
					this.processor.parseSchemas(formCustomization.schemas);
					nextTick(() => {
						stopWatch();
					});
				},
				{
					deep: true,
				},
			);
		} else {
			this.processor.parseSchemas(formCustomization.schemas);
		}
	}

	getRuntimeMeta() {
		const model = toRaw(deepClone(this.model.value));

		return {
			model,
			reactiveModel: this.model.value,
			shared: this.shared,
			// share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
			share: (data: AnyObject) => {
				if (isRef(data)) {
					const stopWatch = watch(
						() => data.value,
						() => {
							deepAssign(this.shared, data.value);
							nextTick(() => {
								stopWatch();
							});
						},
						{
							deep: true,
							immediate: true,
						},
					);
				} else if (isReactive(data)) {
					const stopWatch = watch(
						() => data,
						() => {
							deepAssign(this.shared, data);
							nextTick(() => {
								stopWatch();
							});
						},
						{
							deep: true,
							immediate: true,
						},
					);
				} else {
					deepAssign(this.shared, data);
				}
			},
		};
	}

	runtimeItemProcessor(
		schema: ItemSchema,
		index?: number,
		baseModel = this.model.value,
		parentSchema?: ListSchema,
	) {
		const Component = toRaw(schema.component);
		if (!Component) return;
		schema.native?.props?.Form &&
			deepAssign(
				this.globalNativeFormOverride.props.Form,
				schema.native?.props?.Form,
			);
		schema.native?.slots?.Form &&
			deepAssign(
				this.globalNativeFormOverride.slots.Form,
				schema.native?.slots?.Form,
			);
		const formItemNativeSlots = deepAssign(
			deepClone(this.native?.slots?.FormItem) ?? {},
			schema.native?.slots?.FormItem,
		);
		const defaultItemStyle: CSSProperties = {
			display: "grid",
			gridColumn: "1 / -1",
			...schema.grid,
		};
		const formItemNativeProps = deepAssign(
			deepClone(this.native?.props?.FormItem) ?? {},
			schema.native?.props?.FormItem,
		);
		const runtimeField = this.runtimeAdapter.getRuntimeField({
			schema,
			parentSchema,
			index,
		});
		const componentName = Component.name;
		const props = schema.componentProps ?? {};
		const placeholderPresetByComponentName =
			Preset.placeholderPresetByComponentName;
		let placeholder = schema.placeholder;

		let show = schema.show;
		if (show === undefined) {
			show = true;
		}
		// TODO: 后续考虑，因为理论上用户的每个字段定义都是有价值的，如果设计有默认值并且隐藏的情况时，就帮用户做了选择
		// if (!show) {
		// 	delete baseModel[schema.field];
		// }
		let label = schema.label ?? "";

		let runtime;
		if (schema.runtime) {
			runtime = schema.runtime;
		} else {
			runtime = parentSchema?.runtime ?? this.runtime;
		}

		if (!IS.isUndefined(index) && !IS.isObjectEmpty(runtime)) {
			// 对于 list 而言会有数据 model index
			label = replaceUndefinedInString(
				runtime?.customizeListItemLabel?.(schema.label ?? "", index + 1),
				"",
			);
		}
		if (!placeholder) {
			let prefix = "请输入";
			if (!IS.isUndefined(componentName)) {
				if (
					// @ts-expect-error
					placeholderPresetByComponentName[componentName.toLowerCase()]
				) {
					// 非相似碰撞
					prefix =
						// @ts-expect-error
						placeholderPresetByComponentName[componentName.toLowerCase()];
					placeholder = `${prefix}${label}`;
				} else {
					// 相似碰撞，比如某些 xxxSelect 也可以被认为是与 Select 存在碰撞
					Object.keys(placeholderPresetByComponentName).forEach((name) => {
						if (componentName.toLowerCase().includes(name.toLowerCase())) {
							// @ts-expect-error
							prefix = placeholderPresetByComponentName[name];
						}
					});
					placeholder = `${prefix}${label}`;
				}
			} else {
				placeholder = `${prefix}${label}`;
			}
		}
		const runtimeRequired = this.runtimeAdapter.getRuntimeRequired({
			...schema,
			label,
		});
		const Item = RuntimeContainer.getItemContainer(this);
		const FormItem = RuntimeContainer.getFormItemContainer(this);
		const that = this;
		const componentSlots = schema.componentSlots;
		return (
			<div style={defaultItemStyle}>
				<Item show={show}>
					{{
						default() {
							return (
								show && (
									<FormItem
										{...formItemNativeProps}
										label={`${label ? `${label}:` : ""}`}
										{...runtimeField}
										{...runtimeRequired}
									>
										{{
											default() {
												return that.runtimeAdapter.formComponentRenderer({
													Component,
													schema,
													baseModel,
													placeholder,
													componentSlots,
													props,
												});
											},
											...formItemNativeSlots,
										}}
									</FormItem>
								)
							);
						},
					}}
				</Item>
			</div>
		);
	}

	runtimeGroupProcessor(schema: GroupSchema) {
		const defaultStyle = {
			display: "grid",
			gridColumn: "1 / -1",
			...schema.grid,
		};
		const Group = RuntimeContainer.getGroupContainer(this);
		let show = schema.show;
		if (show === undefined) {
			show = true;
		}
		return (
			<div style={defaultStyle}>
				{show && (
					<Group schema={schema}>
						{(schema.children as ItemSchema[]).map((chlidSchema) =>
							this.runtimeItemProcessor(chlidSchema),
						)}
					</Group>
				)}
			</div>
		);
	}

	addListItem(schema: AnyObject) {
		if (!this.processor.stableModel[schema.field]?.[0]) {
			return Promise.reject({
				code: `0001`,
				message: `异步默认值数据正在处理中，请您耐心等待... `,
			});
		}
		this.processor.stableModel[schema.field]?.[0] &&
			this.model.value[schema.field].push(
				deepClone(this.processor.stableModel[schema.field][0]),
			);
		this.runtimeAdapter.clearValidate(this);
	}

	deleteListItem(schema: AnyObject, index: number) {
		this.model.value[schema.field].splice(index, 1);
		this.runtimeAdapter.clearValidate(this);
	}

	runtimeListProcessor(schema: ListSchema) {
		const defaultStyle = {
			display: "grid",
			gridColumn: "1 / -1",
			...schema.grid,
		};
		const that = this;
		if (!that.model.value[schema.field]) {
			that.model.value[schema.field] = [{}];
		}
		let show = schema.show;
		if (show === undefined) {
			show = true;
		}
		const List = RuntimeContainer.getListContainer(this);
		const ListItem = RuntimeContainer.getListItemContainer(this);
		return (
			<div style={defaultStyle}>
				{show && (
					<List schema={schema}>
						{{
							default() {
								return that.model.value[schema.field].map(
									(listItemModel: AnyObject, listItemIndex: number) => (
										<ListItem>
											{{
												default() {
													return (schema.children as ItemSchema[]).map(
														(childSchema) =>
															that.runtimeItemProcessor(
																childSchema,
																listItemIndex,
																listItemModel,
																schema,
															),
													);
												},
												delete({ container }: AnyObject = {}) {
													const Container = container ?? <button></button>;
													return (
														<Container
															v-show={
																that.model.value[schema.field]?.length > 1
															}
															onClick={() =>
																that.deleteListItem(schema, listItemIndex)
															}
														/>
													);
												},
											}}
										</ListItem>
									),
								);
							},
							add({ container }: AnyObject = {}) {
								const Container = container ?? <button>添加</button>;
								return <Container onClick={() => that.addListItem(schema)} />;
							},
						}}
					</List>
				)}
			</div>
		);
	}

	runtimeProcessor(schemas: Schema[]) {
		return schemas.map((schema) => {
			if (!schema.type) {
				schema.type = "item";
			}
			// @ts-expect-error 类型不兼容，处理成本过高，直接忽略处理
			return this.processorBySchemaType[schema.type](schema);
		});
	}

	exec() {
		const defaultStyle: CSSProperties = {
			display: "grid",
			gridColumn: "1 / -1",
			gridAutoColumns: "1fr",
			...this.grid,
		};
		const that = this;
		const formNativeProps = deepAssign(
			this.globalNativeFormOverride.props.Form,
			deepClone(this.native?.props?.Form) ?? {},
		);
		const formNativeSlots = deepAssign(
			this.globalNativeFormOverride.slots.Form,
			deepClone(this.native?.slots?.Form) ?? {},
		);
		const Form = RuntimeContainer.getFormContainer(this);
		const formModelPropName = this.runtimeAdapter.getFormModelPropName();
		return (
			<Form
				{...formNativeProps}
				ref={this.formRef}
				{...{ [formModelPropName]: this.model.value }}
			>
				{{
					default() {
						return (
							<div style={defaultStyle}>
								{that.runtimeProcessor(that.schemas.value)}
							</div>
						);
					},
					...formNativeSlots,
				}}
			</Form>
		);
	}
}
