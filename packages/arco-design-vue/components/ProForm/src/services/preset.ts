import { isUndefined } from "../utils";
import { ItemTypeSchemaItem } from "../types/form";

export function presetProcess(schema: ItemTypeSchemaItem, forceUpdate = false) {
  // required
  if (schema.required) {
    if (!schema.rules) {
      Object.assign(schema, {
        rules: [],
      });
    }
    (schema.rules as any).unshift({
      required: true,
      message: `${schema.label}为必填项`,
    });
  }
  // placeholder
  if (!schema.placeholder || forceUpdate) {
    Object.assign(schema, {
      // 待重构，需要不同的组件有一个映射，同时映射可以做到映射和配置关联，配置中会有默认的 placeholder prefix 获取函数，后续会在此处执行，根据
      // 不同的配置具体情况来更灵活的控制默认提示
      placeholder: `请输入${schema.label}`,
    });
  }
  // show
  if (isUndefined(schema.show)) {
    Object.assign(schema, {
      show: true,
    });
  }
}
