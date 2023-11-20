import { FormCustomization } from "../types";
import { RuntimeCore } from "./index";
import { toRaw } from "vue";

export default class FormCustomizer {
  public runtimeCore!: RuntimeCore;

  constructor(public formCustomization: FormCustomization) {}

  setup(_runtimeCore: RuntimeCore) {
    this.runtimeCore = _runtimeCore;
    return this.formCustomization;
  }

  submit() {
    return new Promise((resolve, reject) => {
      this.runtimeCore.formRef.value.validate((errors: any) => {
        if (errors) {
          return reject(errors);
        }
        return resolve(toRaw(this.runtimeCore.processors.processedModel.value));
      });
    });
  }
}
