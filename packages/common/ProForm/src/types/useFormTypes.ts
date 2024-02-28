import { AnyObject } from "../types";
import type { RuntimeCore } from "../services";
import { WatchStopHandle } from "vue";

export type Setup = (runtimeCore: RuntimeCore) => any;

export type SubscribeUtils = {
	stopSubscribe: WatchStopHandle;
};

export type SubscribeCallback = (value: any, utils: SubscribeUtils) => any;

export type UseForm = [
	Setup,
	{
		submit: () => Promise<AnyObject>;
		hydrate: (data: AnyObject) => any;
		share: (data: AnyObject) => any;
		subscribeModel: (callback: SubscribeCallback) => any;
		resetModel: () => any;
	},
];
