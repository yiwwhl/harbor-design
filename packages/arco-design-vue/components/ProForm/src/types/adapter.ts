import { AnyFunction } from ".";

export interface AdaptedInterface {
  getRuntimeField: AnyFunction;
  getRuntimeRequired: AnyFunction;
  getFormModelPropName: AnyFunction;
  validateForm: AnyFunction;
}
