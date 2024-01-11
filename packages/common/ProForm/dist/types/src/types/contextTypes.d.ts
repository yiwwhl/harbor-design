import { AdaptedInterface, NativeCustomizationOptions } from ".";
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
}
export type UIName = "ArcoVue" | "NutUI" | "NaiveUI" | (string & {});
export type AdaptedInterfacePreset = Record<UIName, AdaptedInterface>;
export type FormPresets = {
    ui: UIName;
    uiPresets: Partial<Record<UIName, FormPreset>>;
};
