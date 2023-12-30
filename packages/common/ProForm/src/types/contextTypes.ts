import { AdaptedInterface } from ".";
import { AnyObject } from "./utilTypes";

export type DomType = new (...args: any) => AnyObject & {
	$props: AnyObject;
};

export interface FormPreset {
	// 目前来说，想要新增一个模式必须提供模式基本的所有的 type 支持的渲染预设
	container: {
		Form: DomType;
		FormItem: DomType;
		Item: DomType;
		List: DomType;
		ListItem: DomType;
		Group: DomType;
	};
	adapter?: AdaptedInterface;
}

export type UIName = "ArcoVue" | "NutUI" | "NaiveUI" | (string & {});

export type AdaptedInterfacePreset = Record<UIName, AdaptedInterface>;

export type FormPresets = {
	// 默认 ui
	ui: UIName;
	// ui 预设
	uiPresets: Partial<Record<UIName, FormPreset>>;
};
