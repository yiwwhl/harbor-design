import { AnyObject, FormCustomization } from "../types";
import { deepAssign } from "../utils";
import { RuntimeCore } from "./index";
import { isReactive, isRef, toRaw, watch } from "vue";

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
            toRaw(this.runtimeCore.processor.processedModel.value)
          )
        );
      });
    });
  }

  hydrate(data: AnyObject) {
    // TODO: 可以考虑后续将 hydrate 和 defaultValue 的关系处理得更清晰
    this.runtimeCore.hydrateEffect.trackEffect(
      () => {
        if (isRef(data)) {
          watch(
            () => data.value,
            () => {
              deepAssign(this.runtimeCore.model.value, data.value);
            },
            {
              deep: true,
              immediate: true,
            }
          );
        } else if (isReactive(data)) {
          watch(
            () => data,
            () => {
              deepAssign(this.runtimeCore.model.value, data);
            },
            {
              deep: true,
              immediate: true,
            }
          );
        } else {
          deepAssign(this.runtimeCore.model.value, data);
        }
      },
      {
        lazy: true,
      }
    );
  }
}
