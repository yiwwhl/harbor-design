import { AdaptedInterface, DisplayOptions, NativeCustomizationOptions } from ".";
import type { Ref } from "vue";
import { AnyObject } from "./utilTypes";
export type DomType = new (...args: any) => AnyObject & {
    $props: AnyObject;
};
export interface FormPreset {
    extend?: UIName;
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
    translateLabel?: (label: string, context: {
        locale: string;
        pack?: ProFormLocalePack;
    }) => string;
}
export type UIName = "ArcoVue" | "NutUI" | "NaiveUI" | (string & {});
export type AdaptedInterfacePreset = Record<UIName, AdaptedInterface>;
export type FormPresets = {
    ui: UIName;
    uiPresets: Partial<Record<UIName, FormPreset>>;
    i18n?: any;
};
