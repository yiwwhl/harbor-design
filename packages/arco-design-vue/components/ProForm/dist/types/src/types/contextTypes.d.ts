import { AdaptedInterface } from ".";
import { AnyObject } from "./utilTypes";
export type DomType = new (...args: any) => AnyObject & {
    $props: AnyObject;
};
export interface FormPreset {
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
export type UIName = "ArcoVue" | "NutUI" | (string & {});
export type AdaptedInterfacePreset = Record<string, AdaptedInterface>;
export type FormPresets = {
    ui: UIName;
    uiPresets: Partial<Record<UIName, FormPreset>>;
};
