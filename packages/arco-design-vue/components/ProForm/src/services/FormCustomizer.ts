import { AnyObject, CustomizationOptions, FormCustomization } from "../types";
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
    Object.assign(
      this.runtimeCore.runtimeSetters,
      this.formCustomization.runtimeSetters
    );
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
    if (!this.runtimeCore) {
      return Promise.reject({
        code: `0002`,
        message: `hydrate 使用时机错误，建议将 hydrate 操作放到 onMounted 等页面节点挂载完成的钩子中，或者使用响应式的值来注入数据`,
      });
    }
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

  // TODO：目前仅用于配制一些基本的如 Form，FormItem 等 UI 库组件的默认属性，但后续会扩展其价值，包括设置统一布局等，都会考虑往内部封装
  customize(options: Partial<CustomizationOptions>) {
    Object.assign(this.runtimeCore.customizedOptions, options);
    Object.assign(this.runtimeCore.gridProps, this.formCustomization.gridProps);
  }
}
