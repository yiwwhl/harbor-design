import { AnyFunction } from "../../types";
import { TrackEffectMeta } from "../../types/effectTypes";

export default class Effect {
	effects = new Set<Function>();
	tempClonedEffects = new Set<Function>();
	identifierMap = new Map();
	timer!: NodeJS.Timeout;

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
			lazy: true,
		},
	) {
		!meta.lazy && effect();
		if (meta.identifier) {
			if (!this.identifierMap.get(meta.identifier)) {
				this.effects.add(effect);
				this.identifierMap.set(meta.identifier, true);
			}
		} else {
			this.effects.add(effect);
		}
		return () => this.effects.delete(effect);
	}
}
