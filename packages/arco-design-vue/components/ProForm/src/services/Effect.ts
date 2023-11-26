import { AnyFunction } from "../types";

export default class Effect {
  effects = new Set<Function>();

  constructor() {}

  clearEffects() {
    this.effects.clear();
  }

  triggerEffects() {
    Array.from(this.effects).forEach((effect) => effect());
  }

  trackEffect(effect: AnyFunction) {
    effect();
    this.effects.add(effect);
    return () => this.effects.delete(effect);
  }
}
