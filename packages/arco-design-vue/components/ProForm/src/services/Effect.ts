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
    this.effects.add(effect);
  }
}
