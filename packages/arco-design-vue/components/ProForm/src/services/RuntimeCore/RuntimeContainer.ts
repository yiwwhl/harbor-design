import { Context } from "..";
import { RuntimeOptions } from "../../types";

export default class RuntimeContainer {
	static getFormContainer({ ui }: RuntimeOptions = {}) {
		return Context.presets.uiPresets[ui ?? Context.presets.ui]!.container.Form;
	}
	static getFormItemContainer({ ui }: RuntimeOptions = {}) {
		return Context.presets.uiPresets[ui ?? Context.presets.ui]!.container
			.FormItem;
	}
	static getItemContainer({ ui }: RuntimeOptions = {}) {
		return Context.presets.uiPresets[ui ?? Context.presets.ui]!.container.Item;
	}
	static getGroupContainer({ ui }: RuntimeOptions = {}) {
		return Context.presets.uiPresets[ui ?? Context.presets.ui]!.container.Group;
	}
	static getListContainer({ ui }: RuntimeOptions = {}) {
		return Context.presets.uiPresets[ui ?? Context.presets.ui]!.container.List;
	}
	static getListItemContainer({ ui }: RuntimeOptions = {}) {
		return Context.presets.uiPresets[ui ?? Context.presets.ui]!.container
			.ListItem;
	}
}
