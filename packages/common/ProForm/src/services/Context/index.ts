import { FormPresets, UIName } from "../../types";

export default class Context {
	static presets: FormPresets;
	static getPreset(ui: UIName) {
		if (this.presets.uiPresets?.[ui]?.extend) {
			return this.presets.uiPresets[this.presets.uiPresets[ui]?.extend!];
		}
		return this.presets.uiPresets[ui];
	}
	static getUI(ui: UIName): UIName {
		if (this.presets.uiPresets?.[ui]?.extend) {
			return this.presets.uiPresets[ui]?.extend!;
		}
		return ui;
	}
}
