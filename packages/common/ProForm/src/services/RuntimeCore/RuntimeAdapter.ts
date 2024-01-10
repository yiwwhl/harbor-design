import { Context, Preset } from "..";
import { AnyObject } from "../../types";

export default class RuntimeAdpter {
	constructor(public ui: string) {}

	getRuntimeNative() {
		const contextNative = Context.presets.uiPresets[this.ui]?.native;
		return contextNative;
	}

	getRuntimeField(runtimeArgs: AnyObject) {
		const contextAdapter = Context.presets.uiPresets[this.ui]?.adapter;
		const presetAdapter = Preset.adapters[this.ui];
		return (
			contextAdapter?.getRuntimeField(runtimeArgs) ??
			presetAdapter?.getRuntimeField(runtimeArgs)
		);
	}

	getRuntimeRequired(runtimeArgs: AnyObject) {
		const contextAdapter = Context.presets.uiPresets[this.ui]?.adapter;
		const presetAdapter = Preset.adapters[this.ui];
		return (
			contextAdapter?.getRuntimeRequired(runtimeArgs) ??
			presetAdapter?.getRuntimeRequired(runtimeArgs)
		);
	}

	getFormModelPropName() {
		const contextAdapter = Context.presets.uiPresets[this.ui]?.adapter;
		const presetAdapter = Preset.adapters[this.ui];
		return (
			contextAdapter?.getFormModelPropName() ??
			presetAdapter?.getFormModelPropName()
		);
	}

	formComponentRenderer(runtimeArgs: AnyObject) {
		const contextAdapter = Context.presets.uiPresets[this.ui]?.adapter;
		const presetAdapter = Preset.adapters[this.ui];
		return (
			contextAdapter?.formComponentRenderer(runtimeArgs) ??
			presetAdapter?.formComponentRenderer(runtimeArgs)
		);
	}

	clearValidate(runtimeArgs: AnyObject) {
		const contextAdapter = Context.presets.uiPresets[this.ui]?.adapter;
		const presetAdapter = Preset.adapters[this.ui];
		return (
			contextAdapter?.clearValidate(runtimeArgs) ??
			presetAdapter?.clearValidate(runtimeArgs)
		);
	}
}
