import { AnyFunction } from "../types";
export default class Effect {
    effects: Set<Function>;
    constructor();
    clearEffects(): void;
    triggerEffects(): void;
    trackEffect(effect: AnyFunction): void;
}
