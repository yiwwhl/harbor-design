import { AnyFunction, AnyObject, FormCustomization } from "../../types";
import { RuntimeCore } from "../index";
export default class FormCustomizer {
    formCustomization: FormCustomization;
    runtimeCore: RuntimeCore;
    reactiveModel: AnyObject;
    private cleanFallbackFields;
    constructor(formCustomization: FormCustomization);
    setup(_runtimeCore: RuntimeCore): FormCustomization;
    submit(): Promise<AnyObject>;
    hydrate(data: AnyObject): Promise<never> | undefined;
    share(data: AnyObject): void;
    subscribeModel(callback: AnyFunction): void;
    resetModel(): void;
}
