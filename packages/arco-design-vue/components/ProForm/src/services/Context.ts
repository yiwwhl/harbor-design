import { RuntimeDomCustomizer, AnyFunction } from "../types";

export default class Context {
  static runtimeDoms: RuntimeDomCustomizer;
  static effects = new Set<AnyFunction>();

  static watchSchemaEffect(effect: AnyFunction) {
    const that = this;
    this.effects.add(effect);

    function stop() {
      that.effects.delete(effect);
    }

    return stop;
  }
}
