import { AnyObject, ItemSchema } from "../../types";
export default class RuntimePreset {
    static schemaPreset: Record<keyof ItemSchema, any> & {
        children: any;
    };
    static componentPropsPreset: AnyObject;
    static placeholderPresetByComponentName: {};
    static getPlaceholderPrefixPresetByComponentName(): {};
}
