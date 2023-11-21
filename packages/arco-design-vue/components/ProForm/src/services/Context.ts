import { RuntimeDomCustomizer, AnyFunction } from "../types";

export default class Context {
  static runtimeDoms: RuntimeDomCustomizer;
  static schemaEffects = new Set<AnyFunction>();
  static modelEffects = new Set<AnyFunction>();

  static triggerEffects(effects: Set<AnyFunction>) {
    Array.from(effects).forEach((effect) => effect());
  }

  static triggerSchemaEffects() {
    this.triggerEffects(this.schemaEffects);
  }

  static triggerModelEffects() {
    this.triggerEffects(this.modelEffects);
  }

  static addEffect(effects: Set<AnyFunction>, effect: AnyFunction) {
    effects.add(effect);
  }

  static deleteEffect(effects: Set<AnyFunction>, effect: AnyFunction) {
    effects.delete(effect);
  }

  static addModelEffect(effect: AnyFunction) {
    this.addEffect(this.modelEffects, effect);
  }

  static addSchemaEffect(effect: AnyFunction) {
    this.addEffect(this.schemaEffects, effect);
  }

  static deleteModelEffect(effect: AnyFunction) {
    this.deleteEffect(this.modelEffects, effect);
  }

  static deleteSchemaEffect(effect: AnyFunction) {
    this.deleteEffect(this.schemaEffects, effect);
  }

  static clearEffect(effects: Set<AnyFunction>) {
    effects.clear();
  }

  static clearSchemaEffect() {
    this.clearEffect(this.schemaEffects);
  }

  static clearModelEffect() {
    this.clearEffect(this.modelEffects);
  }
}
