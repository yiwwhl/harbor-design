import { AnyFunction, AnyObject, FormCustomization } from "../../types";
import { RuntimeCore } from "../index";
export default class FormCustomizer {
    formCustomization: FormCustomization;
    runtimeCore: RuntimeCore;
    readonlyReactiveModel: import("vue").Ref<{}>;
    private cleanFallbackFields;
    constructor(formCustomization: FormCustomization);
    setup(_runtimeCore: RuntimeCore): FormCustomization;
    submit(): Promise<AnyObject>;
    hydrate(data: AnyObject): void;
    share(data: AnyObject): void;
    subscribeModel(callback: AnyFunction): void;
    resetModel(): void;
}
