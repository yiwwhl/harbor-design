import { AnyFunction, AnyObject, FormCustomization } from "../../types";
import { deepAssign, deepClone } from "../../utils";
import { Context, Preset, RuntimeCore } from "../index";
import { isReactive, isRef, nextTick, readonly, ref, watch } from "vue";

export default class FormCustomizer {
	public runtimeCore!: RuntimeCore;
	public readonlyReactiveModel = ref({});

	// happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
	private cleanFallbackFields(data: any) {
		if (data !== null && typeof data === "object") {
			delete data.__yiwwhl_async_field_fallback;

			Object.values(data).forEach((value) => {
				this.cleanFallbackFields(value);
			});
		}
		return data;
	}

	constructor(public formCustomization: FormCustomization) {}

	setup(_runtimeCore: RuntimeCore) {
		this.runtimeCore = _runtimeCore;
		this.readonlyReactiveModel.value = readonly(_runtimeCore.model.value);
		Object.assign(this.runtimeCore.native, this.formCustomization.native);
		Object.assign(this.runtimeCore.grid, this.formCustomization.grid);
		Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime);
		this.formCustomization.ui &&
			(this.runtimeCore.ui = this.formCustomization.ui);
		return this.formCustomization;
	}

	submit(): Promise<AnyObject> {
		const contextAdapter = Context.getPreset(this.runtimeCore.ui)?.adapter;
		const presetAdapter = Preset.adapters[Context.getUI(this.runtimeCore.ui)];
		return (
			contextAdapter?.validateForm(this) ?? presetAdapter?.validateForm(this)
		);
	}

	hydrate(data: AnyObject) {
		nextTick(() => {
			this.runtimeCore.hydrateEffect.trackEffect(
				() => {
					if (isRef(data)) {
						watch(
							() => data.value,
							() => {
								deepAssign(this.runtimeCore.model.value, data.value);
							},
							{
								deep: true,
								immediate: true,
							},
						);
					} else if (isReactive(data)) {
						watch(
							() => data,
							() => {
								deepAssign(this.runtimeCore.model.value, data);
							},
							{
								deep: true,
								immediate: true,
							},
						);
					} else {
						deepAssign(this.runtimeCore.model.value, data);
					}
				},
				{
					lazy: false,
				},
			);
		});
	}

	share(data: AnyObject) {
		nextTick(() => {
			if (isRef(data)) {
				const stopWatch = watch(
					() => data.value,
					() => {
						deepAssign(this.runtimeCore.shared, data.value);
						this.runtimeCore.processor.schemaEffect.triggerEffects();
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
						deepAssign(this.runtimeCore.shared, data);
						this.runtimeCore.processor.schemaEffect.triggerEffects();
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
				deepAssign(this.runtimeCore.shared, data);
				this.runtimeCore.processor.schemaEffect.triggerEffects();
			}
		});
	}

	subscribeModel(callback: AnyFunction) {
		nextTick(() => {
			const stopSubscribe = watch(
				() => this.readonlyReactiveModel.value,
				(value) => {
					callback(value, {
						stopSubscribe() {
							nextTick(() => {
								stopSubscribe();
							});
						},
					});
				},
				{
					immediate: true,
					deep: true,
				},
			);
		});
	}

	resetModel() {
		if (this.runtimeCore?.model.value) {
			this.runtimeCore.model.value = deepClone(
				this.runtimeCore.processor.stableModel,
			);
			this.readonlyReactiveModel.value = readonly(this.runtimeCore.model.value);
			this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore);
		}
	}
}
