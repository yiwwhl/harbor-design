import { RuntimeDomCustomizer, AnyFunction } from "../types";

export default class Context {
  static runtimeDoms: RuntimeDomCustomizer;
  static effects = new Set<AnyFunction>();

  static watchSchemaEffect(effect: AnyFunction) {
    this.effects.add(effect);
  }
}
