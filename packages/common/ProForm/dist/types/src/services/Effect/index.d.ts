/// <reference types="node" />
import { AnyFunction } from "../../types";
import { TrackEffectMeta } from "../../types/effectTypes";
export default class Effect {
    effects: Set<Function>;
    tempClonedEffects: Set<Function>;
    identifierMap: Map<any, any>;
    timer: NodeJS.Timeout;
    constructor();
    clearEffects(): void;
    triggerEffects(): void;
    trackEffect(effect: AnyFunction, meta?: TrackEffectMeta): () => boolean;
}
