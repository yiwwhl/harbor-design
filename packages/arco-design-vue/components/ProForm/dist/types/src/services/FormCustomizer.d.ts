import { AnyObject, FormCustomization } from "../types";
import { RuntimeCore } from "./index";
export default class FormCustomizer {
    formCustomization: FormCustomization;
    runtimeCore: RuntimeCore;
    private cleanFallbackFields;
    constructor(formCustomization: FormCustomization);
    setup(_runtimeCore: RuntimeCore): FormCustomization;
    submit(): Promise<AnyObject>;
    hydrate(data: AnyObject): Promise<never> | undefined;
}
