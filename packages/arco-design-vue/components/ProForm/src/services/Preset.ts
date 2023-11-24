import { AnyObject, ItemSchema } from "../types";

// only happy path: 后续会结合整体插件系统和预设系统考虑再进行抽象，目前是过渡状态
export default class Preset {
  static schemaPreset: Record<keyof ItemSchema, any> = {
    type: {
      defaultValueWhenAsync: "item",
    },
    component: {
      defaultValueWhenAsync: undefined,
    },
    componentProps: {
      defaultValueWhenAsync: undefined,
    },
    defaultValue: {
      defaultValueWhenAsync: undefined,
    },
    label: {
      defaultValueWhenAsync: "",
    },
    field: {
      defaultValueWhenAsync: "__yiwwhl_async_field_fallback",
    },
    rules: {
      defaultValueWhenAsync: [],
    },
    show: {
      defaultValueWhenAsync: true,
    },
    required: {
      defaultValueWhenAsync: false,
    },
    placeholder: {
      defaultValueWhenAsync: undefined,
    },
  };
  static componentPropsPreset: AnyObject = {
    options: {
      defaultValueWhenAsync: [],
    },
  };
  // 基于基本功能提出基本预设
  static placeholderPresetByComponentName =
    this.getPlaceholderPrefixPresetByComponentName();

  static getPlaceholderPrefixPresetByComponentName() {
    // prefix -> [avaliable component names]
    const userFriendlyPreset = {
      请选择: ["Select", "Tree", "TreeSelect"],
      请输入: ["Input"],
    };
    const transformed = {};
    for (let key in userFriendlyPreset) {
      // @ts-expect-error
      userFriendlyPreset[key].forEach((value) => {
        // @ts-expect-error
        transformed[value] = key;
      });
    }
    return transformed;
  }
}
