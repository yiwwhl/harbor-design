import { AnyObject, ItemSchema } from "../types";

// only happy path: 后续会结合整体插件系统和预设系统考虑再进行抽象，目前是过渡状态
export default class Preset {
  static schemaPreset: Record<keyof ItemSchema, any> & {
    children: any;
  } = {
    type: {
      defaultValue: "item",
    },
    component: {
      defaultValue: undefined,
    },
    componentProps: {
      defaultValue: undefined,
    },
    defaultValue: {
      defaultValue: undefined,
    },
    label: {
      defaultValue: "",
    },
    field: {
      defaultValue: "__yiwwhl_async_field_fallback",
    },
    rules: {
      defaultValue: [],
    },
    show: {
      defaultValue: true,
    },
    required: {
      defaultValue: false,
    },
    placeholder: {
      defaultValue: undefined,
    },
    children: {
      defaultValue: [],
    },
    native: undefined,
  };
  static componentPropsPreset: AnyObject = {
    options: {
      defaultValue: [],
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
