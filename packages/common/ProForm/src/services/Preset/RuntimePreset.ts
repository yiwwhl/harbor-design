import { AnyObject, ItemSchema } from "../../types";

export default class RuntimePreset {
	static schemaPreset: Record<keyof ItemSchema, any> & {
		children: any;
	} = {
		type: {
			defaultValue: "item",
		},
		component: {
			defaultValue: undefined,
		},
		componentProps: {
			defaultValue: undefined,
		},
		componentSlots: {
			defaultValue: undefined,
		},
		defaultValue: {
			defaultValue: undefined,
		},
		label: {
			defaultValue: "",
		},
		field: {
			defaultValue: "__yiwwhl_async_field_fallback",
		},
		rules: {
			defaultValue: [],
		},
		show: {
			defaultValue: true,
		},
		required: {
			defaultValue: false,
		},
		placeholder: {
			defaultValue: undefined,
		},
		children: {
			defaultValue: [],
		},
		native: {
			defaultValue: undefined,
		},
		grid: {
			default: undefined,
		},
		runtime: {
			default: undefined,
		},
	};
	static componentPropsPreset: AnyObject = {
		options: {
			defaultValue: [],
		},
	};
	// 基于基本功能提出基本预设
	static placeholderPresetByComponentName =
		this.getPlaceholderPrefixPresetByComponentName();

	static getPlaceholderPrefixPresetByComponentName() {
		// prefix -> [avaliable component names]
		// 都用小写，这样可以做相似性碰撞
		const userFriendlyPreset = {
			请选择: ["select", "tree"],
			请输入: ["input"],
		};
		const transformed = {};
		for (const key in userFriendlyPreset) {
			// @ts-expect-error
			userFriendlyPreset[key].forEach((value) => {
				// @ts-expect-error
				transformed[value] = key;
			});
		}
		return transformed;
	}
}
