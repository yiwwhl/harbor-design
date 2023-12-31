import { AnyFunction } from "../../types";
import { TrackEffectMeta } from "../../types/effectTypes";
export default class Effect {
    effects: Set<Function>;
    constructor();
    clearEffects(): void;
    triggerEffects(): void;
    trackEffect(effect: AnyFunction, meta?: TrackEffectMeta): () => boolean;
}
