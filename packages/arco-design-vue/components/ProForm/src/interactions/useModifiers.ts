import { AnyFunction } from "../types";

type Modifier = "raw";

// TODO: 目前先只支持穿单个的 modifier 后续随着需求更新
export function useModifiers(functionRaw: AnyFunction, modifier: Modifier) {
  if (modifier === "raw") {
    Object.defineProperty(functionRaw, "name", {
      value: `__proform_raw_${functionRaw.name}`,
      writable: true,
    });
  }
  return functionRaw;
}
