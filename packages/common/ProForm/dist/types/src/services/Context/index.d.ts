import { FormPresets, UIName } from "../../types";
export default class Context {
    static presets: FormPresets;
    static getPreset(ui: UIName): import("../../types").FormPreset | undefined;
    static getUI(ui: UIName): UIName;
}
