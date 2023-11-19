import { Context } from "../services";
import { RuntimeDomCustomizer } from "../types";

export function useFormRenderer(runtimeDomCustomizer: RuntimeDomCustomizer) {
  return {
    install() {
      Context.runtimeDoms = runtimeDomCustomizer;
    },
  };
}
