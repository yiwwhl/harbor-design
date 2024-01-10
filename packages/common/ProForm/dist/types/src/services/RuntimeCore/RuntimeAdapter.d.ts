import { AnyObject } from "../../types";
export default class RuntimeAdpter {
    ui: string;
    constructor(ui: string);
    getRuntimeNative(): import("../../types").NativeCustomizationOptions | undefined;
    getRuntimeField(runtimeArgs: AnyObject): any;
    getRuntimeRequired(runtimeArgs: AnyObject): any;
    getFormModelPropName(): any;
    formComponentRenderer(runtimeArgs: AnyObject): any;
    clearValidate(runtimeArgs: AnyObject): any;
}
