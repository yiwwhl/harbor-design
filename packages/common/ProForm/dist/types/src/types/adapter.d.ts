import { AnyFunction } from ".";
export interface AdaptedInterface {
    getRuntimeField: AnyFunction;
    getRuntimeRequired: AnyFunction;
    getFormModelPropName: AnyFunction;
    formComponentRenderer: AnyFunction;
    validateForm: AnyFunction;
    clearValidate: AnyFunction;
}
