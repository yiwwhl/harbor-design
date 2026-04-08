import {
	AdaptedInterface,
	DisplayOptions,
	NativeCustomizationOptions,
} from ".";
import type { Ref } from "vue";
import { AnyObject } from "./utilTypes";

export type DomType = new (...args: any) => AnyObject & {
	$props: AnyObject;
};

export interface FormPreset {
	extend?: UIName;
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
	native?: NativeCustomizationOptions;
	display?: DisplayOptions;
}

export interface ProFormLocalePack {
	messages?: Record<string, string>;
	placeholderPrefixByComponentName?: Record<string, string>;
	templates?: {
		placeholder?: string;
		required?: string;
	};
}

export interface ProFormI18nOptions {
	localeRef: Ref<string>;
	versionRef?: Ref<number>;
	loadLocalePack?: (locale: string) => Promise<ProFormLocalePack>;
	translateLabel?: (
		label: string,
		context: {
			locale: string;
			pack?: ProFormLocalePack;
		},
	) => string;
}

export type UIName = "ArcoVue" | "NutUI" | "NaiveUI" | (string & {});

export type AdaptedInterfacePreset = Record<UIName, AdaptedInterface>;

export type FormPresets = {
	// 默认 ui
	ui: UIName;
	// ui 预设
	uiPresets: Partial<Record<UIName, FormPreset>>;
	// 可选的全局 i18n 运行时配置
	i18n?: any;
};
