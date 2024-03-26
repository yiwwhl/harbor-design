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
		if (meta.identifier) {
			if (!this.identifierMap.get(meta.identifier)) {
				this.identifierMap.set(meta.identifier, true);
				!meta.lazy && effect();
				this.effects.add(effect);
			}
		} else {
			!meta.lazy && effect();
			this.effects.add(effect);
		}
		return () => this.effects.delete(effect);
	}
}
