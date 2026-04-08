import { FormPresets, ProFormLocalePack, UIName } from "../../types";
export default class Context {
    static presets: FormPresets;
    static localePackCache: Record<string, ProFormLocalePack>;
    static localePackPromiseCache: Map<string, Promise<ProFormLocalePack | undefined>>;
    static internalI18nVersion: import("vue").Ref<number>;
    static setPresets(presets: FormPresets): void;
    static getPreset(ui: UIName): import("../../types").FormPreset | undefined;
    static getUI(ui: UIName): UIName;
    static getI18nConfig(): any;
    static getCurrentLocale(): any;
    static getLocalePack(locale?: any): ProFormLocalePack | undefined;
    static ensureLocalePackLoaded(locale?: any): Promise<any>;
    static formatTemplate(template: string, values: Record<string, string | number | undefined>): string;
    static translateMessage(message?: string): string;
    static translateLabel(label?: string): any;
    static buildRequiredMessage(label?: string): string;
    static buildPlaceholder(componentName: string | undefined, label?: string, defaultPrefixMap?: Record<string, string>): string;
    static applyPlaceholderTemplate(prefix: string, label: string): string;
}
