import { AnyObject, FormCustomization } from "../types";
import { RuntimeCore } from "./index";
import { toRaw } from "vue";

export default class FormCustomizer {
  public runtimeCore!: RuntimeCore;

  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  private cleanFallbackFields(data: any) {
    if (data !== null && typeof data === "object") {
      delete data.__yiwwhl_async_field_fallback;

      Object.values(data).forEach((value) => {
        this.cleanFallbackFields(value);
      });
    }
    return data;
  }

  constructor(public formCustomization: FormCustomization) {}

  setup(_runtimeCore: RuntimeCore) {
    this.runtimeCore = _runtimeCore;
    return this.formCustomization;
  }

  submit(): Promise<AnyObject> {
    return new Promise((resolve, reject) => {
      this.runtimeCore.formRef.value.validate((errors: any) => {
        if (errors) {
          return reject(errors);
        }
        return resolve(
          this.cleanFallbackFields(
            toRaw(this.runtimeCore.processors.processedModel.value)
          )
        );
      });
    });
  }
}
