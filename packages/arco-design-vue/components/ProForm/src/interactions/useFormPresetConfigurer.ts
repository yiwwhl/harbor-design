import { Context } from "../services";
import { FormPresets } from "../types";

export function useFormPresetConfigurer(presets: FormPresets) {
  Context.presets = presets;
}
