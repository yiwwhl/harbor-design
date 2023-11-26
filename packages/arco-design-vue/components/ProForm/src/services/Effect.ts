import { AnyFunction } from "../types";
import { TrackEffectMeta } from "../types/effectTypes";

export default class Effect {
  effects = new Set<Function>();

  constructor() {}

  clearEffects() {
    this.effects.clear();
  }

  triggerEffects() {
    Array.from(this.effects).forEach((effect) => effect());
  }

  trackEffect(
    effect: AnyFunction,
    meta: TrackEffectMeta = {
      lazy: false,
    }
  ) {
    !meta.lazy && effect();
    this.effects.add(effect);
    return () => this.effects.delete(effect);
  }
}
